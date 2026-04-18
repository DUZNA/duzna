"use client";

import React, { useState, useEffect, useCallback } from 'react';
import GameCharacter from './GameCharacter';
import { Card } from '@/components/ui/card';

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
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary">LPC Character Playground</h2>
        <p className="text-muted-foreground">WASD to move • Hold SHIFT to run</p>
      </div>

      <Card 
        className="relative overflow-hidden bg-emerald-50 border-4 border-emerald-200 shadow-xl"
        style={{ width: playgroundSize.width, height: playgroundSize.height }}
      >
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        <GameCharacter 
          position={position} 
          direction={direction} 
          isMoving={isMoving}
          isRunning={isRunning}
        />
      </Card>

      <div className="flex items-center gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <kbd className="px-3 py-2 bg-white border-2 rounded-lg shadow-sm font-bold">W</kbd>
          <div />
          <kbd className="px-3 py-2 bg-white border-2 rounded-lg shadow-sm font-bold">A</kbd>
          <kbd className="px-3 py-2 bg-white border-2 rounded-lg shadow-sm font-bold">S</kbd>
          <kbd className="px-3 py-2 bg-white border-2 rounded-lg shadow-sm font-bold">D</kbd>
        </div>
        <div className="flex flex-col items-center gap-2">
          <kbd className={`px-6 py-2 border-2 rounded-lg shadow-sm font-bold transition-colors ${isRunning ? 'bg-primary text-white border-primary' : 'bg-white text-black border-gray-200'}`}>SHIFT</kbd>
          <span className="text-xs text-muted-foreground font-medium">RUN</span>
        </div>
      </div>
    </div>
  );
};

export default GamePlayground;