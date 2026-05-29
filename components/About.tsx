
import React from 'react';
import { motion } from 'framer-motion';
import SystemDiagnostics from './ui/SystemDiagnostics';
import AboutMonitor from './ui/AboutMonitor';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full py-24 md:py-32 px-4 md:px-12 lg:px-24 bg-paper-200 dark:bg-charcoal-900 relative border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 md:opacity-20 brightness-100 dark:brightness-50 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-24 relative z-10">
        
        {/* Left Column - Headline & Diagnostics - Sticky Container */}
        <div className="md:col-span-4 relative hidden md:block min-h-[70vh]">
          <div className="sticky top-24 md:top-32 w-full flex flex-col justify-start">
             
             <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mb-8 md:mb-12"
             >
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 dark:text-white leading-[1.1]">
                  <span className="opacity-40 block mb-2">From Quality Systems</span>
                  <span className="opacity-100 italic">to Digital Products.</span>
                </h2>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                  className="relative h-1 w-20 md:w-24 bg-charcoal-900 dark:bg-white mt-6 md:mt-8 origin-left" 
                />
                
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="relative mt-6 md:mt-8 text-xs font-mono text-neutral-500 max-w-xs"
                >
                    Root cause analysis applied to human-computer interaction.
                </motion.p>
             </motion.div>

             <motion.div
                initial={{ opacity: 0, y: 60, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
             >
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-8 md:mt-12 overflow-hidden rounded-2xl shadow-xl"
             >
                <img src="https://i.postimg.cc/x83ngBwN/profile.jpg" alt="Vishal Rathod" className="w-full h-auto object-cover" />
             </motion.div>
                 <SystemDiagnostics />
             </motion.div>

          </div>
        </div>
        
        {/* Mobile View Headline & Diagnostics */}
         <div className="md:col-span-5 md:hidden mb-12 relative flex flex-col items-center text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-charcoal-900 dark:text-white leading-[1.1] relative z-10">
                <span className="opacity-40 block mb-1">From Quality Systems</span>
                <span className="opacity-100 italic">to Digital Products.</span>
            </h2>
            <div className="h-1 w-20 bg-charcoal-900 dark:bg-white mt-6 mb-10 relative z-10" />
            
            <div className="flex justify-center w-full max-w-[320px]">
                <SystemDiagnostics />
            </div>
        </div>

        {/* Right Column - Narrative text within Spatial Workbench */}
        <div className="md:col-span-8 flex flex-col justify-center relative">
           <AboutMonitor />
        </div>
      </div>
    </section>
  );
};

export default About;
