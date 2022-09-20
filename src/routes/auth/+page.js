import { redirect } from '@sveltejs/kit'
import { browser } from '$app/environment'

import BrowserStorage from '../../data/storage/browserStorage'
import { hydrateUser } from '../../data/backend/userBackend'

export async function load({ url: { searchParams } }) {
  if (!browser) return

  const storage = new BrowserStorage()

  const token = await searchParams.get('token')

  storage.save('token', token)
  storage.save('signup', await searchParams.get('signup'))

  hydrateUser(token)

  //throw redirect(302, '/')
}
