import { browser } from '$app/environment'
import { get } from 'svelte/store'

import BrowserStorage from '../data/storage/browserStorage'
import UserStorage from '../data/storage/userStorage'

import { batchesStore } from '../data/stores'

import { hydrateBatches } from '../data/backend/batchesBackend'
export const ssr = false // fuck me this is really important

export async function load({ url: { searchParams } }) {
  if (!browser) return

  let batches = get(batchesStore)
  if (!batches) {
    const storage = new BrowserStorage()
    const token = storage.load('token')
    batches = await hydrateBatches(token)
    batchesStore.set(batches)
  }
}
