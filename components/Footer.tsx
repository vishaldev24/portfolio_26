import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Send, CheckCircle, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <footer id="contact" className="w-full min-h-screen bg-charcoal-950 flex flex-col justify-between px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden">
      
      {/* Background Micro-Data */}
      <div className="absolute bottom-24 right-12 opacity-5 font-mono text-[8px] space-y-1 hidden lg:block">
        <p>FOOTER_INIT: SUCCESS</p>
        <p>CONN_SECURE: TRUE</p>
        <p>DATA_ENCRYPT: AES-256</p>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        
        {/* Left: CTA */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-blue-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">Contact Interface</span>
            </div>
            <h2 className="font-sans font-extrabold text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85]">
              Let's <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Engineer</span> <br/> Together.
            </h2>
          </div>

          <div className="space-y-8 max-w-xl">
            <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
              From complex system architecture to pixel-perfect interactions. Let's build something that lasts.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-8">
              <a href="#" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">
                <Linkedin size={16} />
                LinkedIn
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">
                <Github size={16} />
                GitHub
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">
                <Twitter size={16} />
                Twitter
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            ></motion.div>
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  ></motion.div>
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle size={40} className="text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">Transmission Received</h3>
                    <p className="text-sm text-neutral-400 font-mono">System response within 24 hours.</p>
                  </div>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-500 hover:underline"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40">Identification</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg focus:border-blue-500 outline-none transition-colors placeholder:opacity-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40">Communication Channel</label>
                    <input 
                      required
                      type="email" 
                      placeholder="Your Email"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg focus:border-blue-500 outline-none transition-colors placeholder:opacity-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-40">Transmission Content</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Your Message..."
                      className="w-full bg-transparent border-b border-white/10 py-4 text-lg focus:border-blue-500 outline-none transition-colors placeholder:opacity-20 resize-none"
                    />
                  </div>

                  <button 
                    disabled={formState === 'sending'}
                    className="w-full group relative flex items-center justify-center gap-3 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-50"
                  >
                    {formState === 'sending' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Transmission</span>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>

            {/* Form Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 rounded-tr-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Meta */}
      <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
        <div className="flex items-center gap-3">
          <Terminal size={14} className="text-blue-500" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">System_v2.6.0_Stable</span>
        </div>
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest">
          <p>Built with Precision</p>
          <p>© 2026 Vishal Rathod</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
