import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Vishal's ability to pivot based on user feedback is rare at any level. When 7 out of 10 users rejected the AI feature, he didn't defend his design — he rebuilt it. That's product thinking.",
    author: "Mentor, Google UX Certificate Program"
  },
  {
    quote: "The token system he built for Repairo is cleaner than what I've seen from designers with 5 years of experience. His QA background shows in the precision of every component.",
    author: "Peer Reviewer, Design Community"
  }
];

const Validation: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-charcoal-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
          <h2 className="text-sm font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            Validation
          </h2>
          <p className="text-3xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-white">
            What collaborators say.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-neutral-50 dark:bg-charcoal-950 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-blue-500/20 mb-6" />
              <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>
              <p className="font-bold text-charcoal-900 dark:text-white border-t border-neutral-200 dark:border-neutral-800 pt-6">
                {t.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Validation;
