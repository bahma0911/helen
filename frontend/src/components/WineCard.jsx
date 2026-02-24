import React from 'react'
import { Link } from 'react-router-dom'
import { useOrderDispatch } from '../context/OrderContext'
import { resolveImage } from '../utils/imageMap'

/*
  Props:
    - wine: { id, brand, name, type, tastingNotes, price, imageUrl }
*/
export default function WineCard({ wine }) {
  const dispatch = useOrderDispatch()

  function addToOrder() {
    dispatch({ type: 'ADD_ITEM', payload: wine })
  }

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
      <Link to={`/wine/${wine._id || wine.id}`} className="block">
        <div className="w-full h-44 bg-gray-50 flex items-center justify-center">
          <img
            src={resolveImage(wine.imageUrl) || wine.imageUrl}
            alt={wine.name}
            className="max-h-full max-w-full object-contain"
            draggable={false}
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg text-wine">{wine.name}</h3>
            <p className="text-sm text-gray-500">{wine.brand} · {wine.type}</p>
          </div>
          <div className="text-right">
            <div className="text-wine font-semibold">{wine.price}</div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{wine.tastingNotes}</p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={addToOrder}
            className="bg-wine text-cream px-3 py-1 rounded text-sm hover:bg-opacity-90 transition-colors"
          >
            Add to Order
          </button>
          <Link to={`/wine/${wine.id}`} className="text-sm text-gray-500 hover:text-wine">
            View
          </Link>
        </div>
      </div>
    </article>
  )
}
