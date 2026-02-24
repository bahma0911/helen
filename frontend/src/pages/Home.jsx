import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getWines } from '../services/api'
import WineCard from '../components/WineCard'
import BrandCard from '../components/BrandCard'

// Brand images (placed in frontend/image)
import acaciaImg from '../../image/Acacia-Medium-Sweet-Red.png'
import riftChardonnayImg from '../../image/Rift-Valley-Chardonnay.png'

export default function Home() {
  const [wines, setWines] = useState([])

  useEffect(() => { getWines().then(setWines).catch(() => {}) }, [])

  const featured = wines.slice(0, 4)

  return (
    <div>
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-serif text-wine">Helen Wine Shop  Ethiopian Wines</h1>
            <p className="mt-4 text-gray-700">Discover Acasia and Rift Valley selections. Premium wines, order requests via WhatsApp or email.</p>
            <Link to="/wines" className="inline-block mt-6 bg-wine text-cream px-5 py-2 rounded">Browse Wines</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-wine mb-4">Featured Wines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(w => <WineCard key={w._id} wine={w} />)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-wine mb-4">Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BrandCard brand="Acasia" image={acaciaImg} description="Classic, balanced wines." />
          <BrandCard brand="Rift Valley" image={riftChardonnayImg} description="Bold, expressive selections." />
        </div>
      </section>

      <section className="mt-12 p-6 bg-white rounded">
        <h3 className="font-serif text-xl text-wine">How ordering works</h3>
        <ol className="list-decimal list-inside mt-3 text-gray-700">
          <li>Browse wines and add to your Order list.</li>
          <li>Complete the Order Request form.</li>
          <li>We will contact you to organize delivery.</li>
        </ol>
      </section>
    </div>
  )
}
