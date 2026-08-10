
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { User, Terminal, Cpu, Globe, Zap, Settings, Command } from 'lucide-react';

const FloatingChip = ({ children, icon: Icon, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ 
      delay, 
      duration: 1.2, 
      ease: [0.19, 1, 0.22, 1] 
    }}
    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-charcoal-800/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg group hover:bg-white/20 dark:hover:bg-charcoal-700/60 transition-colors`}
  >
    <Icon size={12} className={color} />
    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">{children}</span>
  </motion.div>
);

const AboutMonitor: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTarget, setScrollTarget] = React.useState<HTMLElement | null>(null);
  
  React.useLayoutEffect(() => {
    if (containerRef.current) {
      setScrollTarget(containerRef.current);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTarget ? { current: scrollTarget } : undefined,
    offset: ["start end", "end start"]
  });

  // Smoothed spatial parallax effects
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const rawY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const y = useSpring(rawY, springConfig);
  const scale = useSpring(rawScale, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 1.4, 
        ease: [0.19, 1, 0.22, 1] 
      } 
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-10 md:py-20"
      style={{ position: 'relative', perspective: '2000px' }}
    >
      
      {/* Background Floating Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute -top-10 -right-20 pointer-events-none opacity-20 dark:opacity-40"
      >
        <Command size={180} strokeWidth={0.5} className="text-blue-500" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        style={{ rotateX, y, scale }}
        className="relative z-10 w-full perspective-2000"
      >
        {/* The Main Glass Workbench */}
        <div className="relative bg-white/20 dark:bg-charcoal-800/30 backdrop-blur-3xl rounded-[3rem] border border-white/40 dark:border-white/10 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] dark:shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] overflow-visible">
          
          {/* Kinetic Scan Line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-20 pointer-events-none"
          />

          {/* Workbench Controls Overlay */}
          <div className="absolute -top-6 -left-6 flex flex-col gap-3 z-30">
             <FloatingChip icon={Zap} color="text-yellow-500" delay={0.4}>Precision Mode</FloatingChip>
             <FloatingChip icon={Settings} color="text-blue-500" delay={0.5}>System Thinking</FloatingChip>
          </div>

          <div className="absolute -bottom-6 -right-6 flex flex-col gap-3 z-30">
             <FloatingChip icon={Globe} color="text-green-500" delay={0.6}>Global Scalability</FloatingChip>
          </div>

          {/* Inner Content Area */}
          <div className="p-10 md:p-20 relative overflow-hidden">
             {/* Subgrid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 max-w-3xl">
                <motion.div variants={itemVariants} className="mb-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <User size={32} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-serif text-3xl md:text-5xl font-bold text-charcoal-900 dark:text-white">Vishal Rathod</h3>
                        <div className="flex items-center gap-2 mt-2">
                             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">Operating System: Design</span>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-10">
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl font-medium leading-relaxed text-charcoal-900 dark:text-white">
                        Most junior designers come from bootcamps. I come from a manufacturing floor where a single defect meant a returned product and a lost customer.
                    </motion.p>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-black/5 dark:border-white/5">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Terminal size={16} />
                                <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest">QA Foundation</h4>
                            </div>
                            <p className="text-sm md:text-base font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                                For 3 years, I led QA operations at Radiant Appliances & Electronics, supervising inspectors for global brands — Samsung, OnePlus, Nokia, Itel, Panasonic, and Motorola. I improved defect detection rates through structured testing workflows and trained teams on customer empathy.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                                <Cpu size={16} />
                                <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest">System Ethos</h4>
                            </div>
                            <p className="text-sm md:text-base font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                                That zero-error mindset and systems thinking are now the foundation of how I approach product design. I don't just design the happy path. I design for edge cases, error states, accessibility gaps, and the users everyone else forgets.
                            </p>
                        </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-base md:text-lg font-light leading-relaxed text-neutral-600 dark:text-neutral-400 border-l-2 border-blue-500/30 pl-6">
                        In 2025, I completed the Google UX Design Professional Certificate and have since built three production-level products from scratch — each with complete design systems, documented research, working prototypes, and dev-ready handoffs.

                        I'm not looking for a job where I push pixels. I'm looking for a team where I can own features, research real users, and build products that work for everyone.
                    </motion.p>
                </div>

                {/* Kinetic Footer Data */}
                <motion.div variants={itemVariants} className="mt-16 pt-8 flex items-center justify-between opacity-40">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500" />)}
                        </div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500">Google UX Design Certificate — 2025</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500">3 End-to-End Product Design Case Studies — 2025</span>
                </motion.div>
            </div>
          </div>
          
          {/* Glass Glare Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50 dark:opacity-20 rounded-[3rem]" />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMonitor;
