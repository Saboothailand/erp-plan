'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  tables: number;
  status: 'pending' | 'in_progress' | 'completed';
  color: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function ModuleCard({
  id,
  title,
  description,
  tables,
  status,
  color,
  icon: Icon,
  onClick
}: ModuleCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'in_progress':
        return '진행 중';
      default:
        return '준비 중';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      style={{ borderLeft: `4px solid ${color}` }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{tables}개 테이블</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Progress indicator */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>구현 진행도</span>
          <span>{status === 'completed' ? '100%' : status === 'in_progress' ? '50%' : '0%'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <motion.div
            className="h-1 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ 
              width: status === 'completed' ? '100%' : status === 'in_progress' ? '50%' : '0%' 
            }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
} 