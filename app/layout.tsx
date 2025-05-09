// app/layout.tsx

// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import DottedBackground from '../components/DottedBackground';
import AppleMusicEmbed from '../components/AppleMusicEmbed';
import { Analytics } from "@vercel/analytics/react"

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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script src="https://www.sitetooling.space/track.js" data-site-id="6f77ee37-f5b7-4712-b63d-afb89661ab01" async defer></script>
        <script src="https://www.sitetooling.space/track.js" data-website-id="be26c8ab-6eca-453a-995e-a1b06fcefd95" async defer></script>

        <noscript>
          <img src="https://sitetooling.space/noscript.gif?6f77ee37-f5b7-4712-b63d-afb89661ab01" alt="sitetooling.space old" />
        </noscript><noscript>
          <img src="https://sitetooling.space/noscript.gif?be26c8ab-6eca-453a-995e-a1b06fcefd95" alt="sitetooling.space new" />
        </noscript>
      </head>
      <body className={inter.className}>
        {/* Apple Music Floating Embed */}

        <AppleMusicEmbed />

        <Analytics/>
        <DottedBackground pattern="dots">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </DottedBackground>
      </body>
    </html>
  );
}
