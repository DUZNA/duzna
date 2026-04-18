"use client";

import React, { useState, useEffect, useMemo } from 'react';
import walkSprite from '@/assets/walk.png';
import runSprite from '@/assets/run.png';
import slashSprite from '@/assets/slash.png';
import shootSprite from '@/assets/shoot.png';
import spellcastSprite from '@/assets/spellcast.png';
import thrustSprite from '@/assets/thrust.png';
import hurtSprite from '@/assets/hurt.png';
import jumpSprite from '@/assets/jump.png';
import sitSprite from '@/assets/sit.png';
import emoteSprite from '@/assets/emote.png';
import combatIdleSprite from '@/assets/combat_idle.png';

export type CharacterAction = 
  | 'idle' | 'walk' | 'run' | 'slash' | 'shoot' 
  | 'spellcast' | 'thrust' | 'hurt' | 'jump' 
  | 'sit' | 'emote' | 'combat_idle';

interface GameCharacterProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  action: CharacterAction;
  onActionComplete?: () => void;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ position, direction, action, onActionComplete }) => {
  const [frame, setFrame] = useState(0);

  const animationConfig = useMemo(() => {
    const configs: Record<CharacterAction, { src: string; frames: number; speed: number; loop: boolean }> = {
      idle: { src: walkSprite, frames: 1, speed: 0, loop: true },
      walk: { src: walkSprite, frames: 9, speed: 100, loop: true },
      run: { src: runSprite, frames: 8, speed: 80, loop: true },
      slash: { src: slashSprite, frames: 6, speed: 80, loop: false },
      shoot: { src: shootSprite, frames: 13, speed: 60, loop: false },
      spellcast: { src: spellcastSprite, frames: 7, speed: 100, loop: false },
      thrust: { src: thrustSprite, frames: 8, speed: 80, loop: false },
      hurt: { src: hurtSprite, frames: 6, speed: 100, loop: false },
      jump: { src: jumpSprite, frames: 6, speed: 100, loop: false },
      sit: { src: sitSprite, frames: 3, speed: 200, loop: false },
      emote: { src: emoteSprite, frames: 6, speed: 120, loop: false },
      combat_idle: { src: combatIdleSprite, frames: 2, speed: 300, loop: true },
    };
    return configs[action];
  }, [action]);

  useEffect(() => {
    setFrame(0);
    if (animationConfig.speed === 0) return;

    const interval = setInterval(() => {
      setFrame((f) => {
        const nextFrame = f + 1;
        if (nextFrame >= animationConfig.frames) {
          if (animationConfig.loop) {
            return 0;
          } else {
            clearInterval(interval);
            if (onActionComplete) onActionComplete();
            return f; // Stay on last frame
          }
        }
        return nextFrame;
      });
    }, animationConfig.speed);

    return () => clearInterval(interval);
  }, [animationConfig, onActionComplete]);

  const getDirectionRow = () => {
    switch (direction) {
      case 'up': return 0;
      case 'left': return 1;
      case 'down': return 2;
      case 'right': return 3;
      default: return 2;
    }
  };

  const row = getDirectionRow();
  const spriteSize = 64;
  
  const spriteStyle: React.CSSProperties = {
    width: `${spriteSize}px`,
    height: `${spriteSize}px`,
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    transition: 'left 0.1s linear, top 0.1s linear',
    imageRendering: 'pixelated',
    zIndex: 10,
  };

  const layerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${animationConfig.src})`,
    backgroundPosition: `-${frame * spriteSize}px -${row * spriteSize}px`,
    backgroundSize: `${spriteSize * animationConfig.frames}px ${spriteSize * 4}px`,
  };

  return (
    <div style={spriteStyle}>
      <div style={layerStyle} />
    </div>
  );
};

export default GameCharacter;