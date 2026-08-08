import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Accessibility, Code2 } from 'lucide-react';

const WhyHireMe: React.FC = () => {
  const points = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: "Zero-Error Discipline",
      description: "3 years in QA leadership for Samsung, OnePlus, Nokia. I design edge cases, error states, and empty states most designers miss."
    },
    {
      icon: <Layers className="w-8 h-8 text-indigo-500" />,
      title: "Token-First Systems",
      description: "I build design systems with 62+ variables and 2,244+ token bindings. Scalable. Maintainable. Dev-handoff ready."
    },
    {
      icon: <Accessibility className="w-8 h-8 text-emerald-500" />,
      title: "Accessibility by Default",
      description: "WCAG 2.2 AA practitioner. 98/100 Lighthouse score. Not an afterthought — baked into every decision."
    },
    {
      icon: <Code2 className="w-8 h-8 text-orange-500" />,
      title: "Frontend-Aware",
      description: "React, Tailwind CSS, GitHub. I prototype in code when needed. My handoffs don't get lost in translation."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-neutral-50 dark:bg-charcoal-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-white mb-4">
            What Makes Me Different
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="mb-6">{point.icon}</div>
              <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">{point.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;
