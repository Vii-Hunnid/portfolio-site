// app/components/Modal.tsx

'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, MinusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface OfferingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onDragStart?: () => void;
}

const OfferingCard: React.FC<OfferingCardProps> = ({ icon, title, description, onDragStart }) => {
  const [isAttached, setIsAttached] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  if (!isAttached) return null;

  const handleDragStart = () => {
    console.log(`Drag started for ${title}`); // Debug log
    if (onDragStart) onDragStart();
  };

  return (
    <motion.div
      drag={!isPinned}
      dragMomentum={false}
      onDragStart={handleDragStart}
      className={`component-border m-4 cursor-pointer relative ${isPinned ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-start space-x-2">
        {icon}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
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
  );
};

export default OfferingCard;
