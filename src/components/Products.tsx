'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Filter from "@/components/Filter";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  images: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) =>
          p.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="px-4 py-6">
          <Filter currentFilter={filter} />
      {loading ? (
        <p className="text-center text-gray-600 mt-4">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-1">{product.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Category: {product.category}
              </p>
              <p className="text-lg font-bold mb-3">${product.price}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {product.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={product.title}
                    className="object-cover rounded"
                    width={200}
                    height={200}
                  />
                ))}
              </div>
              <Link
                href={`/products/${product.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
