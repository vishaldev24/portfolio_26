import React from 'react';
import { motion } from 'framer-motion';
import { Search, GitBranch, PenTool, CheckCircle2, ClipboardCheck, Rocket } from 'lucide-react';

const MyProcess: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
      title: "Discover",
      description: "Contextual user interviews, empathy mapping, competitive analysis. I talk to users before I open Figma."
    },
    {
      icon: <GitBranch className="w-6 h-6 text-white" />,
      color: "bg-indigo-500",
      title: "Define",
      description: "User flows, information architecture, problem framing. Clarity before pixels."
    },
    {
      icon: <PenTool className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
      title: "Design",
      description: "Wireframes to high-fidelity UI. Token-first design systems from day one. WCAG 2.2 AA baked in."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
      color: "bg-emerald-500",
      title: "Validate",
      description: "Usability testing with Maze, accessibility audits with Lighthouse, iteration based on real feedback."
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
      title: "Handoff",
      description: "Figma Dev Mode with token-referenced fills, Auto Layout components, annotated interactions."
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      color: "bg-rose-500",
      title: "Ship",
      description: "Frontend-aware prototyping in React and Tailwind when needed. I don't just hand off — I help implement."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-charcoal-900">
      <div className="max-w-3xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-white mb-4">
            My Approach
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">Research first. Design second. Systems always.</p>
        </motion.div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-neutral-200 dark:bg-neutral-800" />
          
          {steps.map((step, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-8 mb-12 last:mb-0"
            >
              <div className={`flex-shrink-0 w-14 h-14 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                {step.icon}
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProcess;
