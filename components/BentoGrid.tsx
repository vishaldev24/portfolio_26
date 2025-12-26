import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import Tarang3D from './ui/Tarang3D';
import { ArrowUpRight, Shield, Activity, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

const projectData: Record<string, ProjectDetails> = {
  neo: {
    id: 'neo',
    title: 'Neo-Finance',
    category: 'Design System & Data Vis',
    description: 'A comprehensive financial dashboard focusing on real-time data visualization and atomic design principles. Designed to reduce cognitive load for traders monitoring high-frequency data streams through adaptive color systems and hierarchical data presentation.',
    technologies: ['React', 'D3.js', 'TypeScript', 'Figma Variables']
  },
  automata: {
    id: 'automata',
    title: 'Automata',
    category: 'Hardware Control Interface',
    description: 'A robust interface for industrial automation, bridging physical hardware controls with digital twin technology. Features real-time WebSocket communication for sub-millisecond latency and 3D state representation for remote facility monitoring.',
    technologies: ['Electron', 'WebSockets', 'Three.js', 'IoT Protocols']
  }
};

const BentoGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  // GSAP Animation for cards entering viewport
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Main Card
        gsap.from(".tarang-card", {
            scrollTrigger: {
                trigger: ".tarang-card",
                start: "top 90%", // Trigger earlier
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });

        // Secondary cards stagger
        gsap.from(".secondary-card", {
            scrollTrigger: {
                trigger: ".tarang-card",
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.2
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-paper-200 dark:bg-charcoal-900 transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-6"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-charcoal-900 dark:text-white">Selected Work</h2>
          <span className="text-neutral-500 font-mono text-sm">[01 — 03]</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[500px]">
          
          {/* Main Feature Card - Tarang (Tilt Effect + 3D) */}
          <TiltCard className="tarang-card md:col-span-2 group cursor-pointer relative overflow-hidden opacity-100 will-change-transform"> 
            <div className="absolute inset-0 z-0">
               {/* Interactive 3D component */}
               <Tarang3D />
               
               {/* Gradient overlay to ensure text legibility */}
               <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/20 to-transparent dark:via-charcoal-900/50 pointer-events-none" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 text-white pointer-events-none">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase tracking-wider backdrop-blur-md bg-black/20">Super-App</span>
                  <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-serif text-5xl md:text-6xl font-bold mb-2">Tarang</h3>
                <p className="text-neutral-300 text-lg max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  The Intent-Driven Super-App designed to consolidate daily workflows.
                </p>
                
                {/* Hover Reveal UX Logic */}
                <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-medium">Privacy Shield</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-medium">Live Pulse</span>
                    </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Secondary Card 1 - Parallax Enabled */}
          <ParallaxCard 
            className="secondary-card md:col-span-1 group cursor-pointer bg-white dark:bg-white/5 shadow-sm"
            onClick={() => setSelectedProject(projectData.neo)}
            bgContent={
              <>
                 <img 
                  src="https://picsum.photos/600/800?blur=2" 
                  alt="Fintech Dashboard" 
                  className="w-full h-full object-cover opacity-40 dark:opacity-40" 
                />
                 <div className="absolute inset-0 bg-white/80 dark:bg-charcoal-900/60 transition-opacity group-hover:opacity-80" />
              </>
            }
          >
             <div className="relative z-10 h-full flex flex-col justify-between p-8 pointer-events-none">
               <div className="self-end">
                <ArrowUpRight className="w-6 h-6 text-charcoal-900 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
               </div>
               <div>
                 <h4 className="font-serif text-2xl font-bold mb-2 text-charcoal-900 dark:text-white">Neo-Finance</h4>
                 <p className="text-neutral-600 dark:text-neutral-500 text-sm">Design System & Data Vis</p>
               </div>
             </div>
          </ParallaxCard>

          {/* Secondary Card 2 - Parallax Enabled */}
          <ParallaxCard 
            className="secondary-card md:col-span-1 group cursor-pointer shadow-sm bg-white dark:bg-white/5"
            onClick={() => setSelectedProject(projectData.automata)}
            bgContent={
               <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-700 dark:to-charcoal-900" />
            }
          >
            <div className="relative z-10 h-full flex flex-col justify-between p-8 pointer-events-none">
               <div className="self-end">
                <ArrowUpRight className="w-6 h-6 text-charcoal-900 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
               </div>
               <div>
                 <h4 className="font-serif text-2xl font-bold mb-2 text-charcoal-900 dark:text-white">Automata</h4>
                 <p className="text-neutral-600 dark:text-neutral-500 text-sm">Hardware Control Interface</p>
               </div>
             </div>
          </ParallaxCard>

             {/* Secondary Card 3 - Text Only / Concept */}
           <GlassCard 
            className="secondary-card md:col-span-2 group cursor-pointer bg-white dark:bg-white/5 shadow-sm"
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                <h4 className="font-serif text-3xl md:text-4xl font-bold text-charcoal-900 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                  Case Study: Reducing Error Rates by 40%
                </h4>
                <p className="mt-4 text-neutral-500">Coming Soon</p>
            </div>
          </GlassCard>

        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}
                    className="absolute inset-0 bg-paper-200/80 dark:bg-charcoal-900/80 backdrop-blur-xl transition-colors duration-500"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10"
                >
                    <button 
                        onClick={() => setSelectedProject(null)} 
                        className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors z-20 group"
                    >
                        <X className="w-5 h-5 text-charcoal-900 dark:text-white group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div className="p-8 md:p-12 relative overflow-hidden">
                         {/* Decorative gradient blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-mono font-medium tracking-wider uppercase border border-blue-200 dark:border-blue-500/20">
                                {selectedProject.category}
                            </span>
                            
                            <h3 className="font-serif text-4xl md:text-5xl font-bold text-charcoal-900 dark:text-white mb-6">
                                {selectedProject.title}
                            </h3>
                            
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
                                {selectedProject.description}
                            </p>

                            <div className="border-t border-black/5 dark:border-white/5 pt-8">
                                <h4 className="text-xs font-mono uppercase text-neutral-500 mb-4 tracking-widest">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies.map(tech => (
                                        <span key={tech} className="px-4 py-2 bg-paper-200 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-sm font-medium text-charcoal-900 dark:text-white hover:border-blue-500/50 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// 3D Tilt Component
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]); // Reduced tilt for subtlety
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-charcoal-900 ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Parallax Card Component
const ParallaxCard = ({ 
  children, 
  className, 
  bgContent,
  onClick
}: { 
  children: React.ReactNode, 
  className?: string, 
  bgContent: React.ReactNode,
  onClick?: () => void
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // Add spring physics for smoother follow
    const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

    const xMove = useTransform(xSpring, [-0.5, 0.5], [15, -15]); // Opposite direction: mouse right -> image left
    const yMove = useTransform(ySpring, [-0.5, 0.5], [15, -15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <GlassCard
            className={`${className} overflow-hidden`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
             <div className="absolute inset-0 z-0 pointer-events-none">
                 <motion.div 
                    style={{ x: xMove, y: yMove, scale: 1.15 }}
                    className="w-full h-full"
                 >
                    {bgContent}
                 </motion.div>
             </div>
             {children}
        </GlassCard>
    );
};

export default BentoGrid;