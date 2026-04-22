"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameCharacter, { ApronSet, CharacterAction } from './GameCharacter';
import CustomizationMenu from './CustomizationMenu';
import AssetPreloader from './AssetPreloader';
import { Card } from '@/components/ui/card';
import grassTile from '../assets/grass.png';

const ACTION_DURATIONS: Record<string, number> = {
  slash: 550,
  halfslash: 550,
  backslash: 550,
  thrust: 750,
  shoot: 850,
  spellcast: 800,
  jump: 800,
  emote: 700,
  hurt: 2700, // 700ms animation + 2000ms pause
  climb: 820,
};

const GamePlayground = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [action, setAction] = useState<CharacterAction>('idle');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [isCombatMode, setIsCombatMode] = useState(false);
  const [selectedApron, setSelectedApron] = useState<ApronSet | null>(null);
  const [sitLevel, setSitLevel] = useState(0); // 0: none, 1: chair, 2: ground
  
  const actionLockRef = useRef<boolean>(false);
  const currentActionRef = useRef<CharacterAction>('idle');

  const walkSpeed = 3;
  const runSpeed = 7;
  const playgroundSize = { width: window.innerWidth, height: window.innerHeight };
  const charSize = 64;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    setKeysPressed((prev) => new Set(prev).add(key));

    if (key === 'x') {
      setSitLevel((prev) => (prev + 1) % 3);
      // Break any existing action lock when toggling sit
      if (actionLockRef.current && currentActionRef.current !== 'sit') {
        actionLockRef.current = false;
      }
    }
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

  const updateAction = (newAction: CharacterAction) => {
    if (currentActionRef.current !== newAction) {
      currentActionRef.current = newAction;
      setAction(newAction);
    }
  };

  const triggerLockedAction = (newAction: CharacterAction) => {
    if (actionLockRef.current) return;
    
    updateAction(newAction);
    actionLockRef.current = true;
    
    const duration = ACTION_DURATIONS[newAction] || 500;
    setTimeout(() => {
      // Only release the lock if the action hasn't been changed/interrupted
      if (currentActionRef.current === newAction) {
        actionLockRef.current = false;
      }
    }, duration);
  };

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (keysPressed.has('j')) { triggerLockedAction('slash'); return; }
      if (keysPressed.has('k')) { triggerLockedAction('halfslash'); return; }
      if (keysPressed.has('l')) { triggerLockedAction('backslash'); return; }
      if (keysPressed.has('i')) { triggerLockedAction('thrust'); return; }
      if (keysPressed.has('o')) { triggerLockedAction('shoot'); return; }
      if (keysPressed.has('p')) { triggerLockedAction('spellcast'); return; }
      if (keysPressed.has(' ')) { triggerLockedAction('jump'); return; }
      if (keysPressed.has('e')) { triggerLockedAction('emote'); return; }
      if (keysPressed.has('h')) { triggerLockedAction('hurt'); return; }
      if (keysPressed.has('c')) { triggerLockedAction('climb'); return; }
      
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
        // Interrupt hurt or sit state when moving
        if (actionLockRef.current && currentActionRef.current === 'hurt') {
          actionLockRef.current = false;
        }
        setSitLevel(0);

        setPosition((prev) => ({
          x: Math.max(0, Math.min(playgroundSize.width - charSize, prev.x + dx)),
          y: Math.max(0, Math.min(playgroundSize.height - charSize, prev.y + dy)),
        }));
        setDirection(newDir);
        updateAction(running ? 'run' : 'walk');
        setIsCombatMode(false);
      } else {
        if (actionLockRef.current) return;

        if (sitLevel > 0) {
          updateAction('sit');
        } else if (keysPressed.has('z')) { 
          setIsCombatMode(true); 
          updateAction('combat_idle'); 
        } else if (isCombatMode) {
          updateAction('combat_idle');
        } else {
          updateAction('idle');
        }
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, direction, isCombatMode, sitLevel, playgroundSize.width, playgroundSize.height]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <AssetPreloader />
      <CustomizationMenu 
        selectedApron={selectedApron} 
        onSelectApron={setSelectedApron} 
      />

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
          <div className="flex justify-between gap-4"><span>X</span> <span className="text-stone-400">SIT (CYCLE)</span></div>
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
          pose={action === 'sit' ? (sitLevel === 1 ? 1 : 2) : undefined}
        />
      </Card>
    </div>
  );
};

export default GamePlayground;