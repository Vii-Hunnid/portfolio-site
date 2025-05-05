// components/OfferingCard.tsx
'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface OfferingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onDragStart: () => void;
}

const OfferingCard: React.FC<OfferingCardProps> = ({
  title,
  description,
  icon,
  onDragStart,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get stored position from localStorage
  useEffect(() => {
    const storedPosition = localStorage.getItem(`offering-${title}-position`);
    if (storedPosition) {
      try {
        setPosition(JSON.parse(storedPosition));
      } catch (error) {
        // Reset position if invalid JSON
        console.error("Error parsing stored position:", error);
        localStorage.removeItem(`offering-${title}-position`);
      }
    }
  }, [title]);

  // Save position to localStorage on drag end
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent, 
    info: PanInfo
  ) => {
    setIsDragging(false);
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    };
    
    setPosition(newPosition);
    localStorage.setItem(`offering-${title}-position`, JSON.stringify(newPosition));
  };

  return (
    <div className='flex flex-col md:flex-col sm:flex-col items-center md:items-center gap-6'>
      <motion.div
        ref={cardRef}
        className="absolute rounded-xl border border-amber-500 bg-amber-500/5 p-4 shadow-lg backdrop-blur-sm cursor-grab active:cursor-grabbing w-64"
        style={{ 
          zIndex: isExpanded ? 50 : isDragging ? 40 : 10,
          position: 'absolute'
        }}
        initial={false}
        animate={{
          x: position.x,
          y: position.y,
          scale: isExpanded ? 1.05 : isDragging ? 1.02 : 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        drag
        dragMomentum={false}
        onDragStart={() => {
          setIsDragging(true);
          onDragStart();
          setIsExpanded(false); // Close card when dragging starts
        }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-amber-400">{icon}</div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        
        <div className="relative">
          <p className={`text-sm text-zinc-400 ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {description}
          </p>
          
          {description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs mt-1 text-amber-500 hover:text-amber-400 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OfferingCard;
