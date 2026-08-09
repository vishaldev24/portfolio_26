import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Globe, Zap } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Let's Build Together
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            I'm looking for a team that values craft, research, and products that don't break.
          </p>
          <p className="text-white font-medium text-lg">
            Open to Associate and Junior Product Designer roles in Hyderabad or remote.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Mail, label: 'Email', value: 'vishaldev2401@gmail.com', href: 'mailto:vishaldev2401@gmail.com' },
            { icon: Phone, label: 'Phone', value: '+91 63032 04956', href: 'tel:+916303204956' },
            { icon: Linkedin, label: 'LinkedIn', value: 'vishal-rathod-productdesigner', href: 'https://linkedin.com/in/vishal-rathod-productdesigner' },
            { icon: Globe, label: 'Portfolio', value: 'portfolio-26-azure-five.vercel.app', href: 'https://portfolio-26-azure-five.vercel.app' },
            { icon: Zap, label: 'Availability', value: 'Immediate' },
          ].map((item, i) => (
            <motion.a 
                key={i}
                href={item.href}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-3 ${item.href ? 'hover:bg-neutral-800 hover:border-blue-500/50 transition-all duration-300' : ''}`}
            >
              <item.icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-neutral-500 text-xs">{item.label}</p>
                <p className="font-bold text-neutral-200 text-sm truncate">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
