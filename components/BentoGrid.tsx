
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import Tarang3D from './ui/Tarang3D';
import { ArrowUpRight, Shield, Activity, X, Play, HeartPulse, Wrench, Share2 } from 'lucide-react';
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
  repairo: {
    id: 'repairo',
    title: 'Repairo',
    category: 'Service Management',
    description: 'Repairo is a streamlined service management platform for repair and maintenance workflows.',
    technologies: ['React', 'Node.js', 'PostgreSQL']
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
          <span className="text-neutral-500 font-mono text-xs">[01 — 04]</span>
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
                 <div className="absolute top-6 right-6 z-20">
                   <Tarang3D />
                 </div>
                 <div className="absolute top-6 right-20 z-20">
                   <Share2 className="w-6 h-6 text-white/50" />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent pointer-events-none" />
              </div>
                             <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white pointer-events-none">
                  <div className="absolute top-6 left-6 z-20">
                      <img src="https://i.postimg.cc/8kJV8jhv/Adobe-Express-file-1.png" alt="Tarang Logo" className="w-[80px] h-[50px]" />
                  </div>
                  <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="font-serif text-3xl md:text-5xl font-bold mb-2 drop-shadow-2xl">Tarang</h3>
                    <p className="text-neutral-300 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-4">B2C Social | 2025 | Full Design System | Documented Pivot</p>
                    
                    <div className="space-y-3 text-neutral-200 text-xs md:text-sm mb-6 max-w-sm">
                      <p><strong className="text-white">Problem:</strong> Social media algorithms prioritize engagement over wellbeing.</p>
                      <p><strong className="text-white">Solution:</strong> Built the Shield feature — intent-first control over content.</p>
                      <p><strong className="text-white">Impact:</strong> Complete design system, mobile-first, scalable to tablet.</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wide">Skills: Product Strategy · Design System · Mobile-First · Motion Design</p>
                    </div>
                    
                    <div className="flex items-center gap-4 pointer-events-auto">
                      <motion.a 
                          href="https://tarang-case-study.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-[10px] md:text-xs tracking-wide border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          View Case Study →
                      </motion.a>
                      <motion.a 
                          href="https://revamp-shush-22720965.figma.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-[10px] md:text-xs tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                      >
                          Live Prototype →
                      </motion.a>
                    </div>
                  </div>
                </div>
            </TiltCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="aurakshan-card-wrapper md:col-span-2 block group relative overflow-visible cursor-pointer min-h-[450px]"
          >
            <TiltCard className="aurakshan-card h-full group relative overflow-visible bg-black">
               <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
                  <div className="absolute top-6 right-6 z-20">
                    <Shield className="w-12 h-12 text-indigo-500 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent pointer-events-none" />
               </div>
               
               <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white pointer-events-none">
                  <div className="absolute top-6 left-6 z-20">
                      <img src="https://i.postimg.cc/t4Vbh7g7/Whats-App-Image-2026-02-19-at-4-19-43-PM.jpg" alt="Aurakshan Logo" className="w-[80px] h-[50px] object-cover rounded" />
                  </div>
                  <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="font-serif text-3xl md:text-5xl font-bold mb-2 drop-shadow-2xl">Aurakshan</h3>
                    <p className="text-neutral-300 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-4">Safety Ecosystem | 2026 | 32 Screens | 8 User Interviews | Documented Pivot</p>
                    
                    <div className="space-y-3 text-neutral-200 text-xs md:text-sm mb-6 max-w-sm">
                      <p><strong className="text-white">Problem:</strong> Urban Indian women need a safety ecosystem — without surveillance.</p>
                      <p><strong className="text-white">Research:</strong> 8 interviews revealed always-on AI felt surveilled.</p>
                      <p><strong className="text-white">Pivot:</strong> Scrapped AI. Rebuilt with trauma-informed design.</p>
                      <p><strong className="text-white">Impact:</strong> 98/100 Lighthouse accessibility score.</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wide">Skills: User Research · Trauma-Informed Design · Accessibility · Feature Pivot</p>
                    </div>
                    
                    <div className="flex items-center gap-4 pointer-events-auto">
                      <motion.a 
                          href="https://aurakshan-cs-safe.lovable.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-[10px] md:text-xs tracking-wide border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          View Case Study →
                      </motion.a>
                      <motion.a 
                          href="https://memory-vary-27909173.figma.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-[10px] md:text-xs tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-blue-400/30"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          Live Prototype →
                      </motion.a>
                    </div>
                  </div>
                </div>
            </TiltCard>
          </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="repairo-card-wrapper md:col-span-2 block group relative overflow-visible cursor-pointer min-h-[450px]"
            >
              <TiltCard className="repairo-card h-full group relative overflow-visible bg-black">
                 <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
                    <div className="absolute top-6 right-6 z-20">
                      <Wrench className="w-12 h-12 text-blue-500 opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent pointer-events-none" />
                 </div>
                 
                 <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white pointer-events-none">
                    <div className="absolute top-6 left-6 z-20">
                        <img src="https://i.postimg.cc/43QfX9P5/Whats-App-Image-2026-07-06-at-12-37-08-PM.jpg" alt="Repairo Logo" className="w-[80px] h-[50px] object-cover rounded" />
                    </div>
                    <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="font-serif text-3xl md:text-5xl font-bold mb-2 drop-shadow-2xl">Repairo</h3>
                      <p className="text-neutral-300 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-4">B2B SaaS | 2026 | 85 Screens | Complete Design System</p>
                      
                      <div className="space-y-3 text-neutral-200 text-xs md:text-sm mb-6 max-w-sm">
                        <p><strong className="text-white">Problem:</strong> Traditional form-based job tracking created friction for low-literacy repair workers.</p>
                        <p><strong className="text-white">Solution:</strong> Photo-first documentation, icon-based navigation, removing literacy barriers.</p>
                        <p><strong className="text-white">Impact:</strong> 2,244+ token-referenced fill bindings across 85 screens. Dev-handoff ready.</p>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-wide">Skills: Low-Literacy UX · Design Tokens · Auto Layout · Dev Handoff</p>
                      </div>
                      
                      <div className="flex items-center gap-4 pointer-events-auto">
                        <motion.a 
                            href="https://repairo-case-showcase.lovable.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-[10px] md:text-xs tracking-wide border border-white/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Case Study →
                        </motion.a>
                        <motion.a 
                            href="https://action-flee-78878932.figma.site/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-[10px] md:text-xs tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Live Prototype →
                        </motion.a>
                      </div>
                    </div>
                  </div>
              </TiltCard>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="meridian-card-wrapper md:col-span-2 block group relative overflow-visible cursor-pointer min-h-[450px]"
            >
              <TiltCard className="meridian-card h-full group relative overflow-visible bg-black">
                 <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
                    <div className="absolute top-6 right-6 z-20">
                      <Activity className="w-12 h-12 text-teal-500 opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent pointer-events-none" />
                 </div>
                 
                 <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12 text-white pointer-events-none">
                    <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="font-serif text-3xl md:text-5xl font-bold mb-2 drop-shadow-2xl">Meridian</h3>
                      <p className="text-neutral-300 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-4">Rapid Fintech Prototype | 2026 | v0 → Vercel | 15-Min Sprint</p>
                      
                      <div className="space-y-3 text-neutral-200 text-xs md:text-sm mb-6 max-w-sm">
                        <p><strong className="text-white">Description:</strong> Personal finance dashboard exploring daily spend tracking, category budgets, and transaction history. Built to test design-to-code velocity for fintech interfaces.</p>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-wide">Skills: Fintech UX · Design-to-Code · Rapid Prototyping · Performance Testing</p>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-wide">Lighthouse: 98 Performance · 94 Accessibility · 100 Best Practices · 100 SEO</p>
                      </div>
                      
                      <div className="flex items-center gap-4 pointer-events-auto">
                        <motion.a 
                            href="https://meridian-sage-six.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-[10px] md:text-xs tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Live Demo →
                        </motion.a>
                      </div>
                    </div>
                  </div>
              </TiltCard>
            </motion.div>

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
