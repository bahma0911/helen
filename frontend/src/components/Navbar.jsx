import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-cream shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-wine font-serif text-2xl">Helen Wine Shop</Link>
        <div className="space-x-4">
          <Link to="/wines" className="text-sm hover:text-wine">Wines</Link>
          <Link to="/about" className="text-sm hover:text-wine">About</Link>
          <Link to="/contact" className="text-sm hover:text-wine">Contact</Link>
          <Link to="/order" className="text-sm font-semibold bg-wine text-cream px-3 py-1 rounded">Order</Link>
        </div>
      </div>
    </nav>
  )
}
