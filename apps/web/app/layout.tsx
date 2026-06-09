import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radix UI + Next.js 15',
  description:
    'Server actions, Radix UI components, shadcn/ui, Zod validation, and Framer Motion animations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </body>
    </html>
  );
}
