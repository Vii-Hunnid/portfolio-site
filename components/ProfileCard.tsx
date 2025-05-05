// components/ProfileCard.tsx
'use client'

import React, { useState } from 'react';
import Modal from './Modal';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ScanFaceIcon } from 'lucide-react';
import { Twitter, Github, Linkedin } from 'lucide-react';

const ProfileCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card p-4 mb-2">
        <div className="flex flex-col md:flex-col sm:flex-col items-center md:items-center sm:items-center gap-6">
          <div className="relative w-64 h-24 pl-8 rounded-sm overflow-hidden silver-border">
            <Image
              src="/MyEyes.jpg"
              alt="Profile"
              width={192}
              height={192}
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/96?text=Profile";
              }}
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">Isaac Vusi Hadebe</h1>
            <p className="text-zinc-400 mb-3">@viihunnid</p>
            
            <div className="text-zinc-300 mb-3">
              I&apos;m a passionate Software Engineer with a love for crafting scalable web applications, and a Poet who weaves words into complex stories. I specialize in TypeScript, Next.js, and creative writing.
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <a href="https://twitter.com/viihunnid" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/viihunnid" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/viihunnid" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition w-full md:w-auto md:mx-auto md:px-5"
          >
            <span>Edit Profile</span>
            <ScanFaceIcon size={24} />
          </button>

          <Link 
            href="/skills" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition w-full md:w-auto md:mx-auto md:px-5"
          >
            <span>See Skills & Insights</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
      >
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue="Isaac Vusi Hadebe"
              className="w-full p-2 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue="@viihunnid"
              className="w-full p-2 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
              Bio
            </label>
            <textarea
              id="bio"
              defaultValue="I'm a passionate Software Engineer with a love for crafting scalable web applications, and a Poet who weaves words into complex stories. I specialize in TypeScript, Next.js, and creative writing."
              className="w-full p-2 rounded bg-black border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition"
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ProfileCard;
