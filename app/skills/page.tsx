// app/(skils)/page.tsx
'use client'

import { useState } from 'react';
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
}

export default function SkillsPage() {
  const [hasMoved, setHasMoved] = useState(false);
  const [resetKey, setResetKey] = useState(0);

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
      id: 'git',
      title: 'Git',
      description: 'Proficient in version control.',
      details: 'I have used Git for over 4 years to manage codebases and collaborate on projects.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9WMAAnOti?format=jpg&name=large',
      links: [
        { name: 'GitHub Profile', url: 'https://github.com/Vii-Hunnid' },
      ],
      icon: <Github className="h-6 w-6" />,
      experience: '4+ yrs',
      category: 'tool',
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
  ];

  // Separate skills by category
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const toolSkills = skills.filter(skill => skill.category === 'tool');

  const offerings = [
    {
      icon: <Code className="h-6 w-6 text-zinc-400" />,
      title: 'Web & App Development',
      description: 'Crafting visually appealing and user-friendly interfaces using HTML, CSS, JavaScript, TypeScript, and modern frameworks like React, Vue.js, Next.js, and Svelte.',
    },
    {
      icon: <Database className="h-6 w-6 text-zinc-400" />,
      title: 'Database Management',
      description: 'Designing and managing databases to support business applications, ensuring data integrity and performance with Supabase, Firebase, and SQL.',
    },
    {
      icon: <Globe className="h-6 w-6 text-zinc-400" />,
      title: 'API Development',
      description: 'Building robust and scalable APIs using modern frameworks to enable seamless integration across platforms.',
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-zinc-400" />,
      title: 'E-commerce Solutions',
      description: 'Developing complex e-commerce platforms with features like invoicing, search, and user management, as seen in projects like staquitize.io.',
    },
    {
      icon: <Zap className="h-6 w-6 text-zinc-400" />,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and scalability, ensuring efficient performance across devices and user loads.',
    },
    {
      icon: <Brain className="h-6 w-6 text-zinc-400" />,
      title: 'Integrating AI',
      description: 'Exploring AI-powered solutions to enhance developer tools and user experiences, with a focus on innovative applications.',
    },
  ];

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
    
    // Increment key to force re-render
    setResetKey(prev => prev + 1);
    
    // Reset moved state
    setHasMoved(false);
  };

  return (
    <div className="relative h-screen  overflow-hidden">
      {/* Left fixed panel */}
      <div className="fixed py-16 left-0 top-0 h-full w-1/5 p-4 overflow-y-auto">
        <div className="space-y-2">
          <ProfileCard />
          <VisitorInsights skills={skills} />
        </div>
      </div>
  
      {/* Centered main content (non-scrollable) */}
      <div className="absolute h-full">
        <div className="h-full p-4 flex flex-col ">
          <h1 className="text-3xl font-bold">Isaac Vusi Hadebe Portfolio</h1>
          
          {/* Draggable Skills Canvas */}
          <div className='space-x-4 gap-4'>
            {/* Frontend Skills */}
            {frontendSkills.map((skill, index) => (
              <SkillCard
                key={`skill-${resetKey}-frontend-${index}`}
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
            
            {/* Backend Skills */}
            {backendSkills.map((skill, index) => (
              <SkillCard
                key={`skill-${resetKey}-backend-${index}`}
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
            
            {/* Tool Skills */}
            {toolSkills.map((skill, index) => (
              <SkillCard
                key={`skill-${resetKey}-tool-${index}`}
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
                key={`offering-${resetKey}-${index}`}
                title={offering.title}
                description={offering.description}
                icon={offering.icon}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
      </div>
  
      {/* Floating Reset Button */}
      {hasMoved && (
        <motion.button
          className="fixed bottom-6 right-6 bg-zinc-800 text-white p-4 rounded-full shadow-xl z-[1000] border border-zinc-700 hover:bg-zinc-700 transition-colors"
          onClick={handleReset}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <ArrowPathIcon className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}

