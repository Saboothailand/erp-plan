'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  FlaskConical, 
  Award, 
  Microscope, 
  Handshake, 
  Truck, 
  BarChart3, 
  Calendar,
  Clock,
  Users,
  Database,
  Zap,
  Globe,
  Shield,
  Target,
  ShoppingCart,
  ArrowLeft
} from 'lucide-react';
import ProgressCard from '@/components/ProgressCard';
import ModuleCard from '@/components/ModuleCard';
import Link from 'next/link';

export default function EnglishPlatform() {
  const [activeTab, setActiveTab] = useState('overview');

  const modules = [
    {
      id: 'erp',
      title: '🛒 Core ERP System',
      description: 'Order management, inventory management, financial management integrated system',
      tables: 40,
      status: 'pending' as const,
      color: '#3498db',
      icon: Building2
    },
    {
      id: 'gmp',
      title: '🧪 GMP 22716',
      description: 'Cosmetic Good Manufacturing Practice compliance system',
      tables: 25,
      status: 'pending' as const,
      color: '#9b59b6',
      icon: FlaskConical
    },
    {
      id: 'iso',
      title: '🏆 ISO 9001',
      description: 'Quality Management System certification management',
      tables: 30,
      status: 'pending' as const,
      color: '#f39c12',
      icon: Award
    },
    {
      id: 'rd',
      title: '🔬 R&D Management',
      description: 'New product development and innovation management system',
      tables: 24,
      status: 'pending' as const,
      color: '#e67e22',
      icon: Microscope
    },
    {
      id: 'supplier',
      title: '🤝 Supplier Portal',
      description: 'Supplier management and collaboration system',
      tables: 20,
      status: 'pending' as const,
      color: '#2ecc71',
      icon: Handshake
    },
    {
      id: 'reverse',
      title: '📦 Reverse Logistics',
      description: 'Return processing and customer complaint management system',
      tables: 15,
      status: 'pending' as const,
      color: '#e74c3c',
      icon: Truck
    }
  ];

  const timeline = [
    {
      phase: 'Phase 1',
      weeks: 'Week 1-4',
      title: 'Core ERP',
      description: 'Basic ERP + B2C/B2B (60 tables)',
      tasks: ['Integrated master data', 'Order-inventory-invoice system', 'Basic financial module'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 2',
      weeks: 'Week 5-8',
      title: 'Quality System',
      description: 'GMP 22716 + ISO 9001 (55 tables)',
      tasks: ['GMP compliance module construction', 'ISO 9001 Quality Management System', 'Batch production management'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 3',
      weeks: 'Week 9-12',
      title: 'R&D + Supplier',
      description: 'R&D/NPI + Supplier Management (30 tables)',
      tasks: ['New product development system', 'Supplier portal', 'Formula management'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 4',
      weeks: 'Week 13-16',
      title: 'Reverse Logistics + Regulatory',
      description: 'Reverse Logistics + Regulatory Management (25 tables)',
      tasks: ['Customer complaint processing', 'Global regulatory compliance', 'CAPA system'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 5',
      weeks: 'Week 17-18',
      title: 'Integration & Optimization',
      description: 'System integration and performance optimization',
      tasks: ['Complete system integration testing', 'Performance tuning', 'Security enhancement'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 6',
      weeks: 'Week 19-20',
      title: 'Training & Go-Live',
      description: 'User training and production operation start',
      tasks: ['User training program', 'Data migration', 'Go-Live and stabilization'],
      progress: 0,
      status: 'pending' as const
    }
  ];

  const kpis = [
    { value: '95%', label: 'Overall operational efficiency improvement', icon: Zap },
    { value: '70%', label: 'Regulatory compliance cost reduction', icon: Shield },
    { value: '90%', label: 'Documentation automation', icon: Database },
    { value: '100%', label: 'Product traceability', icon: Target },
    { value: '50%', label: 'New product launch time reduction', icon: Clock },
    { value: '80%', label: 'Customer complaint resolution time reduction', icon: Users },
    { value: '60%', label: 'Certification maintenance cost reduction', icon: Award },
    { value: '40%', label: 'Supplier management efficiency', icon: Handshake },
    { value: '85%', label: 'Inventory optimization', icon: Building2 },
    { value: '25%', label: 'Overall operational cost reduction', icon: BarChart3 }
  ];

  const handleModuleClick = (moduleId: string) => {
    console.log(`Module clicked: ${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Language Selection</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>🇺🇸 English Version</span>
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
              { id: 'overview', label: '📊 Overview', icon: BarChart3 },
              { id: 'modules', label: '🔧 Modules', icon: Building2 },
              { id: 'timeline', label: '📅 Timeline', icon: Calendar },
              { id: 'kpis', label: '📈 KPIs', icon: Target },
              { id: 'shopify', label: '🛒 Shopify Integration', icon: ShoppingCart, href: '/en/shopify' }
            ].map((tab) => (
              tab.href ? (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Link>
              ) : (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Complete Cosmetic Manufacturing Integrated Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                B2C + B2B, GMP 22716, ISO 9001, R&D, Supplier Management, Reverse Logistics - Complete ERP system for integrated management of all business processes
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Database className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">170+</p>
                    <p className="text-gray-600">Total Data Tables</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">6</p>
                    <p className="text-gray-600">Main Modules</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">20</p>
                    <p className="text-gray-600">Implementation Weeks</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                    <p className="text-gray-600">Progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'Next.js 14', color: 'bg-black text-white' },
                  { name: 'TypeScript', color: 'bg-blue-600 text-white' },
                  { name: 'Tailwind CSS', color: 'bg-cyan-500 text-white' },
                  { name: 'Supabase', color: 'bg-green-600 text-white' },
                  { name: 'Vercel', color: 'bg-black text-white' }
                ].map((tech) => (
                  <div key={tech.name} className={`${tech.color} rounded-lg px-4 py-2 text-center font-medium`}>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🏆 Regulatory Compliance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  '🛒 B2C + B2B',
                  '📊 Full ERP',
                  '🧪 GMP 22716',
                  '🏆 ISO 9001',
                  '🔄 Reverse Logistics',
                  '🔬 R&D Management',
                  '🤝 Supplier Portal',
                  '🇪🇺 Global Compliance'
                ].map((badge) => (
                  <div key={badge} className="bg-gray-100 rounded-lg px-4 py-3 text-center font-medium">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'modules' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🔧 System Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  {...module}
                  onClick={() => handleModuleClick(module.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📅 Implementation Timeline</h2>
            <div className="space-y-6">
              {timeline.map((phase) => (
                <ProgressCard
                  key={phase.phase}
                  title={`${phase.phase}: ${phase.title}`}
                  description={`${phase.weeks} - ${phase.description}`}
                  progress={phase.progress}
                  status={phase.status}
                  tasks={phase.tasks}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'kpis' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📈 Expected Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <kpi.icon className="w-8 h-8 mx-auto mb-3 text-indigo-500" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</div>
                  <div className="text-sm text-gray-600">{kpi.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'shopify' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🛒 Shopify Integration Strategy</h2>
            
            {/* Current Situation */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Current Situation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Existing Shopify Store Operating</h4>
                  <p className="text-blue-700">Stable operation as customer touchpoint</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">New ERP System Development</h4>
                  <p className="text-green-700">Cosmetic manufacturing dedicated integrated management system</p>
                </div>
              </div>
            </div>

            {/* Integration Goal */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Integration Goal</h3>
              <p className="text-lg text-gray-700">Complete real-time integration between existing Shopify store and new ERP system for maximum operational efficiency</p>
            </div>

            {/* Integration Architecture */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🏗️ Integration Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Maintain Existing Shopify Store</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Preserve customer touchpoint and brand experience</li>
                    <li>• Online order processing</li>
                    <li>• Payment processing</li>
                    <li>• Customer communication</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-time Integration with New ERP System</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Backend business process integration</li>
                    <li>• Inventory management</li>
                    <li>• GMP production</li>
                    <li>• Quality management</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Integration Method */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🔄 Integration Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Webhook (Shopify → ERP)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Real-time order information transmission</li>
                    <li>• Payment information synchronization</li>
                    <li>• Customer information updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">REST API (ERP → Shopify)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Real-time inventory information updates</li>
                    <li>• Order status synchronization</li>
                    <li>• Shipping information transmission</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Implementation Timeline */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 Integration Implementation Timeline (13 weeks)</h3>
              <div className="space-y-4">
                {[
                  { phase: 'Phase 1', weeks: '8 weeks', title: 'ERP Backend Development', tasks: ['ERP system core module construction', 'Shopify integration API endpoint design', 'Database schema optimization'] },
                  { phase: 'Phase 2', weeks: '2 weeks', title: 'Shopify Integration API Development', tasks: ['Shopify Webhook reception system construction', 'ERP → Shopify API integration development', 'Data mapping and transformation logic implementation'] },
                  { phase: 'Phase 3', weeks: '2 weeks', title: 'Integration Testing', tasks: ['End-to-end integration testing', 'Performance testing and optimization', 'User acceptance testing'] },
                  { phase: 'Phase 4', weeks: '1 week', title: 'Data Migration and Go-Live', tasks: ['Existing data migration', 'System transition and Go-Live', 'Monitoring and stabilization'] }
                ].map((item) => (
                  <div key={item.phase} className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900">{item.phase}: {item.title} ({item.weeks})</h4>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {item.tasks.map((task, index) => (
                        <li key={index}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Costs and Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Estimated Costs</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Integration Development Cost</span>
                    <span className="font-semibold">$15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Infrastructure Cost (monthly)</span>
                    <span className="font-semibold">$500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Maintenance Cost (monthly)</span>
                    <span className="font-semibold">$1,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Expected Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">No disruption to current store operation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Inventory management automation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">90% improvement in order processing efficiency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">GMP/ISO 9001 quality management systematization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">B2B wholesale functionality addition possible</span>
                  </div>
                </div>
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