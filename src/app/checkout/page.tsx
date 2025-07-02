'use client'; // مهم لجعل المكون تفاعلي

import React from 'react';
import { useRouter } from 'next/navigation';

interface Cart {
  id: number;
  total: number;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [order, setOrder] = React.useState<Cart | null>(null);

  React.useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch('https://dummyjson.com/carts/1');
      const data: Cart = await res.json();
      setOrder(data);
    };
    fetchCart();
  }, []);

  const addToOrderHistory = async () => {
    if (!order) return;

    try {
      const response = await fetch('https://inconclusive-truthful-gazelle.glitch.me/orderHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discountedTotal: order.discountedTotal,
          totalProducts: order.totalProducts,
          totalQuantity: order.totalQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add order to history');
      }

      const result = await response.json();
      console.log('Order added to history:', result);
      alert('Order successfully placed!');
      router.push('/payment'); // التنقل لصفحة الدفع
    } catch (error) {
      console.error('Error adding order to history:', error);
      alert('Failed to place order.');
    }
  };

  if (!order) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
      <p className="text-gray-600 mb-2">Total Products: {order.totalProducts}</p>
      <p className="text-gray-600 mb-2">Total Quantity: {order.totalQuantity}</p>
      <p className="text-gray-600 mb-4">Amount to Pay: ${order.discountedTotal.toFixed(2)}</p>

      <button
        onClick={addToOrderHistory}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
