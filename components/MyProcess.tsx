import React from 'react';
import { motion } from 'framer-motion';

const MyProcess: React.FC = () => {
  const steps = [
    { title: "Discover", description: "Contextual user interviews, empathy mapping, and competitive analysis. I talk to users before I open Figma." },
    { title: "Define", description: "User flows, information architecture, and problem framing. Clarity before pixels." },
    { title: "Design", description: "Wireframes to high-fidelity UI. Token-first design systems from day one. WCAG 2.2 AA baked in, not bolted on." },
    { title: "Validate", description: "Usability testing with Maze, accessibility audits with Lighthouse, and iteration based on real feedback." },
    { title: "Handoff", description: "Figma Dev Mode with token-referenced fills, Auto Layout components, and annotated interactions. I speak developer." },
    { title: "Ship", description: "Frontend-aware prototyping in React and Tailwind when needed. I don't just hand off — I help implement." }
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-white dark:bg-charcoal-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-900 dark:text-white mb-3">
            My Approach
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">Research first. Design second. Systems always.</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 transition-colors duration-300 hover:border-blue-500/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">0{i+1}</div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{step.title}</h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-tight">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProcess;
