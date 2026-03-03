import { motion } from 'framer-motion';
import { Calculator, Box, Trophy, Target } from 'lucide-react';

const parallelEvents = [
  { 
    name: "Human Calculator", 
    desc: "A mental math challenge with a live leaderboard for the fastest calculations[cite: 28].", 
    icon: <Calculator className="text-secondary" /> 
  },
  { 
    name: "Rubik's Cube Sprint", 
    desc: "Showcase mechanical dexterity and memory in the speed-cubing arena[cite: 29].", 
    icon: <Box className="text-secondary" /> 
  },
  { 
    name: "Checkmate (Blitz Chess)", 
    desc: "High-speed chess to test strategic thinking under extreme time pressure[cite: 30].", 
    icon: <Trophy className="text-secondary" /> 
  },
  { 
    name: "The Target Lock", 
    desc: "A precision game using ping-pong balls to test your focus[cite: 33].", 
    icon: <Target className="text-secondary" /> 
  }
];

const ParallelEvents = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-black italic tracking-tighter mb-8 sm:mb-12">PARALLEL EVENTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parallelEvents.map((event, i) => (
            <motion.div
              key={event.name}
              whileHover={{ scale: 1.05 }}
              className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="mb-4">{event.icon}</div>
              <h3 className="font-bold text-base sm:text-lg mb-2">{event.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallelEvents;