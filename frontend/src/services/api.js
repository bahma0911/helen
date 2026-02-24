import axios from 'axios'

// Build a safe baseURL that always points to the backend API root (/api)
const envBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
// remove trailing slash and any trailing /api to normalize
const normalized = envBase.replace(/\/api\/?$/i, '').replace(/\/$/, '')
const baseURL = normalized + '/api'

const API = axios.create({ baseURL })
export const getWines = () => API.get('/wines').then(r => r.data)
export const getWine = (id) => API.get(`/wines/${id}`).then(r => r.data)
export const postOrder = (payload) => API.post('/orders', payload).then(r => r.data)

export default API
