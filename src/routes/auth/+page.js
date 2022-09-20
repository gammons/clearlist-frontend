import { redirect } from '@sveltejs/kit'
import { browser } from '$app/environment'

import BrowserStorage from '../../data/storage/browserStorage'

export async function load({ url: { searchParams } }) {
  if (!browser) return

  const storage = new BrowserStorage()

  storage.save('token', await searchParams.get('token'))
  storage.save('signup', await searchParams.get('signup'))

  throw redirect(302, '/')
}
