import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, FileText, Github, Send, Check, Loader2, AlertCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') {
      setStatus('idle');
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please complete all fields.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email.');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000); // Reset after 3 seconds
    }, 1500);
  };

  return (
    <footer id="contact" className="w-full min-h-screen bg-paper-200 dark:bg-charcoal-900 flex flex-col justify-between px-6 md:px-12 lg:px-24 py-24 relative overflow-hidden transition-colors duration-500">
      
      {/* Background glow for depth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-500/5 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Headline */}
        <div className="flex flex-col items-start">
          <span className="text-neutral-500 font-mono mb-6 block">Have an idea?</span>
          <h2 className="font-serif font-bold text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-charcoal-900 dark:text-white mb-8">
            Let's<br />Build.
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
             From complex system architecture to pixel-perfect interactions. Let's engineer something precise.
          </p>
        </div>

        {/* Right Column: Contact Form */}
        <div className="w-full max-w-xl">
           <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white/50 dark:bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/5 shadow-xl dark:shadow-2xl">
              <div className="group relative">
                  <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-lg text-charcoal-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-focus-within:w-full" />
              </div>
               <div className="group relative">
                  <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-lg text-charcoal-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-focus-within:w-full" />
              </div>
               <div className="group relative">
                  <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 text-lg text-charcoal-900 dark:text-white placeholder:text-neutral-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all resize-none"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-focus-within:w-full" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-4">
                   <div className="h-6">
                     <AnimatePresence mode="wait">
                       {status === 'error' && (
                          <motion.div 
                              key="error"
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex items-center gap-2 text-red-500 text-sm font-medium"
                          >
                              <AlertCircle size={16} />
                              <span>{errorMsg}</span>
                          </motion.div>
                       )}
                       {status === 'success' && (
                          <motion.div 
                              key="success"
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex items-center gap-2 text-green-500 text-sm font-medium"
                          >
                              <Check size={16} />
                              <span>Message sent successfully.</span>
                          </motion.div>
                       )}
                     </AnimatePresence>
                   </div>

                  <button 
                      type="submit" 
                      disabled={status === 'loading' || status === 'success'}
                      className={`
                        group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300 w-full sm:w-auto
                        ${status === 'success' 
                            ? 'bg-green-500 text-white cursor-default' 
                            : 'bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-900 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                        }
                        disabled:opacity-70 disabled:cursor-not-allowed
                      `}
                  >
                      {status === 'loading' ? (
                          <Loader2 className="animate-spin w-5 h-5" />
                      ) : status === 'success' ? (
                          <Check className="w-5 h-5" />
                      ) : (
                          <>
                              Send Message
                              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                      )}
                  </button>
              </div>
           </form>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center border-t border-black/10 dark:border-white/10 pt-8 mt-12">
        <div className="flex flex-col gap-2 mb-8 md:mb-0">
          <span className="text-neutral-500 text-sm font-mono">© 2026 Vishal Rathod</span>
          <span className="text-neutral-500 dark:text-neutral-600 text-xs">Designed & Built with React + Framer Motion</span>
        </div>

        <div className="flex gap-8">
          <SocialLink href="#" label="LinkedIn" icon={<Linkedin size={20} />} />
          <SocialLink href="#" label="Resume" icon={<FileText size={20} />} />
          <SocialLink href="#" label="GitHub" icon={<Github size={20} />} />
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; label: string; icon: React.ReactNode }> = ({ href, label, icon }) => (
  <a 
    href={href}
    className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 group"
  >
    <span className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/20 group-hover:border-black/20 dark:group-hover:border-white/30 transition-all duration-300">
      {icon}
    </span>
    <span className="hidden md:block font-medium relative">
      {label}
      <span className="absolute left-0 -bottom-1 w-full h-px bg-black dark:bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </span>
  </a>
);

export default Footer;