'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
  ShoppingCart
} from 'lucide-react';
import ProgressCard from '@/components/ProgressCard';
import ModuleCard from '@/components/ModuleCard';
import LanguageSelector from '@/components/LanguageSelector';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const t = useTranslations();

  const modules = [
    {
      id: 'erp',
      title: t('modules.erp.title'),
      description: t('modules.erp.description'),
      tables: 40,
      status: 'pending' as const,
      color: '#3498db',
      icon: Building2
    },
    {
      id: 'gmp',
      title: t('modules.gmp.title'),
      description: t('modules.gmp.description'),
      tables: 25,
      status: 'pending' as const,
      color: '#9b59b6',
      icon: FlaskConical
    },
    {
      id: 'iso',
      title: t('modules.iso.title'),
      description: t('modules.iso.description'),
      tables: 30,
      status: 'pending' as const,
      color: '#f39c12',
      icon: Award
    },
    {
      id: 'rd',
      title: t('modules.rd.title'),
      description: t('modules.rd.description'),
      tables: 24,
      status: 'pending' as const,
      color: '#e67e22',
      icon: Microscope
    },
    {
      id: 'supplier',
      title: t('modules.supplier.title'),
      description: t('modules.supplier.description'),
      tables: 20,
      status: 'pending' as const,
      color: '#2ecc71',
      icon: Handshake
    },
    {
      id: 'reverse',
      title: t('modules.reverse.title'),
      description: t('modules.reverse.description'),
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
      title: t('timeline.phase1.title'),
      description: t('timeline.phase1.description'),
      tasks: t.raw('timeline.phase1.tasks'),
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 2',
      weeks: 'Week 5-8',
      title: t('timeline.phase2.title'),
      description: t('timeline.phase2.description'),
      tasks: t.raw('timeline.phase2.tasks'),
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 3',
      weeks: 'Week 9-12',
      title: t('timeline.phase3.title'),
      description: t('timeline.phase3.description'),
      tasks: t.raw('timeline.phase3.tasks'),
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 4',
      weeks: 'Week 13-16',
      title: t('timeline.phase4.title'),
      description: t('timeline.phase4.description'),
      tasks: t.raw('timeline.phase4.tasks'),
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 5',
      weeks: 'Week 17-18',
      title: t('timeline.phase5.title'),
      description: t('timeline.phase5.description'),
      tasks: t.raw('timeline.phase5.tasks'),
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 6',
      weeks: 'Week 19-20',
      title: t('timeline.phase6.title'),
      description: t('timeline.phase6.description'),
      tasks: t.raw('timeline.phase6.tasks'),
      progress: 0,
      status: 'pending' as const
    }
  ];

  const kpis = [
    { value: '95%', label: t('kpis.efficiency'), icon: Zap },
    { value: '70%', label: t('kpis.compliance_cost'), icon: Shield },
    { value: '90%', label: t('kpis.automation'), icon: Database },
    { value: '100%', label: t('kpis.traceability'), icon: Target },
    { value: '50%', label: t('kpis.launch_time'), icon: Clock },
    { value: '80%', label: t('kpis.complaint_resolution'), icon: Users },
    { value: '60%', label: t('kpis.certification_cost'), icon: Award },
    { value: '40%', label: t('kpis.supplier_efficiency'), icon: Handshake },
    { value: '85%', label: t('kpis.inventory_optimization'), icon: Building2 },
    { value: '25%', label: t('kpis.operational_cost'), icon: BarChart3 }
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
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-900">
                  {t('common.title')}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{t('common.subtitle')}</span>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: t('navigation.overview'), icon: BarChart3 },
              { id: 'modules', label: t('navigation.modules'), icon: Building2 },
              { id: 'timeline', label: t('navigation.timeline'), icon: Calendar },
              { id: 'kpis', label: t('navigation.kpis'), icon: Target },
              { id: 'shopify', label: t('navigation.shopify'), icon: ShoppingCart }
            ].map((tab) => (
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
                {t('overview.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('overview.description')}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Database className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">170+</p>
                    <p className="text-gray-600">{t('overview.stats.totalTables')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">6</p>
                    <p className="text-gray-600">{t('overview.stats.mainModules')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">20</p>
                    <p className="text-gray-600">{t('overview.stats.implementationWeeks')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                    <p className="text-gray-600">{t('overview.stats.progress')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('overview.techStack.title')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: t('overview.techStack.nextjs'), color: 'bg-black text-white' },
                  { name: t('overview.techStack.typescript'), color: 'bg-blue-600 text-white' },
                  { name: t('overview.techStack.tailwind'), color: 'bg-cyan-500 text-white' },
                  { name: t('overview.techStack.supabase'), color: 'bg-green-600 text-white' },
                  { name: t('overview.techStack.vercel'), color: 'bg-black text-white' }
                ].map((tech) => (
                  <div key={tech.name} className={`${tech.color} rounded-lg px-4 py-2 text-center font-medium`}>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('overview.compliance.title')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  t('overview.compliance.b2c_b2b'),
                  t('overview.compliance.full_erp'),
                  t('overview.compliance.gmp'),
                  t('overview.compliance.iso'),
                  t('overview.compliance.reverse_logistics'),
                  t('overview.compliance.rd_management'),
                  t('overview.compliance.supplier_portal'),
                  t('overview.compliance.global_compliance')
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('modules.title')}</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('timeline.title')}</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('kpis.title')}</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('shopify.title')}</h2>
            
            {/* 현재 상황 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.current_situation.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">{t('shopify.current_situation.existing_shopify.title')}</h4>
                  <p className="text-blue-700">{t('shopify.current_situation.existing_shopify.description')}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">{t('shopify.current_situation.new_erp.title')}</h4>
                  <p className="text-green-700">{t('shopify.current_situation.new_erp.description')}</p>
                </div>
              </div>
            </div>

            {/* 연동 목표 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.integration_goal.title')}</h3>
              <p className="text-lg text-gray-700">{t('shopify.integration_goal.description')}</p>
            </div>

            {/* 연동 아키텍처 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.architecture.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('shopify.architecture.shopify.title')}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {t.raw('shopify.architecture.shopify.features').map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('shopify.architecture.erp.title')}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {t.raw('shopify.architecture.erp.features').map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 연동 방식 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.integration_method.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('shopify.integration_method.webhook.title')}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {t.raw('shopify.integration_method.webhook.features').map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('shopify.integration_method.api.title')}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {t.raw('shopify.integration_method.api.features').map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 구현 일정 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.timeline.title')}</h3>
              <div className="space-y-4">
                {[
                  { phase: 'Phase 1', key: 'phase1' },
                  { phase: 'Phase 2', key: 'phase2' },
                  { phase: 'Phase 3', key: 'phase3' },
                  { phase: 'Phase 4', key: 'phase4' }
                ].map((item) => (
                  <div key={item.key} className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.phase}: {t(`shopify.timeline.${item.key}.title`)} ({t(`shopify.timeline.${item.key}.weeks`)})
                    </h4>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {t.raw(`shopify.timeline.${item.key}.tasks`).map((task: string, index: number) => (
                        <li key={index}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 비용 및 효과 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.costs.title')}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('shopify.costs.development')}</span>
                    <span className="font-semibold">{t('shopify.costs.amounts.development')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('shopify.costs.infrastructure')}</span>
                    <span className="font-semibold">{t('shopify.costs.amounts.infrastructure')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('shopify.costs.maintenance')}</span>
                    <span className="font-semibold">{t('shopify.costs.amounts.maintenance')}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('shopify.benefits.title')}</h3>
                <div className="space-y-3">
                  {t.raw('shopify.benefits.features').map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
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
              {t('footer.copyright')}
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-gray-400">{t('footer.technologies.railway')}</span>
              <span className="text-gray-400">{t('footer.technologies.timetable')}</span>
              <span className="text-gray-400">{t('footer.technologies.github')}</span>
              <span className="text-gray-400">{t('footer.technologies.supabase')}</span>
              <span className="text-gray-400">{t('footer.technologies.vercel')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
