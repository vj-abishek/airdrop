import React, { useRef } from 'react';
import { useRipple } from 'react-use-ripple';
import { motion } from 'framer-motion';

export default function MobileButton({ children, desktop }) {
  const buttonRef = useRef();

  useRipple(buttonRef);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      ref={buttonRef}
      style={{ right: '11%', bottom: '12%' }}
      className="shadow-2xl outline-none fixed z-30 lg:hidden bg-secondary h-12 w-12 flex justify-center items-center text-white rounded-full"
    >
      {children}
    </motion.button>
  );
}
