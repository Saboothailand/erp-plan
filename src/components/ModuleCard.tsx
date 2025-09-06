'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    features: string[];
  };
  index: number;
  hoveredModule: string | null;
  setHoveredModule: (id: string | null) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index, hoveredModule, setHoveredModule }) => {
  const Icon = module.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center"
      onMouseEnter={() => setHoveredModule(module.id)}
      onMouseLeave={() => setHoveredModule(null)}
    >
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-r ${module.color} text-white shadow-md`}>
        <Icon className="w-10 h-10" />
      </div>
      <h4 className="text-2xl font-bold text-gray-900 mb-3">{module.title}</h4>
      <p className="text-gray-600 mb-6">{module.description}</p>
      <ul className="text-left text-gray-700 space-y-2 flex-grow">
        {module.features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ModuleCard;