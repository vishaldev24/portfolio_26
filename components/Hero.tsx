
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Terminal, Command, Zap } from 'lucide-react';
import HeroParticles from './ui/HeroParticles';
import Magnetic from './ui/Magnetic';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setMousePosition({ x: mouseX, y: mouseY });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
      }, 0.5)
      .from(".hero-meta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.8")
      .from(".hero-cta", {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero-section" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden selection:bg-blue-500 selection:text-white"
    >
      <HeroParticles />

      {/* Background Micro-Data */}
      <div className="absolute top-32 left-12 opacity-10 font-mono text-[10px] space-y-1 hidden lg:block">
        <p>SYS_INIT: SUCCESS</p>
        <p>MEM_LOAD: 2.4GB</p>
        <p>CORE_TEMP: 42°C</p>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Top Meta Info */}
        <div className="hero-meta flex items-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Zap size={10} className="text-blue-500" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Available for 2026</span>
          </div>
          <div className="h-px w-12 bg-white/10" />
          <span className="text-[9px] font-mono uppercase tracking-widest opacity-40">Product Designer / System Architect</span>
        </div>

        {/* Massive Typographic Statement */}
        <div className="space-y-2 md:space-y-0">
          <div className="overflow-hidden">
            <h1 className="hero-line font-sans font-extrabold text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase">
              Engineering
            </h1>
          </div>
          <div className="overflow-hidden flex flex-col md:flex-row md:items-baseline md:gap-8">
            <h1 className="hero-line font-sans font-extrabold text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              Digital
            </h1>
            <div className="hero-meta hidden md:block max-w-xs">
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                Applying industrial precision and systems thinking to create resilient digital interfaces.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line font-sans font-extrabold text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase">
              Resilience.
            </h1>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="hero-meta space-y-6 max-w-xl">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-blue-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Vishal Rathod</span>
            </div>
            <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed">
              I bridge the gap between <span className="text-white font-medium italic">industrial quality</span> and <span className="text-white font-medium italic">user-centric design</span>, building products that are as robust as they are intuitive.
            </p>
          </div>

          <div className="hero-cta">
            <Magnetic strength={0.2}>
              <a 
                href="#work"
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-bold tracking-tight transition-all duration-300 shadow-2xl shadow-blue-500/20"
              >
                <span>Explore Systems</span>
                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                
                {/* Button Decorative Elements */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Spatial Background Elements */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-1000 hidden md:block"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.05), transparent 40%)`
        }}
      />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[8px] font-mono uppercase tracking-[0.4em]">Scroll</span>
        </motion.div>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
