import React from 'react'

export default function BrandCard({ brand, image, description }) {
  return (
    <div className="border rounded overflow-hidden bg-white">
      {/* Use object-contain so the full image is visible (less zoomed-in) */}
      <div className="w-full h-44 bg-gray-50 flex items-center justify-center">
        <img src={image} alt={brand} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4">
        <h4 className="font-serif text-xl text-wine">{brand}</h4>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  )
}
