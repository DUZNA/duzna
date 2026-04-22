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

// Shadow Assets
import shadowHurt from '@/assets/shadow.png';
import shadowSlash from '@/assets/shadow_slash.png';
import shadowShoot from '@/assets/shadow_shoot.png';
import shadowSpellcast from '@/assets/shadow_spellcast.png';
import shadowThrust from '@/assets/shadow_thrust.png';

export interface ApronSet {
  idle: string;
  walk: string;
  run?: string;
  backlash: string;
  climb?: string;
  combat_idle?: string;
  emote?: string;
  halfslash?: string;
  hurt?: string;
  jump?: string;
  shoot?: string;
  sit?: string;
  slash?: string;
  spellcast?: string;
  thrust?: string;
}

export type CharacterAction = 
  | 'idle' | 'walk' | 'run' | 'slash' | 'halfslash' 
  | 'backslash' | 'thrust' | 'shoot' | 'spellcast' 
  | 'jump' | 'sit' | 'emote' | 'hurt' | 'climb' | 'combat_idle';

interface LayerConfig {
  src: string | null | undefined;
  frames: number;
  singleRow?: boolean;
}

interface GameCharacterProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  action: CharacterAction;
  apron?: ApronSet | null;
  noTransition?: boolean;
  pose?: number; // Added to support fixed frames (like sitting poses)
}

const GameCharacter: React.FC<GameCharacterProps> = ({ 
  position, 
  direction, 
  action,
  apron,
  noTransition = false,
  pose
}) => {
  const [frame, setFrame] = useState(0);
  
  const config = useMemo(() => {
    switch (action) {
      case 'walk':
        return { 
          body: { src: bodyWalk, frames: 9 },
          head: { src: headWalk, frames: 9 },
          apron: { src: apron?.walk, frames: 9 },
          interval: 100 
        };
      case 'run':
        return { 
          body: { src: bodyRun, frames: 8 },
          head: { src: headRun, frames: 8 },
          apron: { src: apron?.run || apron?.walk, frames: 8 },
          interval: 80 
        };
      case 'slash':
        return { 
          body: { src: bodySlash, frames: 6 },
          head: { src: headSlash, frames: 6 },
          apron: { src: apron?.slash, frames: 6 },
          shadow: { src: shadowSlash, frames: 6 },
          interval: 80 
        };
      case 'halfslash':
        return { 
          body: { src: bodyHalfslash, frames: 6 },
          head: { src: headHalfslash, frames: 6 },
          apron: { src: apron?.halfslash, frames: 6 },
          interval: 80 
        };
      case 'backslash':
        return { 
          body: { src: bodyBackslash, frames: 6 },
          head: { src: headBackslash, frames: 6 },
          apron: { src: apron?.backslash, frames: 6 },
          interval: 80 
        };
      case 'thrust':
        return { 
          body: { src: bodyThrust, frames: 8 },
          head: { src: headThrust, frames: 8 },
          apron: { src: apron?.thrust, frames: 8 },
          shadow: { src: shadowThrust, frames: 8 },
          interval: 80 
        };
      case 'shoot':
        return { 
          body: { src: bodyShoot, frames: 13 },
          head: { src: headShoot, frames: 13 },
          apron: { src: apron?.shoot, frames: 13 },
          shadow: { src: shadowShoot, frames: 13 },
          interval: 60 
        };
      case 'spellcast':
        return { 
          body: { src: bodySpellcast, frames: 7 },
          head: { src: headSpellcast, frames: 7 },
          apron: { src: apron?.spellcast, frames: 7 },
          shadow: { src: shadowSpellcast, frames: 7 },
          interval: 100 
        };
      case 'jump':
        return { 
          body: { src: bodyJump, frames: 7 },
          head: { src: headJump, frames: 7 },
          apron: { src: apron?.jump, frames: 7 },
          interval: 100 
        };
      case 'sit':
        return { 
          body: { src: bodySit, frames: 3 },
          head: { src: headSit, frames: 3 },
          apron: { src: apron?.sit, frames: 3 },
          interval: 120 
        };
      case 'emote':
        return { 
          body: { src: bodyEmote, frames: 3 },
          head: { src: headEmote, frames: 3 },
          apron: { src: apron?.emote, frames: 3 },
          interval: 200 
        };
      case 'hurt':
        return { 
          body: { src: bodyHurt, frames: 6, singleRow: true },
          head: { src: headHurt, frames: 6, singleRow: true },
          apron: { src: apron?.hurt, frames: 6, singleRow: true },
          shadow: { src: shadowHurt, frames: 6, singleRow: true },
          interval: 100 
        };
      case 'climb':
        return { 
          body: { src: bodyClimb, frames: 6, singleRow: true },
          head: { src: headClimb, frames: 6, singleRow: true },
          apron: { src: apron?.climb, frames: 6, singleRow: true },
          interval: 120 
        };
      case 'combat_idle':
        return { 
          body: { src: bodyCombatIdle, frames: 2 },
          head: { src: headCombatIdle, frames: 2 },
          apron: { src: apron?.combat_idle, frames: 2 },
          interval: 400 
        };
      default: // idle
        return { 
          body: { src: bodyIdle, frames: 2 },
          head: { src: headIdle, frames: 2 },
          apron: { src: apron?.idle, frames: 2 },
          interval: 400 
        };
    }
  }, [action, apron]);

  useEffect(() => {
    if (action === 'sit' && pose !== undefined) {
      setFrame(pose);
    } else {
      setFrame(0);
    }
  }, [action, pose]);

  useEffect(() => {
    const maxFrames = Math.max(
      config.body?.frames || 0, 
      config.head?.frames || 0, 
      (config as any).apron?.frames || 0,
      (config as any).shadow?.frames || 0
    );
    if (maxFrames <= 1) return;
    if (action === 'sit' && pose !== undefined) return; // Don't animate if pose is fixed
    
    const isLooping = ['idle', 'walk', 'run', 'climb', 'combat_idle'].includes(action);

    const interval = setInterval(() => {
      setFrame((f) => {
        const nextFrame = f + 1;
        if (nextFrame >= maxFrames) {
          return isLooping ? 0 : maxFrames - 1; // Stay on last frame for non-looping actions
        }
        return nextFrame;
      });
    }, config.interval);

    return () => clearInterval(interval);
  }, [config, action, pose]);

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

  const layerStyle = (layer: LayerConfig | undefined): React.CSSProperties => {
    if (!layer || !layer.src || layer.frames === 0) return { display: 'none' };
    const safeFrame = frame % layer.frames;
    const currentRow = layer.singleRow ? 0 : row;
    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${layer.src})`,
      backgroundPosition: `-${safeFrame * spriteSize}px -${currentRow * spriteSize}px`,
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <div style={spriteStyle}>
      {(config as any).shadow && (
        <div 
          style={{
            ...layerStyle((config as any).shadow),
            zIndex: 9
          }} 
        />
      )}
      <div style={layerStyle(config.body)} />
      <div style={layerStyle(config.head)} />
      {(config as any).apron && (
        <div 
          style={{
            ...layerStyle((config as any).apron),
            zIndex: 11
          }} 
        />
      )}
    </div>
  );
};

export default GameCharacter;