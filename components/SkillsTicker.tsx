import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Figma Expert",
  "GSAP Animations",
  "Design Systems",
  "AI Workflows",
  "Motion Design",
  "Prototyping",
  "Production Ready",
  "User Research",
];

const SkillsTicker: React.FC = () => {
  return (
    <section className="w-full py-16 bg-paper-300 dark:bg-charcoal-800 border-y border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="flex whitespace-nowrap overflow-hidden relative">
         {/* Gradient Masks for fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-paper-300 dark:from-charcoal-800 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-paper-300 dark:from-charcoal-800 to-transparent z-10" />

        <motion.div
          className="flex items-center gap-16 pr-16"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60, // Adjusted speed for elegance
          }}
          style={{ width: "max-content" }}
        >
          {/* Quadruple the list to ensure the loop is seamless even on ultra-wide screens */}
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex items-center gap-16 group">
              <span className="text-4xl md:text-6xl font-display font-bold uppercase transition-all duration-300 cursor-default
                text-charcoal-900/40 hover:text-charcoal-900
                dark:text-white/20 dark:hover:text-white"
              >
                {skill}
              </span>
              {/* Separator dot */}
              <div className="w-3 h-3 rounded-full bg-charcoal-900/20 dark:bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsTicker;