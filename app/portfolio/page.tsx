// app/portfolio/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../../components/ProfileCard';
import SkillCard from '../../components/SkillCard';
import VisitorInsights from '../../components/VisitorInsights';
import OfferingCard from '../../components/OfferingCard';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiJavascript, SiSupabase, SiFirebase, SiVuedotjs, SiNuxtdotjs, SiSvelte, SiAstro, SiHtml5, SiVercel, SiPrisma } from 'react-icons/si';
import { Code, Database, Globe, ShoppingCart, Zap, Brain, Github } from 'lucide-react';
import { FaDatabase } from 'react-icons/fa';

interface Skill {
  id: string;
  title: string;
  description: string;
  details?: string;
  image?: string;
  links?: { name: string; url: string }[];
  icon: React.ReactNode;
  experience: string;
  category: 'frontend' | 'backend' | 'tool';
}

export default function PortfolioPage() {
  const [hasMoved, setHasMoved] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Initialize window size and client state
  useEffect(() => {
    setIsClient(true);
    
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // Function to create responsive grid positions within the main content area
  const createInitialPosition = (index: number) => {
    if (!isClient || windowSize.width === 0) return { x: 0, y: 0 };
    
    const { width } = windowSize;
    
    // Card dimensions
    const cardWidth = 240;
    const cardHeight = 140;
    const gap = 16;
    
    // Define responsive layout parameters
    let containerWidth: number;
    let columns: number;
    let startX: number;
    let startY: number;
    
    if (width >= 1024) {
      // Desktop: Calculate available width for the 80% content area
      const contentAreaWidth = width * 0.8; // 80% of screen for content
      containerWidth = contentAreaWidth - 32; // Subtract padding
      columns = Math.floor(containerWidth / (cardWidth + gap));
      columns = Math.max(2, Math.min(columns, 4));
      startX = 16;
      startY = 16;
    } else if (width >= 768) {
      // Tablet: Full width of content area
      containerWidth = width - 32;
      columns = Math.floor(containerWidth / (cardWidth + gap));
      columns = Math.max(2, Math.min(columns, 3));
      startX = 16;
      startY = 16;
    } else {
      // Mobile: Full width
      containerWidth = width - 32;
      columns = Math.floor(containerWidth / (cardWidth + gap));
      columns = Math.max(1, Math.min(columns, 2));
      startX = 16;
      startY = 16;
    }
    
    // Calculate grid position
    const col = index % columns;
    const row = Math.floor(index / columns);
    
    // Center the grid within the container
    const totalGridWidth = (columns * cardWidth) + ((columns - 1) * gap);
    const gridStartX = startX + Math.max(0, (containerWidth - totalGridWidth) / 2);
    
    const x = gridStartX + (col * (cardWidth + gap));
    const y = startY + (row * (cardHeight + gap));
    
    return { x, y };
  };

  // Define skills
  const skills: Skill[] = [
    {
      id: 'react',
      title: 'React',
      description: 'Proficient in building scalable web apps.',
      details: 'I have over 3 years of experience with React, creating dynamic and user-friendly interfaces.',
      image: 'https://pbs.twimg.com/media/GjXU4Q2XQAAk37D?format=jpg&name=large',
      links: [
        { name: 'E-commerce Platform', url: 'https://example.com/ecommerce' },
        { name: 'Chat App', url: 'https://example.com/chat' },
      ],
      icon: <SiReact className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'frontend',
    },
    {
      id: 'nextjs',
      title: 'Next.js',
      description: 'Experienced in modern React frameworks.',
      details: 'I specialize in Next.js, building performant web applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9XIAAInY1?format=jpg&name=large',
      links: [
        { name: 'Portfolio Site', url: 'https://example.com/portfolio' },
        { name: 'Blog Platform', url: 'https://example.com/blog' },
      ],
      icon: <SiNextdotjs className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'frontend',
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Proficient in building scalable web apps.',
      details: 'I have over 3 years of experience with TypeScript, building robust and type-safe applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q2XQAAk37D?format=jpg&name=large',
      links: [
        { name: 'E-commerce Platform', url: 'https://example.com/ecommerce' },
        { name: 'Chat App', url: 'https://example.com/chat' },
      ],
      icon: <SiTypescript className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'frontend',
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      description: 'Experienced in dynamic web development.',
      details: 'I have been working with JavaScript for over 5 years, creating interactive applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9WMAAnOti?format=jpg&name=large',
      links: [
        { name: 'Chat App', url: 'https://example.com/chat' },
        { name: 'Portfolio Site', url: 'https://example.com/portfolio' },
      ],
      icon: <SiJavascript className="h-6 w-6" />,
      experience: '5+ yrs',
      category: 'frontend',
    },
    {
      id: 'nuxtjs',
      title: 'Nuxt.js',
      description: 'Experienced in building performant Vue.js applications.',
      details: 'I have over 3+ years of experience using Nuxt.js to build scalable, SEO-friendly, and performant web applications.',
      image: 'https://nuxt.com/assets/home/nuxt-card.jpg',
      links: [
        { name: 'Nuxt.js Project', url: 'https://example.com/nuxtjs-project' },
      ],
      icon: <SiNuxtdotjs className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'frontend',
    },
    {
      id: 'vuejs',
      title: 'Vue.js',
      description: 'Experienced in Vue.js framework.',
      details: 'I have 4+ years of experience with Vue.js, building interactive web applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9XIAAInY1?format=jpg&name=large',
      links: [
        { name: 'ChatHub App', url: 'https://example.com/chathub' },
      ],
      icon: <SiVuedotjs className="h-6 w-6" />,
      experience: '4+ yrs',
      category: 'frontend',
    },
    {
      id: 'html',
      title: 'HTML',
      description: 'Proficient in building web structures.',
      details: 'I have over 5 years of experience with HTML, creating semantic and accessible web pages.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9WMAAnOti?format=jpg&name=large',
      links: [
        { name: 'HTML Project', url: 'https://example.com/html-project' },
      ],
      icon: <SiHtml5 className="h-6 w-6" />,
      experience: '5+ yrs',
      category: 'frontend',
    },
    {
      id: 'svelte',
      title: 'Svelte',
      description: 'Familiar with Svelte framework.',
      details: 'I have 1+ year of experience with Svelte, exploring its reactive approach to building UIs.',
      image: 'https://pbs.twimg.com/media/GjXU4Q2XQAAk37D?format=jpg&name=large',
      links: [
        { name: 'Svelte Project', url: 'https://example.com/svelte-project' },
      ],
      icon: <SiSvelte className="h-6 w-6" />,
      experience: '1+ yr',
      category: 'frontend',
    },
    {
      id: 'astro',
      title: 'Astro',
      description: 'Experienced with Astro for static site generation.',
      details: 'I have 1+ year of experience with Astro, building fast and SEO-friendly websites.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9XIAAInY1?format=jpg&name=large',
      links: [
        { name: 'Astro Portfolio', url: 'https://example.com/astro-portfolio' },
      ],
      icon: <SiAstro className="h-6 w-6" />,
      experience: '1+ yr',
      category: 'frontend',
    },
    {
      id: 'nodejs',
      title: 'Node.js',
      description: 'Experienced in server-side development.',
      details: 'I have used Node.js for over 3 years to build scalable backend services.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9XIAAInY1?format=jpg&name=large',
      links: [
        { name: 'API Service', url: 'https://example.com/api' },
      ],
      icon: <SiNodedotjs className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'backend',
    },
    {
      id: 'supabase',
      title: 'Supabase',
      description: 'Skilled in Supabase for backend and database management.',
      details: 'I have 2+ years of experience with Supabase, managing data for various applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q2XQAAk37D?format=jpg&name=large',
      links: [
        { name: 'ChatHub Backend', url: 'https://example.com/chathub' },
      ],
      icon: <SiSupabase className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'backend',
    },
    {
      id: 'firebase',
      title: 'Firebase',
      description: 'Experienced with Firebase for backend services.',
      details: 'I have 2+ years of experience with Firebase, integrating real-time databases and authentication.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9WMAAnOti?format=jpg&name=large',
      links: [
        { name: 'Firebase Project', url: 'https://example.com/firebase' },
      ],
      icon: <SiFirebase className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'backend',
    },
    {
      id: 'sql',
      title: 'SQL',
      description: 'Skilled in relational database management.',
      details: 'I have 2+ years of experience with SQL, designing and querying databases for applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q2XQAAk37D?format=jpg&name=large',
      links: [
        { name: 'Database Project', url: 'https://example.com/database' },
      ],
      icon: <FaDatabase className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'backend',
    },
    {
      id: 'prisma',
      title: 'Prisma',
      description: 'Proficient in database access with Prisma ORM.',
      details: 'I have 1+ years of experience using Prisma to manage and query databases in full-stack applications.',
      image: 'https://raw.githubusercontent.com/prisma/static-assets/main/logo/banner.png',
      links: [
        { name: 'Project using Prisma', url: 'https://example.com/prisma-project' },
      ],
      icon: <SiPrisma className="h-6 w-6" />,
      experience: '1+ yrs',
      category: 'backend',
    },
    {
      id: 'git',
      title: 'Git',
      description: 'Proficient in version control.',
      details: 'I have used Git for over 4 years to manage codebases and collaborate on projects.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9WMAAnOti?format=jpg&name=large',
      links: [
        { name: 'GitHub Profile', url: 'https://github.com/vihunnid' },
      ],
      icon: <Github className="h-6 w-6" />,
      experience: '4+ yrs',
      category: 'tool',
    },
    {
      id: 'vercel',
      title: 'Vercel',
      description: 'Expert in modern deployment workflows.',
      details: 'I have over 2+ years of experience deploying applications with Vercel.',
      image: 'https://assets.vercel.com/image/upload/v1675960505/front/vercel-og.jpg',
      links: [
        { name: 'Vercel Dashboard', url: 'https://vercel.com/dashboard' },
      ],
      icon: <SiVercel className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'tool',
    },
    {
      id: 'sevalla',
      title: 'Sevalla',
      description: 'Skilled in using Sevalla for system management.',
      details: 'I&apos;ve worked extensively with Sevalla to manage deployments and monitor system health.',
      image: 'https://via.placeholder.com/400x200?text=Sevalla',
      links: [
        { name: 'Sevalla Docs', url: 'https://example.com/sevalla-docs' },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 193 186" className="h-6 w-6">
          <path fill="#FA7216" fillRule="evenodd" d="M33.901 0c-18.225 0-33 14.775-33 33v120c0 18.225 14.775 33 33 33h126c18.226 0 33-14.775 33-33V33c0-18.225-14.774-33-33-33h-126zM116 41H73v23H51v17.721a10 10 0 003.095 7.234L73 107H51v22h22v23h43v-23h22v-17.721a10 10 0 00-3.095-7.234L116 86h22V64h-22V41zm0 23v22H83c-5.523 0-10-4.477-10-10V64h43zm0 65H73v-22h33c5.523 0 10 4.477 10 10v12z" clipRule="evenodd" />
        </svg>
      ),
      experience: '1+ yrs',
      category: 'tool',
    },
  ];

  // Define offerings
  const offerings = [
    {
      icon: <Code className="h-6 w-6 text-zinc-400" />,
      title: 'Web & App Development',
      description: 'Crafting visually appealing and user-friendly interfaces using modern frameworks.',
    },
    {
      icon: <Database className="h-6 w-6 text-zinc-400" />,
      title: 'Database Management',
      description: 'Designing and managing databases to support business applications.',
    },
    {
      icon: <Globe className="h-6 w-6 text-zinc-400" />,
      title: 'API Development',
      description: 'Building robust and scalable APIs using modern frameworks.',
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-zinc-400" />,
      title: 'E-commerce Solutions',
      description: 'Developing complex e-commerce platforms with advanced features.',
    },
    {
      icon: <Zap className="h-6 w-6 text-zinc-400" />,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and scalability.',
    },
    {
      icon: <Brain className="h-6 w-6 text-zinc-400" />,
      title: 'Integrating AI',
      description: 'Exploring AI-powered solutions to enhance user experiences.',
    },
  ];

  // Set initial positions when client loads
  useEffect(() => {
    if (!isClient || windowSize.width === 0) return;
    
    // Set initial positions for skills
    skills.forEach((skill, index) => {
      const storageKey = `skill-${skill.id}-position`;
      const storedPosition = localStorage.getItem(storageKey);
      
      if (!storedPosition) {
        const initialPosition = createInitialPosition(index);
        localStorage.setItem(storageKey, JSON.stringify(initialPosition));
      }
    });
    
    // Set initial positions for offerings
    offerings.forEach((offering, index) => {
      const storageKey = `offering-${offering.title}-position`;
      const storedPosition = localStorage.getItem(storageKey);
      
      if (!storedPosition) {
        const initialPosition = createInitialPosition(skills.length + index);
        localStorage.setItem(storageKey, JSON.stringify(initialPosition));
      }
    });
    
    setResetKey(prev => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, windowSize.width, windowSize.height]);

  const handleDragStart = () => {
    setHasMoved(true);
  };

  const handleReset = () => {
    // Clear all stored positions
    Object.keys(localStorage).forEach(key => {
      if ((key.startsWith('skill-') || key.startsWith('offering-')) && key.endsWith('-position')) {
        localStorage.removeItem(key);
      }
    });
    
    // Reset initial positions for skills
    skills.forEach((skill, index) => {
      const storageKey = `skill-${skill.id}-position`;
      const initialPosition = createInitialPosition(index);
      localStorage.setItem(storageKey, JSON.stringify(initialPosition));
    });
    
    // Reset initial positions for offerings
    offerings.forEach((offering, index) => {
      const storageKey = `offering-${offering.title}-position`;
      const initialPosition = createInitialPosition(skills.length + index);
      localStorage.setItem(storageKey, JSON.stringify(initialPosition));
    });
    
    setResetKey(prev => prev + 1);
    setHasMoved(false);
  };

  // Calculate responsive canvas height
  const calculateCanvasHeight = () => {
    if (!isClient || windowSize.width === 0) return 800;
    
    const totalItems = skills.length + offerings.length;
    const { width } = windowSize;
    
    let columns = 4;
    if (width < 768) columns = 1;
    else if (width < 1024) columns = 2;
    else if (width < 1440) columns = 3;
    
    const rows = Math.ceil(totalItems / columns);
    return Math.max(600, rows * 170 + 100);
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading portfolio...</div>
      </div>
    );
  }

  // Mobile layout (< 768px)
  if (windowSize.width < 768) {
    return (
      <div className="h-screen flex flex-col">
        {/* Top section with profile */}
        <div className="flex-none">
          <div className="p-4">
            <ProfileCard />
            <div className="mt-4">
              <VisitorInsights skills={skills} />
            </div>
          </div>
        </div>
        
        {/* Bottom section with portfolio */}
        <div className="flex-1 flex flex-col">
          <div className="flex-none p-4 border-t border-zinc-800">
            <h1 className="text-2xl font-bold text-center text-white">Interactive Portfolio</h1>
            <p className="text-center text-zinc-400 text-sm mt-1">Drag and rearrange cards to customize your view</p>
          </div>
          
          <div className="flex-1 relative overflow-auto">
            <div 
              className="absolute inset-0"
              style={{ 
                width: '100%', 
                height: `${calculateCanvasHeight()}px`
              }}
            >
              {/* Skills */}
              {skills.map((skill, index) => (
                <SkillCard
                  key={`skill-${resetKey}-${skill.id}-${index}`}
                  id={skill.id}
                  title={skill.title}
                  description={skill.description}
                  details={skill.details}
                  image={skill.image}
                  links={skill.links}
                  icon={skill.icon}
                  experience={skill.experience}
                  category={skill.category}
                  onDragStart={handleDragStart}
                />
              ))}
              
              {/* Offerings */}
              {offerings.map((offering, index) => (
                <OfferingCard
                  key={`offering-${resetKey}-${offering.title}-${index}`}
                  title={offering.title}
                  description={offering.description}
                  icon={offering.icon}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
            
            {/* Guide overlay */}
            {!hasMoved && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <div className="bg-zinc-800/90 backdrop-blur-sm p-4 rounded-xl text-center max-w-xs mx-4">
                  <h2 className="text-lg font-semibold mb-2 text-white">Interactive Canvas</h2>
                  <p className="text-zinc-300 text-sm">Drag and rearrange cards to customize your view.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Reset Button */}
        <motion.button
          className="fixed bottom-6 right-6 bg-zinc-800 text-white p-3 rounded-full shadow-xl z-50 border border-zinc-700"
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowPathIcon className="h-5 w-5" />
        </motion.button>
      </div>
    );
  }

  // Tablet layout (768px - 1024px)
  if (windowSize.width < 1024) {
    return (
      <div className="h-screen flex flex-col">
        {/* Top section with profile */}
        <div className="flex-none">
          <div className="p-4">
            <ProfileCard />
            <div className="mt-4">
              <VisitorInsights skills={skills} />
            </div>
          </div>
        </div>
        
        {/* Bottom section with portfolio */}
        <div className="flex-1 flex flex-col">
          <div className="flex-none p-4 border-t border-zinc-800">
            <h1 className="text-3xl font-bold text-center text-white">Interactive Portfolio</h1>
            <p className="text-center text-zinc-400 mt-1">Drag and rearrange cards to customize your view</p>
          </div>
          
          <div className="flex-1 relative overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{ 
                width: '100%', 
                height: `${calculateCanvasHeight()}px`,
                overflow: 'auto'
              }}
            >
              {/* Skills */}
              {skills.map((skill, index) => (
                <SkillCard
                  key={`skill-${resetKey}-${skill.id}-${index}`}
                  id={skill.id}
                  title={skill.title}
                  description={skill.description}
                  details={skill.details}
                  image={skill.image}
                  links={skill.links}
                  icon={skill.icon}
                  experience={skill.experience}
                  category={skill.category}
                  onDragStart={handleDragStart}
                />
              ))}
              
              {/* Offerings */}
              {offerings.map((offering, index) => (
                <OfferingCard
                  key={`offering-${resetKey}-${offering.title}-${index}`}
                  title={offering.title}
                  description={offering.description}
                  icon={offering.icon}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
            
            {/* Guide overlay */}
            {!hasMoved && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <div className="bg-zinc-800/90 backdrop-blur-sm p-6 rounded-xl text-center max-w-md">
                  <h2 className="text-xl font-semibold mb-2 text-white">Interactive Canvas</h2>
                  <p className="text-zinc-300">Drag and rearrange cards to customize your view.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Reset Button */}
        <motion.button
          className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-xl z-50 border border-zinc-700"
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowPathIcon className="h-6 w-6" />
        </motion.button>
      </div>
    );
  }

  // Desktop layout (>= 1024px) - 20% sidebar, 80% content
  return (
    <div className="h-screen flex">
      {/* Left Sidebar - 20% width */}
      <div className="w-1/5 flex flex-col border-r border-zinc-800">
        <div className="flex-1 overflow-y-auto p-4">
          <ProfileCard />
          <div className="mt-4">
            <VisitorInsights skills={skills} />
          </div>
        </div>
      </div>
      
      {/* Right Content Area - 80% width */}
      <div className="w-4/5 flex flex-col">
        {/* Header */}
        <div className="flex-none p-6 border-b border-zinc-800">
          <h1 className="text-3xl font-bold text-center text-white">Interactive Portfolio</h1>
          <p className="text-center text-zinc-400 mt-2">Drag and rearrange the skill and offering cards to customize your view</p>
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute inset-0 p-6"
            style={{ 
              width: '100%', 
              height: `${calculateCanvasHeight()}px`
            }}
          >
            {/* Skills */}
            {skills.map((skill, index) => (
              <SkillCard
                key={`skill-${resetKey}-${skill.id}-${index}`}
                id={skill.id}
                title={skill.title}
                description={skill.description}
                details={skill.details}
                image={skill.image}
                links={skill.links}
                icon={skill.icon}
                experience={skill.experience}
                category={skill.category}
                onDragStart={handleDragStart}
              />
            ))}
            
            {/* Offerings */}
            {offerings.map((offering, index) => (
              <OfferingCard
                key={`offering-${resetKey}-${offering.title}-${index}`}
                title={offering.title}
                description={offering.description}
                icon={offering.icon}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
          
          {/* Guide overlay */}
          {!hasMoved && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className="bg-zinc-800/90 backdrop-blur-md p-8 rounded-xl text-center max-w-lg border border-zinc-700/50">
                <h2 className="text-2xl font-semibold mb-4 text-white">Interactive Canvas</h2>
                <p className="text-zinc-300 text-lg mb-4">Drag and rearrange the skill and offering cards to customize your view. Use the reset button to restore the original layout.</p>
                <div className="flex justify-center">
                  <div className="animate-bounce flex items-center justify-center w-12 h-12 rounded-full bg-zinc-700/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Reset Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-xl z-50 border border-zinc-700 hover:bg-zinc-700 transition-colors"
        onClick={handleReset}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowPathIcon className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
