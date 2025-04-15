// app/(landing)/page.tsx
'use client'

import ProfileCard from '@/components/ProfileCard';
import SkillCard from '@/components/SkillCard';
import VisitorInsights from '@/components/VisitorInsights';
import GitJournal from '@/components/GitJournal';
import OfferingCard from '@/components/OfferingCard';
import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { CodeIcon, DatabaseIcon, GlobeIcon, ShoppingCartIcon, ZapIcon, BrainIcon, Github, Database } from 'lucide-react';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiVuedotjs, SiSvelte, SiSupabase, SiFirebase, SiAstro, SiHtml5 } from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa'; // For SQL, since SiSql is not available in react-icons

interface Skill {
  title: string;
  description: string;
  details?: string;
  image?: string;
  links?: { name: string; url: string }[];
  icon: React.ReactNode;
  experience: string;
  category: 'frontend' | 'backend' | 'tool';
}

export default function Home() {
  const [hasMoved, setHasMoved] = useState(false); // Track if any card has been moved
  const [resetKey, setResetKey] = useState(0); // Key to force re-render of SkillCards and OfferingCards

  const skills: Skill[] = [
    {
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
      title: 'Node.js',
      description: 'Experienced in server-side development.',
      details: 'I’ve used Node.js for over 3 years to build scalable backend services.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9XIAAInY1?format=jpg&name=large',
      links: [
        { name: 'API Service', url: 'https://example.com/api' },
      ],
      icon: <SiNodedotjs className="h-6 w-6" />,
      experience: '3+ yrs',
      category: 'backend',
    },
    {
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
      title: 'JavaScript',
      description: 'Experienced in dynamic web development.',
      details: 'I’ve been working with JavaScript for over 5 years, creating interactive applications.',
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
      title: 'Git',
      description: 'Proficient in version control.',
      details: 'I’ve used Git for over 4 years to manage codebases and collaborate on projects.',
      image: 'https://pbs.twimg.com/media/GjXU4Q9WMAAnOti?format=jpg&name=large',
      links: [
        { name: 'GitHub Profile', url: 'https://github.com/vihunnid' },
      ],
      icon: <Github className="h-6 w-6" />,
      experience: '4+ yrs',
      category: 'tool',
    },
    {
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

  // Separate skills by category for better display
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const toolSkills = skills.filter(skill => skill.category === 'tool');

  const offerings = [
    {
      icon: <CodeIcon className="h-8 w-8 text-silver" />,
      title: 'Web & App Development',
      description: 'Crafting visually appealing and user-friendly interfaces using HTML, CSS, JavaScript, TypeScript, and modern frameworks like React, Vue.js, Next.js, and Svelte.',
    },
    {
      icon: <DatabaseIcon className="h-8 w-8 text-silver" />,
      title: 'Database Management',
      description: 'Designing and managing databases to support business applications, ensuring data integrity and performance with Supabase, Firebase, and SQL.',
    },
    {
      icon: <GlobeIcon className="h-8 w-8 text-silver" />,
      title: 'API Development',
      description: 'Building robust and scalable APIs using modern frameworks to enable seamless integration across platforms.',
    },
    {
      icon: <ShoppingCartIcon className="h-8 w-8 text-silver" />,
      title: 'E-commerce Solutions',
      description: 'Developing complex e-commerce platforms with features like invoicing, search, and user management, as seen in projects like staquitize.io.',
    },
    {
      icon: <ZapIcon className="h-8 w-8 text-silver" />,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and scalability, ensuring efficient performance across devices and user loads.',
    },
    {
      icon: <BrainIcon className="h-8 w-8 text-silver" />,
      title: 'Integrating AI',
      description: 'Exploring AI-powered solutions to enhance developer tools and user experiences, with a focus on innovative applications.',
    },
  ];

  const handleDragStart = () => {
    console.log('Drag started, setting hasMoved to true'); // Debug log
    setHasMoved(true);
  };

  const handleReset = () => {
    console.log('Reset button clicked, resetting layout'); // Debug log
    setResetKey((prev) => prev + 1); // Increment key to force re-render
    setHasMoved(false); // Hide the reset button
  };

  return (
    <div className="flex flex-col md:flex-row p-4 relative min-h-screen">
      <div className="md:w-1/4">
        <ProfileCard />
        <VisitorInsights skills={skills} />
      </div>
      <div className="md:w-3/4 relative pr-80">
        {/* GitJournal in the top-right corner */}
        <div className="fixed top-4 right-4 w-80 z-[1000]">
          <GitJournal />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Frontend Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {frontendSkills.map((skill, index) => (
              <SkillCard
                key={`skill-${resetKey}-frontend-${index}`}
                title={skill.title}
                description={skill.description}
                details={skill.details}
                image={skill.image}
                links={skill.links}
                onDragStart={handleDragStart}
                icon={skill.icon}
                experience={skill.experience}
                category={skill.category}
              />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Backend Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {backendSkills.map((skill, index) => (
              <SkillCard
                key={`skill-${resetKey}-backend-${index}`}
                title={skill.title}
                description={skill.description}
                details={skill.details}
                image={skill.image}
                links={skill.links}
                onDragStart={handleDragStart}
                icon={skill.icon}
                experience={skill.experience}
                category={skill.category}
              />
            ))}
          </div>
        </div>

        {toolSkills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Development Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolSkills.map((skill, index) => (
                <SkillCard
                  key={`skill-${resetKey}-tool-${index}`}
                  title={skill.title}
                  description={skill.description}
                  details={skill.details}
                  image={skill.image}
                  links={skill.links}
                  onDragStart={handleDragStart}
                  icon={skill.icon}
                  experience={skill.experience}
                  category={skill.category}
                />
              ))}
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2 mt-8">What Do I Offer</h1>
        <h2 className="text-xl text-silver mb-6">Designing Solutions Customized to Meet Your Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offerings.map((offering, index) => (
            <OfferingCard
              key={`offering-${resetKey}-${index}`}
              icon={offering.icon}
              title={offering.title}
              description={offering.description}
              onDragStart={handleDragStart}
            />
          ))}
        </div>

        <p className="text-sm text-silver mt-6">
          Excited to take on new projects.{' '}
          <a href="mailto:vihunnid@icloud.com" className="text-green-400 hover:underline">
            Let's chat about your ideas. Reach out!
          </a>
        </p>
      </div>

      {/* Floating Reset Button */}
      {hasMoved && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-silver text-white p-4 rounded-full shadow-xl transition z-[1000] border border-white"
          onClick={handleReset}
          title="Reset Layout"
        >
          <ArrowPathIcon className="h-8 w-8" />
        </motion.button>
      )}
    </div>
  );
}