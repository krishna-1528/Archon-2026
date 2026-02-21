import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Cpu, Zap, Orbit } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen relative pt-32 pb-20 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 uppercase">
            About <span className="text-primary">Archon</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-primary/30 transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <Globe size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">Rashtriya Raksha University</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Rashtriya Raksha University, an Institution of National Importance, is India's premier national security and
              policing university based in Gandhinagar.
            </p>
            <ul className="space-y-3 text-sm font-mono text-primary/80">
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> National Security Excellence</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> Strategic Research Hub</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> Sovereign Defense Technology</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-secondary/30 transition-colors"
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-secondary">
              <Cpu size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">AIC-RRU</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              AIC-RRU is a key innovation and incubation center that supports startup enablement, hardware-focused
              prototyping, and security-tech ecosystem growth.
            </p>
            <ul className="space-y-3 text-sm font-mono text-secondary/80">
              <li className="flex items-center gap-2"><Zap size={16} /> Startup Pavilion Partner</li>
              <li className="flex items-center gap-2"><Zap size={16} /> Hardware Incubation Lab</li>
              <li className="flex items-center gap-2"><Zap size={16} /> Pitch & Innovation Enablement</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-primary/30 transition-colors"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <Orbit size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tight">SASET</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              SASET drives the strategic vision behind Archon, focused on sovereign systems, deep-tech capability building,
              and innovation pathways aligned with national security priorities.
            </p>
            <ul className="space-y-3 text-sm font-mono text-primary/80">
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> Sovereign Systems Vision</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> Deep-Tech Ecosystem Building</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} /> Security-First Innovation Programs</li>
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;