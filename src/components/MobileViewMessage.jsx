import React from "react";

const MobileViewMessage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-bg text-text">
      <div className="text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Desktop Only</h1>
        <p className="text-xl md:text-2xl">
          This website is optimized for desktop screens. Please switch to a
          desktop device for the best experience.
        </p>
      </div>
    </div>
  );
};

export default MobileViewMessage;
