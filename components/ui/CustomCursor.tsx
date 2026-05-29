
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  // High-performance position trackers
  const xTo = useRef<any>();
  const yTo = useRef<any>();

  useEffect(() => {
    // Disable on devices without fine pointers (touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // Initial State
    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50, 
      opacity: 0,
      width: 16,
      height: 16,
      backgroundColor: 'rgba(37, 99, 235, 0.3)',
      borderWidth: 0
    });

    // Create high-performance quick setters
    xTo.current = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    yTo.current = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
      gsap.to(cursor, { opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isTarang = target.closest('.tarang-card');
      const isAurakshan = target.closest('.aurakshan-card');
      const isNav = target.closest('.nav-item');
      const isClickable = target.closest('a') || target.closest('button') || target.closest('[role="button"]');

      // 1. Tarang or Aurakshan Card - Expansion with Text
      if (isTarang || isAurakshan) {
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(37, 99, 235, 0.6)',
          backdropFilter: 'blur(4px)',
          mixBlendMode: 'screen',
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: 'auto'
        });
        text.innerText = 'EXPLORE';
        gsap.to(text, { opacity: 1, duration: 0.3, overwrite: 'auto' });
      } 
      // 2. Navigation Item - Focus Ring
      else if (isNav) {
        gsap.to(cursor, {
          width: 50,
          height: 50,
          backgroundColor: 'transparent',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 2,
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: "power2.out",
          overwrite: 'auto'
        });
        text.innerText = '';
        gsap.to(text, { opacity: 0, duration: 0.2, overwrite: 'auto' });
      } 
      // 3. Standard Clickable - Gentle Scale
      else if (isClickable) {
        gsap.to(cursor, {
          width: 40,
          height: 40,
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderWidth: 0,
          mixBlendMode: 'screen',
          duration: 0.3,
          ease: "power2.out",
          overwrite: 'auto'
        });
        text.innerText = '';
        gsap.to(text, { opacity: 0, duration: 0.2, overwrite: 'auto' });
      } 
      // 4. Default State - Fast Return
      else {
        gsap.to(cursor, {
          width: 16,
          height: 16,
          backgroundColor: 'rgba(37, 99, 235, 0.3)',
          borderWidth: 0,
          mixBlendMode: 'screen',
          duration: 0.25,
          ease: "power3.out",
          overwrite: 'auto'
        });
        text.innerText = '';
        gsap.to(text, { opacity: 0, duration: 0.1, overwrite: 'auto' });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1, overwrite: 'auto' });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.1, overwrite: 'auto' });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleInteraction);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleInteraction);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex justify-center items-center border-solid border-transparent"
      style={{ willChange: 'transform, width, height, background-color' }}
    >
      <span 
        ref={textRef}
        className="text-[10px] font-black tracking-widest text-white uppercase opacity-0 select-none"
      />
    </div>
  );
};

export default CustomCursor;
