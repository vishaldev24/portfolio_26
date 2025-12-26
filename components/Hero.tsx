import React, { useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import HeroParticles from './ui/HeroParticles';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax effects for background/container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // GSAP Animation for Hero Text
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-text", { 
        y: "100%", 
        opacity: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out" 
      })
      .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.2");

    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero-section" ref={containerRef} className="relative h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* 3D Particle Background Layer */}
      <HeroParticles />

      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <motion.div 
          style={{ rotate, scale, y }}
          className="absolute -top-[20%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-gradient-to-b from-blue-100 to-transparent dark:from-neutral-800 blur-[100px] opacity-80 dark:opacity-40 border border-blue-200/20 dark:border-white/5 will-change-transform"
        />
        <motion.div 
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -30]), y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute top-[40%] -left-[10%] w-[40vh] h-[40vh] rounded-full bg-purple-100 dark:bg-neutral-800 blur-[80px] opacity-60 dark:opacity-30 will-change-transform"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full" ref={textRef}>
        <div>
            <div className="overflow-hidden py-2">
              <h1 className="hero-text font-serif font-semibold text-7xl md:text-9xl tracking-tight text-charcoal-900 dark:text-white mb-2 leading-[0.9] drop-shadow-sm dark:drop-shadow-none will-change-transform">
                Engineering
              </h1>
            </div>
            <div className="overflow-hidden py-2">
              <h1 className="hero-text font-serif italic font-medium text-7xl md:text-9xl tracking-tight text-neutral-500 dark:text-neutral-500 mb-8 leading-[0.9] will-change-transform">
                Precision.
              </h1>
            </div>
            <div className="overflow-hidden py-2">
              <h1 className="hero-text font-serif font-semibold text-6xl md:text-8xl tracking-tight text-charcoal-900 dark:text-white leading-[0.9] drop-shadow-sm dark:drop-shadow-none will-change-transform">
                Designing Experience.
              </h1>
            </div>

          <div className="hero-sub max-w-2xl mt-12 pl-4 border-l-2 border-charcoal-900/10 dark:border-white/10">
            <p className="text-xl md:text-2xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Leveraging <span className="font-medium text-charcoal-900 dark:text-white">2.5 years of Hardware QA</span> precision into high-stakes Digital Product Design.
            </p>
          </div>

          <div className="hero-cta mt-16 inline-block">
            <a 
              href="#work"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 dark:bg-white text-white dark:text-black rounded-full text-lg font-bold tracking-tight hover:scale-105 transition-transform shadow-xl hover:shadow-2xl shadow-blue-900/5 dark:shadow-none"
            >
              View Gallery
              <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;