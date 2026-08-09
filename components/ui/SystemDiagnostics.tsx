
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, CheckCircle2, Terminal, MousePointer2, Layers, Palette, Type } from 'lucide-react';

// Moved ZapIcon definition to the top to prevent reference errors during render
const ZapIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const ProgressRing = ({ percentage, color, size = 24 }: { percentage: number, color: string, size?: number }) => {
  const radius = (size / 2) - 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-black/5 dark:text-white/5"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={color}
          style={{ strokeLinecap: 'round' }}
        />
      </svg>
      {percentage === 100 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`w-1 h-1 rounded-full ${color.replace('text-', 'bg-')}`} />
        </motion.div>
      )}
    </div>
  );
};

interface MetricProps {
  label: string;
  value: string;
  percentage?: number;
  icon?: React.ElementType;
  color: string;
  delay: number;
}

const MetricCard: React.FC<MetricProps> = ({ label, value, percentage, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white/5 dark:bg-black/20 border border-black/5 dark:border-white/5 p-2.5 rounded-lg flex items-center justify-between group hover:border-blue-500/30 transition-colors"
  >
    <div className="flex flex-col">
      <span className="text-[9px] uppercase text-neutral-500 font-mono tracking-wider">{label}</span>
      <span className={`text-base font-bold font-mono ${color}`}>{value}</span>
    </div>
    {percentage !== undefined ? (
      <ProgressRing percentage={percentage} color={color} size={26} />
    ) : Icon ? (
      <Icon className={`w-3.5 h-3.5 ${color} opacity-60`} />
    ) : null}
  </motion.div>
);

const LogLine = ({ text, delay, color = "text-neutral-500 dark:text-neutral-400" }: { text: string; delay: number; color?: string }) => {
    const [displayed, setDisplayed] = useState("");
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayed(text);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <div className={`font-mono text-[10px] ${color} h-4 flex items-center`}>
            {displayed && (
                <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                    {displayed}
                </motion.span>
            )}
        </div>
    );
}

const TerminalView = () => (
    <motion.div
        key="terminal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
    >
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
            <MetricCard label="QA Experience" value="3 Years" color="text-blue-600 dark:text-blue-400" delay={0.1} />
            <MetricCard label="Team Supervision" value="35+ Members" color="text-green-600 dark:text-green-400" delay={0.2} />
            <MetricCard label="Defect Reduction" value="30% → 10%" color="text-neutral-400 dark:text-neutral-300" delay={0.3} />
            <MetricCard label="Inspector Training" value="40+" color="text-yellow-500 dark:text-yellow-400" delay={0.4} />
        </div>

        {/* Live Log */}
        <div className="flex-grow bg-paper-200/50 dark:bg-black/40 rounded-lg p-3 border border-black/5 dark:border-white/5 space-y-1 relative overflow-hidden font-mono">
            <LogLine text="> Design Process..." delay={0.5} />
            <LogLine text="> TRACE_USER_FLOWS..." delay={1.5} />
            <LogLine text="> DETECT_EDGE_CASES..." delay={2.5} color="text-yellow-600 dark:text-yellow-500" />
            <LogLine text="> REFACTOR_COMPONENT_API..." delay={3.5} />
            <LogLine text="> GENERATING_DESIGN_SPEC..." delay={5.0} color="text-blue-500 dark:text-blue-400" />
            
            <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-3 bg-blue-500 mt-1 inline-block"
            />
        </div>
    </motion.div>
);

