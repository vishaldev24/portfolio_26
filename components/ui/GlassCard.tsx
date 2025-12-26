import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = false, ...props }) => {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        bg-white/40 dark:bg-white/5 
        backdrop-blur-xl
        border border-black/5 dark:border-white/10
        rounded-2xl
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        transition-colors duration-500
        ${className}
      `}
      {...props}
    >
      {/* Inner shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
      
      {children}
    </motion.div>
  );
};

export default GlassCard;