import React from 'react'
import { useOrder } from '../context/OrderContext'

const PHONE = '+251912345678' // replace with business number

export default function WhatsAppFloatingButton() {
  const { items } = useOrder()

  const message = () => {
    if (!items || items.length === 0) return encodeURIComponent('Hello, I would like to place an order.')
    const lines = ['Hello, I would like to place an order:']
    items.forEach(i => lines.push(`${i.quantity} x ${i.wine.name} (${i.wine.brand})`))
    return encodeURIComponent(lines.join('\n'))
  }

  return (
    <a
      href={`https://wa.me/${PHONE.replace(/[^0-9]/g, '')}?text=${message()}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg"
      aria-label="WhatsApp"
    >
      WhatsApp
    </a>
  )
}
