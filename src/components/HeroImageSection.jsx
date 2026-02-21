import { motion } from 'framer-motion';

const HeroImageSection = ({ title, subtitle, image, imagePosition = 'right', cta, children }) => {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: imagePosition === 'right' ? 50 : -50 },
    visible: { opacity: 1, scale: 1, x: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: imagePosition === 'right' ? -50 : 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'md:grid-flow-col-dense' : ''}`}>
          
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={contentVariants}
            transition={{ duration: 0.8 }}
            className={imagePosition === 'left' ? 'md:col-start-2' : ''}
          >
            {title && (
              <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                {subtitle}
              </p>
            )}
            {children}
            {cta && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-white transition-all"
              >
                {cta}
              </motion.button>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={imageVariants}
            transition={{ duration: 0.8 }}
            className={`relative h-96 md:h-full rounded-2xl overflow-hidden ${imagePosition === 'left' ? 'md:col-start-1 md:row-start-1' : ''}`}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroImageSection;
