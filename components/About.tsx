import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-paper-200 dark:bg-charcoal-900 relative border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative">
        
        {/* Left Column - Headline - Sticky Container */}
        {/* Ensure full height for sticky behavior */}
        <div className="md:col-span-5 relative hidden md:block h-full">
          <div className="sticky top-32">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
             >
                <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-charcoal-900 dark:text-white leading-none">
                  From QA<br />
                  <span className="text-neutral-400 dark:text-neutral-600 italic">to UX.</span>
                </h2>
                <div className="h-1 w-24 bg-charcoal-900 dark:bg-white mt-8" />
             </motion.div>
          </div>
        </div>
        
        {/* Mobile Headline (Non-sticky) */}
         <div className="md:col-span-5 md:hidden mb-8">
            <h2 className="font-serif text-5xl font-bold tracking-tight text-charcoal-900 dark:text-white leading-none">
                From QA<br />
                <span className="text-neutral-400 dark:text-neutral-600 italic">to UX.</span>
            </h2>
            <div className="h-1 w-24 bg-charcoal-900 dark:bg-white mt-8" />
        </div>

        {/* Right Column - Narrative text */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-24 md:space-y-32 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="will-change-transform"
            >
                <p className="text-2xl md:text-4xl font-light leading-relaxed text-charcoal-900 dark:text-white">
                  Before pixels, I dealt with circuits. Spending <strong className="font-semibold text-charcoal-900 dark:text-white border-b-2 border-blue-500">2.5 years in electronics manufacturing</strong> taught me that a "bug" isn't just an inconvenience—it's a hardware failure.
                </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="will-change-transform"
            >
                <p className="text-2xl md:text-4xl font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                  I apply the same rigorous <span className="text-charcoal-900 dark:text-white font-medium">Root Cause Analysis</span> to UI/UX. I don't just design "happy paths"; I engineer systems that prevent user error before it happens.
                </p>
            </motion.div>

             <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="will-change-transform"
            >
                <p className="text-xl md:text-2xl font-mono text-blue-600 dark:text-blue-400">
                  // Zero Tolerance for Ambiguity
                </p>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;