import { useState } from 'react';
import { motion } from 'framer-motion';

const CookieConsent = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-6 right-6 z-50 bg-black bg-opacity-95 text-white rounded-xl shadow-lg p-5 w-80 max-w-full flex flex-col items-start gap-4 border border-white"
      style={{ borderWidth: 1 }}
    >
      <span className="text-base leading-snug">
        This website uses cookies to provide you with an optimal experience.
      </span>
      <div className="flex gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: '0 0 0 2px #fff, 0 0 8px #fff' }}
          className="flex-1 py-2 px-4 rounded-lg bg-white text-black font-bold text-sm uppercase transition focus:outline-none"
          onClick={() => setVisible(false)}
        >
          Accept all
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: '0 0 0 2px #fff, 0 0 8px #fff' }}
          className="flex-1 py-2 px-4 rounded-lg bg-black border border-white text-white font-bold text-sm uppercase transition focus:outline-none"
          onClick={() => setVisible(false)}
        >
          Reject all
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CookieConsent; 