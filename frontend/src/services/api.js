import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
})
export const getWines = () => API.get('/wines').then(r => r.data)
export const getWine = (id) => API.get(`/wines/${id}`).then(r => r.data)
export const postOrder = (payload) => API.post('/orders', payload).then(r => r.data)

export default API
