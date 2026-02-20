const API_BASE = process.env.API_URL || 'https://api.example.com';

async function safeFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getUser(userId: string) {
  return await safeFetch(`${API_BASE}/users/${userId}`, { next: { revalidate: 60 } })
    ?? { id: userId, name: 'Lab User', email: 'user@example.com', planId: 'plan-1' };
}

export async function getPreferences(userId: string) {
  return await safeFetch(`${API_BASE}/users/${userId}/preferences`, { next: { revalidate: 60 } })
    ?? { theme: 'light', language: 'en', notifications: true };
}

export async function getNotifications(userId: string) {
  return await safeFetch(`${API_BASE}/users/${userId}/notifications`, { next: { revalidate: 30 } })
    ?? [
      { id: '1', message: 'Welcome to the performance lab' },
      { id: '2', message: 'Try opening a test PR' },
    ];
}

export async function getPlan(planId: string) {
  return await safeFetch(`${API_BASE}/plans/${planId}`, { next: { revalidate: 300 } })
    ?? { id: planId, name: 'Pro', billingId: 'billing-1' };
}

export async function getInvoices(billingId: string) {
  return await safeFetch(`${API_BASE}/billing/${billingId}/invoices`, { next: { revalidate: 300 } })
    ?? [{ id: 'inv-1', amount: 29, status: 'paid' }];
}

export async function getProducts() {
  return await safeFetch(`${API_BASE}/products`, { next: { revalidate: 120 } })
    ?? [
      { id: 'prod-1', name: 'Starter', description: 'For small teams', price: 0 },
      { id: 'prod-2', name: 'Pro', description: 'For growing teams', price: 29 },
    ];
}

export async function getProduct(id: string) {
  return await safeFetch(`${API_BASE}/products/${id}`, { next: { revalidate: 120 } })
    ?? { id, name: 'Pro', description: 'For growing teams', price: 29 };
}

export async function getAnalytics(userId: string) {
  return await safeFetch(`${API_BASE}/analytics/${userId}`, { next: { revalidate: 60 } })
    ?? { totalViews: 1240, activeUsers: 38, conversionRate: 4.2 };
}
