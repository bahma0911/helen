import axios from 'axios'

const base = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
const API = axios.create({ baseURL: base })

export const getWines = () => API.get('/wines').then(r => r.data)
export const getWine = (id) => API.get(`/wines/${id}`).then(r => r.data)
export const postOrder = (payload) => API.post('/orders', payload).then(r => r.data)

export default API
