import type { Backendable } from './backendable'

export default class ApiBackend implements Backendable {
  token: string

  constructor(token: string) {
    this.token = token
  }

  apiRequest(path: string, method: string, params: object = {}, body?: FormData) {
    return new Promise((resolve, reject) => {
      const headers = new Headers()
      if (this.token) {
        headers.append('Authorization', `Bearer ${this.token}`)
      }
      headers.append('Accept', 'application/json')

      if (!body) {
        headers.append('Content-Type', 'application/json')
      }

      interface OptsInterface {
        headers: Headers
        mode: RequestMode
        method: string
        body?: FormData | string
      }
      const opts: OptsInterface = { headers, mode: 'cors', method, body }

      let url = `${backendUrl()}/${path}`

      if (process.env.NODE_ENV !== 'production') {
        console.group()
        console.log('******************************')
        console.log('API request: ', url)
        console.log('API method: ', method)
        console.log('API params: ', params)
        console.log('Using token: ', this.token)
        console.log('******************************')
        console.groupEnd()
      }

      if (method === 'GET') {
        url += `?${this.toQueryString(params)}`
      } else {
        opts.body ||= JSON.stringify(params)
      }

      fetch(url, opts)
        .then((resp) => {
          if (resp.status.toString().startsWith('5')) {
            reject(resp.statusText)
          }

          resp.status === 204 ? resolve() : resp.json().then(resolve)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  toQueryString(obj: object) {
    const parts = []
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]))
      }
    }
    return parts.join('&')
  }
}

export const backendUrl = () => {
  if (window.location.hostname === 'app.clearlist.io') {
    return 'https://api.clearlist.io'
  }
  if (window.location.hostname === 'staging.clearlist.io') {
    return 'https://api-stag.clearlist.io'
  }
  return 'http://localhost:3000'
}
