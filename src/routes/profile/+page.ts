import { userToken } from '../../data/models/user'
import ApiBackend from '../../data/backend/apiBackend'

export async function load() {
  const api = new ApiBackend(userToken())
  const cardInfo = await api.apiRequest('/api/v1/payments/current_card', 'GET')
  const invoices = await api.apiRequest('/api/v1/payments/invoices', 'GET')

  return {
    cardInfo: cardInfo,
    invoices: invoices
  }
}

