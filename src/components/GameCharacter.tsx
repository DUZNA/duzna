"use client";

import React, { useState, useEffect, useMemo } from 'react';
import bodyIdle from '@/assets/body.png';
import bodyWalk from '@/assets/walk.png';
import bodyRun from '@/assets/run.png';

// Action Body Assets
import bodyBackslash from '@/assets/actions/body/backslash.png';
import bodyClimb from '@/assets/actions/body/climb.png';
import bodyCombatIdle from '@/assets/actions/body/combat_idle.png';
import bodyEmote from '@/assets/actions/body/emote.png';
import bodyHalfslash from '@/assets/actions/body/halfslash.png';
import bodyHurt from '@/assets/actions/body/hurt.png';
import bodyJump from '@/assets/actions/body/jump.png';
import bodyShoot from '@/assets/actions/body/shoot.png';
import bodySit from '@/assets/actions/body/sit.png';
import bodySlash from '@/assets/actions/body/slash.png';
import bodySpellcast from '@/assets/actions/body/spellcast.png';
import bodyThrust from '@/assets/actions/body/thrust.png';

// Action Head Assets
import headIdle from '@/assets/actions/head/idle.png';
import headWalk from '@/assets/actions/head/walk.png';
import headRun from '@/assets/actions/head/run.png';
import headBackslash from '@/assets/actions/head/backslash.png';
import headClimb from '@/assets/actions/head/climb.png';
import headCombatIdle from '@/assets/actions/head/combat_idle.png';
import headEmote from '@/assets/actions/head/emote.png';
import headHalfslash from '@/assets/actions/head/halfslash.png';
import headHurt from '@/assets/actions/head/hurt.png';
import headJump from '@/assets/actions/head/jump.png';
import headShoot from '@/assets/actions/head/shoot.png';
import headSit from '@/assets/actions/head/sit.png';
import headSlash from '@/assets/actions/head/slash.png';
import headSpellcast from '@/assets/actions/head/spellcast.png';
import headThrust from '@/assets/actions/head/thrust.png';

export type CharacterAction = 
  | 'idle' | 'walk' | 'run' | 'backslash' | 'climb' 
  | 'combat_idle' | 'emote' | 'halfslash' | 'hurt' 
  | 'jump' | 'shoot' | 'sit' | 'slash' | 'spellcast' | 'thrust';

export interface ApronSet {
  idle: string;
  walk: string;
}

interface GameCharacterProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  action?: CharacterAction;
  apron?: ApronSet | null;
  noTransition?: boolean;
  onActionComplete?: () => void;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ 
  position, 
  direction, 
  action = 'idle',
  apron,
  noTransition = false,
  onActionComplete
}) => {
  const [frame, setFrame] = useState(0);
  
  const config = useMemo(() => {
    switch (action) {
      case 'walk':
        return { body: bodyWalk, head: headWalk, frames: 9, interval: 100, loop: true };
      case 'run':
        return { body: bodyRun, head: headRun, frames: 8, interval: 80, loop: true };
      case 'backslash':
        return { body: bodyBackslash, head: headBackslash, frames: 13, interval: 60, loop: false };
      case 'climb':
        return { body: bodyClimb, head: headClimb, frames: 6, interval: 100, loop: true };
      case 'combat_idle':
        return { body: bodyCombatIdle, head: headCombatIdle, frames: 2, interval: 350, loop: true };
      case 'emote':
        return { body: bodyEmote, head: headEmote, frames: 3, interval: 180, loop: false };
      case 'halfslash':
        return { body: bodyHalfslash, head: headHalfslash, frames: 6, interval: 70, loop: false };
      case 'hurt':
        return { body: bodyHurt, head: headHurt, frames: 6, interval: 90, loop: false };
      case 'jump':
        return { body: bodyJump, head: headJump, frames: 5, interval: 90, loop: false };
      case 'shoot':
        return { body: bodyShoot, head: headShoot, frames: 13, interval: 70, loop: false };
      case 'sit':
        // Sit stays on the last frame until toggled off
        return { body: bodySit, head: headSit, frames: 3, interval: 150, loop: false, holdLastFrame: true };
      case 'slash':
        return { body: bodySlash, head: headSlash, frames: 6, interval: 70, loop: false };
      case 'spellcast':
        return { body: bodySpellcast, head: headSpellcast, frames: 7, interval: 90, loop: false };
      case 'thrust':
        return { body: bodyThrust, head: headThrust, frames: 8, interval: 70, loop: false };
      default:
        return { body: bodyIdle, head: headIdle, frames: 2, interval: 400, loop: true };
    }
  }, [action]);

  useEffect(() => {
    setFrame(0);
    const interval = setInterval(() => {
      setFrame((f) => {
        const nextFrame = f + 1;
        if (nextFrame >= config.frames) {
          if (config.loop) return 0;
          
          // If we should hold the last frame (like sitting)
          if ('holdLastFrame' in config && config.holdLastFrame) {
            clearInterval(interval);
            return f;
          }

          // Otherwise complete the action
          clearInterval(interval);
          onActionComplete?.();
          return f;
        }
        return nextFrame;
      });
    }, config.interval);

    return () => clearInterval(interval);
  }, [config, onActionComplete]);

  const getDirectionRow = () => {
    switch (direction) {
      case 'up': return 0;
      case 'left': return 1;
      case 'down': return 2;
      case 'right': return 3;
      default: return 2;
    }
  };

  // Calculate vertical offset for jump
  const getYOffset = () => {
    if (action === 'jump') {
      // 5 frames of jump: 0, 1, 2, 3, 4
      const jumpOffsets = [0, -25, -50, -25, 0];
      return jumpOffsets[frame] || 0;
    }
    return 0;
  };

  const row = getDirectionRow();
  const spriteSize = 64;
  const yOffset = getYOffset();
  
  const spriteStyle: React.CSSProperties = {
    width: `${spriteSize}px`,
    height: `${spriteSize}px`,
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y + yOffset}px`,
    transition: noTransition ? 'none' : 'left 0.1s linear, top 0.1s ease-out',
    imageRendering: 'pixelated',
    zIndex: 10,
  };

  const layerStyle = (src: string, totalFrames: number): React.CSSProperties => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${src})`,
    backgroundPosition: `-${frame * spriteSize}px -${row * spriteSize}px`,
    backgroundSize: `${spriteSize * totalFrames}px ${spriteSize * 4}px`,
  });

  return (
    <div style={spriteStyle}>
      <div style={layerStyle(config.body, config.frames)} />
      {config.head && <div style={layerStyle(config.head, config.frames)} />}
      {apron && (action === 'idle' || action === 'walk' || action === 'run') && (
        <div 
          style={{
            ...layerStyle(action === 'idle' ? apron.idle : apron.walk, action === 'idle' ? 2 : 9),
            zIndex: 11
          }} 
        />
      )}
    </div>
  );
};

export default GameCharacter;