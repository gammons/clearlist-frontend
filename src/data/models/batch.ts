export default class Batch {
  name: string
  uuid: string
  createdAt: string
  updatedAt: string
  emailCount: number
  batchState: number
  batchType: number

  disposableCount: number
  roleCount: number
  failedSyntaxCheckCount: number
  failedMxCheckCount: number
  failedSmtpCheckCount: number
  failedNoMailboxCount: number
  okForAllCount: number
  okCount: number

  constructor(args) {
    this.name = args.name
    this.uuid = args.uuid
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.emailCount = args.emailCount
    this.batchType = args.batchType
    this.disposableCount = args.disposableCount
    this.roleCount = args.roleCount
    this.failedSyntaxCheckCount = args.failedSyntaxCheckCount
    this.failedMxCheckCount = args.failedMxCheckCount
    this.failedSmtpCheckCount = args.failedSmtpCheckCount
    this.failedNoMailboxCount = args.failedNoMailboxCount
    this.okForAllCount = args.okForAllCount
    this.okCount = args.okCount
    this.batchState = args.batchState
  }
}
