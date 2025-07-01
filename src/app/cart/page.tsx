import Link from 'next/link';
import React from 'react';



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

export const generateMetadata = async () => {



  const res = await fetch(`https://dummyjson.com/cart`);

  const cart: Cart = await res.json();

  return {
    title: "Cart",
    description:"cart page",
  };
};

export default async function Cart() {

  const res = await fetch(`https://dummyjson.com/cart/1`);
  const cart: Cart = await res.json();

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      
      {cart.products.length > 0 && (
        <Link href="/checkout" className="text-blue-500 hover:underline">checkout</Link>
      )}
      <ul className="mt-4">
        {cart.products.map((product) => (
          <li key={product.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
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
