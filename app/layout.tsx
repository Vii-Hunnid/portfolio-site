// app/layout.tsx

import type { Metadata } from 'next';
import DottedBackground from '@/components/DottedBackground';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Portfolio of Izzy Yii-Hunnid',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DottedBackground>{children}</DottedBackground>
      </body>
    </html>
  );
}
