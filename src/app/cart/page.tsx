'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category?: string;
}
interface Cart {
  id: number;
  products: Product[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`https://dummyjson.com/cart/1`);
      const data = await res.json();
      setCart(data);
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId: number) => {
    if (!cart) return;
    try {
      const res = await fetch(`https://dummyjson.com/carts/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: cart.products.filter((p) => p.id !== productId),
        }),
      });

      if (!res.ok) throw new Error('Failed to remove product');

      const updatedCart: Cart = await res.json();
      setCart(updatedCart);
      alert('Product removed!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.products.length > 0 && (
        <Link href="/checkout" className="text-blue-500 hover:underline">
          Checkout
        </Link>
      )}

      <ul className="mt-4">
        {cart.products.map((product) => (
          <li key={product.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(product.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove {product.title}
            </button>
          </li>
        ))}

        {cart.products.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        <p className="text-lg font-bold mt-4">Cart Summary</p>
        <p className="text-sm">Total Products: {cart.totalProducts}</p>
        <p className="text-sm">Total Quantity: {cart.totalQuantity}</p>
        <p className="text-sm">Total: ${cart.total.toFixed(2)}</p>
        <p className="text-sm">Discounted Total: ${cart.discountedTotal.toFixed(2)}</p>
      </ul>
    </div>
  );
}
