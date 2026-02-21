import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

const TeamPage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-transparent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Rotating Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 border-2 border-secondary/20 rounded-full"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Pulsing Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Coming Soon Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <Users size={80} className="mx-auto text-primary mb-6" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase"
        >
          <span className="text-primary">Coming</span> Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Our team page is under construction. Stay tuned for updates!
        </motion.p>

        {/* Contact Info Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-6 justify-center"
        >
          {[
            { icon: Mail, color: '#00f2ff' },
            { icon: Phone, color: '#ff00ff' },
            { icon: MapPin, color: '#00f2ff' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <item.icon size={24} style={{ color: item.color }} strokeWidth={2} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;
