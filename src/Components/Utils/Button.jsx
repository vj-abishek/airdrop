import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRipple } from 'react-use-ripple';

export default function Button({ children }) {
  const buttonRef = useRef();

  useRipple(buttonRef);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      id="generateURl"
      ref={buttonRef}
      style={{
        minHeight: '48px',
        outline: 'none',
        cursor: 'pointer',
        paddingLeft: '30px',
        paddingRight: '30px',
      }}
      className="bg-secondary text-white rounded-full text-center font-sans text-bold my-2 w-full"
    >
      <span
        id="generateURlspan"
        style={{ lineHeight: '48px', textAlign: 'center' }}
      >
        {children}
      </span>
    </motion.button>
  );
}
