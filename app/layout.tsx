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
      </head>
      <body className={inter.className}>
        {/* Apple Music Floating Embed */}

        <script async defer src="https://sitetooling.space/track.js" data-site-id="pofs0dkge0bju6lbc40xz"></script>
        
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
