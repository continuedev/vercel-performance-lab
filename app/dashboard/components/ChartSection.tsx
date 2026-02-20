'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('recharts').then(mod => ({ default: mod.AreaChart })), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
});

interface ChartSectionProps {
  data: Array<{ date: string; value: number }>;
}

export function ChartSection({ data }: ChartSectionProps) {
  return (
    <div>
      <h2>Trends</h2>
      <div>Chart placeholder ({data.length} data points)</div>
    </div>
  );
}
