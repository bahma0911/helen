import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Wines from './pages/Wines'
import WineDetails from './pages/WineDetails'
import Order from './pages/Order'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton'
import BackgroundBottle from './components/BackgroundBottle'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundBottle />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wines" element={<Wines />} />
          <Route path="/wine/:id" element={<WineDetails />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  )
}
