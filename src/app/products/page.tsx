import Products from '@/components/Products';
import { Suspense } from 'react';


export default function Page() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-lg text-gray-600">Explore our range of products</p>
      </div>

      <Suspense fallback={<div className="text-center text-gray-500">Loading products...</div>}>
        <Products  />
      </Suspense>
    </div>
  );
}



