"use client";

import React, { useState, useEffect, useCallback } from 'react';
import GameCharacter from './GameCharacter';
import { Card } from '@/components/ui/card';
import grassTile from '../assets/grass.png';

const GamePlayground = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isMoving, setIsMoving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  const walkSpeed = 3;
  const runSpeed = 7;
  const playgroundSize = { width: 600, height: 400 };
  const charSize = 64;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setKeysPressed((prev) => new Set(prev).add(e.key.toLowerCase()));
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setKeysPressed((prev) => {
      const next = new Set(prev);
      next.delete(e.key.toLowerCase());
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      let dx = 0;
      let dy = 0;
      let newDir = direction;
      let moving = false;
      const running = keysPressed.has('shift');
      const currentSpeed = running ? runSpeed : walkSpeed;

      if (keysPressed.has('w') || keysPressed.has('arrowup')) {
        dy -= currentSpeed;
        newDir = 'up';
        moving = true;
      }
      if (keysPressed.has('s') || keysPressed.has('arrowdown')) {
        dy += currentSpeed;
        newDir = 'down';
        moving = true;
      }
      if (keysPressed.has('a') || keysPressed.has('arrowleft')) {
        dx -= currentSpeed;
        newDir = 'left';
        moving = true;
      }
      if (keysPressed.has('d') || keysPressed.has('arrowright')) {
        dx += currentSpeed;
        newDir = 'right';
        moving = true;
      }

      if (moving) {
        setPosition((prev) => ({
          x: Math.max(0, Math.min(playgroundSize.width - charSize, prev.x + dx)),
          y: Math.max(0, Math.min(playgroundSize.height - charSize, prev.y + dy)),
        }));
        setDirection(newDir);
      }
      setIsMoving(moving);
      setIsRunning(running && moving);
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, direction]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Card 
        className="relative overflow-hidden border-4 border-emerald-800/20 shadow-2xl"
        style={{ width: playgroundSize.width, height: playgroundSize.height }}
      >
        {/* Tiled grass background */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url(${grassTile})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '64px 64px',
            imageRendering: 'pixelated'
          }} 
        />
        
        <GameCharacter 
          position={position} 
          direction={direction} 
          isMoving={isMoving}
          isRunning={isRunning}
        />
      </Card>
    </div>
  );
};

export default GamePlayground;