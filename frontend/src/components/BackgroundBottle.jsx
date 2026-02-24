import React from 'react'
import bottleImg from './wine-bottle-and-glass-silhouette.png'

// Decorative background using an image file.
// Place `wine-bottle-and-glass-silhouette.png` in the frontend `public/` folder
// (frontend/public/wine-bottle-and-glass-silhouette.png) so it is served at `/<filename>`.
// The component renders a fixed, partially off-screen image on md+ screens.
export default function BackgroundBottle() {
  const src = bottleImg

  return (
    <div
      aria-hidden="true"
      // Show on all sizes (including phones). Use responsive classes for offset/height.
      className="block pointer-events-none fixed top-1/2 transform -translate-y-1/2 left-[-40px] md:left-[-60px] h-[60vh] md:h-[85vh]"
      style={{
        zIndex: -1,
        opacity: 0.40,
        filter: 'blur(1px)'
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{ height: '100%', display: 'block' }}
        draggable={false}
        loading="lazy"
      />
    </div>
  )
}
