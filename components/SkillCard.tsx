// components/SkillCard.tsx
'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  details?: string;
  image?: string;
  links?: { name: string; url: string }[];
  icon: React.ReactNode;
  experience: string;
  category: 'frontend' | 'backend' | 'tool';
  onDragStart: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  title,
  description,
  details,
  image,
  links,
  icon,
  experience,
  category,
  onDragStart,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const dragDistance = useRef<number>(0);

  // Get the stored position from localStorage
  useEffect(() => {
    const storedPosition = localStorage.getItem(`skill-${id}-position`);
    if (storedPosition) {
      try {
        setPosition(JSON.parse(storedPosition));
      } catch (e) {
        // Reset position if invalid JSON
        localStorage.removeItem(`skill-${id}-position`);
      }
    }
  }, [id]);

  // Save position to localStorage on drag end
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    };
    
    // Calculate drag distance
    dragDistance.current = Math.sqrt(
      Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2)
    );
    
    setPosition(newPosition);
    localStorage.setItem(`skill-${id}-position`, JSON.stringify(newPosition));
  };

  // Handle clicks for double-click detection
  const handleClick = () => {
    if (dragDistance.current > 5) {
      // If dragged more than 5px, it's a drag, not a click
      dragDistance.current = 0;
      return;
    }
    
    if (clickTimer.current === null) {
      // First click - start timer
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        setIsOpen(!isOpen); // Toggle open/closed on single click
      }, 300); // 300ms to detect double click
    } else {
      // Double click detected
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setModalOpen(true); // Open modal on double click
    }
  };

  // Get style based on category
  const getCategoryStyle = () => {
    switch(category) {
      case 'frontend':
        return 'border-blue-500 bg-blue-500/10';
      case 'backend':
        return 'border-green-500 bg-green-500/10';
      case 'tool':
        return 'border-purple-500 bg-purple-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className='flex flex-col md:flex-col sm:flex-col items-center md:items-center sm:items-center gap-6'>
      <motion.div
        ref={cardRef}
        className={`absolute rounded-xl border p-4 shadow-lg backdrop-blur-sm ${getCategoryStyle()} cursor-grab active:cursor-grabbing w-64`}
        style={{ 
          zIndex: isOpen ? 50 : isDragging ? 40 : 10,
          position: 'absolute'
        }}
        initial={false}
        animate={{ 
          x: position.x, 
          y: position.y,
          scale: isOpen ? 1.05 : isDragging ? 1.02 : 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        drag
        dragMomentum={false}
        onDragStart={() => {
          setIsDragging(true);
          onDragStart();
          setIsOpen(false); // Close card when dragging starts
        }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="text-zinc-400">{icon}</div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">{experience}</span>
        </div>
        
        <p className="text-sm text-zinc-400 mb-2">{description}</p>
        
        {/* Create a hidden button for keyboard accessibility that opens the modal */}
        <button
          className="sr-only"
          onClick={() => setModalOpen(true)}
          aria-label={`Open details for ${title}`}
        >
          Open details
        </button>
        
        {/* Remove the show details button in favor of double click */}
        <div className="text-xs text-zinc-500 italic mt-1">Double-click to view details</div>
      </motion.div>
      
      {/* Modal component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        category={category}
        icon={icon}
        experience={experience}
        description={description}
        details={details}
        image={image}
        links={links}
      />
    </div>
  );
};

export default SkillCard;
