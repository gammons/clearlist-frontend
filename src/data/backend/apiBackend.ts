import type { Backendable } from './backendable'

export default class ApiBackend implements Backendable {
  apiRequest(path: string, method: string, token: string, params: object = {}) {
    return new Promise((resolve, reject) => {
      const headers = new Headers()
      if (token) {
        headers.append('Authorization', `Bearer ${token}`)
      }
      headers.append('Accept', 'application/json')
      headers.append('Content-Type', 'application/json')

      interface OptsInterface {
        headers: Headers
        mode: RequestMode
        method: string
        body?: string
      }
      const opts: OptsInterface = { headers, mode: 'cors', method }

      let url = `${this.backendUrl()}/${path}`

      if (process.env.NODE_ENV !== 'production') {
        console.group()
        console.log('******************************')
        console.log('API request: ', url)
        console.log('API method: ', method)
        console.log('API params: ', params)
        console.log('Using token: ', token)
        console.log('******************************')
        console.groupEnd()
      }

      if (method === 'GET') {
        url += `?${this.toQueryString(params)}`
      } else {
        opts.body = JSON.stringify(params)
      }
      console.log('body = ', opts.body)

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

  backendUrl() {
    if (window.location.hostname === 'app.clearlist.io') {
      return 'https://api.clearlist.io'
    }
    if (window.location.hostname === 'staging.clearlist.io') {
      return 'https://api-stag.clearlist.io'
    }
    return 'http://localhost:3000'
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
