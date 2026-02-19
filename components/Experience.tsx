import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, Terminal } from 'lucide-react';

const experiences = [
  {
    company: 'TechFlow Systems',
    role: 'Senior Product Designer',
    period: '2024 - Present',
    desc: 'Leading the design of complex enterprise dashboards and internal tools. Focused on establishing scalable design systems and improving operational efficiency.',
    highlights: ['Design System Architecture', 'User Research', 'Prototyping']
  },
  {
    company: 'Global Quality Ops',
    role: 'Quality Systems Lead',
    period: '2021 - 2023',
    desc: 'Managed high-scale manufacturing quality systems. Led teams to implement metric-driven improvements in production lines.',
    highlights: ['Root Cause Analysis', 'Process Optimization', 'Team Leadership']
  },
  {
    company: 'Creative Studio',
    role: 'UI/UX Designer',
    period: '2019 - 2021',
    desc: 'Crafted digital experiences for startups and established brands. Focused on interaction design and visual storytelling.',
    highlights: ['Interface Design', 'Brand Identity', 'Web Development']
  }
];

const CareerTrajectory: React.FC = () => {
  return (
    <section id="experience" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-charcoal-900 relative border-b border-white/5">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          
          {/* Left: Section Info */}
          <div className="md:w-1/3 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-blue-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">Career Trajectory</span>
              </div>
              <h2 className="font-sans font-extrabold text-5xl uppercase tracking-tighter">
                Professional <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Log</span>
              </h2>
            </div>
            <p className="text-sm font-light text-neutral-400 leading-relaxed">
              A chronological record of my professional evolution, from industrial quality systems to digital product engineering.
            </p>
            
            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <Terminal size={12} className="text-blue-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Total Experience: 5+ Years</span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal size={12} className="text-blue-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Focus: Systems & UX</span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 space-y-px bg-white/5 border border-white/5">
            {experiences.map((exp, idx) => (
              <div key={idx} className="group relative bg-charcoal-900 p-8 md:p-12 hover:bg-white/[0.02] transition-colors">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-blue-500 uppercase tracking-widest">{exp.period}</span>
                      <ChevronRight size={12} className="text-white/20" />
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{exp.company}</span>
                    </div>
                    <h3 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-base font-light text-neutral-400 leading-relaxed max-w-xl">
                      {exp.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap md:flex-col gap-2">
                    {exp.highlights.map(h => (
                      <span key={h} className="text-[9px] font-mono px-2 py-1 border border-white/10 rounded uppercase opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerTrajectory;
