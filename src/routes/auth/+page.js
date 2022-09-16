import { redirect } from '@sveltejs/kit'

export function load({ url: { searchParams } }) {
  searchParams.get('signup')
  searchParams.get('token')
  throw redirect(302, '/')
}
