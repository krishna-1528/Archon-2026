import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';

const LandingAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('initial'); // initial -> gateway -> dash -> complete

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('gateway'), 800),
      setTimeout(() => setStage('dash'), 2200),
      setTimeout(() => {
        setStage('complete');
        onComplete();
      }, 3500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Digital Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Center Gateway */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Shield Gateway */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: stage === 'initial' ? 1 : stage === 'gateway' ? 1.2 : 0.5,
            rotate: 0,
            opacity: stage === 'dash' ? 0 : 1
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <Shield 
            size={120} 
            className="text-primary"
            strokeWidth={1.5}
          />
          
          {/* Pulsing Rings */}
          {stage === 'gateway' && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-primary rounded-full"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2 + i, opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Text */}
        <motion.div
          className="absolute text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage === 'dash' ? 0 : 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-6xl font-black tracking-tight text-primary mt-48">
            ARCHON
          </h1>
          <p className="text-sm text-white/50 font-mono tracking-[0.3em] mt-2">
            INITIALIZING SECURE ACCESS
          </p>
        </motion.div>
      </div>

      {/* Dashing Forward Effect */}
      {stage === 'dash' && (
        <>
          {/* Perspective Lines rushing forward */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-[2px] bg-primary origin-left"
              style={{
                width: '1000px',
                transform: `rotate(${(i * 18)}deg)`,
              }}
              initial={{ scaleX: 0, opacity: 0.8 }}
              animate={{ scaleX: 3, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeIn' }}
            />
          ))}

          {/* Speed lines */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
              }}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 0.8, 0] }}
              transition={{ 
                duration: 0.5 + Math.random() * 0.5,
                delay: Math.random() * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Center burst */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 30, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="w-20 h-20 bg-primary rounded-full blur-xl" />
          </motion.div>
        </>
      )}

      {/* Loading Bar */}
      <motion.div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'dash' ? 0 : 1 }}
      >
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LandingAnimation;
