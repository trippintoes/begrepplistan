import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Begrepplista - Tekniska Termer och Definitioner',
  description: 'En samling av tekniska begrepp, förklaringar och källor från olika standarder och specifikationer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 