const DesignView = () => (
    <motion.div
        key="design"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full relative flex flex-col justify-center items-center"
    >
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        
        {/* Design Artifact */}
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative bg-white dark:bg-charcoal-800 rounded-xl shadow-xl border border-black/5 dark:border-white/10 p-4 w-[240px]"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <CheckCircle2 size={16} />
                </div>
                <div>
                    <div className="h-2 w-20 bg-neutral-200 dark:bg-neutral-700 rounded mb-1" />
                    <div className="h-1.5 w-12 bg-neutral-100 dark:bg-neutral-800 rounded" />
                </div>
            </div>
            <div className="h-8 w-full bg-charcoal-900 dark:bg-white rounded-lg flex items-center justify-center">
                 <span className="text-[10px] font-bold text-white dark:text-charcoal-900">Confirm Action</span>
            </div>

            {/* Annotations / Redlines */}
            {/* Top Padding */}
            <motion.div 
                initial={{ height: 0, opacity: 0 }} animate={{ height: 16, opacity: 1 }} transition={{ delay: 0.6 }}
                className="absolute -top-4 left-1/2 w-px bg-pink-500 flex items-center justify-center"
            >
                <span className="bg-pink-500 text-white text-[8px] px-1 rounded-sm absolute -top-3">16px</span>
            </motion.div>
            
            {/* Side Padding */}
            <motion.div 
                initial={{ width: 0, opacity: 0 }} animate={{ width: 16, opacity: 1 }} transition={{ delay: 0.8 }}
                className="absolute top-1/2 -left-4 h-px bg-pink-500 flex items-center justify-center"
            >
                 <span className="bg-pink-500 text-white text-[8px] px-1 rounded-sm absolute -left-6">16</span>
            </motion.div>

            {/* Typography Spec */}
            <motion.div
                 initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                 className="absolute -right-16 top-0 bg-blue-600 text-white text-[8px] p-1.5 rounded-md shadow-lg pointer-events-none"
            >
                <div className="flex items-center gap-1 mb-1"><Type size={8} /> Inter Med</div>
                <div className="flex items-center gap-1"><Palette size={8} /> #000000</div>
                <div className="absolute top-2 -left-1 w-2 h-2 bg-blue-600 rotate-45" />
            </motion.div>

            {/* Cursor Interaction */}
            <motion.div
                initial={{ x: 50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "circOut" }}
                className="absolute bottom-2 right-4"
            >
                <MousePointer2 className="w-4 h-4 text-charcoal-900 dark:text-white fill-current" />
            </motion.div>
        </motion.div>
    </motion.div>
);

const SystemDiagnostics: React.FC = () => {
  const [view, setView] = useState<'terminal' | 'design'>('terminal');

  useEffect(() => {
    // ReturnType<typeof setTimeout> handles both Node and Browser environments gracefully
    let timeout: ReturnType<typeof setTimeout>;
    
    if (view === 'terminal') {
        // Run terminal for 6 seconds then switch
        timeout = setTimeout(() => setView('design'), 6000);
    } else {
        // Show design for 5 seconds then switch back
        timeout = setTimeout(() => setView('terminal'), 5000);
    }
    return () => clearTimeout(timeout);
  }, [view]);

  return (
    <div className="w-full max-w-[380px] select-none perspective-1000 relative">
       <motion.div 
         className="bg-paper-100/80 dark:bg-charcoal-800/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[340px] flex flex-col"
       >
          {/* Header */}
          <div className="bg-paper-200/50 dark:bg-charcoal-900/50 p-3 border-b border-black/5 dark:border-white/5 flex justify-between items-center flex-shrink-0">
             <div className="flex items-center gap-2 transition-all duration-300">
                {view === 'terminal' ? (
                     <>
                        <Terminal className="w-3 h-3 text-neutral-400" />
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">Systems Thinking</span>
                     </>
                ) : (
                    <>
                        <Layers className="w-3 h-3 text-blue-500" />
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 tracking-widest uppercase">design_system.fig</span>
                    </>
                )}
             </div>
             <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/30" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <div className="w-2 h-2 rounded-full bg-green-500 border border-green-400" />
             </div>
          </div>

          {/* Content Area */}
          <div className="p-5 flex-grow relative overflow-hidden">
               <AnimatePresence mode="wait">
                  {view === 'terminal' ? <TerminalView key="term" /> : <DesignView key="des" />}
               </AnimatePresence>
          </div>
          
          {/* Progress Bar / Status Footer */}
          <div className="h-6 w-full bg-paper-200 dark:bg-charcoal-900 border-t border-black/5 dark:border-white/5 flex items-center px-3 justify-between">
             <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${view === 'terminal' ? 'bg-green-500 animate-pulse' : 'bg-neutral-500'}`} />
                 <span className="text-[9px] font-mono text-neutral-500 uppercase">System</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${view === 'design' ? 'bg-blue-500 animate-pulse' : 'bg-neutral-500'}`} />
                 <span className="text-[9px] font-mono text-neutral-500 uppercase">Design</span>
             </div>
          </div>

       </motion.div>
    </div>
  );
};

export default SystemDiagnostics;
