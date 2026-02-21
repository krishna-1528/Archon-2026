import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Countdown = ({ targetDate, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const CountdownUnit = ({ value, label, delay = 0 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="relative flex flex-col items-center"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-lg -z-10" />
        
        {/* Number display with flip animation */}
        <div className="relative overflow-hidden bg-white/5 border border-primary/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 min-w-16 sm:min-w-20 backdrop-blur-sm">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter tabular-nums block"
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          
          {/* Scanning line effect */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-x-0 h-0.5 bg-primary/50 blur-sm"
          />
        </div>
        
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="text-[9px] sm:text-[10px] uppercase text-primary tracking-[0.2em] sm:tracking-widest font-mono mt-2 sm:mt-3 font-bold"
        >
          {label}
        </motion.span>
      </motion.div>
    );
  };

  return (
    <div className={`flex flex-wrap justify-center gap-3 sm:gap-6 ${className}`}>
      <CountdownUnit value={timeLeft.days} label="Days" delay={0} />
      <CountdownUnit value={timeLeft.hours} label="Hours" delay={0.1} />
      <CountdownUnit value={timeLeft.minutes} label="Mins" delay={0.2} />
      <CountdownUnit value={timeLeft.seconds} label="Secs" delay={0.3} />
    </div>
  );
};

export default Countdown;
