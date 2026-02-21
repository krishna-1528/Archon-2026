import { motion } from 'framer-motion';
import { Zap, Terminal, Shield, Trophy } from 'lucide-react';

const arenas = [
  { 
    name: "Code-Raksha", 
    desc: "24-hour national security hackathon challenge[cite: 5].", 
    icon: <Terminal className="text-primary" /> 
  },
  { 
    name: "Robowars", 
    desc: "Supreme independent control over the metal battlefield[cite: 4, 47].", 
    icon: <Zap className="text-primary" /> 
  },
  { 
    name: "E-Sports", 
    desc: "High-energy combat: BGMI, Valorant, and Counterstrike [cite: 20-24].", 
    icon: <Trophy className="text-primary" /> 
  },
  { 
    name: "Circuit-X", 
    desc: "PCB designing for the next generation of sovereign systems[cite: 7].", 
    icon: <Shield className="text-primary" /> 
  }
];

const Arenas = () => {
  return (
    <section id="arenas" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 sm:mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter mb-2">ARENAS</h2>
            <p className="text-white/40 font-mono text-xs sm:text-sm uppercase">Supreme Independent Authority [cite: 47]</p>
          </div>
          <div className="h-px flex-1 bg-white/10 mx-8 hidden md:block mb-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {arenas.map((arena, i) => (
            <motion.div
              key={arena.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 sm:p-8 bg-linear-to-br from-white/10 to-transparent border border-white/5 rounded-2xl hover:border-primary/50 transition-all cursor-default"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                {arena.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 uppercase italic tracking-tight">{arena.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{arena.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Arenas;