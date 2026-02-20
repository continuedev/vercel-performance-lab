import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Performance Lab</h1>
      <nav>
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </nav>
    </main>
  );
}
