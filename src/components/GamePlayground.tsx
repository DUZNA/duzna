"use client";

import React, { useState, useEffect, useCallback } from 'react';
import GameCharacter, { ApronSet, CharacterAction } from './GameCharacter';
import CustomizationMenu from './CustomizationMenu';
import { Card } from '@/components/ui/card';
import grassTile from '../assets/grass.png';

const GamePlayground = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [action, setAction] = useState<CharacterAction>('idle');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [isCombatMode, setIsCombatMode] = useState(false);
  
  const [selectedApron, setSelectedApron] = useState<ApronSet | null>(null);

  const walkSpeed = 3;
  const runSpeed = 7;
  const playgroundSize = { width: window.innerWidth, height: window.innerHeight };
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
      // Priority 1: Combat Actions (One-shot or held)
      if (keysPressed.has('j')) { setAction('slash'); return; }
      if (keysPressed.has('k')) { setAction('halfslash'); return; }
      if (keysPressed.has('l')) { setAction('backslash'); return; }
      if (keysPressed.has('i')) { setAction('thrust'); return; }
      if (keysPressed.has('o')) { setAction('shoot'); return; }
      if (keysPressed.has('p')) { setAction('spellcast'); return; }
      if (keysPressed.has(' ')) { setAction('jump'); return; }
      if (keysPressed.has('x')) { setAction('sit'); return; }
      if (keysPressed.has('e')) { setAction('emote'); return; }
      if (keysPressed.has('h')) { setAction('hurt'); return; }
      if (keysPressed.has('c')) { setAction('climb'); return; }
      if (keysPressed.has('z')) { setIsCombatMode(true); setAction('combat_idle'); return; }
      else if (isCombatMode && !keysPressed.has('w') && !keysPressed.has('a') && !keysPressed.has('s') && !keysPressed.has('d')) {
        setAction('combat_idle');
      }

      // Priority 2: Movement
      let dx = 0;
      let dy = 0;
      let newDir = direction;
      let moving = false;
      const running = keysPressed.has('shift');
      const currentSpeed = running ? runSpeed : walkSpeed;

      if (keysPressed.has('w') || keysPressed.has('arrowup')) { dy -= currentSpeed; newDir = 'up'; moving = true; }
      if (keysPressed.has('s') || keysPressed.has('arrowdown')) { dy += currentSpeed; newDir = 'down'; moving = true; }
      if (keysPressed.has('a') || keysPressed.has('arrowleft')) { dx -= currentSpeed; newDir = 'left'; moving = true; }
      if (keysPressed.has('d') || keysPressed.has('arrowright')) { dx += currentSpeed; newDir = 'right'; moving = true; }

      if (moving) {
        setPosition((prev) => ({
          x: Math.max(0, Math.min(playgroundSize.width - charSize, prev.x + dx)),
          y: Math.max(0, Math.min(playgroundSize.height - charSize, prev.y + dy)),
        }));
        setDirection(newDir);
        setAction(running ? 'run' : 'walk');
        setIsCombatMode(false);
      } else if (!isCombatMode) {
        setAction('idle');
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, direction, isCombatMode]);

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

      {/* Controls Overlay */}
      <div 
        className="fixed right-6 top-6 z-50 p-4 bg-stone-900/40 backdrop-blur-sm border-2 border-stone-100/20 text-stone-100 rounded-lg shadow-xl pointer-events-none"
        style={{ fontFamily: "'VT323', monospace" }}
      >
        <h3 className="text-2xl mb-2 border-b border-stone-100/20 pb-1 uppercase tracking-widest">Controls</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-lg">
          <div className="flex justify-between gap-4"><span>WASD</span> <span className="text-stone-400">MOVE</span></div>
          <div className="flex justify-between gap-4"><span>SHIFT</span> <span className="text-stone-400">RUN</span></div>
          <div className="flex justify-between gap-4"><span>SPACE</span> <span className="text-stone-400">JUMP</span></div>
          <div className="flex justify-between gap-4"><span>J</span> <span className="text-stone-400">SLASH</span></div>
          <div className="flex justify-between gap-4"><span>K</span> <span className="text-stone-400">HALFSLASH</span></div>
          <div className="flex justify-between gap-4"><span>L</span> <span className="text-stone-400">BACKSLASH</span></div>
          <div className="flex justify-between gap-4"><span>I</span> <span className="text-stone-400">THRUST</span></div>
          <div className="flex justify-between gap-4"><span>O</span> <span className="text-stone-400">SHOOT</span></div>
          <div className="flex justify-between gap-4"><span>P</span> <span className="text-stone-400">SPELL</span></div>
          <div className="flex justify-between gap-4"><span>E</span> <span className="text-stone-400">EMOTE</span></div>
          <div className="flex justify-between gap-4"><span>X</span> <span className="text-stone-400">SIT</span></div>
          <div className="flex justify-between gap-4"><span>C</span> <span className="text-stone-400">CLIMB</span></div>
          <div className="flex justify-between gap-4"><span>Z</span> <span className="text-stone-400">COMBAT</span></div>
          <div className="flex justify-between gap-4"><span>H</span> <span className="text-stone-400">HURT</span></div>
        </div>
      </div>
      
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
          action={action}
          apron={selectedApron}
        />
      </Card>
    </div>
  );
};

export default GamePlayground;