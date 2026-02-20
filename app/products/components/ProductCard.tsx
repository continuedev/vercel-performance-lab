import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// GOOD: Dynamic import for heavy charting library
const PriceChart = dynamic(
  () => import('@/components/ui/PriceChart'),
  { ssr: false, loading: () => <div>Loading chart...</div> }
);

// GOOD: No 'use client' directive - this is a server component that renders props
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    hasPriceHistory: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {product.hasPriceHistory && (
        <Suspense fallback={<div>Loading price history...</div>}>
          <PriceChart productId={product.id} />
        </Suspense>
      )}
    </article>
  );
}
