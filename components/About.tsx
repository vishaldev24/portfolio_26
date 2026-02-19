import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, Zap, Shield, Cpu, Activity } from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  return (
    <section id="about" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-charcoal-950 relative border-b border-white/5">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <User size={14} className="text-blue-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">System Architect</span>
              </div>
              <h2 className="font-sans font-extrabold text-5xl md:text-7xl uppercase tracking-tighter leading-none">
                Bridging <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Industrial</span> <br/> Quality.
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed">
                My background isn't typical for a designer. I spent years in the <span className="text-white font-medium italic">high-stakes world of manufacturing quality</span>, where precision wasn't a choice—it was the system.
              </p>
              <p className="text-lg font-light text-neutral-400 leading-relaxed">
                Today, I apply that same root-cause analysis and operational discipline to digital products. I don't just design screens; I architect resilient systems that solve real-world problems with measurable outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-blue-500" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest">Operational Discipline</h4>
                </div>
                <p className="text-sm font-light text-neutral-500 leading-relaxed">
                  Prioritizing clarity, scalability, and maintainability over fleeting trends.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target size={16} className="text-blue-500" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest">Measurable Impact</h4>
                </div>
                <p className="text-sm font-light text-neutral-500 leading-relaxed">
                  Every design decision is backed by logic and aimed at specific operational goals.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual System */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between overflow-hidden group">
              
              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-20 system-grid group-hover:opacity-30 transition-opacity" />

              <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">Core Processor</span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest">Design_Engine_V2</h3>
                </div>
                <Cpu size={20} className="text-blue-500" />
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[8px] font-mono uppercase opacity-40">
                    <span>Precision</span>
                    <span>99.4%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '99.4%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "expo.out" }}
                      style={{ height: '100%', backgroundColor: '#2563eb' }} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[8px] font-mono uppercase opacity-40">
                    <span>Resilience</span>
                    <span>98.2%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '98.2%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "expo.out", delay: 0.2 }}
                      style={{ height: '100%', backgroundColor: '#2563eb' }} 
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Activity size={20} className="text-blue-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-mono uppercase opacity-60 tracking-tighter">Fully Operational</span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            </div>
            
            {/* Floating Meta */}
            <div className="absolute -top-6 -right-6 px-4 py-2 rounded-lg bg-charcoal-900 border border-white/10 shadow-2xl">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-500">Architecture_v2.6</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;
