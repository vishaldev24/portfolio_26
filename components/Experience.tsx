
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, TrendingDown, Layers, Users, Award, ShieldCheck } from 'lucide-react';

const Experience: React.FC = () => {
  const highlights = [
    {
      icon: <TrendingDown className="w-4 h-4" />,
      text: "Reduced rejection rates from 30% to 10%, achieving 3% stability on targeted models"
    },
    {
      icon: <Layers className="w-4 h-4" />,
      text: "Implemented a severity-based classification system (P0/P1/P2) to optimize workflow prioritization"
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "Led day-to-day shift operations for 35+ team members"
    },
    {
      icon: <Award className="w-4 h-4" />,
      text: "Trained and mentored 40+ inspectors"
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      text: "Recognized multiple times for quality detection accuracy"
    }
  ];

  const roles = [
    "Line Inspector",
    "QA Inspector",
    "OQC Inspector",
    "Sub-Leader / Dispatch Inspector"
  ];

  return (
    <section id="experience" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-paper-100 dark:bg-charcoal-950 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-blue-600 dark:text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Industrial Precision</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-charcoal-900 dark:text-white">Professional Experience</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Context & Progression */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="mb-10">
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6">Career Trajectory</p>
                <div className="space-y-4">
                  {roles.map((role, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                       <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === roles.length - 1 ? 'bg-blue-600 scale-125 shadow-[0_0_8px_rgba(37,99,235,0.6)]' : 'bg-neutral-300 dark:bg-neutral-800'}`} />
                       <span className={`text-sm font-medium tracking-tight transition-colors duration-300 ${idx === roles.length - 1 ? 'text-charcoal-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-500'}`}>
                         {role}
                       </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                  "Developed a systems-driven mindset focused on structured workflows and measurable impact."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Main Experience Details */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Company Header */}
              <div className="mb-8">
                <h3 className="font-display text-3xl md:text-4xl font-extrabold text-charcoal-900 dark:text-white tracking-tight">
                  Radiant Appliances & Electronics Pvt. Ltd.
                </h3>
                
                {/* 24-32px spacing as requested between Company and Title section */}
                <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl md:text-2xl font-serif font-medium text-blue-600 dark:text-blue-400">
                      Sub-Leader – Quality Operations
                    </h4>
                    <p className="text-sm font-mono text-neutral-500 uppercase tracking-[0.2em] mt-1">2020 – 2023</p>
                  </div>
                  <div className="h-px flex-grow bg-black/5 dark:bg-white/5 mx-4 hidden sm:block" />
                  <CheckCircle2 className="text-neutral-300 dark:text-neutral-700 w-8 h-8 hidden sm:block" />
                </div>
              </div>

              {/* Tight Bullets with 12-16px spacing */}
              <div className="space-y-4 mt-10">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-black/5 dark:hover:border-white/5 hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 group cursor-default"
                  >
                    <div className="mt-1.5 flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-snug font-normal">
                      • {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Visual Closure */}
              <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/10 flex items-center justify-between opacity-50">
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-neutral-400 rounded-full" />)}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em]">End_of_Transmission</span>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Experience;
