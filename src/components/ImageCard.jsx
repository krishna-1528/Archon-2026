import { motion } from 'framer-motion';

const ImageCard = ({ title, description, image, icon: Icon, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300"
    >
      {/* Background Image or Gradient */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {Icon && <Icon size={80} className="text-primary/30" />}
          </div>
        )}
        
        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {Icon && <Icon size={32} className="text-primary mb-4" />}
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="h-0.5 w-8 bg-primary mt-6 origin-left"
        />
      </div>
    </motion.div>
  );
};

export default ImageCard;
