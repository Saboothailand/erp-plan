'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
  Info
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function ShopifyIntegration() {
  const [activeSection, setActiveSection] = useState('overview');
  const t = useTranslations();

  const integrationPhases = [
    {
      phase: 'Phase 1',
      title: t('shopify.timeline.phase1.title'),
      weeks: t('shopify.timeline.phase1.weeks'),
      tasks: t.raw('shopify.timeline.phase1.tasks'),
      status: 'pending' as const
    },
    {
      phase: 'Phase 2',
      title: t('shopify.timeline.phase2.title'),
      weeks: t('shopify.timeline.phase2.weeks'),
      tasks: t.raw('shopify.timeline.phase2.tasks'),
      status: 'pending' as const
    },
    {
      phase: 'Phase 3',
      title: t('shopify.timeline.phase3.title'),
      weeks: t('shopify.timeline.phase3.weeks'),
      tasks: t.raw('shopify.timeline.phase3.tasks'),
      status: 'pending' as const
    },
    {
      phase: 'Phase 4',
      title: t('shopify.timeline.phase4.title'),
      weeks: t('shopify.timeline.phase4.weeks'),
      tasks: t.raw('shopify.timeline.phase4.tasks'),
      status: 'pending' as const
    }
  ];

  const benefits = [
    { icon: Zap, title: '실시간 동기화', description: '주문과 재고 정보가 실시간으로 동기화됩니다' },
    { icon: Shield, title: '데이터 보안', description: '엔터프라이즈급 보안으로 데이터를 안전하게 보호합니다' },
    { icon: TrendingUp, title: '업무 효율성', description: '수동 작업을 90% 줄여 업무 효율성을 극대화합니다' },
    { icon: Clock, title: '빠른 처리', description: '주문 처리 시간을 50% 단축합니다' }
  ];

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
                <ShoppingCart className="w-4 h-4" />
                <span>Shopify Integration</span>
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
              { id: 'overview', label: '개요', icon: Info },
              { id: 'architecture', label: '아키텍처', icon: Database },
              { id: 'timeline', label: '일정', icon: Clock },
              { id: 'benefits', label: '효과', icon: TrendingUp }
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
                {t('shopify.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                기존 Shopify 쇼핑몰과 신규 ERP 시스템의 완벽한 통합
              </p>
            </div>

            {/* Current Situation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('shopify.current_situation.existing_shopify.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('shopify.current_situation.existing_shopify.description')}
                </p>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">안정적으로 운영 중</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('shopify.current_situation.new_erp.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('shopify.current_situation.new_erp.description')}
                </p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">구축 진행 중</span>
                </div>
              </div>
            </div>

            {/* Integration Goal */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 mb-12 text-white">
              <h3 className="text-2xl font-bold mb-4">
                {t('shopify.integration_goal.title')}
              </h3>
              <p className="text-lg opacity-90">
                {t('shopify.integration_goal.description')}
              </p>
            </div>

            {/* Cost Overview */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('shopify.costs.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-3 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {t('shopify.costs.amounts.development')}
                  </div>
                  <div className="text-gray-600">{t('shopify.costs.development')}</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {t('shopify.costs.amounts.infrastructure')}
                  </div>
                  <div className="text-gray-600">{t('shopify.costs.infrastructure')}</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {t('shopify.costs.amounts.maintenance')}
                  </div>
                  <div className="text-gray-600">{t('shopify.costs.maintenance')}</div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">연동 아키텍처</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Shopify Side */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-green-600" />
                  {t('shopify.architecture.shopify.title')}
                </h3>
                <p className="text-gray-600 mb-4">기존 Shopify 쇼핑몰 유지</p>
                <ul className="space-y-2">
                  {t.raw('shopify.architecture.shopify.features').map((feature: string, index: number) => (
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
                  {t('shopify.architecture.erp.title')}
                </h3>
                <p className="text-gray-600 mb-4">신규 ERP 시스템과 실시간 연동</p>
                <ul className="space-y-2">
                  {t.raw('shopify.architecture.erp.features').map((feature: string, index: number) => (
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
                  {t('shopify.integration_method.webhook.title')}
                </h3>
                <p className="text-gray-600 mb-4">Shopify → ERP 데이터 전송</p>
                <ul className="space-y-2">
                  {t.raw('shopify.integration_method.webhook.features').map((feature: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('shopify.integration_method.api.title')}
                </h3>
                <p className="text-gray-600 mb-4">ERP → Shopify 데이터 동기화</p>
                <ul className="space-y-2">
                  {t.raw('shopify.integration_method.api.features').map((feature: string, index: number) => (
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
              {t('shopify.timeline.title')}
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
                      <div className="text-sm text-gray-500">진행률</div>
                      <div className="text-2xl font-bold text-indigo-600">0%</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {phase.tasks.map((task: string, taskIndex: number) => (
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
              {t('shopify.benefits.title')}
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
                주요 기대 효과
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.raw('shopify.benefits.features').map((feature: string, index: number) => (
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