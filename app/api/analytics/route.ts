import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const analytics = await query('SELECT * FROM analytics_summary');
  return NextResponse.json({ analytics });
}
