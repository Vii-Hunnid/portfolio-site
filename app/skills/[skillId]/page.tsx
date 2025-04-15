// app/(skils)/[skilid]/page.tsx

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SkillDetail({ params }: { params: { skillId: string } }) {
  const skillDetails: { [key: string]: { title: string; description: string } } = {
    typescript: {
      title: 'TypeScript',
      description: 'Proficient in building scalable web apps with TypeScript.',
    },
    poetry: {
      title: 'Poetry',
      description: 'Crafting expressive and meaningful poems.',
    },
    nextjs: {
      title: 'Next.js',
      description: 'Experienced in modern React frameworks like Next.js.',
    },
  };

  const skill = skillDetails[params.skillId];

  if (!skill) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold">{skill.title}</h1>
      <p className="mt-2">{skill.description}</p>
    </motion.div>
  );
}
