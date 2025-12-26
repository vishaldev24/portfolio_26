import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Media query check - only for fine pointer devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initial positioning to hide until moved
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      // "Liquid" drag effect using GSAP power3.out and 0.6s duration
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
        opacity: 1
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Specific detection for the Tarang Feature Card
      const isTarang = target.closest('.tarang-card');
      // Generic detection for interactive elements
      const isClickable = target.closest('a') || target.closest('button') || target.closest('[role="button"]');

      if (isTarang) {
        setIsActive(true);
        setCursorText('VIEW CASE');
      } else if (isClickable) {
        setIsActive(true);
        setCursorText('');
      } else {
        setIsActive(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex justify-center items-center text-[8px] font-bold tracking-widest text-white transition-all duration-300 ease-out
        ${isActive ? 'w-20 h-20 bg-indigo-600/80 backdrop-blur-sm' : 'w-5 h-5 bg-indigo-600/40 backdrop-blur-[2px]'}
      `}
      style={{
        mixBlendMode: 'screen', // Ensure visibility in dark mode layers
      }}
    >
      <span className={`transition-opacity duration-300 ${isActive && cursorText ? 'opacity-100' : 'opacity-0'}`}>
        {cursorText}
      </span>
    </div>
  );
};

export default CustomCursor;