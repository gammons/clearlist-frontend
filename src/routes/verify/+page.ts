import { browser } from '$app/environment'
import { get } from 'svelte/store'
import { redirect } from '@sveltejs/kit'

import UserModel, { userToken } from '../../data/models/user'
import AccountModel from '../../data/models/account'
import BatchModel from '../../data/models/batch'
import ApiBackend from '../../data/backend/apiBackend'
import { backendUrl } from '../../data/backend/apiBackend'

import { WebsocketHandler, WebsocketProcessor } from '../../data/websocket'

import { batchesStore, userStore, socketStore } from '../../data/stores'

export const ssr = false // fuck me this is really important

export async function load({ url: { searchParams } }) {
  if (!browser) return

  let user = get(userStore)
  let batches = get(batchesStore)

  if (!userToken()) {
    throw redirect(302, backendUrl() + '/login')
  }

  if (!batches || !user) {
    const ret = await hydrateData(userToken())
    batchesStore.set(ret.batches)
    userStore.set(ret.user)
  }

  registerSocket((data) => {
    if (data.request !== 'batch_updated') return

    const batches = get(batchesStore)
    const batch = batches.find((batch) => batch.uuid === data.data.uuid)

    if (!batch) return

    batch.batchState = data.data.batchState
    batch.processedCount = data.data.processedCount
    batch.disposableCount = data.data.disposableCount
    batch.roleCount = data.data.roleCount
    batch.failedSyntaxCheckCount = data.data.failedSyntaxCheckCount
    batch.failedMxCheckCount = data.data.failedMxCheckCount
    batch.failedSmtpCheckCount = data.data.failedSmtpCheckCount
    batch.failedNoMailboxCount = data.data.failedNoMailboxCount
    batch.okForAllCount = data.data.okForAllCount
    batch.okCount = data.data.okCount
    batchesStore.set(batches)
  })
}

const hydrateData = async (token: string): Promise<{ batches: BatchModel[]; user: UserModel }> => {
  const api = new ApiBackend(token)

  const query = `
  fragment userFields on User {
    uuid
    name
    email
    lastLoginAt
    imageUrl
    lastActiveAt
    timeZone
    errors
  }
  query {
    batches {
      uuid
      name
      createdAt
      updatedAt
      emailCount
      batchState
      batchType
      roleCount
      disposableCount
      failedSyntaxCheckCount
      failedMxCheckCount
      failedSmtpCheckCount
      failedNoMailboxCount
      processedCount
      okForAllCount
      okCount
    }
    user {
      ...userFields

      account {
        name
        credits
        errors

        users {
          ...userFields
        }
      }
    }
  }
  `

  const resp = await api.apiRequest('graphql', 'POST', { query: query })

  const batches = resp.data.batches.map((batch) => {
    return new BatchModel({
      name: batch.name,
      uuid: batch.uuid,
      batchState: batch.batchState,
      batchType: batch.batchType,
      disposableCount: batch.disposableCount,
      roleCount: batch.roleCount,
      emailCount: batch.emailCount,
      failedSyntaxCheckCount: batch.failedSyntaxCheckCount,
      failedMxCheckCount: batch.failedMxCheckCount,
      failedSmtpCheckCount: batch.failedSmtpCheckCount,
      failedNoMailboxCount: batch.failedNoMailboxCount,
      okForAllCount: batch.okForAllCount,
      processedCount: batch.processedCount,
      okCount: batch.okCount,
      createdAt: batch.createdAt,
      updatedAt: batch.updatedAt
    })
  })

  const userData = resp.data.user
  const accountData = resp.data.user.account
  const user = new UserModel({
    name: userData.name,
    token: token,
    email: userData.email,
    imageUrl: userData.imageUrl,
    uuid: userData.uuid,
    lastLoginAt: userData.lastLoginAt,
    timeZone: userData.timeZone,
    errors: userData.errors,

    account: new AccountModel({
      uuid: accountData.uuid,
      name: accountData.name,
      credits: accountData.credits,
      errors: accountData.errors,
      users: accountData.users.map((user) => new UserModel(user))
    })
  })

  return { batches, user }
}

const registerSocket = (socketHandlerFn: (data: any) => void) => {
  const handler = new WebsocketHandler()

  const processor = new WebsocketProcessor('clearlist_realtime', socketHandlerFn)

  handler.registerProcessor(processor)
  handler.registerSocket(get(userStore))

  socketStore.set(handler)
}
