
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import Tarang3D from './ui/Tarang3D';
import { ArrowUpRight, Shield, Activity, X, Play, HeartPulse } from 'lucide-react';
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
  aurakshan: {
    id: 'aurakshan',
    title: 'Aurakshan',
    category: 'Safety & Emergency Response',
    description: 'A safety-first ecosystem combining physical emergency response and digital identity protection (Dristi). Designed for high-stakes environments where immediate physical action meets secure data integrity.',
    technologies: ['React Native', 'Biometrics', 'Real-time GPS', 'Secure Mesh']
  },
  vitalis: {
    id: 'vitalis',
    title: 'Vitalis',
    category: 'Health Tech',
    description: 'A data-driven health monitoring platform designed for proactive wellness. Integrates wearable telemetry with predictive AI to detect early physiological shifts, ensuring a "zero-failure" approach to personal health management.',
    technologies: ['React', 'Next.js', 'AI/ML', 'Bluetooth Low Energy']
  }
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || window.innerWidth < 768) return;
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
                transformStyle: "flat", // Crucial: prevents canvas depth fighting
                perspective: 1200,
            }}
            className={`relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-charcoal-950 border border-white/5 ${className}`}
        >
            {children}
        </motion.div>
    );
}

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  bgContent: React.ReactNode;
  onClick?: () => void;
  index?: number;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ 
  children, 
  className, 
  bgContent,
  onClick,
  index = 0
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

    const xMove = useTransform(xSpring, [-0.5, 0.5], [10, -10]);
    const yMove = useTransform(ySpring, [-0.5, 0.5], [10, -10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 768) return;
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
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
          className="h-full relative"
        >
            <GlassCard
                className={`${className} overflow-hidden h-full`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div 
                        style={{ x: xMove, y: yMove, scale: 1.1 }}
                        className="w-full h-full"
                    >
                        {bgContent}
                    </motion.div>
                </div>
                {children}
            </GlassCard>
        </motion.div>
    );
};

const BentoGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".tarang-card-wrapper", {
            scrollTrigger: {
                trigger: ".tarang-card-wrapper",
                start: "top 95%",
                toggleActions: "play none none reverse",
                // Ensure the animation is as stable as possible
                fastScrollEnd: true,
                preventOverlaps: true,
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTarangClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.demo-button')) {
      window.open('https://tarang-case-study.vercel.app', '_blank');
    }
  };

  return (
    <section ref={sectionRef} id="work" className="w-full py-24 md:py-32 px-4 md:px-12 lg:px-24 bg-paper-200 dark:bg-charcoal-900 transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 md:mb-16 flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-6"
        >
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative font-serif text-3xl md:text-5xl font-semibold tracking-tight text-charcoal-900 dark:text-white"
            >
              Selected Work
            </motion.h2>
          </div>
          <span className="text-neutral-500 font-mono text-xs">[01 — 03]</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:auto-rows-[500px]">
          
          <motion.div 
            onClick={handleTarangClick}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="tarang-card-wrapper md:col-span-2 block group relative overflow-visible cursor-pointer min-h-[450px]"
          >
            <TiltCard className="tarang-card h-full group relative overflow-visible"> 
              {/* Force the container to be solid to prevent context blanking */}
              <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
                 <Tarang3D />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent pointer-events-none" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white pointer-events-none">
                <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center justify-between mb-4">
                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 md:group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <h3 className="font-serif text-4xl md:text-6xl font-bold mb-2 drop-shadow-2xl">Tarang</h3>
                  <p className="text-neutral-300 text-sm md:text-lg max-w-md md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6 md:mb-8">
                    The Intent-Driven Super-App designed to consolidate daily workflows with advanced content safety protocols.
                  </p>
                  
                  <div className="flex items-center gap-4 pointer-events-auto">
                    <motion.a 
                        href="https://revamp-shush-22720965.figma.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="demo-button inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-blue-600 text-white font-bold text-[10px] md:text-xs tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Play size={10} className="fill-current" />
                        Live App
                    </motion.a>
                    <motion.a 
                        href="https://tarang-case-study.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/10 text-white font-bold text-[10px] md:text-xs tracking-wide border border-white/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Case Study
                    </motion.a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={containerVariants} 
            className="h-[400px] md:h-full"
          >
            <ParallaxCard 
              index={1}
              className="secondary-card md:col-span-1 group cursor-pointer bg-white dark:bg-white/5 aurakshan-card active:bg-neutral-200 dark:active:bg-white/15 transition-colors duration-150"
              bgContent={
                <>
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                   <img 
                    src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=600&h=800&blur=10" 
                    alt="Aurakshan Safety" 
                    className="w-full h-full object-cover opacity-20 dark:opacity-40" 
                  />
                </>
              }
            >
               <motion.div variants={itemVariants} className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                 <motion.div variants={itemVariants} className="self-end">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 group-hover:scale-110 transition-transform" />
                 </motion.div>
                 <motion.div variants={itemVariants} className="pointer-events-none">
                   <h4 className="font-serif text-xl md:text-2xl font-bold mb-2 text-charcoal-900 dark:text-white">Aurakshan</h4>
                   <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-mono mb-2 md:mb-3 uppercase tracking-wider">Safety & Response</p>
                   <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 md:mb-6 leading-relaxed">
                     A safety ecosystem combining physical response and digital identity protection (Dristi).
                   </p>
                 </motion.div>
                 <motion.div variants={itemVariants} className="flex items-center gap-3 pointer-events-auto">
                    <motion.a 
                        href="https://aurakshan-cs-safe.lovable.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-bold text-[10px] md:text-xs tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Case Study
                    </motion.a>
                    <motion.a 
                        href="https://memory-vary-27909173.figma.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 text-white dark:bg-white/10 dark:text-white font-bold text-[10px] md:text-xs tracking-wide border border-neutral-800 dark:border-white/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Live App
                    </motion.a>
                 </motion.div>
               </motion.div>
            </ParallaxCard>
          </motion.div>

          <div className="h-[400px] md:h-full">
            <ParallaxCard 
              index={2}
              className="secondary-card md:col-span-1 group cursor-pointer shadow-sm bg-white dark:bg-white/5"
              onClick={() => setSelectedProject(projectData.vitalis)}
              bgContent={
                 <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/10 to-transparent" />
              }
            >
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 pointer-events-none">
                 <div className="self-end">
                  <HeartPulse className="w-5 h-5 md:w-6 md:h-6 text-rose-500 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                   <h4 className="font-serif text-xl md:text-2xl font-bold mb-2 text-charcoal-900 dark:text-white">Vitalis</h4>
                   <div className="flex items-center justify-between mb-2 md:mb-3">
                     <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-mono uppercase tracking-wider">Health Tech</p>
                     <span className="px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[9px] font-mono uppercase">Adding Soon</span>
                   </div>
                   <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 md:mb-6 leading-relaxed">
                     Data-driven health monitoring designed for proactive wellness and predictive telemetry.
                   </p>
                   <span className="text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold tracking-widest uppercase">[ View Case Study → ]</span>
                 </div>
               </div>
            </ParallaxCard>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProject(null)}
                    className="absolute inset-0 bg-paper-200/90 dark:bg-charcoal-900/90 backdrop-blur-md"
                />
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 450 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 z-10 max-h-[90vh] flex flex-col"
                >
                    <button 
                        onClick={() => setSelectedProject(null)} 
                        className="absolute top-4 md:top-6 right-4 md:right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors z-20"
                        aria-label="Close Modal"
                    >
                        <X className="w-4 h-4 md:w-5 md:h-5 text-charcoal-900 dark:text-white" />
                    </button>

                    <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="inline-block px-3 py-1 mb-4 md:mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] md:text-xs font-mono uppercase tracking-wider"
                        >
                            {selectedProject.category}
                        </motion.span>
                        
                        <motion.h3 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-3xl md:text-4xl font-bold text-charcoal-900 dark:text-white mb-4 md:mb-6"
                        >
                            {selectedProject.title}
                        </motion.h3>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 md:mb-8"
                        >
                            {selectedProject.description}
                        </motion.p>

                        <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                                <motion.span 
                                    key={tech} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="px-3 py-1.5 bg-paper-200 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-xs font-medium text-charcoal-900 dark:text-white"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BentoGrid;
