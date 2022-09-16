import type AccountModel from './account'
import type ApiKeyModel from './apiKey'

export default class User {
  account: AccountModel
  apiKeys: ApiKeyModel[]

  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  lastLoginAt: string
  timeZone: string
  errors: string

  constructor(args) {
    this.account = args.account
    this.apiKeys = args.apiKeys

    this.name = args.name
    this.token = args.token
    this.email = args.email
    this.imageUrl = args.imageUrl
    this.uuid = args.uuid
    this.errors = args.errors
    this.lastLoginAt = args.lastLoginAt
    this.timeZone = args.timeZone
  }
}
