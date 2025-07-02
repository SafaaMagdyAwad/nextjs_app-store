import React from 'react'
interface Order {
  id: number;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
}
export default async function page() {
  const userHistory=await fetch('https://inconclusive-truthful-gazelle.glitch.me/orderHistory')
  const data = await userHistory.json()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <ul>
          {data.map((order: Order) => (
            <li key={order.id} className="border-b py-2">
              <h2 className="font-bold">Order ID: {order.id}</h2>
              <p>Total Products: {order.totalProducts}</p>
              <p>Total Quantity: {order.totalQuantity}</p>
              <p>Discounted Total: ${order.discountedTotal.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
     
    </div>
  )
}
