import { browser } from '$app/environment'

import BrowserStorage from '../data/storage/browserStorage'
import UserStorage from '../data/storage/userStorage'

import { userStore } from '../data/stores'

import { hydrateUser } from '../data/backend/userBackend'
export const ssr = false // fuck me this is really important

export async function load({ url: { searchParams } }) {
  if (!browser) return

  const storage = new BrowserStorage()

  const token = storage.load('token')
  const userStorage = new UserStorage(storage)

  let user = userStorage.loadUser()
  if (user === null) {
    user = await hydrateUser(token)
    userStorage.saveUser(user)
  }
  userStore.set(user)
}
