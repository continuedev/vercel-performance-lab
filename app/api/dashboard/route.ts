import { NextResponse } from 'next/server';
import { getUser, getPreferences, getNotifications } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  // BAD: These three operations are independent but awaited sequentially.
  // Each only needs userId, none depend on each other's results.
  // This creates a waterfall: ~200ms + ~200ms + ~200ms = ~600ms
  // instead of ~200ms with Promise.all()
  const user = await getUser(userId);
  const preferences = await getPreferences(userId);
  const notifications = await getNotifications(userId);

  return NextResponse.json({
    user,
    preferences,
    notifications,
  });
}
