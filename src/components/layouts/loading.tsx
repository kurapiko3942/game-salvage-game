// src/components/ui/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/robot.gif" alt="Loading" className="w-16 h-16 mb-4" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
