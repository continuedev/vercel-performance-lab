import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const users = await query('SELECT id, name, email FROM users');
  return NextResponse.json({ users });
}
