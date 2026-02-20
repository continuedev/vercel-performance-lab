import { NextResponse } from 'next/server';
import { getUser, getPlan, getInvoices } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  // GOOD: These sequential awaits are genuinely dependent.
  // Each operation needs the result of the previous one.
  // getUser returns user.planId, which getPlan needs.
  // getPlan returns plan.billingId, which getInvoices needs.
  // This CANNOT be parallelized.
  const user = await getUser(userId);
  const plan = await getPlan(user.planId);
  const invoices = await getInvoices(plan.billingId);

  return NextResponse.json({
    user: { id: user.id, name: user.name },
    plan: { id: plan.id, name: plan.name },
    invoices,
  });
}
