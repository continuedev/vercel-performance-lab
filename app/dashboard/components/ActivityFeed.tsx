import { getNotifications } from '@/lib/api';

interface ActivityFeedProps {
  userId: string;
}

export async function ActivityFeed({ userId }: ActivityFeedProps) {
  const notifications = await getNotifications(userId);

  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {notifications.map((n: { id: string; message: string }) => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}
