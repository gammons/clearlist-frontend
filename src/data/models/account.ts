import type UserModel from './user'

type ConstructorArgs = {
  credits: number
  name: string
  errors?: string
  cancelled_at?: string
  users: UserModel[]
}

export default class Account {
  credits: number
  errors: string
  name: string
  users: Array<UserModel>

  constructor(args: ConstructorArgs) {
    this.credits = args.credits
    this.name = args.name
    this.errors = args.errors || ''
    this.users = args.users || []
  }
}
