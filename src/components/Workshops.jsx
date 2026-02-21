import { motion } from 'framer-motion';
import { Microscope, PenTool, Database } from 'lucide-react';

const workshops = [
  { 
    title: "IEEE VLSI Design", 
    desc: "Deep dive into semiconductor architecture and sovereign chip design[cite: 11, 48].", 
    icon: <Microscope size={32} /> 
  },
  { 
    title: "CAD & 3D Printing", 
    desc: "Workshop with AIC-RRU focused on rapid hardware prototyping[cite: 12].", 
    icon: <PenTool size={32} /> 
  },
  { 
    title: "AI with Cybersecurity", 
    desc: "Securing national infrastructure using machine learning and AI[cite: 13, 34].", 
    icon: <Database size={32} /> 
  }
];

const Workshops = () => {
  return (
    <section id="workshops" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-black italic tracking-tighter mb-8 sm:mb-12 flex items-center gap-3 sm:gap-4">
          <span className="w-8 sm:w-12 h-1 bg-primary"></span> TECHNICAL WORKSHOPS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshops.map((ws, i) => (
            <motion.div
              key={ws.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="group p-6 sm:p-8 border border-white/5 bg-white/5 rounded-3xl hover:bg-primary/10 transition-all"
            >
              <div className="text-primary mb-6 group-hover:rotate-12 transition-transform">
                {ws.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 italic tracking-tight">{ws.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{ws.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;