import Link from 'next/link';
import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default async function Page() {
  const res = await fetch('https://dummyjson.com/products/category/smartphones');
  const data = await res.json();
  const products: Product[] = data.products;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold text-center">Smartphone Products</h1>
      <p className="text-lg text-center text-gray-600">Explore our range of smartphones</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-600 font-bold text-lg mb-4">${product.price}</p>
<Link
              href={`/products/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>          </div>
        ))}
      </div>
    </div>
  );
}
