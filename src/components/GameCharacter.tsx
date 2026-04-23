"use client";

import React, { useState, useEffect, useMemo } from 'react';

// Male Body Assets
import bodyIdle from '@/assets/body.png';
import headIdle from '@/assets/head.png';
import bodyWalk from '@/assets/walk.png';
import bodyRun from '@/assets/run.png';
import headWalk from '@/assets/head_walk.png';
import headRun from '@/assets/head_run.png';
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

// Female Adult Assets
import fBodyIdle from '@/assets/Female Adult/Body/idle.png';
import fHeadIdle from '@/assets/Female Adult/Head/idle.png';
import fBodyWalk from '@/assets/Female Adult/Body/walk.png';
import fHeadWalk from '@/assets/Female Adult/Head/walk.png';
import fBodyRun from '@/assets/Female Adult/Body/run.png';
import fHeadRun from '@/assets/Female Adult/Head/run.png';
import fBodySlash from '@/assets/Female Adult/Body/slash.png';
import fHeadSlash from '@/assets/Female Adult/Head/slash.png';
import fBodyHalfslash from '@/assets/Female Adult/Body/halfslash.png';
import fHeadHalfslash from '@/assets/Female Adult/Head/halfslash.png';
import fBodyBackslash from '@/assets/Female Adult/Body/backslash.png';
import fHeadBackslash from '@/assets/Female Adult/Head/backslash.png';
import fBodyThrust from '@/assets/Female Adult/Body/thrust.png';
import fHeadThrust from '@/assets/Female Adult/Head/thrust.png';
import fBodyShoot from '@/assets/Female Adult/Body/shoot.png';
import fHeadShoot from '@/assets/Female Adult/Head/shoot.png';
import fBodySpellcast from '@/assets/Female Adult/Body/spellcast.png';
import fHeadSpellcast from '@/assets/Female Adult/Head/spellcast.png';
import fBodyJump from '@/assets/Female Adult/Body/jump.png';
import fHeadJump from '@/assets/Female Adult/Head/jump.png';
import fBodySit from '@/assets/Female Adult/Body/sit.png';
import fHeadSit from '@/assets/Female Adult/Head/sit.png';
import fBodyEmote from '@/assets/Female Adult/Body/emote.png';
import fHeadEmote from '@/assets/Female Adult/Head/emote.png';
import fBodyHurt from '@/assets/Female Adult/Body/hurt.png';
import fHeadHurt from '@/assets/Female Adult/Head/hurt.png';
import fBodyClimb from '@/assets/Female Adult/Body/climb.png';
import fHeadClimb from '@/assets/Female Adult/Head/climb.png';
import fBodyCombatIdle from '@/assets/Female Adult/Body/combat_idle.png';
import fHeadCombatIdle from '@/assets/Female Adult/Head/combat_idle.png';

// Shadow Assets
import shadowHurt from '@/assets/shadow.png';
import shadowSlash from '@/assets/shadow_slash.png';
import shadowShoot from '@/assets/shadow_shoot.png';
import shadowSpellcast from '@/assets/shadow_spellcast.png';
import shadowThrust from '@/assets/shadow_thrust.png';
import shadowWalk from '@/assets/shadow_walk.png';

