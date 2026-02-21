import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, AlertCircle, Zap } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ImageCard from '../components/ImageCard';

const arenas = [
  { 
    name: "Robowars", 
    desc: "Supreme combat between independent machines.",
    longDesc: "Build autonomous combat robots and compete in intense battles. Showcase your engineering prowess in mechanical design, electronics, and strategic combat programming.",
    icon: Cpu,
    color: '#10b981'
  },
  { 
    name: "Code-Raksha", 
    desc: "24-hour national security hackathon.",
    longDesc: "Join India's premier cybersecurity hackathon. Solve real-world defense challenges, develop secure systems, and protect national digital infrastructure.",
    icon: Terminal,
    color: '#3b82f6'
  },
  { 
    name: "Circuit-X", 
    desc: "Advanced PCB designing for sovereign systems.",
    longDesc: "Design cutting-edge printed circuit boards for defense applications. Focus on self-reliant tech, secure communications, and mission-critical systems.",
    icon: Shield,
    color: '#8b5cf6'
  },
  { 
    name: "E-Sports", 
    desc: "BGMI, Valorant, and CS:GO arenas.",
    longDesc: "Compete in strategic tactical shooters. Demonstrate teamwork, quick decision-making, and combat coordination skills essential for modern warfare scenarios.",
    icon: AlertCircle,
    color: '#ef4444'
  }
];

const ArenasPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          >
            Four Legendary Arenas Await
          </motion.span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mt-4 mb-5 sm:mb-6 leading-tight">
            BATTLE
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              ARENAS
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            Choose your battlefield. Test your skills in cutting-edge technology competitions designed for the future defenders of India.
          </p>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-10 sm:mt-16"
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 mx-auto">
              <motion.div 
                className="w-1 h-2 bg-primary rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-20">
        <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <SectionHeader 
          number={1}
          title="Four Paths to Victory"
          subtitle="Each arena pushes the boundaries of innovation and strategy"
        />

      <div className="max-w-7xl mx-auto space-y-12">
        {arenas.map((arena, index) => (
          <motion.div
            key={arena.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative p-6 sm:p-8 md:p-12 bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all"
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-3xl"
                style={{ backgroundColor: arena.color }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="shrink-0"
                >
                  <div 
                    className="p-4 sm:p-6 rounded-2xl bg-white/5 border-2"
                    style={{ borderColor: arena.color }}
                  >
                    <arena.icon 
                      size={44} 
                      style={{ color: arena.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="flex-1">
                  <h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-black mb-3"
                    style={{ color: arena.color }}
                  >
                    {arena.name}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/70 mb-4 font-medium">
                    {arena.desc}
                  </p>
                  <p className="text-white/50 leading-relaxed mb-6">
                    {arena.longDesc}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button 
                      className="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 w-full sm:w-auto"
                      style={{ 
                        backgroundColor: arena.color,
                        color: '#000'
                      }}
                    >
                      Register Now
                    </button>
                    <button 
                      className="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider border-2 transition-all hover:bg-white/5 w-full sm:w-auto"
                      style={{ 
                        borderColor: arena.color,
                        color: arena.color
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-20"
                style={{
                  background: `radial-gradient(circle at top right, ${arena.color}, transparent 70%)`
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-20 bg-linear-to-r from-primary/5 to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-6 sm:p-10 border border-primary/30 rounded-3xl text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-black mb-4">Ready for Battle?</h3>
          <p className="text-white/70 mb-6">
            Join thousands of innovators competing for glory, prizes, and the chance to contribute to India's technological sovereignty.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-black px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            View Full Schedule
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ArenasPage;
