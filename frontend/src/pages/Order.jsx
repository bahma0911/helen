import React, { useState } from 'react'
import { useOrder, useOrderDispatch } from '../context/OrderContext'
import { postOrder } from '../services/api'

export default function Order() {
  const { items } = useOrder()
  const dispatch = useOrderDispatch()
  const [form, setForm] = useState({ customerName: '', phone: '', deliveryArea: '', notes: '' })
  const [status, setStatus] = useState(null)

  function parsePrice(price = '') {
    const n = parseInt((price || '').toString().replace(/[^\d]/g, ''), 10)
    return Number.isFinite(n) ? n : 0
  }

  const total = items.reduce((s, i) => s + parsePrice(i.wine.price) * i.quantity, 0)

  async function submit(e) {
    e.preventDefault()
    try {
      const payload = { ...form, items: items.map(i => ({ wine: i.wine._id, quantity: i.quantity })) }
      await postOrder(payload)
      setStatus('success')
      dispatch({ type: 'CLEAR' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="font-serif text-2xl text-wine">Your Order</h2>
        {items.length === 0 ? <p className="mt-4">No items added.</p> : (
          <div className="mt-4 bg-white p-4 rounded">
            {items.map(i => (
              <div key={i.wine._id} className="flex justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="font-semibold">{i.wine.name}</div>
                  <div className="text-sm text-gray-600">{i.quantity} x {parsePrice(i.wine.price)} ETB</div>
                </div>
                <div className="text-gray-800">{parsePrice(i.wine.price) * i.quantity} ETB</div>
              </div>
            ))}
            <div className="mt-4 text-right font-bold">Total: {total} ETB</div>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-serif text-2xl text-wine">Order Request</h2>
        {status === 'success' && <div className="p-3 bg-green-100 text-green-800 rounded mt-4">Order submitted. We'll contact you soon.</div>}
        {status === 'error' && <div className="p-3 bg-red-100 text-red-800 rounded mt-4">Failed to submit order.</div>}

        <form onSubmit={submit} className="mt-4 space-y-3 bg-white p-4 rounded">
          <input required placeholder="Full name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} className="w-full border px-3 py-2" />
          <input required placeholder="Phone number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full border px-3 py-2" />
          <input placeholder="Delivery area" value={form.deliveryArea} onChange={e => setForm(f => ({ ...f, deliveryArea: e.target.value }))} className="w-full border px-3 py-2" />
          <textarea placeholder="Additional notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="w-full border px-3 py-2" />
          <button type="submit" className="bg-wine text-cream px-4 py-2 rounded">Submit Order Request</button>
        </form>
      </div>
    </div>
  )
}
