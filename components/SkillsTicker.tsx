
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  Figma, 
  Layout, 
  Cpu,
  BrainCircuit,
  Box,
  Infinity,
  ArrowRight
} from 'lucide-react';

const capabilities = [
  {
    category: "Product Thinking & UX",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    items: [
      "Problem Framing & Requirement Structuring",
      "User Flow Design & Information Architecture",
      "Interaction Design & Micro-interactions",
      "Usability Testing & Iterative Refinement",
      "Behavioral & Ethical Design Principles",
      "Accessibility-aware Systems"
    ]
  },
  {
    category: "Systems & Scalable UI",
    icon: <Layers className="w-5 h-5" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    items: [
      "Design Systems & Component Architecture",
      "Token Structuring & Variant Scaling",
      "Responsive & Adaptive Layout Systems",
      "Pattern Consistency Across Multi-Screen Products",
      "Developer-ready Handoff Documentation"
    ]
  },
  {
    category: "AI-Integrated Workflow",
    icon: <BrainCircuit className="w-5 h-5" />,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    items: [
      "AI-assisted research synthesis & insight clustering",
      "AI-accelerated wireframing & layout scaffolding",
      "Human-in-the-loop AI system design (confidence states, feedback loops, override patterns)",
      "AI-assisted copy generation with structured refinement",
      "Feasibility validation through AI-assisted prototyping"
    ],
    summary: "I use AI as a structured co-pilot — accelerating exploration while retaining human judgment, system integrity, and product accountability."
  }
];

const techStack = [
  {
    title: "Design",
    tools: ["Figma (Components, Variants, Auto-layout, Prototyping)", "FigJam", "Framer", "Spline (3D Interaction Basics)"],
    icon: <Figma size={18} />
  },
  {
    title: "AI Tools",
    tools: ["Figma AI", "Claude (Structured Ideation & System Drafting)", "LLM-assisted Research & Copy Refinement"],
    icon: <Zap size={18} />
  },
  {
    title: "Frontend Awareness",
    tools: ["HTML", "CSS", "JavaScript", "React (Foundational)"],
    icon: <Layout size={18} />
  },
  {
    title: "Collaboration & Deployment",
    tools: ["Notion", "Jira", "Git", "GitHub", "Vercel"],
    icon: <Infinity size={18} />
  }
];

const SkillsTicker: React.FC = () => {
  return (
    <section id="skills" className="w-full py-32 bg-paper-200 dark:bg-charcoal-900 border-y border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Future-Proofed Process</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-charcoal-900 dark:text-white">Capabilities <br/><span className="text-neutral-400">& Stack</span></h2>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="max-w-md"
          >
            <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Leveraging <span className="text-charcoal-900 dark:text-white font-medium italic">human-in-the-loop AI</span> and industrial precision to engineer interfaces that are technically sound and operationally resilient.
            </p>
          </motion.div>
        </div>

        {/* Capabilities Grid - Restructured */}
        <div className="space-y-12 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.slice(0, 2).map((cap, idx) => (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className={`w-10 h-10 rounded-xl ${cap.bg} ${cap.color} flex items-center justify-center mb-8`}>
                  {cap.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal-900 dark:text-white mb-6 tracking-tight">
                  {cap.category}
                </h3>
                <ul className="space-y-4">
                  {cap.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className={`mt-1 w-3.5 h-3.5 ${cap.color} flex-shrink-0`} />
                      <span className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* AI Workflow with divider line */}
          <div className="pt-12 border-t border-black/5 dark:border-white/10">
            {capabilities.slice(2).map((cap, idx) => (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                   <div className="lg:col-span-5">
                      <div className={`w-10 h-10 rounded-xl ${cap.bg} ${cap.color} flex items-center justify-center mb-8`}>
                        {cap.icon}
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-charcoal-900 dark:text-white mb-6 tracking-tight">
                        {cap.category}
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed italic">
                        {cap.summary}
                      </p>
                   </div>
                   <div className="lg:col-span-7">
                      <ul className="space-y-4">
                        {cap.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <ArrowRight className={`mt-1 w-3.5 h-3.5 ${cap.color} flex-shrink-0`} />
                            <span className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-tight">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack - Slightly smaller text weight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-charcoal-950 p-8 md:p-12 overflow-hidden border border-white/5"
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.08),transparent_70%)]" />
           
           <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <Box size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-serif text-3xl font-bold">Tech Stack & Tooling</h3>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {techStack.map((stack, idx) => (
                  <motion.div 
                    key={stack.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-6 text-blue-400">
                       {stack.icon}
                       <h4 className="text-[10px] uppercase font-mono tracking-[0.3em] font-bold">{stack.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stack.tools.map(tool => (
                        <span key={tool} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-neutral-400 font-light hover:text-white transition-colors duration-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
                 <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                   <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Workflow Augmented by AI</p>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                    <span>// Human judgment prioritized</span>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsTicker;
