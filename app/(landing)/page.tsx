// app/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl"
      >
        <div className="flex justify-center gap-6 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="p-3 bg-zinc-800 rounded-full"
          >
            <SiReact className="h-8 w-8 text-blue-400" />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="p-3 bg-zinc-800 rounded-full"
          >
            <SiNextdotjs className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="p-3 bg-zinc-800 rounded-full"
          >
            <SiTypescript className="h-8 w-8 text-blue-500" />
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Isaac Vusi Hadebe
        </motion.h1>
        
        <motion.p
          className="text-xl text-zinc-400 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Software Engineer & Creative Thinker
        </motion.p>
        
        <motion.p
          className="text-lg text-zinc-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          I build interactive experiences with modern web technologies
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 mb-12"
        >
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-medium text-white">Interactive Portfolio</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Explore my skills as draggable components that you can interact with
            </p>
          </div>
          
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-medium text-white">Detailed Skill Profiles</h3>
            <p className="text-sm text-zinc-400 mt-1">
              View in-depth information about my skills, experience, and projects
            </p>
          </div>
          
          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="font-medium text-white">Inspired by Threads</h3>
            <p className="text-sm text-zinc-400 mt-1">
              A modern interface with a focus on interaction and visual appeal
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link 
            href="/portfolio" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white font-medium transition w-full md:w-auto md:mx-auto md:px-10"
          >
            <span>Enter Portfolio</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
