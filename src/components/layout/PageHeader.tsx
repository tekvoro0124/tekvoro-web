import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  bgImage?: string;
}

const PageHeader = ({ title, description, bgImage }: PageHeaderProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-secondary-900 text-white py-10 sm:py-16 md:py-24 overflow-hidden px-4"
    >
      {bgImage && (
        <div className="absolute inset-0">
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-20 max-h-[320px] sm:max-h-[480px] md:max-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-secondary-800/90" />
        </div>
      )}
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-200"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default PageHeader;