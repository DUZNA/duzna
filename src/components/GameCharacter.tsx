"use client";

import React, { useState, useEffect } from 'react';
import bodySprite from '@/assets/body.png';
import headSprite from '@/assets/head.png';

interface GameCharacterProps {
  position: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ position, direction, isMoving }) => {
  const [frame, setFrame] = useState(0);

  // Simple animation toggle for idle/moving
  useEffect(() => {
    if (!isMoving) {
      setFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 200);

    return () => clearInterval(interval);
  }, [isMoving]);

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

  const layerStyle = (src: string): React.CSSProperties => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${src})`,
    backgroundPosition: `-${frame * spriteSize}px -${row * spriteSize}px`,
    backgroundSize: `${spriteSize * 2}px ${spriteSize * 4}px`,
  });

  return (
    <div style={spriteStyle}>
      <div style={layerStyle(bodySprite)} />
      <div style={layerStyle(headSprite)} />
    </div>
  );
};

export default GameCharacter;