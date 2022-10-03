import { browser } from '$app/environment'
import { get } from 'svelte/store'
import { redirect } from '@sveltejs/kit'

import { backendUrl } from '../data/backend/apiBackend'

import BrowserStorage from '../data/storage/browserStorage'
import UserStorage from '../data/storage/userStorage'

import { batchesStore, userStore } from '../data/stores'

import { hydrateBatches } from '../data/backend/batchesBackend'
export const ssr = false // fuck me this is really important

export async function load({ url: { searchParams } }) {
  if (!browser) return
  const user = get(userStore)

  if (!user) {
    throw redirect(302, backendUrl() + '/login')
  }

  let batches = get(batchesStore)
  if (!batches) {
    batches = await hydrateBatches(user.token)
    batchesStore.set(batches)
  }
}
