import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import About from './components/About';
import SkillsTicker from './components/SkillsTicker';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or default to dark
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false);
    }
  }, []);

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
      
      // Check if it's an anchor link pointing to a hash on the same page
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
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: targetElement, offsetY: 0 },
              ease: "power4.inOut"
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen selection:bg-charcoal-900 selection:text-white dark:selection:bg-white/20 dark:selection:text-white overflow-x-hidden relative transition-colors duration-500">
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-transform active:scale-95 group"
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-300" />
        ) : (
          <Moon className="w-5 h-5 text-charcoal-900" />
        )}
      </button>

      {/* Global Grain/Noise Texture */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-50 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      <main className="relative z-10 flex flex-col gap-0">
        <Hero />
        <BentoGrid />
        <About />
        <SkillsTicker />
        <Footer />
      </main>
    </div>
  );
};

export default App;