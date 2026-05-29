
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Hexagon, Cpu } from 'lucide-react';
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

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.05 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 0.2)
      .from(".hero-role-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 0.4)
      .from(".hero-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .from(".hero-cta", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.2")
      .from(".floating-artifact", {
        opacity: 0,
        scale: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)"
      }, "-=1.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero-section" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-12 lg:px-24 pt-24 md:pt-0 text-center selection:bg-charcoal-900 selection:text-white dark:selection:bg-white dark:selection:text-charcoal-900"
    >
      
      <HeroParticles />

      {/* Floating Artifacts - Static spatial elements */}
      <div className="floating-artifact absolute top-[15%] left-[10%] text-blue-500/10 dark:text-blue-400/20 blur-[1px] hidden lg:block">
        <Hexagon size={120} strokeWidth={0.5} />
      </div>
      <div className="floating-artifact absolute bottom-[20%] right-[10%] text-indigo-500/10 dark:text-indigo-400/20 blur-[1px] hidden lg:block">
        <Cpu size={160} strokeWidth={0.5} />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Cursor Glow Effect - Only visible on desktops */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-40 transition-opacity duration-1000 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.08), transparent 40%)`
          }}
        />

        {/* Status Badge */}
        <div className="hero-badge mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 whitespace-nowrap">Available for 2026</span>
            </div>
        </div>

         {/* Name - Static Architectural Design - Fluid Sizing */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-16 pointer-events-none select-none w-full max-w-[95vw]">
           <motion.h1 
             variants={titleVariants}
             initial="hidden"
             animate="visible"
             className="font-display font-extrabold text-[clamp(4rem,18vw,14rem)] md:text-[12vw] tracking-[-0.05em] text-charcoal-900 dark:text-white leading-[0.8] z-10"
           >
              {"VISHAL".split("").map((l, i) => (
                <motion.span variants={letterVariants} key={i} className="inline-block">{l}</motion.span>
              ))}
           </motion.h1>
           <div className="flex items-center gap-2 md:gap-8 w-full px-2">
              <div className="flex-grow h-[1px] bg-charcoal-900/10 dark:bg-white/10 hidden sm:block" />
              <motion.h1 
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="font-display font-extrabold text-[clamp(3rem,12vw,10rem)] md:text-[8vw] tracking-[0.1em] md:tracking-[0.15em] leading-[1] z-10 text-transparent mx-auto"
                style={{ WebkitTextStroke: '1px rgba(0,0,0,0.2)', MozTextStroke: '1px rgba(0,0,0,0.2)' }}
              >
                 {"RATHOD".split("").map((l, i) => (
                    <motion.span variants={letterVariants} key={i} className="inline-block">
                        <span className="dark:hidden">{l}</span>
                        <span className="hidden dark:inline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>{l}</span>
                    </motion.span>
                 ))}
              </motion.h1>
              <div className="flex-grow h-[1px] bg-charcoal-900/10 dark:bg-white/10 hidden sm:block" />
           </div>
        </div>

        {/* Headline Section */}
        <div className="hero-role-wrapper max-w-4xl mx-auto mb-8 md:mb-10">
           <div className="hero-role-item overflow-hidden px-4">
              <h2 className="font-serif text-xl md:text-4xl lg:text-5xl font-medium text-charcoal-900 dark:text-white leading-tight">
                Product Designer (UI/UX) building <span className="italic text-neutral-500 dark:text-neutral-400 font-normal">structured, scalable digital experiences.</span>
              </h2>
           </div>
        </div>

         {/* Subtext Section */}
        <div className="hero-desc max-w-2xl mx-auto text-center mb-10 md:mb-12 px-6">
           <p className="text-base md:text-xl font-light text-neutral-600 dark:text-neutral-400 leading-relaxed">
              3+ years leading electronics manufacturing quality systems — now applying the same <span className="text-charcoal-900 dark:text-white font-medium italic">analytical precision</span> to digital product design.
           </p>
        </div>

        <div className="hero-cta pb-8 md:pb-0">
            <Magnetic strength={0.2}>
              <a 
                href="#work"
                className="group inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-charcoal-900 dark:bg-white text-white dark:text-black rounded-full text-base md:text-lg font-bold tracking-tight hover:scale-105 transition-all duration-300 shadow-xl border border-transparent hover:border-blue-500/30"
              >
                Selected Works
                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>
            </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Hero;
