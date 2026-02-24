import React from 'react'

export default function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="font-serif text-2xl text-wine">Contact</h2>
        <p className="mt-3">Phone: +251 9xx xxx xxx</p>
        <p className="mt-1">Email: orders@helenwinery.example</p>
        <div className="mt-4 bg-white p-4 rounded">
          <a href="https://maps.app.goo.gl/e6JPCu7htTa2Vbfg6" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold inline-block">Location</a>
        </div>
      </div>
      <div>
        <h2 className="font-serif text-2xl text-wine">Send us a message</h2>
        <form className="mt-4 space-y-3 bg-white p-4 rounded">
          <input placeholder="Name" className="w-full border px-3 py-2" />
          <input placeholder="Email" className="w-full border px-3 py-2" />
          <textarea placeholder="Message" className="w-full border px-3 py-2" />
          <button type="button" className="bg-wine text-cream px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  )
}
