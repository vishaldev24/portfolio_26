import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Reticle */}
      <div className="absolute w-8 h-8 flex items-center justify-center">
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            position: 'absolute'
          }}
        >
          {/* Reticle Corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/50" />
          
          {/* Center Dot */}
          <div className="w-full h-full flex items-center justify-center">
            <motion.div 
              animate={{
                scale: isPointer ? 1.5 : 1,
                backgroundColor: isPointer ? '#2563eb' : '#ffffff'
              }}
              style={{ width: 4, height: 4, borderRadius: '9999px' }} 
            />
          </div>
        </motion.div>
      </div>

      {/* Trailing Glow */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500 blur-[60px] rounded-full">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isPointer ? 2 : 1,
            opacity: isPointer ? 0.4 : 0.1
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
