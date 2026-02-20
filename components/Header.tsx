import Link from 'next/link';

export function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/products">Products</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
}
