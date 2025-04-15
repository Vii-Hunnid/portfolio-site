// app/(skils)/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Skills() {
  const skills = [
    { id: 'typescript', title: 'TypeScript' },
    { id: 'poetry', title: 'Poetry' },
    { id: 'nextjs', title: 'Next.js' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Skills</h1>
      <div className="space-y-2">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * skills.indexOf(skill) }}
          >
            <Link href={`/skills/${skill.id}`}>
              <div className="component-border p-2 hover:bg-silver hover:text-black transition">
                {skill.title}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
