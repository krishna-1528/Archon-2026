import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { name: 'Arenas', href: '#arenas' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'Defence Expo', href: '#expo' },
    { name: 'Schedule', href: '#keynotes' }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-background/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 font-bold text-xl tracking-tighter text-primary"
      >
        <Shield size={24} fill="currentColor" fillOpacity={0.2} />
        <span>ARCHON <span className="text-white/50 font-light">2026</span></span>
      </motion.div>
      
      <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="hover:text-primary transition-colors duration-300">
            {link.name}
          </a>
        ))}
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-black px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider"
      >
        Register Now
      </motion.button>
    </nav>
  );
};

export default Navbar;