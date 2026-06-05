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
  initialPosition?: { x: number, y: number };
}

export default function PortfolioPage() {
  const [hasMoved, setHasMoved] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const calculateResponsivePosition = (defaultX: number, defaultY: number, screenWidth: number, screenHeight: number) => {
    if (screenWidth < 640) {
      return {
        x: (defaultX / 1920) * screenWidth,
        y: (defaultY / 1080) * screenHeight
      };
    } else if (screenWidth < 1024) {
      return {
        x: (defaultX / 1440) * screenWidth,
        y: (defaultY / 900) * screenHeight
      };
    } else if (screenWidth < 1440) {
      return {
        x: (defaultX / 1280) * screenWidth,
        y: (defaultY / 800) * screenHeight
      };
    } else {
      return { x: defaultX, y: defaultY };
    }
  };

  const createInitialPosition = (index: number, totalColumns: number, startX: number, startY: number, colWidth: number, rowHeight: number, screenWidth: number, screenHeight: number) => {
    let columns = totalColumns;
    if (screenWidth < 640) {
      columns = 1;
    } else if (screenWidth < 1024) {
      columns = 2;
    }

    const col = index % columns;
    const row = Math.floor(index / columns);

    const position = {
      x: startX + (col * colWidth),
      y: startY + (row * rowHeight)
    };

    return calculateResponsivePosition(position.x, position.y, screenWidth, screenHeight);
  };

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const baseStartX = 20;
  const baseStartY = 100;
  const baseColWidth = 260;
  const baseRowHeight = 150;
  const baseTotalColumns = 4;

  const getResponsiveValues = () => {
    const { width } = windowSize;

    let startX = baseStartX;
    let startY = baseStartY;
    let colWidth = baseColWidth;
    let rowHeight = baseRowHeight;
    let totalColumns = baseTotalColumns;

    if (width < 640) {
      startX = 20;
      startY = 80;
      colWidth = Math.max(width - 40, 200);
      rowHeight = 120;
      totalColumns = 1;
    } else if (width < 1024) {
      startX = 40;
      startY = 100;
      colWidth = (width - 120) / 2;
      rowHeight = 130;
      totalColumns = 2;
    } else if (width < 1440) {
      startX = 80;
      startY = 100;
      colWidth = 220;
      rowHeight = 140;
      totalColumns = 3;
    }

    return { startX, startY, colWidth, rowHeight, totalColumns };
  };

  const responsiveValues = getResponsiveValues();

  const skills: Skill[] = [
    {
      id: 'react',
      title: 'React',
      description: 'Proficient in building scalable web apps.',
      details: 'I have over 3 years of experience with React, creating dynamic and user-friendly interfaces.',
      image: 'https://image.thum.io/get/width/600/https://www.isaachadebe.dev',
      links: [
        { name: 'Portfolio (isaachadebe.dev)', url: 'https://www.isaachadebe.dev' },
        { name: 'SCCA Dashboard', url: 'https://scca-black.vercel.app' },
        { name: 'Anime Finder', url: 'https://anime-finder-five.vercel.app' },
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
      details: 'I specialize in Next.js, building performant web applications with SSR, SSG, and full-stack capabilities.',
      image: 'https://image.thum.io/get/width/600/https://www.dynasty8real.estate',
      links: [
        { name: 'Portfolio (isaachadebe.dev)', url: 'https://www.isaachadebe.dev' },
        { name: 'Dynasty 8 Real Estate', url: 'https://www.dynasty8real.estate' },
        { name: 'CyberPulse', url: 'https://cyber-pulse-orpin.vercel.app' },
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
      image: 'https://image.thum.io/get/width/600/https://www.sitetooling.space',
      links: [
        { name: 'SiteTooling Space', url: 'https://www.sitetooling.space' },
        { name: 'G-nther', url: 'https://g-nther.vercel.app' },
        { name: 'Dynasty 8 Real Estate', url: 'https://www.dynasty8real.estate' },
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
      image: 'https://image.thum.io/get/width/600/https://www.gitbuy.store/',
      links: [
        { name: 'GitBuy', url: 'https://www.gitbuy.store/' },
        { name: 'Krost Events', url: 'https://www.kikevents.com' },
        { name: 'MereAutomaton', url: 'https://www.mereautomaton.club' },
      ],
      icon: <SiJavascript className="h-6 w-6" />,
      experience: '5+ yrs',
      category: 'frontend',
      initialPosition: createInitialPosition(3, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'nuxtjs',
      title: 'Nuxt.js',
      description: 'Experienced in building performant Vue.js applications with Nuxt.',
      details: 'I have over 3+ years of experience using Nuxt.js to build scalable, SEO-friendly, and performant web applications. Skilled in server-side rendering, static site generation, and module integration.',
      image: 'https://image.thum.io/get/width/600/https://www.molomonr.co.za/',
      links: [
        { name: 'Molomo NR', url: 'https://www.molomonr.co.za/' },
        { name: 'MereAutomaton', url: 'https://www.mereautomaton.club' },
      ],
      icon: <SiNuxtdotjs className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'frontend',
      initialPosition: createInitialPosition(4, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'vuejs',
      title: 'Vue.js',
      description: 'Experienced in Vue.js framework.',
      details: 'I have 4+ years of experience with Vue.js, building interactive web applications.',
      image: 'https://image.thum.io/get/width/600/https://anime-finder-five.vercel.app',
      links: [
        { name: 'Anime Finder', url: 'https://anime-finder-five.vercel.app' },
        { name: 'Molomo NR', url: 'https://www.molomonr.co.za/' },
      ],
      icon: <SiVuedotjs className="h-6 w-6" />,
      experience: '4+ yrs',
      category: 'frontend',
      initialPosition: createInitialPosition(5, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'html',
      title: 'HTML',
      description: 'Proficient in building web structures.',
      details: 'I have over 5 years of experience with HTML, creating semantic and accessible web pages.',
      image: 'https://image.thum.io/get/width/600/https://www.kikevents.com',
      links: [
        { name: 'Krost Events', url: 'https://www.kikevents.com' },
        { name: 'Portfolio Site', url: 'https://www.isaachadebe.dev' },
      ],
      icon: <SiHtml5 className="h-6 w-6" />,
      experience: '5+ yrs',
      category: 'frontend',
      initialPosition: createInitialPosition(6, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'svelte',
      title: 'Svelte',
      description: 'Familiar with Svelte framework.',
      details: 'I have 1+ year of experience with Svelte, exploring its reactive approach to building UIs.',
      image: 'https://image.thum.io/get/width/600/https://www.mereautomaton.club',
      links: [
        { name: 'MereAutomaton Club', url: 'https://www.mereautomaton.club' },
      ],
      icon: <SiSvelte className="h-6 w-6" />,
      experience: '1+ yr',
      category: 'frontend',
      initialPosition: createInitialPosition(7, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'astro',
      title: 'Astro',
      description: 'Experienced with Astro for static site generation.',
      details: 'I have 1+ year of experience with Astro, building fast and SEO-friendly websites.',
      image: 'https://image.thum.io/get/width/600/https://www.fcnd.link',
      links: [
        { name: 'Staquitize Tooly', url: 'https://www.fcnd.link' },
      ],
      icon: <SiAstro className="h-6 w-6" />,
      experience: '1+ yr',
      category: 'frontend',
      initialPosition: createInitialPosition(8, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'nodejs',
      title: 'Node.js',
      description: 'Experienced in server-side development.',
      details: 'I have used Node.js for over 3 years to build scalable backend services and APIs.',
      image: 'https://image.thum.io/get/width/600/https://g-nther.vercel.app',
      links: [
        { name: 'G-nther', url: 'https://g-nther.vercel.app' },
        { name: 'SiteTooling Space', url: 'https://www.sitetooling.space' },
      ],
      icon: <SiNodedotjs className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'backend',
      initialPosition: createInitialPosition(9, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'supabase',
      title: 'Supabase',
      description: 'Skilled in Supabase for backend and database management.',
      details: 'I have 2+ years of experience with Supabase, managing data and auth for various applications.',
      image: 'https://image.thum.io/get/width/600/https://scca-black.vercel.app',
      links: [
        { name: 'G-nther', url: 'https://g-nther.vercel.app' },
        { name: 'SCCA Dashboard', url: 'https://scca-black.vercel.app' },
      ],
      icon: <SiSupabase className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'backend',
      initialPosition: createInitialPosition(10, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'firebase',
      title: 'Firebase',
      description: 'Experienced with Firebase for backend services.',
      details: 'I have 2+ years of experience with Firebase, integrating real-time databases and authentication.',
      image: 'https://image.thum.io/get/width/600/https://www.kikevents.com',
      links: [
        { name: 'Krost Events', url: 'https://www.kikevents.com' },
        { name: 'G-nther', url: 'https://g-nther.vercel.app' },
      ],
      icon: <SiFirebase className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'backend',
      initialPosition: createInitialPosition(11, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'sql',
      title: 'SQL',
      description: 'Skilled in relational database management.',
      details: 'I have 2+ years of experience with SQL, designing and querying databases for applications.',
      image: 'https://image.thum.io/get/width/600/https://www.dynasty8real.estate',
      links: [
        { name: 'Dynasty 8 Real Estate', url: 'https://www.dynasty8real.estate' },
        { name: 'SiteTooling Space', url: 'https://www.sitetooling.space' },
      ],
      icon: <FaDatabase className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'backend',
      initialPosition: createInitialPosition(12, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'prisma',
      title: 'Prisma',
      description: 'Proficient in database access with Prisma ORM.',
      details: 'I have 1+ years of experience using Prisma to manage and query databases in full-stack applications. Skilled in schema design, migrations, and integrating with PostgreSQL, MySQL, and SQLite.',
      image: 'https://image.thum.io/get/width/600/https://cyber-pulse-orpin.vercel.app',
      links: [
        { name: 'Dynasty 8 Real Estate', url: 'https://www.dynasty8real.estate' },
        { name: 'CyberPulse', url: 'https://cyber-pulse-orpin.vercel.app' },
      ],
      icon: <SiPrisma className="h-6 w-6" />,
      experience: '1+ yrs',
      category: 'backend',
      initialPosition: createInitialPosition(13, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'git',
      title: 'Git',
      description: 'Proficient in version control.',
      details: 'I have used Git for over 4 years to manage codebases and collaborate on projects.',
      image: 'https://image.thum.io/get/width/600/https://github.com/Vii-Hunnid',
      links: [
        { name: 'GitHub Profile', url: 'https://github.com/Vii-Hunnid' },
      ],
      icon: <Github className="h-6 w-6" />,
      experience: '4+ yrs',
      category: 'tool',
      initialPosition: createInitialPosition(14, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'vercel',
      title: 'Vercel',
      description: 'Expert in modern deployment workflows.',
      details: 'I have over 2+ years of experience deploying applications with Vercel, focusing on performance, scalability, and seamless CI/CD integration. Proficient in optimizing Next.js and Nuxt.js apps for production.',
      image: 'https://image.thum.io/get/width/600/https://www.isaachadebe.dev',
      links: [
        { name: 'My Vercel Projects', url: 'https://vercel.com/vii-hunnids-projects' },
        { name: 'Portfolio Site', url: 'https://www.isaachadebe.dev' },
      ],
      icon: <SiVercel className="h-6 w-6" />,
      experience: '2+ yrs',
      category: 'tool',
      initialPosition: createInitialPosition(15, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      id: 'sevalla',
      title: 'Sevalla',
      description: 'Skilled in using Sevalla for system management.',
      details: "I've worked extensively with Sevalla to manage deployments, monitor system health, and streamline team workflows. Strong focus on stability and automation.",
      image: 'https://image.thum.io/get/width/600/https://sevalla.com',
      links: [
        { name: 'Sevalla Platform', url: 'https://sevalla.com' },
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 193 186" className="h-6 w-6">
          <path fill="#FA7216" fillRule="evenodd" d="M33.901 0c-18.225 0-33 14.775-33 33v120c0 18.225 14.775 33 33 33h126c18.226 0 33-14.775 33-33V33c0-18.225-14.774-33-33-33h-126zM116 41H73v23H51v17.721a10 10 0 003.095 7.234L73 107H51v22h22v23h43v-23h22v-17.721a10 10 0 00-3.095-7.234L116 86h22V64h-22V41zm0 23v22H83c-5.523 0-10-4.477-10-10V64h43zm0 65H73v-22h33c5.523 0 10 4.477 10 10v12z" clipRule="evenodd" />
        </svg>
      ),
      experience: '1+ yrs',
      category: 'tool',
      initialPosition: createInitialPosition(16, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
  ];

  // Offerings continue in grid after skills (indices 17–22)
  const offerings = [
    {
      icon: <Code className="h-6 w-6 text-zinc-400" />,
      title: 'Web & App Development',
      description: 'Crafting visually appealing and user-friendly interfaces using HTML, CSS, JavaScript, TypeScript, and modern frameworks.',
      initialPosition: createInitialPosition(17, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      icon: <Database className="h-6 w-6 text-zinc-400" />,
      title: 'Database Management',
      description: 'Designing and managing databases to support business applications, ensuring data integrity and performance.',
      initialPosition: createInitialPosition(18, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      icon: <Globe className="h-6 w-6 text-zinc-400" />,
      title: 'API Development',
      description: 'Building robust and scalable APIs using modern frameworks to enable seamless integration across platforms.',
      initialPosition: createInitialPosition(19, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-zinc-400" />,
      title: 'E-commerce Solutions',
      description: 'Developing complex e-commerce platforms with features like invoicing, search, and user management.',
      initialPosition: createInitialPosition(20, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      icon: <Zap className="h-6 w-6 text-zinc-400" />,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and scalability, ensuring efficient performance across devices and user loads.',
      initialPosition: createInitialPosition(21, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
    {
      icon: <Brain className="h-6 w-6 text-zinc-400" />,
      title: 'Integrating AI',
      description: 'Exploring AI-powered solutions to enhance developer tools and user experiences, with a focus on innovative applications.',
      initialPosition: createInitialPosition(22, responsiveValues.totalColumns, responsiveValues.startX, responsiveValues.startY, responsiveValues.colWidth, responsiveValues.rowHeight, windowSize.width, windowSize.height)
    },
  ];

  useEffect(() => {
    if (windowSize.width === 0) return;

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

    setResetKey(prev => prev + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const calculateCanvasHeight = () => {
    const { startY, rowHeight, totalColumns } = getResponsiveValues();
    const cols = Math.max(totalColumns, 1);
    const totalCards = skills.length + offerings.length;
    const totalRows = Math.ceil(totalCards / cols);
    return startY + (totalRows * rowHeight) + 300;
  };

  const handleDragStart = () => {
    setHasMoved(true);
  };

  const handleReset = () => {
    Object.keys(localStorage).forEach(key => {
      if ((key.startsWith('skill-') || key.startsWith('offering-')) && key.endsWith('-position')) {
        localStorage.removeItem(key);
      }
    });

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

    setResetKey(prev => prev + 1);
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

            {offerings.map((offering, index) => (
              <OfferingCard
                key={`offering-${resetKey}-${offering.title}-${index}`}
                title={offering.title}
                description={offering.description}
                icon={offering.icon}
                onDragStart={handleDragStart}
              />
            ))}

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

          <div className="my-4">
            <VisitorInsights skills={skills} />
          </div>
        </div>
      );
    }

    // Tablet view (768px - 1024px)
    else if (windowSize.width < 1024) {
      return (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 p-4">
            <div className="space-y-4">
              <ProfileCard />
              <VisitorInsights skills={skills} />
            </div>
          </div>

          <div className="w-full md:w-3/4 p-4">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-center">Interactive Portfolio</h1>
            </div>

            <div className="relative" style={{ height: `${calculateCanvasHeight()}px` }}>
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

              {offerings.map((offering, index) => (
                <OfferingCard
                  key={`offering-${resetKey}-${offering.title}-${index}`}
                  title={offering.title}
                  description={offering.description}
                  icon={offering.icon}
                  onDragStart={handleDragStart}
                />
              ))}

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
        <div className="min-h-screen relative">
          {/* Left fixed panel */}
          <div className="fixed left-0 top-0 h-full w-1/4 p-4 overflow-y-auto z-10 border-r border-zinc-800/50">
            <div className="space-y-4">
              <ProfileCard />
              <VisitorInsights skills={skills} />
            </div>
          </div>

          {/* Main content — offset past the fixed sidebar */}
          <div className="ml-[25%] p-6">
            <h1 className="text-3xl font-bold text-center pb-4">Interactive Portfolio</h1>

            <div className="text-center mb-6 w-full max-w-2xl mx-auto">
              <div className="bg-zinc-500/30 backdrop-blur-sm p-4 rounded-xl">
                <h2 className="text-xl font-medium text-white">Interactive Canvas</h2>
                <p className="text-blue-100">Drag and rearrange the skill and offering cards to customize your view. Use the reset button to restore the original layout.</p>
              </div>
            </div>

            {/* Canvas: all cards are absolutely positioned within this relative container */}
            <div
              className="relative w-full"
              style={{ height: `${calculateCanvasHeight()}px` }}
            >
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

          {/* Canvas guide — dismissed on first drag */}
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

  return (
    <>
      {renderContent()}

      {/* Floating Reset Button for mobile/tablet */}
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
