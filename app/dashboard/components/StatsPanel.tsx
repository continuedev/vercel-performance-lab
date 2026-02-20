interface StatsPanelProps {
  analytics: {
    totalViews: number;
    activeUsers: number;
    conversionRate: number;
  };
}

export function StatsPanel({ analytics }: StatsPanelProps) {
  return (
    <div>
      <h2>Stats</h2>
      <dl>
        <dt>Total Views</dt>
        <dd>{analytics.totalViews}</dd>
        <dt>Active Users</dt>
        <dd>{analytics.activeUsers}</dd>
        <dt>Conversion Rate</dt>
        <dd>{analytics.conversionRate}%</dd>
      </dl>
    </div>
  );
}
