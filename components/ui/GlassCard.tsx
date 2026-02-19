import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hoverEffect = true,
  ...props 
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 ${className}`}>
      <motion.div
        {...props}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />
      {children}
      
      {/* Subtle Inner Shine */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}
    </div>
  );
};

export default GlassCard;
