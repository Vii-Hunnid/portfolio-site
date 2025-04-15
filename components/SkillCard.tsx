// app/components/SkillCard.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, MinusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import Image from 'next/image';
import { trackClick, trackTimeSpent } from '../utils/visitorTracking';

interface SkillLink {
  name: string;
  url: string;
}

interface SkillCardProps {
  title: string;
  description: string;
  details?: string;
  image?: string;
  links?: SkillLink[];
  onDragStart?: () => void;
  icon: React.ReactNode;
  experience: string;
  category: 'frontend' | 'backend' | 'tool';
}

const SkillCard: React.FC<SkillCardProps> = ({ title, description, details, image, links, onDragStart, icon, experience, category }) => {
  const [isAttached, setIsAttached] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenTime, setModalOpenTime] = useState<number | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      setModalOpenTime(Date.now());
    } else if (modalOpenTime) {
      const timeSpent = Math.floor((Date.now() - modalOpenTime) / 1000); // Time in seconds
      trackTimeSpent(title, timeSpent);
      setModalOpenTime(null);
    }
  }, [isModalOpen, modalOpenTime, title]);

  if (!isAttached) return null;

  const handleDragStart = () => {
    console.log(`Drag started for ${title}`); // Debug log
    if (onDragStart) onDragStart();
  };

  const handleDoubleClick = () => {
    trackClick(title);
    setIsModalOpen(true);
  };

  // Swapped the styles for frontend and backend
  const getCardStyles = () => {
    switch(category) {
      case 'frontend':
        return {
          background: 'bg-slate-500',
          text: 'text-black',
          subtext: 'text-black',
          detailtext: 'text-black',
          border: 'border border-silver'
        };
      case 'backend':
        return {
          background: 'bg-black',
          text: 'text-white',
          subtext: 'text-white',
          detailtext: 'text-white',
          border: 'border border-silver'
        };
      case 'tool':
        return {
          background: 'bg-gray-700',
          text: 'text-white',
          subtext: 'text-gray-300',
          detailtext: 'text-gray-400',
          border: ''
        };
      default:
        return {
          background: 'bg-gray-100',
          text: 'text-black',
          subtext: 'text-gray-700',
          detailtext: 'text-gray-600',
          border: ''
        };
    }
  };

  const styles = getCardStyles();

  return (
    <>
      <motion.div
        drag={!isPinned}
        dragMomentum={false}
        onDragStart={handleDragStart}
        className={`
          m-4 cursor-pointer relative p-4 rounded-lg 
          ${styles.background} 
          ${styles.text} 
          ${styles.border}
          ${isPinned ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
        `}
        onDoubleClick={handleDoubleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center">
          <div className={styles.text}>{icon}</div>
          <div className="ml-3">
            <h3 className={`text-lg font-semibold ${styles.text}`}>
              {title}
            </h3>
            <p className={`text-sm ${styles.subtext}`}>
              {description}
            </p>
            <p className={`text-xs mt-1 ${styles.detailtext}`}>
              {experience}
            </p>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex space-x-2">
          <button onClick={(e) => { e.stopPropagation(); setIsPinned(!isPinned); }}>
            {isPinned ? (
              <MinusCircleIcon className="h-5 w-5 text-silver" />
            ) : (
              <MapPinIcon className="h-5 w-5 text-silver" />
            )}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsAttached(false); }}>
            <XMarkIcon className="h-5 w-5 text-silver" />
          </button>
        </div>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title}>
      <div className="text-center space-y-4">
        {image && (
          <Image
            width={800}
            height={400}
            src={image}
            alt={`${title} project`}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        )}

        <p className="text-lg font-medium text-gray-200">{description}</p>

        <p className="text-sm italic text-gray-400">
          {details || 'No additional details available.'}
        </p>

        <div className="bg-neutral-800 p-4 rounded-lg shadow-sm">
          <h4 className="text-white font-semibold text-left mb-2">💡 Highlights</h4>
          <ul className="list-disc list-inside text-sm text-gray-300 text-left space-y-1">
            <li>Built using Supabase for backend & real-time database updates</li>
            <li>Handles authentication, API routes, and admin dashboard</li>
            <li>Supports dynamic analytics for multi-tenant applications</li>
          </ul>
        </div>

        {links && links.length > 0 && (
          <div className="text-left mt-6">
            <h4 className="text-lg font-semibold mb-2">🔗 Related Projects</h4>
            <ul className="space-y-1">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>

    </>
  );
};

export default SkillCard;
