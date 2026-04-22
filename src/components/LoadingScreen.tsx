"use client";

import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading progress
    // In a real scenario, we'd track actual image.onload events
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950 text-stone-100" style={{ fontFamily: "'VT323', monospace" }}>
      <div className="w-full max-w-md px-8 space-y-6 text-center">
        <h1 className="text-6xl uppercase tracking-[0.2em] animate-pulse">Loading Assets</h1>
        <div className="relative">
          <Progress value={progress} className="h-4 bg-stone-800 border-2 border-stone-700 rounded-none" />
          <div className="absolute -bottom-8 left-0 right-0 text-2xl text-stone-500 uppercase tracking-widest">
            Preparing Sprites... {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;