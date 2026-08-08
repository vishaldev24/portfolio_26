
import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import WhyHireMe from './components/WhyHireMe';
import BentoGrid from './components/BentoGrid';
import MyProcess from './components/MyProcess';
import SkillsGrid from './components/SkillsGrid';
import ContactCTA from './components/ContactCTA';
import Experience from './components/Experience';
import About from './components/About';
import CustomCursor from './components/ui/CustomCursor';
import BottomNav from './components/ui/BottomNav';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState(100); 

  // Apply Font Size Accessibility with requestAnimationFrame for smoothness
  useEffect(() => {
    let frameId: number;
    const updateFontSize = () => {
      document.documentElement.style.fontSize = `${fontSize}%`;
    };
    frameId = requestAnimationFrame(updateFontSize);
    return () => cancelAnimationFrame(frameId);
  }, [fontSize]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global Smooth Scroll Handler
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (
        anchor && 
        anchor.getAttribute('href')?.startsWith('#')
      ) {
        const href = anchor.getAttribute('href');
        const targetId = href ? href.substring(1) : null;
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            e.preventDefault();
            
            // Dispatch manual-scroll-start so BottomNav can lock state
            window.dispatchEvent(new CustomEvent('manual-scroll-start', { detail: { targetId } }));

            gsap.to(window, {
              duration: 1.4,
              scrollTo: { y: targetElement, offsetY: 0, autoKill: false },
              ease: "power4.inOut",
              overwrite: true,
              onComplete: () => {
                window.dispatchEvent(new CustomEvent('manual-scroll-end'));
              }
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  return (
    <div className="min-h-screen selection:bg-charcoal-900 selection:text-white dark:selection:bg-white/20 dark:selection:text-white relative transition-colors duration-500 font-sans">
      
      {/* Side Control Panel (Theme & Accessibility) */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-transform active:scale-95 group"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-charcoal-900" />
          )}
        </button>

        {/* Accessibility Font Controls */}
        <div className="flex flex-col rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg p-1">
          <button 
            onClick={() => setFontSize(90)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-[10px] font-bold transition-all ${fontSize === 90 ? 'bg-charcoal-900 text-white dark:bg-white dark:text-black shadow-inner' : 'hover:bg-black/5 dark:hover:bg-white/5 text-neutral-500'}`}
            title="Smaller Font"
          >
            A-
          </button>
          <button 
            onClick={() => setFontSize(100)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${fontSize === 100 ? 'bg-charcoal-900 text-white dark:bg-white dark:text-black shadow-inner' : 'hover:bg-black/5 dark:hover:bg-white/5 text-neutral-500'}`}
            title="Default Font"
          >
            A
          </button>
          <button 
            onClick={() => setFontSize(115)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${fontSize === 115 ? 'bg-charcoal-900 text-white dark:bg-white dark:text-black shadow-inner' : 'hover:bg-black/5 dark:hover:bg-white/5 text-neutral-500'}`}
            title="Larger Font"
          >
            A+
          </button>
        </div>
      </div>

      {/* Global Grain/Noise Texture */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-50 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Bottom Floating Navigation */}
      <BottomNav />

      <main className="relative z-10 flex flex-col gap-0">
        <Hero />
        <WhyHireMe />
        <BentoGrid />
        <MyProcess />
        <SkillsGrid />
        <Experience />
        <About />
        <ContactCTA />
      </main>
    </div>
  );
};

export default App;
