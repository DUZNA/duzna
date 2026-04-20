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
  
  // Preload all assets to prevent flickering
  useEffect(() => {
    const assets = [
      bodyIdle, headIdle, bodyWalk, bodyRun, headWalk, headRun,
      bodySlash, bodyHalfslash, bodyBackslash, bodyThrust, bodyShoot,
      bodySpellcast, bodyJump, bodySit, bodyEmote, bodyHurt, bodyClimb, bodyCombatIdle,
      headSlash, headHalfslash, headBackslash, headThrust, headShoot,
      headSpellcast, headJump, headSit, headEmote, headHurt, headClimb, headCombatIdle
    ];
    assets.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const config = useMemo(() => {
    switch (action) {
      case 'walk':
        return { 
          body: bodyWalk, bodyFrames: 9,
          head: headWalk, headFrames: 9,
          apron: apron?.walk, apronFrames: 9,
          interval: 100 
        };
      case 'run':
        return { 
          body: bodyRun, bodyFrames: 8,
          head: headRun, headFrames: 8,
          apron: apron?.walk, apronFrames: 9,
          interval: 80 
        };
      case 'slash':
        return { 
          body: bodySlash, bodyFrames: 6,
          head: headSlash, headFrames: 6,
          apron: null, apronFrames: 0,
          interval: 80 
        };
      case 'halfslash':
        return { 
          body: bodyHalfslash, bodyFrames: 6,
          head: headHalfslash, headFrames: 6,
          apron: null, apronFrames: 0,
          interval: 80 
        };
      case 'backslash':
        return { 
          body: bodyBackslash, bodyFrames: 6,
          head: headBackslash, headFrames: 6,
          apron: null, apronFrames: 0,
          interval: 80 
        };
      case 'thrust':
        return { 
          body: bodyThrust, bodyFrames: 8,
          head: headThrust, headFrames: 8,
          apron: null, apronFrames: 0,
          interval: 80 
        };
      case 'shoot':
        return { 
          body: bodyShoot, bodyFrames: 13,
          head: headShoot, headFrames: 13,
          apron: null, apronFrames: 0,
          interval: 60 
        };
      case 'spellcast':
        return { 
          body: bodySpellcast, bodyFrames: 7,
          head: headSpellcast, headFrames: 7,
          apron: null, apronFrames: 0,
          interval: 100 
        };
      case 'jump':
        return { 
          body: bodyJump, bodyFrames: 7,
          head: headJump, headFrames: 7,
          apron: null, apronFrames: 0,
          interval: 100 
        };
      case 'sit':
        return { 
          body: bodySit, bodyFrames: 3,
          head: headSit, headFrames: 3,
          apron: null, apronFrames: 0,
          interval: 120 
        };
      case 'emote':
        return { 
          body: bodyEmote, bodyFrames: 6,
          head: headEmote, headFrames: 6,
          apron: apron?.idle, apronFrames: 2,
          interval: 200 
        };
      case 'hurt':
        return { 
          body: bodyHurt, bodyFrames: 6,
          head: headHurt, headFrames: 6,
          apron: null, apronFrames: 0,
          interval: 100 
        };
      case 'climb':
        return { 
          body: bodyClimb, bodyFrames: 6,
          head: headClimb, headFrames: 6,
          apron: null, apronFrames: 0,
          interval: 120 
        };
      case 'combat_idle':
        return { 
          body: bodyCombatIdle, bodyFrames: 2,
          head: headCombatIdle, headFrames: 2,
          apron: null, apronFrames: 0,
          interval: 400 
        };
      default: // idle
        return { 
          body: bodyIdle, bodyFrames: 2,
          head: headIdle, headFrames: 2,
          apron: apron?.idle, apronFrames: 2,
          interval: 400 
        };
    }
  }, [action, apron]);

  useEffect(() => {
    setFrame(0);
  }, [action]);

  useEffect(() => {
    const maxFrames = Math.max(config.bodyFrames, config.headFrames, config.apronFrames);
    if (maxFrames <= 1) return;
    
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 120); // High common multiple to keep layers in sync
    }, config.interval);

    return () => clearInterval(interval);
  }, [config.bodyFrames, config.headFrames, config.apronFrames, config.interval]);

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
    transition: (noTransition || (action !== 'walk' && action !== 'run')) ? 'none' : 'left 0.1s linear, top 0.1s linear',
    imageRendering: 'pixelated',
    zIndex: 10,
  };

  const layerStyle = (src: string, totalFrames: number): React.CSSProperties => {
    if (!src || totalFrames === 0) return { display: 'none' };
    const safeFrame = frame % totalFrames;
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${src})`,
      backgroundPosition: `-${safeFrame * spriteSize}px -${row * spriteSize}px`,
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <div style={spriteStyle}>
      <div style={layerStyle(config.body, config.bodyFrames)} />
      {config.head && <div style={layerStyle(config.head, config.headFrames)} />}
      {config.apron && (
        <div 
          style={{
            ...layerStyle(config.apron, config.apronFrames),
            zIndex: 11
          }} 
        />
      )}
    </div>
  );
};

export default GameCharacter;