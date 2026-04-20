"use client";

import React, { useState, useEffect, useMemo } from 'react';
import bodyIdle from '@/assets/body.png';
import headIdle from '@/assets/head.png';
import bodyWalk from '@/assets/walk.png';
import bodyRun from '@/assets/run.png';
import headWalk from '@/assets/head_walk.png';
import headRun from '@/assets/head_run.png';

// Body Action Assets
import bodySlash from '@/assets/slash.png';
import bodyHalfslash from '@/assets/halfslash.png';
import bodyBackslash from '@/assets/backslash.png';
import bodyThrust from '@/assets/thrust.png';
import bodyShoot from '@/assets/shoot.png';
import bodySpellcast from '@/assets/spellcast.png';
import bodyJump from '@/assets/jump.png';
import bodySit from '@/assets/sit.png';
import bodyEmote from '@/assets/emote.png';
import bodyHurt from '@/assets/hurt.png';
import bodyClimb from '@/assets/climb.png';
import bodyCombatIdle from '@/assets/combat_idle.png';

// Head Action Assets
import headSlash from '@/assets/head_slash.png';
import headHalfslash from '@/assets/head_halfslash.png';
import headBackslash from '@/assets/head_backslash.png';
import headThrust from '@/assets/head_thrust.png';
import headShoot from '@/assets/head_shoot.png';
import headSpellcast from '@/assets/head_spellcast.png';
import headJump from '@/assets/head_jump.png';
import headSit from '@/assets/head_sit.png';
import headEmote from '@/assets/head_emote.png';
import headHurt from '@/assets/head_hurt.png';
import headClimb from '@/assets/head_climb.png';
import headCombatIdle from '@/assets/head_combat_idle.png';

export interface ApronSet {
  idle: string;
  walk: string;
}

export type CharacterAction = 
  | 'idle' | 'walk' | 'run' | 'slash' | 'halfslash' 
  | 'backslash' | 'thrust' | 'shoot' | 'spellcast' 
  | 'jump' | 'sit' | 'emote' | 'hurt' | 'climb' | 'combat_idle';

interface GameCharacterProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  action: CharacterAction;
  apron?: ApronSet | null;
  noTransition?: boolean;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ 
  position, 
  direction, 
  action,
  apron,
  noTransition = false
}) => {
  const [frame, setFrame] = useState(0);
  
  const config = useMemo(() => {
    switch (action) {
      case 'walk':
        return { body: bodyWalk, head: headWalk, frames: 9, interval: 100, apron: apron?.walk };
      case 'run':
        return { body: bodyRun, head: headRun, frames: 8, interval: 80, apron: apron?.walk };
      case 'slash':
        return { body: bodySlash, head: headSlash, frames: 6, interval: 80, apron: null };
      case 'halfslash':
        return { body: bodyHalfslash, head: headHalfslash, frames: 6, interval: 80, apron: null };
      case 'backslash':
        return { body: bodyBackslash, head: headBackslash, frames: 6, interval: 80, apron: null };
      case 'thrust':
        return { body: bodyThrust, head: headThrust, frames: 8, interval: 80, apron: null };
      case 'shoot':
        return { body: bodyShoot, head: headShoot, frames: 13, interval: 60, apron: null };
      case 'spellcast':
        return { body: bodySpellcast, head: headSpellcast, frames: 7, interval: 100, apron: null };
      case 'jump':
        return { body: bodyJump, head: headJump, frames: 5, interval: 100, apron: null };
      case 'sit':
        return { body: bodySit, head: headSit, frames: 6, interval: 120, apron: null };
      case 'emote':
        return { body: bodyEmote, head: headEmote, frames: 3, interval: 200, apron: null };
      case 'hurt':
        return { body: bodyHurt, head: headHurt, frames: 6, interval: 100, apron: null };
      case 'climb':
        return { body: bodyClimb, head: headClimb, frames: 6, interval: 120, apron: null };
      case 'combat_idle':
        return { body: bodyCombatIdle, head: headCombatIdle, frames: 2, interval: 400, apron: null };
      default: // idle
        return { body: bodyIdle, head: headIdle, frames: 2, interval: 400, apron: apron?.idle };
    }
  }, [action, apron]);

  useEffect(() => {
    setFrame(0);
  }, [action]);

  useEffect(() => {
    if (config.frames <= 1) return;
    
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % config.frames);
    }, config.interval);

    return () => clearInterval(interval);
  }, [config.frames, config.interval]);

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
    transition: noTransition ? 'none' : 'left 0.1s linear, top 0.1s linear',
    imageRendering: 'pixelated',
    zIndex: 10,
  };

  const layerStyle = (src: string, totalFrames: number): React.CSSProperties => {
    const safeFrame = frame % totalFrames;
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${src})`,
      backgroundPosition: `-${safeFrame * spriteSize}px -${row * spriteSize}px`,
      backgroundSize: `${spriteSize * totalFrames}px ${spriteSize * 4}px`,
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <div style={spriteStyle}>
      <div style={layerStyle(config.body, config.frames)} />
      {config.head && <div style={layerStyle(config.head, config.frames)} />}
      {config.apron && (
        <div 
          style={{
            ...layerStyle(config.apron, action === 'idle' ? 2 : 9),
            zIndex: 11
          }} 
        />
      )}
    </div>
  );
};

export default GameCharacter;