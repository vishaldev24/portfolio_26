import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Palette, Terminal, Zap, Database, Globe, Layers } from 'lucide-react';

const skillCategories = [
  {
    title: 'Design Systems',
    icon: <Palette size={16} />,
    skills: ['Figma', 'UI/UX', 'Interaction Design', 'Prototyping', 'Design Ops'],
    color: 'text-blue-500'
  },
  {
    title: 'Frontend Engineering',
    icon: <Code size={16} />,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    color: 'text-purple-500'
  },
  {
    title: 'System Architecture',
    icon: <Layers size={16} />,
    skills: ['Information Architecture', 'User Flows', 'Component Logic', 'Scalability'],
    color: 'text-green-500'
  },
  {
    title: 'Technical Stack',
    icon: <Database size={16} />,
    skills: ['Next.js', 'Node.js', 'API Design', 'D3.js', 'Three.js'],
    color: 'text-orange-500'
  }
];

const TechMatrix: React.FC = () => {
  return (
    <section id="skills" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-charcoal-900 relative border-b border-white/5">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-blue-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">Tech Stack Matrix</span>
            </div>
            <h2 className="font-sans font-extrabold text-5xl md:text-7xl uppercase tracking-tighter">
              Core <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Capabilities</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm font-light text-neutral-400 leading-relaxed">
              A comprehensive view of the tools and methodologies I use to engineer high-performance digital products.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {skillCategories.map((cat, idx) => (
            <div key={cat.title} className="group relative bg-charcoal-900 p-8 md:p-10 hover:bg-white/[0.02] transition-colors">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              />
              <div className="space-y-8">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500`}>
                  {cat.icon}
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-sans font-bold text-xl uppercase tracking-tight">
                    {cat.title}
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {cat.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors" />
                        <span className="text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom Ticker - Industrial Feel */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap items-center gap-12 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="flex items-center gap-3">
            <Zap size={16} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">High Performance</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe size={16} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Global Standards</span>
          </div>
          <div className="flex items-center gap-3">
            <Terminal size={16} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Clean Code</span>
          </div>
          <div className="flex items-center gap-3">
            <Layers size={16} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Scalable Design</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMatrix;
