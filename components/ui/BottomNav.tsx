
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, User, Cpu, Mail, LayoutGrid, Award } from 'lucide-react';

const navItems = [
  { id: 'hero-section', label: 'Home', icon: <Home size={18} /> },
  { id: 'work', label: 'Projects', icon: <LayoutGrid size={18} /> },
  { id: 'experience', label: 'Recent Work', icon: <Briefcase size={18} /> },
  { id: 'about', label: 'About', icon: <User size={18} /> },
  { id: 'skills', label: 'Skills', icon: <Cpu size={18} /> },
  { id: 'validation', label: 'Validation', icon: <Award size={18} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
];

const BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isManualScrolling = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScrollStart = (e: any) => {
      isManualScrolling.current = true;
      if (e.detail?.targetId) {
        setActiveSection(e.detail.targetId);
      }
    };
    
    const handleScrollEnd = () => {
      // Small delay to prevent sudden observer trigger at the end of GSAP scroll
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 50);
    };

    window.addEventListener('manual-scroll-start', handleScrollStart);
    window.addEventListener('manual-scroll-end', handleScrollEnd);

    const observerOptions = {
      root: null,
      // rootMargin: Adjust to be slightly more sensitive to center of screen
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('manual-scroll-start', handleScrollStart);
      window.removeEventListener('manual-scroll-end', handleScrollEnd);
    };
  }, []);

  return (
    <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-fit pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-1 md:gap-3 p-1.5 md:p-2 rounded-full bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.7)] pointer-events-auto ring-1 ring-black/5 dark:ring-white/5"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Refined Tooltip - Positioned precisely below the icon */}
              <AnimatePresence>
                {isHovered && window.innerWidth > 768 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 56, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-900 text-[10px] font-bold uppercase tracking-[0.15em] pointer-events-none whitespace-nowrap shadow-xl z-50 border border-white/10 dark:border-black/10"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.a
                href={`#${item.id}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  nav-item relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full transition-all duration-300 group z-10
                  ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-neutral-500 hover:text-charcoal-900 dark:hover:text-white'}
                `}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="dock-pill"
                    className="absolute inset-0 bg-white/95 dark:bg-white/10 rounded-full border border-black/5 dark:border-white/10 shadow-lg"
                    transition={{ 
                      type: 'spring', 
                      stiffness: 350, 
                      damping: 35
                    }}
                  />
                )}
                
                <span className="relative z-20">
                  {React.cloneElement(item.icon as React.ReactElement, { size: window.innerWidth < 768 ? 16 : 18 })}
                </span>
              </motion.a>
            </div>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default BottomNav;
