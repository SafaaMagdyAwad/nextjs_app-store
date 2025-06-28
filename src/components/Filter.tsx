'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  currentFilter: string;
}

export default function Filter({ currentFilter }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const filters = ["all", "beauty", "furniture", "fragrances"];

  return (
    <div className="flex gap-4 justify-center mb-4 flex-wrap">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => handleFilterChange(f)}
          className={`px-4 py-2 rounded text-black ${
            currentFilter === f
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
