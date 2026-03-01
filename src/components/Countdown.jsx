import { useState, useEffect } from 'react';

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

  const CountdownUnit = ({ value, label }) => {
    return (
      <div className="relative flex flex-col items-center">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-lg -z-10" />
        
        {/* Number display */}
        <div className="relative overflow-hidden bg-white/5 border border-primary/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 min-w-16 sm:min-w-20 backdrop-blur-sm">
          <span className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter tabular-nums block text-primary">
            {String(value).padStart(2, '0')}
          </span>
        </div>
        
        {/* Label */}
        <span className="text-[9px] sm:text-[10px] uppercase text-primary tracking-[0.2em] sm:tracking-widest font-mono mt-2 sm:mt-3 font-bold">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className={`flex flex-wrap justify-center gap-3 sm:gap-6 ${className}`}>
      <CountdownUnit value={timeLeft.days} label="Days" />
      <CountdownUnit value={timeLeft.hours} label="Hours" />
      <CountdownUnit value={timeLeft.minutes} label="Mins" />
      <CountdownUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
