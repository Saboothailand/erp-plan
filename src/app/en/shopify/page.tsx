'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Database, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ShopifyIntegration() {
  const [activeSection, setActiveSection] = useState('overview');

  const integrationPhases = [
    {
      phase: 'Phase 1',
      title: 'ERP Backend Development',
      weeks: '8 weeks',
      tasks: [
        'ERP system core module construction',
        'Shopify integration API endpoint design',
        'Database schema optimization'
      ],
      status: 'pending' as const
    },
    {
      phase: 'Phase 2',
      title: 'Shopify Integration API Development',
      weeks: '2 weeks',
      tasks: [
        'Shopify Webhook reception system construction',
        'ERP → Shopify API integration development',
        'Data mapping and transformation logic implementation'
      ],
      status: 'pending' as const
    },
    {
      phase: 'Phase 3',
      title: 'Integration Testing',
      weeks: '2 weeks',
      tasks: [
        'End-to-end integration testing',
        'Performance testing and optimization',
        'User acceptance testing'
      ],
      status: 'pending' as const
    },
    {
      phase: 'Phase 4',
      title: 'Data Migration and Go-Live',
      weeks: '1 week',
      tasks: [
        'Existing data migration',
        'System transition and Go-Live',
        'Monitoring and stabilization'
      ],
      status: 'pending' as const
    }
  ];

  const benefits = [
    { icon: Zap, title: 'Real-time Sync', description: 'Orders and inventory information are synchronized in real-time' },
    { icon: Shield, title: 'Data Security', description: 'Enterprise-grade security to safely protect your data' },
    { icon: TrendingUp, title: 'Operational Efficiency', description: 'Maximize operational efficiency by reducing manual work by 90%' },
    { icon: Clock, title: 'Fast Processing', description: 'Reduce order processing time by 50%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/en" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Platform</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ShoppingCart className="w-4 h-4" />
                <span>Shopify Integration</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'architecture', label: 'Architecture', icon: Database },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'benefits', label: 'Benefits', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Shopify Integration Strategy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Perfect integration between existing Shopify store and new ERP system
              </p>
            </div>

            {/* Current Situation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Existing Shopify Store Operating
                </h3>
                <p className="text-gray-600 mb-4">
                  Stable operation as customer touchpoint
                </p>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Operating stably</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  New ERP System Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Cosmetic manufacturing dedicated integrated management system
                </p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Development in progress</span>
                </div>
              </div>
            </div>

            {/* Integration Goal */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 mb-12 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Integration Goal
              </h3>
              <p className="text-lg opacity-90">
                Complete real-time integration between existing Shopify store and new ERP system for maximum operational efficiency
              </p>
            </div>

            {/* Cost Overview */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Estimated Costs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-3 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    $15,000
                  </div>
                  <div className="text-gray-600">Integration Development Cost</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    $500
                  </div>
                  <div className="text-gray-600">Infrastructure Cost (monthly)</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    $1,000
                  </div>
                  <div className="text-gray-600">Maintenance Cost (monthly)</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Integration Architecture</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Shopify Side */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-green-600" />
                  Maintain Existing Shopify Store
                </h3>
                <p className="text-gray-600 mb-4">Keep existing Shopify store</p>
                <ul className="space-y-2">
                  {[
                    'Preserve customer touchpoint and brand experience',
                    'Online order processing',
                    'Payment processing',
                    'Customer communication'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ERP Side */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  Real-time Integration with New ERP System
                </h3>
                <p className="text-gray-600 mb-4">Real-time integration with new ERP system</p>
                <ul className="space-y-2">
                  {[
                    'Backend business process integration',
                    'Inventory management',
                    'GMP production',
                    'Quality management'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Integration Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Webhook (Shopify → ERP)
                </h3>
                <p className="text-gray-600 mb-4">Shopify → ERP data transmission</p>
                <ul className="space-y-2">
                  {[
                    'Real-time order information transmission',
                    'Payment information synchronization',
                    'Customer information updates'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  REST API (ERP → Shopify)
                </h3>
                <p className="text-gray-600 mb-4">ERP → Shopify data synchronization</p>
                <ul className="space-y-2">
                  {[
                    'Real-time inventory information updates',
                    'Order status synchronization',
                    'Shipping information transmission'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Integration Implementation Timeline (13 weeks)
            </h2>
            
            <div className="space-y-6">
              {integrationPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {phase.phase}: {phase.title}
                      </h3>
                      <p className="text-gray-600">{phase.weeks}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Progress</div>
                      <div className="text-2xl font-bold text-indigo-600">0%</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'benefits' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Expected Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <benefit.icon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Expected Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'No disruption to current store operation',
                  'Inventory management automation',
                  '90% improvement in order processing efficiency',
                  'GMP/ISO 9001 quality management systematization',
                  'B2B wholesale functionality addition possible'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 ERP Saboo Plan. Cosmetic Manufacturing Integrated Platform Project
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-gray-400">Railway</span>
              <span className="text-gray-400">Timetable</span>
              <span className="text-gray-400">GitHub</span>
              <span className="text-gray-400">Supabase</span>
              <span className="text-gray-400">Vercel</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 