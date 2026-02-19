
import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Experience from './components/Experience';
import About from './components/About';
import SkillsTicker from './components/SkillsTicker';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import BottomNav from './components/ui/BottomNav';
import { Sun, Moon, Terminal, Cpu, Layout, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark for 2026 system feel
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#080808';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8f8f8';
    }
  }, [isDark]);

  // Global Smooth Scroll Handler
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const href = anchor.getAttribute('href');
        const targetId = href ? href.substring(1) : null;
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('manual-scroll-start', { detail: { targetId } }));

            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: targetElement, offsetY: 0, autoKill: false },
              ease: "expo.inOut",
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
    <div className="min-h-screen selection:bg-blue-500 selection:text-white relative transition-colors duration-500 font-sans system-grid">
      
      {/* System Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-[60] h-16 border-b border-white/5 dark:border-white/5 backdrop-blur-xl flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-60">System Status: {systemStatus}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
            <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-default">
              <Activity size={12} />
              <span className="text-[9px] font-mono uppercase tracking-tighter">Lat: 22.41ms</span>
            </div>
            <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-default">
              <Cpu size={12} />
              <span className="text-[9px] font-mono uppercase tracking-tighter">Core: V2.6.0</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-neutral-400 group-hover:text-yellow-500 transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600 group-hover:text-blue-500 transition-colors" />
            )}
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-blue-500" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">VR_OS</span>
          </div>
        </div>
      </header>

      {/* Global Grain/Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <CustomCursor />
      <BottomNav />

      <main className="relative z-10 pt-16">
        <Hero />
        <BentoGrid />
        <Experience />
        <About />
        <SkillsTicker />
        <Footer />
      </main>

      {/* System Footer - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] h-8 border-t border-white/5 backdrop-blur-md flex items-center justify-between px-6 text-[8px] font-mono uppercase tracking-widest opacity-40 pointer-events-none">
        <span>© 2026 VISHAL RATHOD / SYSTEM_ARCHITECT</span>
        <div className="flex gap-4">
          <span>LOC: MUMBAI_IN</span>
          <span>TZ: GMT+5:30</span>
        </div>
      </div>
    </div>
  );
};

export default App;
