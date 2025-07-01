import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
interface Props {
  params: Promise<{ id: string }>;
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

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const res = await fetch(`https://dummyjson.com/products/${productId}`, {
    next: { revalidate: 10 }, 
  });
  const product: Product = await res.json();

  return {
    title: product.title,
    description: product.description,
  };
};

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id);

  const res = await fetch(`https://dummyjson.com/products/${productId}`, {
    next: { revalidate: 10 },
  });
  const product: Product = await res.json();

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
            <Image key={index} src={image} alt={product.title} width={500} height={500} className="object-cover rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
