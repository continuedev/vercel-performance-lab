import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Lab',
  description: 'Continue + Vercel performance lab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
