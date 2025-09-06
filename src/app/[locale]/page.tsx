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
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import Dashboard from '@/components/Dashboard';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function LocalePage() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();

  const modules = [
    {
      id: 'erp',
      title: t('modules.erp.title'),
      description: t('modules.erp.description'),
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      features: ['Order Management', 'Inventory Control', 'Financial Management', 'Reporting']
    },
    {
      id: 'gmp',
      title: t('modules.gmp.title'),
      description: t('modules.gmp.description'),
      icon: FlaskConical,
      color: 'from-purple-500 to-purple-600',
      features: ['Batch Records', 'Quality Control', 'Documentation', 'Compliance']
    },
    {
      id: 'iso',
      title: t('modules.iso.title'),
      description: t('modules.iso.description'),
      icon: Award,
      color: 'from-orange-500 to-orange-600',
      features: ['Quality Standards', 'Audit Management', 'Process Control', 'Continuous Improvement']
    },
    {
      id: 'rd',
      title: t('modules.rd.title'),
      description: t('modules.rd.description'),
      icon: Microscope,
      color: 'from-red-500 to-red-600',
      features: ['Project Management', 'Formula Development', 'Testing', 'Innovation']
    },
    {
      id: 'supplier',
      title: t('modules.supplier.title'),
      description: t('modules.supplier.description'),
      icon: Handshake,
      color: 'from-green-500 to-green-600',
      features: ['Supplier Database', 'Contract Management', 'Performance Tracking', 'Communication']
    },
    {
      id: 'reverse',
      title: t('modules.reverse.title'),
      description: t('modules.reverse.description'),
      icon: Truck,
      color: 'from-pink-500 to-pink-600',
      features: ['Return Processing', 'Complaint Management', 'Refund Processing', 'Quality Issues']
    }
  ];

  const stats = [
    { value: '170+', label: t('overview.stats.totalTables'), icon: Database },
    { value: '6', label: t('overview.stats.mainModules'), icon: Building2 },
    { value: '20', label: t('overview.stats.implementationWeeks'), icon: Calendar },
    { value: '3', label: t('overview.stats.progress'), icon: Globe }
  ];

  const benefits = [
    { value: '95%', label: t('kpis.efficiency'), icon: Zap },
    { value: '70%', label: t('kpis.compliance_cost'), icon: Shield },
    { value: '90%', label: t('kpis.automation'), icon: Database },
    { value: '100%', label: t('kpis.traceability'), icon: Target },
    { value: '50%', label: t('kpis.launch_time'), icon: Clock },
    { value: '80%', label: t('kpis.complaint_resolution'), icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('common.title')}</h1>
                <p className="text-sm text-gray-600">{t('common.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector currentLocale={locale} />
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('navigation.overview')}
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'modules'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('navigation.modules')}
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'timeline'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('navigation.timeline')}
            </button>
            <button
              onClick={() => setActiveTab('kpis')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'kpis'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('navigation.kpis')}
            </button>
            <button
              onClick={() => setActiveTab('shopify')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'shopify'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('navigation.shopify')}
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <Dashboard />}
      
      {activeTab === 'overview' && (
        <>
          {/* Hero Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('overview.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {t('overview.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/dashboard`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="mr-2">Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300"
              >
                <span className="mr-2">View Demo</span>
                <BarChart3 className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-indigo-500" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {t('modules.title')}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six integrated modules covering every aspect of cosmetic manufacturing and business operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center mr-4`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">{module.title}</h4>
                    </div>
                    <p className="text-gray-600 mb-6">{module.description}</p>
                    
                    <div className="space-y-2">
                      {module.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: hoveredModule === module.id ? 1 : 0.7,
                            x: hoveredModule === module.id ? 0 : -10
                          }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              {t('kpis.title')}
            </h3>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Transform your cosmetic manufacturing operations with measurable improvements across all key metrics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <benefit.icon className="w-8 h-8 mx-auto mb-4 text-white" />
                <div className="text-3xl font-bold text-white mb-2">{benefit.value}</div>
                <div className="text-indigo-100">{benefit.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {t('overview.techStack.title')}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leveraging cutting-edge technologies for optimal performance, security, and scalability
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Next.js 15', color: 'bg-black text-white' },
              { name: 'TypeScript', color: 'bg-blue-600 text-white' },
              { name: 'Tailwind CSS', color: 'bg-cyan-500 text-white' },
              { name: 'Supabase', color: 'bg-green-600 text-white' },
              { name: 'Vercel', color: 'bg-black text-white' }
            ].map((tech) => (
              <div key={tech.name} className={`${tech.color} rounded-xl px-6 py-4 text-center font-semibold text-lg`}>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Manufacturing?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join leading cosmetic manufacturers who have already implemented our comprehensive ERP solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">Contact Sales</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <span className="mr-2">View Pricing</span>
                <Star className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-8 h-8 text-indigo-400" />
                <span className="text-xl font-bold">ERP Saboo</span>
              </div>
              <p className="text-gray-400">
                Complete ERP solution for cosmetic manufacturing excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Modules</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Core ERP</li>
                <li>GMP 22716</li>
                <li>ISO 9001</li>
                <li>R&D Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Training</li>
                <li>Support Center</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
        </>
      )}

      {activeTab === 'modules' && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t('modules.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  hoveredModule={hoveredModule}
                  setHoveredModule={setHoveredModule}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t('timeline.title')}</h2>
            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <ProgressCard
                  key={phase.id}
                  phase={phase}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'kpis' && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t('kpis.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8 text-indigo-600" />
                      <span className="text-2xl font-bold text-indigo-600">{kpi.value}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{kpi.label}</h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shopify' && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t('shopify.title')}</h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t('shopify.current_situation.title')}</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">{t('shopify.current_situation.existing_shopify.title')}</h4>
                      <p className="text-blue-700">{t('shopify.current_situation.existing_shopify.description')}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">{t('shopify.current_situation.new_erp.title')}</h4>
                      <p className="text-green-700">{t('shopify.current_situation.new_erp.description')}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t('shopify.integration_goal.title')}</h3>
                  <p className="text-gray-700 mb-6">{t('shopify.integration_goal.description')}</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900">{t('shopify.integration_method.webhook.title')}</h4>
                      <ul className="text-purple-700 space-y-1">
                        {t('shopify.integration_method.webhook.features').map((feature: string, index: number) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900">{t('shopify.integration_method.api.title')}</h4>
                      <ul className="text-orange-700 space-y-1">
                        {t('shopify.integration_method.api.features').map((feature: string, index: number) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}