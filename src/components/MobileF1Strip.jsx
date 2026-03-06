import { motion } from 'framer-motion';

const MobileF1Strip = () => {
  return (
    <div className="md:hidden relative mx-auto mt-6 w-full max-w-sm px-2 h-16 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 bottom-2 h-[2px] bg-repeat-x opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0 16px, transparent 16px 34px)',
        }}
        animate={{ backgroundPositionX: ['0px', '-68px'] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      />

      <motion.div
        className="absolute bottom-0"
        animate={{ x: ['-28%', '118%'] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: 'linear' }}
      >
        <svg
          width="128"
          height="44"
          viewBox="0 0 128 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Animated F1 racing car"
        >
          <rect x="34" y="14" width="38" height="12" rx="3" fill="#00F2FF" />
          <rect x="50" y="8" width="16" height="8" rx="2" fill="#9AF9FF" />
          <rect x="12" y="17" width="20" height="6" rx="2" fill="#00D0DB" />
          <rect x="74" y="16" width="40" height="8" rx="2" fill="#00D0DB" />
          <rect x="111" y="14" width="8" height="12" rx="2" fill="#00A8B2" />
          <rect x="4" y="16" width="8" height="10" rx="2" fill="#00A8B2" />

          <circle cx="27" cy="32" r="8" fill="#0D001A" />
          <circle cx="95" cy="32" r="8" fill="#0D001A" />
          <circle cx="27" cy="32" r="3" fill="#00F2FF" />
          <circle cx="95" cy="32" r="3" fill="#00F2FF" />

          <path d="M72 18L88 18L96 13L77 13L72 18Z" fill="#7EF6FF" />
        </svg>
      </motion.div>
    </div>
  );
};

export default MobileF1Strip;
