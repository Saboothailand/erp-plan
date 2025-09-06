'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCardProps {
  phase: {
    id: string;
    title: string;
    description: string;
    tasks: string[];
    weeks: string;
    status: string;
  };
  index: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ phase, index }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{phase.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{phase.weeks}</span>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(phase.status)}`}></div>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{phase.description}</p>
      <ul className="space-y-2">
        {phase.tasks.map((task, i) => (
          <li key={i} className="flex items-center text-sm text-gray-700">
            <svg className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {task}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProgressCard;