import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, User, Cpu, Mail, LayoutGrid, Terminal } from 'lucide-react';

const navItems = [
  { id: 'hero-section', label: 'Home', icon: <Home size={16} /> },
  { id: 'work', label: 'Matrix', icon: <LayoutGrid size={16} /> },
  { id: 'experience', label: 'Log', icon: <Briefcase size={16} /> },
  { id: 'about', label: 'System', icon: <User size={16} /> },
  { id: 'skills', label: 'Stack', icon: <Cpu size={16} /> },
  { id: 'contact', label: 'Comm', icon: <Mail size={16} /> },
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
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 50);
    };

    window.addEventListener('manual-scroll-start', handleScrollStart);
    window.addEventListener('manual-scroll-end', handleScrollEnd);

    const observerOptions = {
      root: null,
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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-fit pointer-events-none">
      <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-charcoal-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl pointer-events-auto">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: "expo.out" }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <AnimatePresence>
                {isHovered && (
                  <div className="absolute px-3 py-1 rounded bg-blue-600 text-white text-[8px] font-mono font-bold uppercase tracking-widest pointer-events-none whitespace-nowrap shadow-xl" style={{ top: -40 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      {item.label}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <a
                href={`#${item.id}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-300 group
                  ${isActive ? 'text-white' : 'text-neutral-500 hover:text-white'}
                `}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <motion.div
                      layoutId="nav-pill"
                      style={{ width: '100%', height: '100%' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  </div>
                )}
                
                <span className="relative z-20">
                  {item.icon}
                </span>
              </a>
            </div>
          );
        })}
        
        <div className="h-6 w-px bg-white/10 mx-2" />
        
        <div className="flex items-center gap-2 px-3 opacity-40">
          <Terminal size={12} />
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest hidden md:block">OS_v2.6</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
