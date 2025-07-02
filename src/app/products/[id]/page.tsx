'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Props {
  params: { id: string };
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category?: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string[];
}

export default function ProductDetails({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const cartRes = await fetch('https://dummyjson.com/carts/1');
      const cartData = await cartRes.json();
      console.log('Cart before adding:', cartData);

      // 2. Add product to cart
      const res = await fetch('https://dummyjson.com/carts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          products: [{ id: Number(id), quantity: 1 }],
        }),
      });

      const result = await res.json();
      console.log('Product added:', result);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add product to cart.');
    }
  };

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      {product.category && (
        <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
      )}
      <p className="text-lg font-bold text-blue-600">${product.price}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Images</h2>
        <div className="grid grid-cols-2 gap-4">
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={product.title}
              width={500}
              height={500}
              className="object-cover rounded"
            />
          ))}
        </div>
        <button
          onClick={addToCart}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