export interface ApronSet {
  idle: string;
  walk: string;
  run?: string;
  backslash: string;
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

export type BodyType = 'male' | 'female';

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
  bodyType?: BodyType;
  noTransition?: boolean;
  pose?: number;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ 
  position, 
  direction, 
  action,
  apron,
  bodyType = 'male',
  noTransition = false,
  pose
}) => {
  const [frame, setFrame] = useState(0);
  
  const config = useMemo(() => {
    const isFemale = bodyType === 'female';
    
    switch (action) {
      case 'walk':
        return { 
          body: { src: isFemale ? fBodyWalk : bodyWalk, frames: 9 },
          head: { src: isFemale ? fHeadWalk : headWalk, frames: 9 },
          apron: { src: apron?.walk, frames: 9 },
          shadow: { src: shadowWalk, frames: 9 },
          interval: 100 
        };
      case 'run':
        return { 
          body: { src: isFemale ? fBodyRun : bodyRun, frames: 8 },
          head: { src: isFemale ? fHeadRun : headRun, frames: 8 },
          apron: { src: apron?.run || apron?.walk, frames: 8 },
          shadow: { src: shadowWalk, frames: 9 },
          interval: 80 
        };
      case 'slash':
        return { 
          body: { src: isFemale ? fBodySlash : bodySlash, frames: 6 },
          head: { src: isFemale ? fHeadSlash : headSlash, frames: 6 },
          apron: { src: apron?.slash, frames: 6 },
          shadow: { src: shadowSlash, frames: 6 },
          interval: 80 
        };
      case 'halfslash':
        return { 
          body: { src: isFemale ? fBodyHalfslash : bodyHalfslash, frames: 6 },
          head: { src: isFemale ? fHeadHalfslash : headHalfslash, frames: 6 },
          apron: { src: apron?.halfslash, frames: 6 },
          shadow: { src: shadowSlash, frames: 6 },
          interval: 80 
        };
      case 'backslash':
        return { 
          body: { src: isFemale ? fBodyBackslash : bodyBackslash, frames: 6 },
          head: { src: isFemale ? fHeadBackslash : headBackslash, frames: 6 },
          apron: { src: apron?.backslash, frames: 6 },
          shadow: { src: shadowSlash, frames: 6 },
          interval: 80 
        };
      case 'thrust':
        return { 
          body: { src: isFemale ? fBodyThrust : bodyThrust, frames: 8 },
          head: { src: isFemale ? fHeadThrust : headThrust, frames: 8 },
          apron: { src: apron?.thrust, frames: 8 },
          shadow: { src: shadowThrust, frames: 8 },
          interval: 80 
        };
      case 'shoot':
        return { 
          body: { src: isFemale ? fBodyShoot : bodyShoot, frames: 13 },
          head: { src: isFemale ? fHeadShoot : headShoot, frames: 13 },
          apron: { src: apron?.shoot, frames: 13 },
          shadow: { src: shadowShoot, frames: 13 },
          interval: 60 
        };
      case 'spellcast':
        return { 
          body: { src: isFemale ? fBodySpellcast : bodySpellcast, frames: 7 },
          head: { src: isFemale ? fHeadSpellcast : headSpellcast, frames: 7 },
          apron: { src: apron?.spellcast, frames: 7 },
          shadow: { src: shadowSpellcast, frames: 7 },
          interval: 100 
        };
      case 'jump':
        return { 
          body: { src: isFemale ? fBodyJump : bodyJump, frames: 7 },
          head: { src: isFemale ? fHeadJump : headJump, frames: 7 },
          apron: { src: apron?.jump, frames: 7 },
          shadow: { src: shadowWalk, frames: 9 },
          interval: 100 
        };
      case 'sit':
        return { 
          body: { src: isFemale ? fBodySit : bodySit, frames: 3 },
          head: { src: isFemale ? fHeadSit : headSit, frames: 3 },
          apron: { src: apron?.sit, frames: 3 },
          shadow: { src: shadowWalk, frames: 9 },
          interval: 120 
        };
      case 'emote':
        return { 
          body: { src: isFemale ? fBodyEmote : bodyEmote, frames: 3 },
          head: { src: isFemale ? fHeadEmote : headEmote, frames: 3 },
          apron: { src: apron?.emote, frames: 3 },
          shadow: { src: shadowWalk, frames: 9 },
          interval: 200 
        };
      case 'hurt':
        return { 
          body: { src: isFemale ? fBodyHurt : bodyHurt, frames: 6, singleRow: true },
          head: { src: isFemale ? fHeadHurt : headHurt, frames: 6, singleRow: true },
          apron: { src: apron?.hurt, frames: 6, singleRow: true },
          shadow: { src: shadowHurt, frames: 6, singleRow: true },
          interval: 100 
        };
      case 'climb':
        return { 
          body: { src: isFemale ? fBodyClimb : bodyClimb, frames: 6, singleRow: true },
          head: { src: isFemale ? fHeadClimb : headClimb, frames: 6, singleRow: true },
          apron: { src: apron?.climb, frames: 6, singleRow: true },
          shadow: { src: shadowHurt, frames: 6, singleRow: true },
          interval: 120 
        };
      case 'combat_idle':
        return { 
          body: { src: isFemale ? fBodyCombatIdle : bodyCombatIdle, frames: 2 },
          head: { src: isFemale ? fHeadCombatIdle : headCombatIdle, frames: 2 },
          apron: { src: apron?.combat_idle, frames: 2 },
          shadow: { src: shadowSlash, frames: 6 },
          interval: 400 
        };
      default: // idle
        return { 
          body: { src: isFemale ? fBodyIdle : bodyIdle, frames: 2 },
          head: { src: isFemale ? fHeadIdle : headIdle, frames: 2 },
          apron: { src: apron?.idle, frames: 2 },
          shadow: { src: shadowWalk, frames: 9 },
          interval: 400 
        };
    }
  }, [action, apron, bodyType]);

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
    if (action === 'sit' && pose !== undefined) return;
    
    const isLooping = ['idle', 'walk', 'run', 'climb', 'combat_idle'].includes(action);

    const interval = setInterval(() => {
      setFrame((f) => {
        const nextFrame = f + 1;
        if (nextFrame >= maxFrames) {
          return isLooping ? 0 : maxFrames - 1;
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

  const layerStyle = (layer: LayerConfig | undefined, zIndex: number): React.CSSProperties => {
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
      zIndex,
    };
  };

  return (
    <div style={spriteStyle}>
      {(config as any).shadow && (
        <div style={layerStyle((config as any).shadow, 1)} />
      )}
      <div style={layerStyle(config.body, 2)} />
      <div style={layerStyle(config.head, 3)} />
      {(config as any).apron && (
        <div style={layerStyle((config as any).apron, 4)} />
      )}
    </div>
  );
};

export default GameCharacter;