import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- THEME CONFIGURATION ---
const CONFIG = {
  primary: '#00f2ff', // Electric Cyan
  secondary: '#ff00ff', // Magenta
  bg: '#0d001a', // Deep Purple Black
  accent: '#7000ff', // Purple
  duration: 1000, // 1 second
  title: "ARCHON 2026",
  motto: "Innovating Technology for National Security"
};

const ArchonPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const step = CONFIG.duration / 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 0);
          return 100;
        }
        return prev + 1;
      });
    }, step);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-999 flex flex-col items-center justify-center font-mono overflow-hidden"
      style={{ backgroundColor: CONFIG.bg, color: CONFIG.primary }}
      exit={{ opacity: 0, y: -20, filter: "brightness(2) blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      {/* Tactical Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `linear-gradient(${CONFIG.primary} 1px, transparent 1px), linear-gradient(90deg, ${CONFIG.primary} 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Radar Scan Circle */}
      <div className="relative w-80 h-80 flex items-center justify-center border rounded-full" style={{ borderColor: `${CONFIG.primary}4d` }}>
        {/* Animated Radar Line */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, ${CONFIG.primary}33 0deg, transparent 90deg)` }}
        />
        
        {/* Core Percentage */}
        <div className="text-center z-10">
          <motion.span className="text-6xl font-black block tracking-tighter">
            {progress}%
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">Secure Boot Link...</span>
        </div>
      </div>

      {/* Text Branding */}
      <div className="mt-12 text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-[0.4em] mb-2"
        >
          {CONFIG.title}
        </motion.h1>
        <motion.p 
          className="text-xs uppercase tracking-widest max-w-xs mx-auto leading-relaxed"
          style={{ color: `${CONFIG.primary}b3` }}
        >
          {CONFIG.motto}
        </motion.p>
      </div>

      {/* Scanning Line Effect */}
      <motion.div 
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-x-0 h-0.5 opacity-20 blur-sm"
        style={{ backgroundColor: CONFIG.primary }}
      />
    </motion.div>
  );
};

export default ArchonPreloader;
