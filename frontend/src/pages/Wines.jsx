import React, { useMemo, useState, useEffect } from 'react'
import WineCard from '../components/WineCard'
import { useOrder } from '../context/OrderContext'
import { Link } from 'react-router-dom'
import { getWines } from '../services/api'

function parsePrice(priceStr = '') {
  const n = parseInt((priceStr || '').toString().replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

export default function Wines() {
  const [brand, setBrand] = useState('All')
  const [type, setType] = useState('All')
  const { items } = useOrder()
  const [wines, setWines] = useState([])

  useEffect(() => { getWines().then(setWines).catch(() => {}) }, [])

  const brands = useMemo(() => ['All', ...Array.from(new Set(wines.map(w => w.brand).filter(Boolean)))], [wines])
  const types = useMemo(() => ['All', ...Array.from(new Set(wines.map(w => w.type).filter(Boolean)))], [wines])

  const filtered = useMemo(() => wines.filter(w => (brand === 'All' || w.brand === brand) && (type === 'All' || w.type === type)), [wines, brand, type])

  const totalItems = items.reduce((s, it) => s + it.quantity, 0)
  const totalPrice = items.reduce((s, it) => s + parsePrice(it.wine.price) * it.quantity, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-wine">All Wines</h2>
        <div className="flex gap-3">
          <select value={brand} onChange={e => setBrand(e.target.value)} className="border px-2 py-1">
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="border px-2 py-1">
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(w => <WineCard key={w._id || w.name} wine={w} />)}
      </div>

      <aside className="fixed bottom-6 right-6 bg-white border rounded-lg shadow-lg p-4 w-56 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Order</div>
            <div className="font-semibold">{totalItems} item{totalItems !== 1 ? 's' : ''}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-semibold">{totalPrice} ETB</div>
          </div>
        </div>

        <div className="mt-3">
          <Link to="/order" className="block text-center bg-wine text-cream px-3 py-2 rounded hover:bg-opacity-90 transition-colors">Go to Order Page</Link>
        </div>
      </aside>
    </div>
  )
}
