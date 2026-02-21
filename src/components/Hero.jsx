import { motion } from 'framer-motion';
import GamingPortalBG from './GamingPortalBG'; // Ensure this file exists in /components

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-6 md:px-20 overflow-hidden">
      {/* 3D Background Component */}
      <GamingPortalBG />

      <div className="max-w-7xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-10"
        >
          <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase">
            RRU Techfest 2026 // [cite: 34]
          </span>
        </motion.div>

        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter italic uppercase text-white"
        >
          Archon
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="max-w-md text-lg text-white/60 font-light leading-snug"
          >
            Innovating Technology for National Security. If we don't own the chips, we don't own the sovereignty. [cite: 48]
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7 }}
            className="flex gap-8 border-l border-white/20 pl-8 py-2 text-white"
          >
            <div>
              <p className="text-4xl font-bold italic tracking-tighter">45</p>
              <p className="text-[10px] uppercase text-primary font-mono">Days</p>
            </div>
            <div>
              <p className="text-4xl font-bold italic tracking-tighter">12</p>
              <p className="text-[10px] uppercase text-primary font-mono">Hrs</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;