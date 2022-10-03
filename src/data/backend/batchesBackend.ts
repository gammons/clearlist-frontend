import ApiBackend from './apiBackend'
import BatchModel from '../models/batch'

export const hydrateBatches = async (token: string): Promise<BatchModel[]> => {
  const api = new ApiBackend()

  const query = `
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
      account {
        credits
      }
    }
  }
  `

  const resp = await api.apiRequest('graphql', 'POST', token, { query: query })
  console.log('Resp =', resp)
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

  return batches
}
