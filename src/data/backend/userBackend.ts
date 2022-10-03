import ApiBackend from './apiBackend'
import UserModel from '../models/user'
import AccountModel from '../models/account'

export const hydrateUser = async (token: string): Promise<UserModel> => {
  const api = new ApiBackend()

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

  const resp = await api.apiRequest('graphql', 'POST', token, { query: query })
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

  return user
}
