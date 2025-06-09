// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import DottedBackground from '../components/DottedBackground';
import AppleMusicEmbed from '../components/AppleMusicEmbed';
import { Analytics } from "@vercel/analytics/react"
import Image from 'next/image';

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
        <script async defer src="https://www.sitetooling.space/track.js" data-token="fe326de0-dda8-4c9d-b0e2-6089a93c5950"></script>
    
        <noscript>
          <Image 
            src="https://www.sitetooling.space/noscript.gif?fe326de0-dda8-4c9d-b0e2-6089a93c5950" 
            alt="sitetooling.space"
            width={1}
            height={1}
            style={{ display: 'none' }}
          />
        </noscript>      
        
        <script defer type="text/javascript" src="https://datapulse.app/datapulse.min.js" id="datapulse" data-endpoint="https://datapulse.app/api/v1/event" data-workspace="cmbktdnw6hewrax31005f0855"></script>
        
      </head>
      <body className={inter.className}>
        {/* Apple Music Floating Embed */}
        <AppleMusicEmbed />

        <Analytics/>
        <DottedBackground pattern="dots">
          <main>
            {children}
          </main>
        </DottedBackground>
      </body>
    </html>
  );
}
