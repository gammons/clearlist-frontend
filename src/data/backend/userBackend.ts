import ApiBackend from './apiBackend'

export const hydrateUser = async (token: string) => {
  const api = new ApiBackend()

  const query = `
  {
    user {
      uuid
      email
      account {
        name
        credits
      }
    }
  }
  `

  const resp = await api.apiRequest('graphql', 'POST', token, { query: query })
  console.log(resp)
}
