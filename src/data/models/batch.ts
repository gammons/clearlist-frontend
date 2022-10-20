import { backendUrl } from '../backend/apiBackend'

export enum BatchState {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed'
}

export enum BatchType {
  UserImport = 0,
  ApiImport = 1,
  Integration = 2
}

export default class Batch {
  name: string
  uuid: string
  createdAt: string
  updatedAt: string
  processedCount: number
  emailCount: number
  batchState: BatchState
  batchType: BatchType

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
    this.processedCount = args.processedCount
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

  created() {
    const date = new Date(Date.parse(this.createdAt))
    return date.toDateString()
  }

  downloadLink(token: string): string {
    return backendUrl() + `/api/v1/batches/${this.uuid}/download?key=${token}`
  }

  riskCount(): number {
    return this.roleCount + this.disposableCount + this.okForAllCount
  }

  invalidCount(): number {
    return (
      this.failedSyntaxCheckCount +
      this.failedNoMailboxCount +
      this.failedMxCheckCount +
      this.failedSmtpCheckCount
    )
  }

  percentComplete(): number {
    return Math.round((this.processedCount / this.emailCount) * 100)
  }
}
