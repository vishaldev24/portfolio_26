import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    title: "Design",
    items: ["Figma & FigJam", "Figma AI (Agent, Make)", "Design Systems & Tokens", "Auto Layout & Components", "Prototyping & Motion", "Spline (3D)"]
  },
  {
    title: "UX process",
    items: ["User Research & Interviews", "Empathy Mapping", "User Flows & Journey Maps", "Wireframing", "Usability Testing (Maze)", "Information Architecture"]
  },
  {
    title: "Systems & Access",
    items: ["Design Tokens & Variables", "WCAG 2.2 AA", "Lighthouse Audits", "Dev Handoff (Figma Dev Mode)", "Annotation & Specs", "Cross-functional Collaboration"]
  },
  {
    title: "Code & AI",
    items: ["React.js", "HTML/CSS & Tailwind", "JavaScript", "GitHub", "Claude AI", "LLM-Assisted Workflows", "Google Analytics"]
  }
];

const SkillsGrid: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-neutral-50 dark:bg-charcoal-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-white mb-20 text-center"
        >
          Tools & Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((category, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-sm font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((skill, j) => (
                  <motion.li 
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="flex items-center gap-2 text-charcoal-800 dark:text-neutral-200 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
