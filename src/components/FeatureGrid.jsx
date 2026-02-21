import { motion } from 'framer-motion';

const FeatureGrid = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -10 }}
          className="relative group"
        >
          {/* Background card */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-2xl border border-white/10 group-hover:border-primary/50 transition-all" />
          
          {/* Content */}
          <div className="relative p-8">
            {/* Icon/Number */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="mb-6"
            >
              {feature.icon && (
                <feature.icon size={48} className="text-primary" />
              )}
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {feature.description}
            </p>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="h-0.5 w-8 bg-primary origin-left"
            />

            {/* Bottom accent circle */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 rounded-tl-3xl -z-10 group-hover:bg-primary/10 transition-all" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureGrid;
