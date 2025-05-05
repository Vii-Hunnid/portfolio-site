'use client'

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true);
    
    // Simulate loading time and set loaded state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Create circle configurations only on the client to avoid hydration mismatch
  const circleConfigs = useMemo(() => {
    if (!isClient) return [];
    
    return Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.2 + 0.1,
      xOffset: Math.random() * 30 - 15,
      yOffset: Math.random() * 30 - 15,
      duration: Math.random() * 5 + 10,
      delay: Math.random() * 5
    }));
  }, [isClient]);

  // Staggered container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Animated background circles - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden z-0">
          {circleConfigs.map((config, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-zinc-800/20"
              style={{
                width: config.width,
                height: config.height,
                top: config.top,
                left: config.left,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: config.scale, 
                opacity: config.opacity,
                x: [0, config.xOffset],
                y: [0, config.yOffset],
              }}
              transition={{ 
                duration: config.duration, 
                repeat: Infinity, 
                repeatType: 'reverse',
                delay: config.delay
              }}
            />
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl relative z-10"
          >
            {/* Rest of your component remains the same */}
            <motion.div 
              className="flex justify-center gap-6 mb-6"
              variants={item}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="p-3 bg-zinc-800 rounded-full cursor-pointer"
              >
                <SiReact className="h-8 w-8 text-blue-400" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: -10 }}
                className="p-3 bg-zinc-800 rounded-full cursor-pointer"
              >
                <SiNextdotjs className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="p-3 bg-zinc-800 rounded-full cursor-pointer"
              >
                <SiTypescript className="h-8 w-8 text-blue-500" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              variants={item}
            >
              Isaac Vusi Hadebe
            </motion.h1>
            
            <motion.p
              className="text-xl text-zinc-400 mb-2"
              variants={item}
            >
              Software Engineer & Creative Thinker
            </motion.p>
            
            <motion.p
              className="text-lg text-zinc-300 mb-8"
              variants={item}
            >
              I build interactive experiences with modern web technologies
            </motion.p>
            
            <motion.div
              variants={item}
              className="space-y-4 mb-12"
            >
              <motion.div 
                className="p-4 bg-zinc-900 rounded-lg"
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(39, 39, 42, 1)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <h3 className="font-medium text-white">Interactive Portfolio</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Explore my skills as draggable components that you can interact with
                </p>
              </motion.div>
              
              <motion.div 
                className="p-4 bg-zinc-900 rounded-lg"
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(39, 39, 42, 1)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <h3 className="font-medium text-white">Detailed Skill Profiles</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  View in-depth information about my skills, experience, and projects
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={item}
            >
              <Link 
                href="/portfolio" 
                className="relative group inline-block"
              >
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-70 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                {/* Inner glow for better definition */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-30 blur-sm group-hover:opacity-60 transition duration-1000"></div>
                
                {/* Button content */}
                <div className="relative flex items-center justify-center gap-2 px-8 py-4 bg-black rounded-xl text-white font-medium transition-all duration-200 group-hover:bg-zinc-900">
                  <span>Enter Portfolio</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
