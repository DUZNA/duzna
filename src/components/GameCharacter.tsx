"use client";

import React, { useState, useEffect } from 'react';
import bodyIdle from '@/assets/body.png';
import headIdle from '@/assets/head.png';
import bodyWalk from '@/assets/walk.png';
import bodyRun from '@/assets/run.png';
import headWalk from '@/assets/head_walk.png';
import headRun from '@/assets/head_run.png';

export interface ApronSet {
  idle: string;
  walk: string;
}

interface GameCharacterProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
  isRunning: boolean;
  apron?: ApronSet | null;
  noTransition?: boolean;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ 
  position, 
  direction, 
  isMoving, 
  isRunning, 
  apron,
  noTransition = false
}) => {
  const [frame, setFrame] = useState(0);
  
  const getAnimationConfig = () => {
    if (!isMoving) {
      return {
        bodySrc: bodyIdle,
        headSrc: headIdle,
        apronSrc: apron?.idle,
        totalFrames: 2,
        apronFrames: 2,
        interval: 400,
      };
    }
    if (isRunning) {
      return {
        bodySrc: bodyRun,
        headSrc: headRun,
        apronSrc: apron?.walk, // Fallback to walk for run if no run sheet
        totalFrames: 8,
        apronFrames: 9,
        interval: 100,
      };
    }
    return {
      bodySrc: bodyWalk,
      headSrc: headWalk,
      apronSrc: apron?.walk,
      totalFrames: 9,
      apronFrames: 9,
      interval: 120,
    };
  };

  const config = getAnimationConfig();

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % config.totalFrames);
    }, config.interval);

    return () => clearInterval(interval);
  }, [config.totalFrames, config.interval, isMoving, isRunning]);

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

  const layerStyle = (src: string, totalFrames: number, currentFrame: number): React.CSSProperties => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${src})`,
    backgroundPosition: `-${(currentFrame % totalFrames) * spriteSize}px -${row * spriteSize}px`,
    backgroundSize: `${spriteSize * totalFrames}px ${spriteSize * 4}px`,
  });

  return (
    <div style={spriteStyle}>
      <div style={layerStyle(config.bodySrc, config.totalFrames, frame)} />
      {config.headSrc && <div style={layerStyle(config.headSrc, config.totalFrames, frame)} />}
      {config.apronSrc && (
        <div 
          style={{
            ...layerStyle(config.apronSrc, config.apronFrames, frame),
            zIndex: 11
          }} 
        />
      )}
    </div>
  );
};

export default GameCharacter;