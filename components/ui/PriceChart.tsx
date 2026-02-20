'use client';

// This component legitimately needs 'use client' because it uses recharts
// and is loaded via dynamic import (correct pattern)
interface PriceChartProps {
  productId: string;
}

export default function PriceChart({ productId }: PriceChartProps) {
  return <div>Price chart for {productId}</div>;
}
