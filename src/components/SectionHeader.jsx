import { motion } from 'framer-motion';

const SectionHeader = ({ number, title, subtitle, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`mb-10 sm:mb-16 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-primary/30 leading-none"
        >
          {number.toString().padStart(2, '0')}
        </motion.span>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-white/60 font-light max-w-3xl">{subtitle}</p>
          )}
        </motion.div>
      </div>
      
      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="h-1 w-32 bg-primary mt-8 origin-left"
      />
    </motion.div>
  );
};

export default SectionHeader;
