import type { Backendable } from './backendable'

export default class TestBackend implements Backendable {
  token: string

  constructor(token: string) {
    this.token = token
  }

  apiRequest(path: string, method: string, token: string, params: object = {}) {
    return new Promise((resolve) => resolve(params))
  }
}
