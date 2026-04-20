"use client";

import React, { useState, useEffect, useCallback } from 'react';
import GameCharacter, { ApronSet, CharacterAction } from './GameCharacter';
import CustomizationMenu from './CustomizationMenu';
import { Card } from '@/components/ui/card';
import grassTile from '../assets/grass.png';

const GamePlayground = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [currentAction, setCurrentAction] = useState<CharacterAction>('idle');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  
  // Customization State
  const [selectedApron, setSelectedApron] = useState<ApronSet | null>(null);

  const walkSpeed = 3;
  const runSpeed = 7;
  const playgroundSize = { width: window.innerWidth, height: window.innerHeight };
  const charSize = 64;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setKeysPressed((prev) => new Set(prev).add(key));

    // Trigger one-shot actions
    if (currentAction === 'idle' || currentAction === 'walk' || currentAction === 'run') {
      if (key === ' ') setCurrentAction('jump');
      else if (key === 'f') setCurrentAction('slash');
      else if (key === 'e') setCurrentAction('emote');
      else if (key === 'q') setCurrentAction('spellcast');
      else if (key === 'r') setCurrentAction('thrust');
      else if (key === 'c') setCurrentAction('sit');
    }
  }, [currentAction]);

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
      // Don't move if performing a static action
      const staticActions: CharacterAction[] = ['jump', 'slash', 'emote', 'spellcast', 'thrust', 'sit', 'hurt'];
      if (staticActions.includes(currentAction)) return;

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
        setCurrentAction(running ? 'run' : 'walk');
      } else {
        setCurrentAction('idle');
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, direction, currentAction]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <CustomizationMenu 
        selectedApron={selectedApron} 
        onSelectApron={setSelectedApron} 
      />
      
      <Card 
        className="relative overflow-hidden border-4 border-emerald-800/20 shadow-2xl"
        style={{ width: playgroundSize.width, height: playgroundSize.height }}
      >
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
          action={currentAction}
          apron={selectedApron}
          onActionComplete={() => setCurrentAction('idle')}
        />

        {/* Controls Hint */}
        <div className="absolute bottom-6 right-6 bg-stone-900/80 text-stone-100 p-4 border-2 border-stone-100/20 backdrop-blur-sm" style={{ fontFamily: "'VT323', monospace" }}>
          <p className="text-xl mb-2 uppercase tracking-widest border-b border-stone-100/20 pb-1">Controls</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-lg opacity-80">
            <span>WASD</span> <span>Move</span>
            <span>SHIFT</span> <span>Run</span>
            <span>SPACE</span> <span>Jump</span>
            <span>F</span> <span>Slash</span>
            <span>E</span> <span>Emote</span>
            <span>Q</span> <span>Spell</span>
            <span>R</span> <span>Thrust</span>
            <span>C</span> <span>Sit</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GamePlayground;