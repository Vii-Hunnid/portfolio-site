// app/(skills)/layout.tsx
import DottedBackground from '../../components/DottedBackground';
import Link from 'next/link';
import { Home, Layers, Github, PictureInPicture  } from 'lucide-react';

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DottedBackground pattern="dots">
      <div className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm border-b border-zinc-800 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-white font-bold text-xl">Isaac.dev</Link>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white">
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link href="/portfolio" className="flex items-center gap-2 text-zinc-400 hover:text-white">
              <PictureInPicture size={18} />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>
            
            <Link href="/skills" className="flex items-center gap-2 text-zinc-400 hover:text-white">
              <Layers size={18} />
              <span className="hidden sm:inline">Skills</span>
            </Link>
            
            <a 
              href="https://Github .com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white"
            >
              <Github  size={18} />
              <span className="hidden sm:inline">Github </span>
            </a>
          </div>
        </div>
      </div>
      
      <main className="pt-8">
        {children}
      </main>
    </DottedBackground>
  );
}
