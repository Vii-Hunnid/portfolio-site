// components/DottedBackground.tsx
import React from 'react';

interface DottedBackgroundProps {
  children: React.ReactNode;
  pattern?: 'dots' | 'grid';
}

export default function DottedBackground({ 
  children, 
  pattern = 'dots' 
}: DottedBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (pattern) {
      case 'dots': 
        return {
          background: 'black',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        };
      default:
        return {
          background: 'black'
        };
    }
  };

  return (
    <div 
      className="min-h-screen text-white overflow-hidden"
      style={getBackgroundStyle()}
    >
      {children}
    </div>
  );
}
