// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import DottedBackground from '../components/DottedBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio | Isaac Vusi Hadebe',
  description: 'Frontend and Backend Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="public/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <DottedBackground pattern="dots">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </DottedBackground>
      </body>
    </html>
  );
}
