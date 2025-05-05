// components/Modal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: 'frontend' | 'backend' | 'tool' | 'offering';
  icon?: React.ReactNode;
  experience?: string;
  description?: string;
  details?: string;
  image?: string;
  links?: { name: string; url: string }[];
  children?: React.ReactNode; // Add this line
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  category, 
  icon, 
  experience,
  description,
  details,
  image,
  links
}) => {
  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Get style based on category
  const getCategoryStyle = () => {
    switch(category) {
      case 'frontend':
        return 'border-blue-500';
      case 'backend':
        return 'border-green-500';
      case 'tool':
        return 'border-purple-500';
      case 'offering':
        return 'border-amber-500';
      default:
        return 'border-zinc-500';
    }
  };

  const getCategoryName = () => {
    switch(category) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'tool':
        return 'Developer Tool';
      case 'offering':
        return 'Service';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`relative w-full max-w-lg mx-4 md:mx-auto bg-zinc-900 border ${getCategoryStyle()} text-white rounded-2xl shadow-xl p-5`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                {icon && <div className="text-zinc-400 text-2xl">{icon}</div>}
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {category && <p className="text-sm text-zinc-400">{getCategoryName()}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {experience && (
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {experience}
                  </span>
                )}
                <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-zinc-300">
              {description && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-1">Description</h3>
                  <p>{description}</p>
                </div>
              )}
              
              {details && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-1">Details</h3>
                  <p>{details}</p>
                </div>
              )}
              
              {image && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-1">Preview</h3>
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <Image 
                      src={image} 
                      alt={title} 
                      layout="fill" 
                      objectFit="cover" 
                      className="hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              )}
              
              {links && links.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-1">Related Projects</h3>
                  <ul className="space-y-1">
                    {links.map((link, index) => (
                      <li key={index}>
                        <Link 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
