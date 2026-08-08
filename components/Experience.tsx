
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, TrendingDown, Layers, Users, Award, ShieldCheck } from 'lucide-react';

const Experience: React.FC = () => {
  const learnings = [
    {
      icon: <Layers className="w-4 h-4" />,
      title: "Systems thinking",
      text: "Process optimization and structured workflows now applied to design systems and information architecture"
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "Zero-error discipline",
      text: "Edge-case coverage, error states, and quality-focused design reviews"
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Cross-functional communication",
      text: "Collaborating with product, engineering, and operations teams, now applied to stakeholder management and dev collaboration"
    }
  ];

  const roles = [];

  return (
    <section id="experience" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-paper-100 dark:bg-charcoal-950 transition-colors duration-500 relative">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
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
              className="relative sticky top-32"
            >
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                <h4 className="font-bold text-charcoal-900 dark:text-white mb-4">From QA Floor to Design Screen</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  My background in quality assurance isn't just past employment—it's a foundation for rigorous design thinking.
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
                  QA Specialist & Sub-Leader
                </h3>
                
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <h4 className="text-xl font-serif font-medium text-blue-600 dark:text-blue-400">
                    Radiant Appliances & Electronics
                  </h4>
                  <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
                  <p className="text-sm font-mono text-neutral-500 uppercase tracking-[0.2em]">2020 – 2023</p>
                </div>
                
                <p className="mt-6 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Led quality operations for global electronics brands (Samsung, OnePlus, Nokia, Itel, Panasonic, Motorola). Supervised 35+ inspectors, improved defect detection from 30% to 10%, trained 40+ team members.
                </p>
              </div>

              {/* What I learned */}
              <div className="mt-10">
                <h4 className="font-bold text-charcoal-900 dark:text-white mb-6">What I learned that makes me a better designer:</h4>
                <div className="space-y-4">
                  {learnings.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="p-5 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          {item.icon}
                        </div>
                        <h5 className="font-bold text-charcoal-900 dark:text-white">{item.title}</h5>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed ml-11">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
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
