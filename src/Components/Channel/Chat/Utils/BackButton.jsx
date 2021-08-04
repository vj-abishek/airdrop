import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BackButon() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Back"
      role="button"
      className="p-2 w-10 h-10 outline-none text-center rounded-full hover:bg-secondary"
      data-focusable="true"
      tabIndex="0"
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-current text-accent">
        <g>
           <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
        </g>
      </svg>
    </motion.div>
  );
}
