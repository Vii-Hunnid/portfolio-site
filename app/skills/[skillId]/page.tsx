// app/(skils)/[skillId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiJavascript, SiSupabase, SiFirebase, SiVuedotjs, SiSvelte, SiAstro, SiHtml5 } from 'react-icons/si';
import { Github } from 'lucide-react';
import { FaDatabase } from 'react-icons/fa';

interface Resource {
  title: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
}

interface Skill {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  years: number;
  resources: Resource[];
  projects: Project[];
  type: 'frontend' | 'backend' | 'tool';
}

// Skill data
const allSkills = {
  react: {
    id: 'react',
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    longDescription: `React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.`,
    icon: <SiReact className="h-6 w-6 text-blue-400" />,
    years: 3,
    resources: [
      { title: 'React Official Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
      { title: 'React GitHub Repository', url: 'https://github.com/facebook/react' },
      { title: 'React DevTools', url: 'https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi' }
    ],
    projects: [
      { title: 'E-commerce Dashboard', description: 'A responsive admin panel for an online store' },
      { title: 'Social Media App', description: 'A Twitter-like application with real-time updates' }
    ],
    type: 'frontend'
  },
  nextjs: {
    id: 'nextjs',
    title: 'Next.js',
    description: 'The React Framework for Production',
    longDescription: `Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

Next.js is used by some of the world's largest companies including Netflix, GitHub, Uber, Ticketmaster, and Starbucks to build their web applications.`,
    icon: <SiNextdotjs className="h-6 w-6 text-white" />,
    years: 2,
    resources: [
      { title: 'Next.js Documentation', url: 'https://nextjs.org/docs' },
      { title: 'Learn Next.js', url: 'https://nextjs.org/learn' },
      { title: 'Next.js GitHub Repository', url: 'https://github.com/vercel/next.js' }
    ],
    projects: [
      { title: 'Personal Portfolio', description: 'This portfolio website built with Next.js' },
      { title: 'Blog Platform', description: 'A content management system with dynamic routes' }
    ],
    type: 'frontend'
  },
  typescript: {
    id: 'typescript',
    title: 'TypeScript',
    description: 'JavaScript with syntax for types',
    longDescription: `TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor.`,
    icon: <SiTypescript className="h-6 w-6 text-blue-500" />,
    years: 3,
    resources: [
      { title: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/' },
      { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play' },
      { title: 'TypeScript Deep Dive Book', url: 'https://basarat.gitbook.io/typescript/' }
    ],
    projects: [
      { title: 'API Client Library', description: 'A strongly-typed wrapper for REST APIs' },
      { title: 'Task Management App', description: 'A complex application leveraging TypeScript interfaces' }
    ],
    type: 'frontend'
  },
  nodejs: {
    id: 'nodejs',
    title: 'Node.js',
    description: 'JavaScript runtime built on Chrome\'s V8 engine',
    longDescription: `Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser.

Node.js lets developers use JavaScript to write command line tools and for server-side scripting. The ability to run JavaScript code on the server has made it a popular choice for building scalable network applications.`,
    icon: <SiNodedotjs className="h-6 w-6 text-green-500" />,
    years: 3,
    resources: [
      { title: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
      { title: 'Node.js API Reference', url: 'https://nodejs.org/api/' },
      { title: 'npm Documentation', url: 'https://docs.npmjs.com/' }
    ],
    projects: [
      { title: 'REST API Service', description: 'A backend service for mobile and web clients' },
      { title: 'Real-time Chat Server', description: 'A WebSocket server handling thousands of connections' }
    ],
    type: 'backend'
  },
  supabase: {
    id: 'supabase',
    title: 'Supabase',
    description: 'The open source Firebase alternative',
    longDescription: `Supabase is an open source Firebase alternative. It provides all the backend services you need to build a product: a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.

Supabase combines the best open source tools to provide a Firebase-like developer experience.`,
    icon: <SiSupabase className="h-6 w-6 text-emerald-400" />,
    years: 2,
    resources: [
      { title: 'Supabase Documentation', url: 'https://supabase.io/docs' },
      { title: 'Supabase GitHub Repository', url: 'https://github.com/supabase/supabase' },
      { title: 'Supabase Community', url: 'https://discord.supabase.com/' }
    ],
    projects: [
      { title: 'Authentication System', description: 'User management with social login integration' },
      { title: 'Real-time Dashboard', description: 'Analytics dashboard with live updates' }
    ],
    type: 'backend'
  },
  firebase: {
    id: 'firebase',
    title: 'Firebase',
    description: 'Google\'s platform for app development',
    longDescription: `Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business.

Firebase provides services like authentication, databases, configuration, file storage, push messaging, analytics, and much more.`,
    icon: <SiFirebase className="h-6 w-6 text-yellow-500" />,
    years: 2,
    resources: [
      { title: 'Firebase Documentation', url: 'https://firebase.google.com/docs' },
      { title: 'Firebase Console', url: 'https://console.firebase.google.com/' },
      { title: 'Firebase GitHub Repository', url: 'https://github.com/firebase/' }
    ],
    projects: [
      { title: 'Mobile Authentication', description: 'Phone and social auth for a mobile app' },
      { title: 'Cloud Functions API', description: 'Serverless backend for a web application' }
    ],
    type: 'backend'
  },
  sql: {
    id: 'sql',
    title: 'SQL',
    description: 'Structured Query Language for databases',
    longDescription: `SQL (Structured Query Language) is a domain-specific language used for managing and manipulating relational databases.

It allows you to create, read, update, and delete database records, as well as define the structure and relationships between data tables.`,
    icon: <FaDatabase className="h-6 w-6 text-blue-400" />,
    years: 2,
    resources: [
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/' },
      { title: 'MySQL Documentation', url: 'https://dev.mysql.com/doc/' },
      { title: 'SQLite Documentation', url: 'https://www.sqlite.org/docs.html' }
    ],
    projects: [
      { title: 'Data Warehouse', description: 'Complex SQL queries for a reporting system' },
      { title: 'CRM Database', description: 'Relational database design for customer management' }
    ],
    type: 'backend'
  },
  javascript: {
    id: 'javascript',
    title: 'JavaScript',
    description: 'The programming language of the Web',
    longDescription: `JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.

While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.`,
    icon: <SiJavascript className="h-6 w-6 text-yellow-400" />,
    years: 3,
    resources: [
      { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
      { title: 'JavaScript.info', url: 'https://javascript.info/' },
      { title: 'Eloquent JavaScript Book', url: 'https://eloquentjavascript.net/' }
    ],
    projects: [
      { title: 'Interactive Web App', description: 'Client-side application with vanilla JS' },
      { title: 'Browser Extension', description: 'Chrome extension for productivity' }
    ],
    type: 'frontend'
  },
  vuejs: {
    id: 'vuejs',
    title: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    longDescription: `Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.

The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.`,
    icon: <SiVuedotjs className="h-6 w-6 text-green-400" />,
    years: 2,
    resources: [
      { title: 'Vue.js Documentation', url: 'https://vuejs.org/guide/introduction.html' },
      { title: 'Vue CLI', url: 'https://cli.vuejs.org/' },
      { title: 'Awesome Vue', url: 'https://github.com/vuejs/awesome-vue' }
    ],
    projects: [
      { title: 'Dashboard UI', description: 'Admin interface with data visualization' },
      { title: 'E-commerce Site', description: 'Online shopping platform with cart functionality' }
    ],
    type: 'frontend'
  },
  svelte: {
    id: 'svelte',
    title: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    longDescription: `Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.

Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.`,
    icon: <SiSvelte className="h-6 w-6 text-red-500" />,
    years: 1,
    resources: [
      { title: 'Svelte Documentation', url: 'https://svelte.dev/docs' },
      { title: 'Svelte Tutorial', url: 'https://svelte.dev/tutorial' },
      { title: 'Svelte Examples', url: 'https://svelte.dev/examples' }
    ],
    projects: [
      { title: 'Portfolio Site', description: 'Personal portfolio with animations' },
      { title: 'Interactive Quiz App', description: 'Educational quiz with responsive design' }
    ],
    type: 'frontend'
  },
  astro: {
    id: 'astro',
    title: 'Astro',
    description: 'The web framework for content-driven websites',
    longDescription: `Astro is a modern web framework for building fast, content-focused websites. Astro was designed for building content-rich websites. This includes most marketing sites, publishing sites, documentation sites, blogs, portfolios, and some ecommerce sites.

Astro's killer feature is that it can hydrate interactive components on demand. This is great for sites that are built mostly from static or server-rendered content with some interactive UI sprinkled throughout the page.`,
    icon: <SiAstro className="h-6 w-6 text-orange-500" />,
    years: 1,
    resources: [
      { title: 'Astro Documentation', url: 'https://docs.astro.build/' },
      { title: 'Astro Themes', url: 'https://astro.build/themes/' },
      { title: 'Astro Blog', url: 'https://astro.build/blog/' }
    ],
    projects: [
      { title: 'Documentation Site', description: 'Technical documentation with search functionality' },
      { title: 'Content Blog', description: 'High-performance content-focused blog' }
    ],
    type: 'frontend'
  },
  html: {
    id: 'html',
    title: 'HTML',
    description: 'Standard markup language for web pages',
    longDescription: `HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. HTML describes the structure of a web page semantically.

HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page.`,
    icon: <SiHtml5 className="h-6 w-6 text-orange-600" />,
    years: 5,
    resources: [
      { title: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { title: 'W3Schools HTML Tutorial', url: 'https://www.w3schools.com/html/' },
      { title: 'HTML Standard', url: 'https://html.spec.whatwg.org/' }
    ],
    projects: [
      { title: 'Responsive Landing Page', description: 'Mobile-first landing page with semantic HTML' },
      { title: 'Email Templates', description: 'HTML email templates for marketing campaigns' }
    ],
    type: 'frontend'
  },
  git: {
    id: 'git',
    title: 'Git',
    description: 'Distributed version control system',
    longDescription: `Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Git is easy to learn and has a tiny footprint with lightning fast performance. It outclasses SCM tools like Subversion, CVS, Perforce, and ClearCase with features like cheap local branching, convenient staging areas, and multiple workflows.`,
    icon: <Github className="h-6 w-6 text-gray-200" />,
    years: 4,
    resources: [
      { title: 'Git Documentation', url: 'https://git-scm.com/doc' },
      { title: 'GitHub Learning Lab', url: 'https://lab.github.com/' },
      { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' }
    ],
    projects: [
      { title: 'Open Source Contributions', description: 'Contributions to various open source projects' },
      { title: 'Git Workflow Implementation', description: 'Implementation of Git Flow for team collaboration' }
    ],
    type: 'tool'
  }
};

export default function SkillPage({ params }: { params: { skillId: string } }) {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedSkills, setRelatedSkills] = useState<Skill[]>([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const skillData = allSkills[params.skillId as keyof typeof allSkills];
    
    if (skillData) {
      setSkill(skillData as Skill);
      
      // Find related skills of the same type
      const related = Object.values(allSkills)
        .filter((s) => s.type === skillData.type && s.id !== skillData.id)
        .slice(0, 3) as Skill[];
      
      setRelatedSkills(related);
    }
    
    setLoading(false);
    
    // Record the interaction when the component mounts
    if (skillData) {
      const data = localStorage.getItem('visitor-data');
      if (data) {
        const parsedData = JSON.parse(data);
        if (!parsedData.skillInteractions[skillData.title]) {
          parsedData.skillInteractions[skillData.title] = {
            clicks: 0,
            timeSpent: 0
          };
        }
        parsedData.skillInteractions[skillData.title].clicks += 1;
        localStorage.setItem('visitor-data', JSON.stringify(parsedData));
      }
    }
  }, [params.skillId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
          <ArrowLeft size={16} />
          <span>Back to Skills</span>
        </Link>
        
        <div className="card p-12 text-center">
          <h1 className="text-xl font-semibold text-white mb-4">Skill Not Found</h1>
          <p className="text-zinc-400">
            The skill you are looking for does not exist or has been removed.
          </p>
          <Link href="/" className="mt-6 inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white font-medium transition">
            View All Skills
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
        <ArrowLeft size={16} />
        <span>Back to Skills</span>
      </Link>
      
      <div className="card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-zinc-900 rounded-xl">
            {skill.icon}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white">{skill.title}</h1>
            <div className="flex items-center gap-3 text-sm text-zinc-400 mt-1">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{skill.years}+ years experience</span>
              </div>
              <div className="px-2 py-1 bg-zinc-800 rounded-full capitalize">
                {skill.type}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-zinc-300 mb-8">
          {skill.description}
        </p>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">About</h2>
            <div className="text-zinc-300 space-y-4">
              {skill.longDescription.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skill.resources.map((resource: Resource, i: number) => (
                <a 
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition"
                >
                  <span className="text-zinc-300">{resource.title}</span>
                  <ExternalLink size={16} className="text-zinc-500" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skill.projects.map((project: Project, i: number) => (
                <div key={i} className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <h3 className="font-medium text-white">{project.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {relatedSkills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Related Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedSkills.map((relatedSkill: Skill) => (
                  <Link 
                    key={relatedSkill.id}
                    href={`/skils/${relatedSkill.id}`}
                    className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1 bg-zinc-800 rounded-lg">
                        {relatedSkill.icon}
                      </div>
                      <h3 className="font-medium text-white">{relatedSkill.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-400">{relatedSkill.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-zinc-800 mt-8">
            <div className="flex justify-end">
              <Link
                href="/"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white font-medium transition"
              >
                Back to Skills Canvas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
