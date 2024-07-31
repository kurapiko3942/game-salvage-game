"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Character: React.FC = () => {
  const [position, setPosition] = useState({ top: 100, left: 100 });

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        setPosition(prev => ({ ...prev, top: Math.max(0, prev.top - 10) }));
        break;
      case 'ArrowDown':
        setPosition(prev => ({ ...prev, top: Math.min(window.innerHeight - 50, prev.top + 10) }));
        break;
      case 'ArrowLeft':
        setPosition(prev => ({ ...prev, left: Math.max(0, prev.left - 10) }));
        break;
      case 'ArrowRight':
        setPosition(prev => ({ ...prev, left: Math.min(window.innerWidth - 50, prev.left + 10) }));
        break;
      case 'Enter':
        handleEnter();
        break;
      default:
        break;
    }
  };

  const handleEnter = () => {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (position.left >= rect.left && position.left <= rect.right && position.top >= rect.top && position.top <= rect.bottom) {
        const link = card.querySelector('a');
        if (link) {
          // リンクのhref属性を取得して、window.locationを変更する
          const href = (link as HTMLAnchorElement).href;
          window.location.href = href;
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  return (
    <div className="character" style={{ top: `${position.top}px`, left: `${position.left}px`, transform: `translate(-50%, -50%)` }}>
      <Image src="/character_madoshi_01_purple.png" alt="Character" width={50} height={50} />
    </div>
  );
};

export default Character;
