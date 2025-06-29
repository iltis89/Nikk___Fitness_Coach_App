'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export function EasterEgg({ isActive }: { isActive: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isActive) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  useEffect(() => {
    const animate = () => {
      setImagePos(prev => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        
        // Smooth following with easing (image lags behind)
        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1
        };
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      // Initialize position to current mouse position
      if (imagePos.x === 0 && imagePos.y === 0) {
        setImagePos({ x: mousePos.x, y: mousePos.y });
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, mousePos]);

  if (!isActive) return null;

  // Calculate rotation based on movement direction
  const rotation = Math.atan2(mousePos.y - imagePos.y, mousePos.x - imagePos.x) * (180 / Math.PI);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div
        className="absolute"
        style={{
          left: `${imagePos.x}px`,
          top: `${imagePos.y}px`,
          transform: `translate(-50%, -50%) rotate(${rotation + 90}deg)`,
          transition: 'none',
        }}
      >
        <Image
          src="/easter-egg.png"
          alt="Easter Egg"
          width={150}
          height={150}
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
}