"use client";

import React, { useState, useEffect, useCallback } from 'react';
import GameCharacter, { CharacterAction } from './GameCharacter';
import { Card } from '@/components/ui/card';

const GamePlayground = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [action, setAction] = useState<CharacterAction>('idle');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

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
      // Don't move if performing a static action
      const staticActions: CharacterAction[] = ['slash', 'shoot', 'spellcast', 'thrust', 'hurt', 'sit', 'emote'];
      if (staticActions.includes(action)) return;

      let dx = 0;
      let dy = 0;
      let newDir = direction;
      let isMoving = false;

      if (keysPressed.has('w') || keysPressed.has('arrowup')) {
        dy -= 1;
        newDir = 'up';
        isMoving = true;
      }
      if (keysPressed.has('s') || keysPressed.has('arrowdown')) {
        dy += 1;
        newDir = 'down';
        isMoving = true;
      }
      if (keysPressed.has('a') || keysPressed.has('arrowleft')) {
        dx -= 1;
        newDir = 'left';
        isMoving = true;
      }
      if (keysPressed.has('d') || keysPressed.has('arrowright')) {
        dx += 1;
        newDir = 'right';
        isMoving = true;
      }

      // Action triggers
      if (keysPressed.has(' ')) setAction('slash');
      else if (keysPressed.has('r')) setAction('shoot');
      else if (keysPressed.has('f')) setAction('spellcast');
      else if (keysPressed.has('e')) setAction('emote');
      else if (keysPressed.has('q')) setAction('hurt');
      else if (keysPressed.has('c')) setAction('sit');
      else if (keysPressed.has('x')) setAction('thrust');
      else if (keysPressed.has('j')) setAction('jump');
      else if (isMoving) {
        const isRunning = keysPressed.has('shift');
        const speed = isRunning ? 8 : 4;
        setAction(isRunning ? 'run' : 'walk');
        setDirection(newDir);
        setPosition((prev) => ({
          x: Math.max(0, Math.min(playgroundSize.width - charSize, prev.x + dx * speed)),
          y: Math.max(0, Math.min(playgroundSize.height - charSize, prev.y + dy * speed)),
        }));
      } else {
        setAction('idle');
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, direction, action]);

  const resetAction = () => setAction('idle');

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary">LPC Character Playground</h2>
        <p className="text-muted-foreground">WASD: Move | Shift: Run | Space: Slash | R: Shoot | F: Spell | E: Emote | J: Jump</p>
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
          action={action}
          onActionComplete={resetAction}
        />
      </Card>

      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {['W', 'A', 'S', 'D', 'Shift', 'Space', 'R', 'F', 'E', 'J', 'Q', 'C', 'X'].map(key => (
          <kbd key={key} className={`px-3 py-2 border-2 rounded-lg shadow-sm font-bold transition-colors ${keysPressed.has(key.toLowerCase()) ? 'bg-primary text-white border-primary' : 'bg-white'}`}>
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
};

export default GamePlayground;