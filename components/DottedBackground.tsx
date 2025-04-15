// app/components/DottedBackground.tsx

import React from 'react';

const DottedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-black bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px] min-h-screen">
      {children}
    </div>
  );
};

export default DottedBackground;