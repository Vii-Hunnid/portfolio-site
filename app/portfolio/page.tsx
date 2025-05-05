// app/portfolio/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../../components/ProfileCard';
import SkillCard from '../../components/SkillCard';
import VisitorInsights from '../../components/VisitorInsights';
import OfferingCard from '../../components/OfferingCard';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiJavascript, SiSupabase, SiFirebase, SiVuedotjs, SiSvelte, SiAstro, SiHtml5 } from 'react-icons/si';
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
  initialPosition?: { x: number, y: number };
}

export default function PortfolioPage() {
  const [hasMoved, setHasMoved] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Function to calculate responsive positions
  const calculateResponsivePosition = (defaultX: number, defaultY: number, screenWidth: number, screenHeight: number) => {
    // For very small screens (mobile)
    if (screenWidth < 640) {
      // Scale down positions to fit smaller screens
      return {
        x: (defaultX / 1920) * screenWidth,
        y: (defaultY / 1080) * screenHeight
      };
    }
    // For small screens (tablet)
    else if (screenWidth < 1024) {
      return {
        x: (defaultX / 1440) * screenWidth,
        y: (defaultY / 900) * screenHeight
      };
    }
    // For medium screens
    else if (screenWidth < 1440) {
      return {
        x: (defaultX / 1280) * screenWidth,
        y: (defaultY / 800) * screenHeight
      };
    }
    // For large screens
    else {
      return { x: defaultX, y: defaultY };
    }
  };

  // Function to create initial positions
  const createInitialPosition = (index: number, totalColumns: number, startX: number, startY: number, colWidth: number, rowHeight: number, screenWidth: number, screenHeight: number) => {
    let columns = totalColumns;
    
    // Adjust columns for smaller screens
    if (screenWidth < 640) {
      columns = 1; // Single column for mobile
    } else if (screenWidth < 1024) {
      columns = 2; // Two columns for tablet
    }
    
    const col = index % columns;
    const row = Math.floor(index / columns);
    
    const position = {
      x: startX + (col * colWidth),
      y: startY + (row * rowHeight)
    };
    
    return calculateResponsivePosition(position.x, position.y, screenWidth, screenHeight);
  };

  // Initialize window size
  useEffect(() => {
    // Set initial values
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Update canvas size
    updateCanvasSize(window.innerWidth, window.innerHeight);

    // Handle resize events
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      updateCanvasSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update canvas size based on window dimensions
  const updateCanvasSize = (width: number, height: number) => {
    // Calculate available space for the canvas - now there's no right sidebar
    const sidebarWidth = width < 768 ? 0 : width / 4; // Left sidebar
    
    const availableWidth = width - sidebarWidth;
    
    setCanvasSize({
      width: availableWidth,
      height: height
    });
  };

  // Define base values for positioning
  const baseStartX = 20;
  const baseStartY = 100;
  const baseColWidth = 260;
  const baseRowHeight = 150;
  const baseTotalColumns = 4; // Increased columns to use full width

  // Calculate responsive values
  const getResponsiveValues = () => {
    const { width, height } = windowSize;
    
    // Adjust values based on screen size
    let startX = baseStartX;
    let startY = baseStartY;
    let colWidth = baseColWidth;
    let rowHeight = baseRowHeight;
    let totalColumns = baseTotalColumns;
    
    // Mobile adjustments
    if (width < 640) {
      startX = 20;
      startY = 80;
      colWidth = width - 40;
      rowHeight = 120;
      totalColumns = 1;
    }
    // Tablet adjustments
    else if (width < 1024) {
      startX = 40;
      startY = 100;
      colWidth = (width - 120) / 2;
      rowHeight = 130;
      totalColumns = 2;
    }
    // Smaller desktop adjustments
    else if (width < 1440) {
      startX = 80;
      startY = 100;
      colWidth = 220;
      rowHeight = 140;
      totalColumns = 3;
    }
    
    // Offering column positioning - now we can use more space horizontally since GitJournal is removed
    let offeringStartX = width < 1024 
      ? startX // Stack vertically on mobile/tablet
      : startX + ((totalColumns - 2) * colWidth) + 20; // Position offerings in the last two columns
    
    return { startX, startY, colWidth, rowHeight, totalColumns, offeringStartX };
  };

  const responsiveValues = getResponsiveValues();

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
      initialPosition: createInitialPosition(0, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(1, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(2, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(3, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(4, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'vuejs',
      title: 'Vue.js',
      description: 'Experienced in Vue.js framework.',
      details: 'I have 2+ years of experience with Vue.js, building interactive web applications.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9XIAAInY1?format=jpg&name=large',
      links: [
        { name: 'ChatHub App', url: 'https://example.com/chathub' },
      ],
      icon: <SiVuedotjs className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'frontend',
      initialPosition: createInitialPosition(5, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(6, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(7, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(8, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(9, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(10, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(11, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
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
      initialPosition: createInitialPosition(12, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
  ];

  // Position offerings - now using more horizontal space
  const offerings = [
    {
      icon: <Code className="h-6 w-6 text-zinc-400" />,
      title: 'Web & App Development',
      description: 'Crafting visually appealing and user-friendly interfaces using HTML, CSS, JavaScript, TypeScript, and modern frameworks.',
      initialPosition: windowSize.width < 1024 
        ? createInitialPosition(0, responsiveValues.totalColumns, responsiveValues.startX, skills.length * responsiveValues.rowHeight + responsiveValues.startY + 50, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
        : { x: responsiveValues.offeringStartX, y: responsiveValues.startY }
    },
    {
      icon: <Database className="h-6 w-6 text-zinc-400" />,
      title: 'Database Management',
      description: 'Designing and managing databases to support business applications, ensuring data integrity and performance.',
      initialPosition: windowSize.width < 1024 
        ? createInitialPosition(1, responsiveValues.totalColumns, responsiveValues.startX, skills.length * responsiveValues.rowHeight + responsiveValues.startY + 50, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
        : { x: responsiveValues.offeringStartX, y: responsiveValues.startY + responsiveValues.rowHeight }
    },
    {
      icon: <Globe className="h-6 w-6 text-zinc-400" />,
      title: 'API Development',
      description: 'Building robust and scalable APIs using modern frameworks to enable seamless integration across platforms.',
      initialPosition: windowSize.width < 1024 
        ? createInitialPosition(2, responsiveValues.totalColumns, responsiveValues.startX, skills.length * responsiveValues.rowHeight + responsiveValues.startY + 50, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
        : { x: responsiveValues.offeringStartX, y: responsiveValues.startY + (responsiveValues.rowHeight * 2) }
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-zinc-400" />,
      title: 'E-commerce Solutions',
      description: 'Developing complex e-commerce platforms with features like invoicing, search, and user management.',
      initialPosition: windowSize.width < 1024 
        ? createInitialPosition(3, responsiveValues.totalColumns, responsiveValues.startX, skills.length * responsiveValues.rowHeight + responsiveValues.startY + 50, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
        : { x: responsiveValues.offeringStartX, y: responsiveValues.startY + (responsiveValues.rowHeight * 3) }
    },
    {
      icon: <Zap className="h-6 w-6 text-zinc-400" />,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and scalability, ensuring efficient performance across devices and user loads.',
      initialPosition: windowSize.width < 1024 
        ? createInitialPosition(4, responsiveValues.totalColumns, responsiveValues.startX, skills.length * responsiveValues.rowHeight + responsiveValues.startY + 50, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
        : { x: responsiveValues.offeringStartX, y: responsiveValues.startY + (responsiveValues.rowHeight * 4) }
    },
    {
      icon: <Brain className="h-6 w-6 text-zinc-400" />,
      title: 'Integrating AI',
      description: 'Exploring AI-powered solutions to enhance developer tools and user experiences, with a focus on innovative applications.',
      initialPosition: windowSize.width < 1024 
        ? createInitialPosition(5, responsiveValues.totalColumns, responsiveValues.startX, skills.length * responsiveValues.rowHeight + responsiveValues.startY + 50, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
        : { x: responsiveValues.offeringStartX, y: responsiveValues.startY + (responsiveValues.rowHeight * 5) }
    },
  ];

  // Effect to set initial positions
  useEffect(() => {
    if (windowSize.width === 0) return; // Skip if window size not initialized yet
    
    // Initialize positions for skills
    skills.forEach(skill => {
      // Always update initial position on resize or first load
      if (skill.initialPosition) {
        localStorage.setItem(`skill-${skill.id}-position`, JSON.stringify(skill.initialPosition));
      }
    });

    // Initialize positions for offerings
    offerings.forEach(offering => {
      // Always update initial position on resize or first load
      if (offering.initialPosition) {
        localStorage.setItem(`offering-${offering.title}-position`, JSON.stringify(offering.initialPosition));
      }
    });
    
    // Force reload of positions
    setResetKey(prev => prev + 1);
  }, [windowSize]);

  // Calculate the canvas height based on content
  const calculateCanvasHeight = () => {
    const maxSkillY = Math.max(...skills.map(skill => 
      skill.initialPosition ? skill.initialPosition.y : 0
    ));
    
    const maxOfferingY = Math.max(...offerings.map(offering => 
      offering.initialPosition ? offering.initialPosition.y : 0
    ));
    
    // Add extra space for the height of the cards
    return Math.max(maxSkillY, maxOfferingY) + 220;
  };

  const handleDragStart = () => {
    setHasMoved(true);
  };

  const handleReset = () => {
    // Clear all stored positions from localStorage
    Object.keys(localStorage).forEach(key => {
      if ((key.startsWith('skill-') || key.startsWith('offering-')) && key.endsWith('-position')) {
        localStorage.removeItem(key);
      }
    });
    
    // Reset initial positions (updated for current window size)
    skills.forEach(skill => {
      if (skill.initialPosition) {
        localStorage.setItem(`skill-${skill.id}-position`, JSON.stringify(skill.initialPosition));
      }
    });
    
    offerings.forEach(offering => {
      if (offering.initialPosition) {
        localStorage.setItem(`offering-${offering.title}-position`, JSON.stringify(offering.initialPosition));
      }
    });
    
    // Increment key to force re-render
    setResetKey(prev => prev + 1);
    
    // Reset moved state
    setHasMoved(false);
  };

  const renderContent = () => {
    // Mobile view (< 768px)
    if (windowSize.width < 768) {
      return (
        <div className="w-full p-4">
          <div className="mb-8">
            <ProfileCard />
          </div>
          
          <div className="relative" style={{ height: `${calculateCanvasHeight()}px` }}>
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
            
            {/* Canvas Guide for Mobile */}
            {!hasMoved && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-zinc-800/70 backdrop-blur-sm p-4 rounded-xl text-center max-w-xs">
                  <h2 className="text-lg font-semibold mb-1">Tap & Hold to Move</h2>
                  <p className="text-zinc-300 text-sm mb-2">Rearrange the cards to customize your view.</p>
                  <div className="flex justify-center">
                    <div className="animate-bounce flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700/50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <VisitorInsights skills={skills} />
          </div>
        </div>
      );
    }
    
    // Tablet view (768px - 1024px)
    else if (windowSize.width < 1024) {
      return (
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar */}
          <div className="w-full md:w-1/4 p-4">
            <div className="space-y-4">
              <ProfileCard />
              <VisitorInsights skills={skills} />
            </div>
          </div>
          
          {/* Center content */}
          <div className="w-full md:w-3/4 p-4">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-center">Interactive Portfolio</h1>
            </div>
            
            <div className="relative" style={{ height: `${calculateCanvasHeight()}px` }}>
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
              
              {/* Canvas Guide for Tablet */}
              {!hasMoved && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-zinc-800/70 backdrop-blur-sm p-5 rounded-xl text-center max-w-sm">
                    <h2 className="text-xl font-semibold mb-2">Interactive Canvas</h2>
                    <p className="text-zinc-300 mb-3">Drag and rearrange the cards to customize your view. Use the reset button if needed.</p>
                    <div className="flex justify-center">
                      <div className="animate-bounce flex items-center justify-center w-9 h-9 rounded-full bg-zinc-700/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    
// Desktop view (>= 1024px)
else {
  return (
    <div className="h-screen relative">
      {/* Left fixed panel */}
      <div className="fixed left-0 top-0 h-full w-1/4 p-4 overflow-y-auto">
        <div className="space-y-4">
          <ProfileCard />
          <VisitorInsights skills={skills} />
        </div>
      </div>
  
      {/* Centered main content - with proper grid positioning */}
      <div>
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center pb-4">Interactive Portfolio</h1>
          
          {/* Interactive Canvas message in the center */}
          <div className="text-center mb-8 w-full max-w-2xl mx-auto">
            <div className="bg-zinc-500/30 backdrop-blur-sm p-4 rounded-xl">
              <h2 className="text-xl font-medium text-white">Interactive Canvas</h2>
              <p className="text-blue-100">Drag and rearrange the skill and offering cards to customize your view. Use the reset button to restore the original layout.</p>
            </div>
          </div>
          
          {/* Skills and Offerings container */}
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center pb-20">
            {/* Front-end skills */}
            {skills
              .filter(skill => skill.category === 'frontend')
              .map((skill, index) => (
                <div key={`skill-grid-${skill.id}`} className="flex justify-center">
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
                </div>
              ))
            }
            
            {/* Back-end skills */}
            {skills
              .filter(skill => skill.category === 'backend')
              .map((skill, index) => (
                <div key={`skill-grid-${skill.id}`} className="flex justify-center">
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
                </div>
              ))
            }
            
            {/* Tools */}
            {skills
              .filter(skill => skill.category === 'tool')
              .map((skill, index) => (
                <div key={`skill-grid-${skill.id}`} className="flex justify-center">
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
                </div>
              ))
            }
            
            {/* Offerings */}
            {offerings.map((offering, index) => (
              <div key={`offering-grid-${offering.title}`} className="flex justify-center">
                <OfferingCard
                  key={`offering-${resetKey}-${offering.title}-${index}`}
                  title={offering.title}
                  description={offering.description}
                  icon={offering.icon}
                  onDragStart={handleDragStart}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Floating Reset Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-xl z-[1000] border border-zinc-700 hover:bg-zinc-700 transition-colors"
        onClick={handleReset}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowPathIcon className="h-6 w-6" />
      </motion.button>
      
      {/* Canvas Guide overlay - only shown initially */}
      {!hasMoved && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
          <div className="bg-zinc-800/80 backdrop-blur-md p-6 rounded-xl text-center max-w-md shadow-2xl border border-zinc-700/50">
            <h2 className="text-xl font-semibold mb-2 text-white">Interactive Canvas</h2>
            <p className="text-zinc-300 mb-4">Drag and rearrange the skill and offering cards to customize your view. Use the reset button to restore the original layout.</p>
            <div className="flex justify-center">
              <div className="animate-bounce flex items-center justify-center w-10 h-10 rounded-full bg-zinc-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  };

  // Return the component with render content
  return (
    <>
      {renderContent()}
      
      {/* Floating Reset Button - always visible in mobile/tablet layouts */}
      {windowSize.width < 1024 && (
        <motion.button
          className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-xl z-[1000] border border-zinc-700 hover:bg-zinc-700 transition-colors"
          onClick={handleReset}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowPathIcon className="h-6 w-6" />
        </motion.button>
      )}
    </>
  );
}
