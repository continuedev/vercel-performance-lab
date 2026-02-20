const API_BASE = process.env.API_URL || 'https://api.example.com';

export async function getUser(userId: string) {
  const res = await fetch(`${API_BASE}/users/${userId}`, { next: { revalidate: 60 } });
  return res.json();
}

export async function getPreferences(userId: string) {
  const res = await fetch(`${API_BASE}/users/${userId}/preferences`, { next: { revalidate: 60 } });
  return res.json();
}

export async function getNotifications(userId: string) {
  const res = await fetch(`${API_BASE}/users/${userId}/notifications`, { next: { revalidate: 30 } });
  return res.json();
}

export async function getPlan(planId: string) {
  const res = await fetch(`${API_BASE}/plans/${planId}`, { next: { revalidate: 300 } });
  return res.json();
}

export async function getInvoices(billingId: string) {
  const res = await fetch(`${API_BASE}/billing/${billingId}/invoices`, { next: { revalidate: 300 } });
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 120 } });
  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`, { next: { revalidate: 120 } });
  return res.json();
}

export async function getAnalytics(userId: string) {
  const res = await fetch(`${API_BASE}/analytics/${userId}`, { next: { revalidate: 60 } });
  return res.json();
}
