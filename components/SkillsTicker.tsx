import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  Figma, 
  Layout, 
  Cpu,
  BrainCircuit,
  Box,
  Infinity,
  ArrowRight,
  X,
  Award
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
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const certs = [
    {
      img: "https://i.postimg.cc/2Ss8wpyJ/certification.png",
      title: "Google UX Design Professional Certificate",
      desc: "Coursera (2025)"
    },
    {
      img: "https://i.postimg.cc/ZRST3rnK/Screenshot-2026-05-29-145223.png",
      title: "Intermediate to Advanced: Professional Figma UI / UX Design Specialization",
      desc: "Coursera & Skillshare (Oct 2025)"
    }
  ];

  return (
    <section id="skills" className="w-full py-32 bg-paper-200 dark:bg-charcoal-900 border-y border-black/5 dark:border-white/5 transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="text-blue-600 dark:text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Future-Proofed Process</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-charcoal-900 dark:text-white">Capabilities <br/><span className="text-neutral-400">& Stack</span></h2>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative max-w-md"
          >
            <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Leveraging <span className="text-charcoal-900 dark:text-white font-medium italic">human-in-the-loop AI</span> and industrial precision to engineer interfaces that are technically sound and operationally resilient.
            </p>
          </motion.div>
        </div>

        <div className="space-y-12 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.slice(0, 2).map((cap, idx) => (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 md:p-10 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500"
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

          <div className="pt-12 border-t border-black/5 dark:border-white/10">
            {capabilities.slice(2).map((cap, idx) => (
              <motion.div
                key={cap.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-8 md:p-12 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500"
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
                 <button
                    onClick={() => setIsCertOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-500 transition-colors"
                 >
                    <Award size={14} />
                    Certifications
                 </button>
              </div>

               <AnimatePresence>
                {isCertOpen && (
                  <motion.div
                    key="cert-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[205] flex items-center justify-center p-4"
                  >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCertOpen(false)} />
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      className="relative bg-white dark:bg-charcoal-800 p-6 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                      <button
                        onClick={() => setIsCertOpen(false)}
                        className="absolute -top-3 -right-3 p-1 bg-white dark:bg-charcoal-900 rounded-full border shadow-sm z-10"
                      >
                        <X size={16} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certs.map((cert, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <img 
                                src={cert.img} 
                                alt={cert.title} 
                                className="w-full h-auto rounded-xl cursor-zoom-in hover:opacity-90 transition-opacity" 
                                onClick={() => setSelectedImage(cert.img)}
                            />
                            <div className="p-4 text-center">
                                <h4 className="font-bold text-sm text-charcoal-900 dark:text-white">{cert.title}</h4>
                                <p className="text-xs text-neutral-500">{cert.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                {selectedImage && (
                    <motion.div
                        key="zoomed-image-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/90"
                        onClick={() => setSelectedImage(null)}
                    >
                        <img src={selectedImage} alt="Zoomed Certification" className="max-w-full max-h-full object-contain rounded-lg" />
                    </motion.div>
                )}
              </AnimatePresence>

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
