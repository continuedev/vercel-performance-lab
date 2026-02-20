import { getCurrentUser } from '@/lib/auth';
import { getAnalytics } from '@/lib/api';
import { StatsPanel } from './components/StatsPanel';
import { ActivityFeed } from './components/ActivityFeed';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const analytics = await getAnalytics(user.id);

  return (
    <main>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <StatsPanel analytics={analytics} />
        <ActivityFeed userId={user.id} />
      </div>
    </main>
  );
}
