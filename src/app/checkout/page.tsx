import React from 'react'

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
      <p className="text-gray-600 mb-4">This is the checkout page.</p>
      <p className="text-gray-600 mb-4">You can proceed with your purchase here.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Proceed to Payment
      </button>
    </div>
  )
}
