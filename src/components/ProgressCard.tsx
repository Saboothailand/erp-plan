'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProgressCardProps {
  title: string;
  description: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
  startDate?: string;
  endDate?: string;
  tasks?: string[];
}

export default function ProgressCard({
  title,
  description,
  progress,
  status,
  startDate,
  endDate,
  tasks = []
}: ProgressCardProps) {
  const t = useTranslations();

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

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
        return t('modules.status.completed');
      case 'in_progress':
        return t('modules.status.in_progress');
      default:
        return t('modules.status.pending');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{t('modules.progress')}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {(startDate || endDate) && (
        <div className="text-sm text-gray-500 mb-4">
          {startDate && <div>{t('common.start')}: {startDate}</div>}
          {endDate && <div>{t('common.end')}: {endDate}</div>}
        </div>
      )}

      {tasks.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">{t('common.tasks')}</h4>
          <ul className="space-y-1">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                {task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
} 