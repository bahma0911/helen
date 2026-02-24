import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWine } from '../services/api'
import { useOrderDispatch } from '../context/OrderContext'
import { resolveImage } from '../utils/imageMap'

export default function WineDetails() {
  const { id } = useParams()
  const [wine, setWine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useOrderDispatch()

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    console.debug('WineDetails: fetching id=', id)
    if (id) {
      getWine(id)
        .then(w => { if (mounted) setWine(w) })
        .catch(err => {
          console.error('WineDetails fetch error for id=', id, err)
          if (mounted) setError(err?.response?.data?.error || err.message || 'Unknown error')
        })
        .finally(() => { if (mounted) setLoading(false) })
    } else {
      setLoading(false)
    }
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">Failed to load wine: {String(error)}</div>
  if (!wine) return <div>No wine data.</div>

  function add() { dispatch({ type: 'ADD_ITEM', payload: { wine } }) }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="w-full h-96 bg-gray-50 flex items-center justify-center rounded">
          <img src={resolveImage(wine.imageUrl) || wine.imageUrl} alt={wine.name} className="max-h-full max-w-full object-contain" />
        </div>
      </div>
      <div>
        <h1 className="font-serif text-3xl text-wine">{wine.name}</h1>
        <p className="mt-2 text-gray-700">{wine.description}</p>
        <div className="mt-4">
          <h4 className="font-semibold">Tasting Notes</h4>
          <p className="text-gray-600">{wine.tastingNotes}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Food Pairing</h4>
          <p className="text-gray-600">{wine.foodPairing}</p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="text-wine font-bold text-2xl">${wine.price}</div>
          <button onClick={add} className="bg-wine text-cream px-4 py-2 rounded">Add to Order</button>
        </div>
      </div>
    </div>
  )
}
