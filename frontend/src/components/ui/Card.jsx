import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -8, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${hoverable ? 'cursor-pointer hover:shadow-2xl transition-shadow duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;