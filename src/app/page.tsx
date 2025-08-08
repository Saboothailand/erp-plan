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
  ShoppingCart
} from 'lucide-react';
import ProgressCard from '@/components/ProgressCard';
import ModuleCard from '@/components/ModuleCard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const modules = [
    {
      id: 'erp',
      title: '🛒 Core ERP System',
      description: '주문관리, 재고관리, 재무관리 통합 시스템',
      tables: 40,
      status: 'pending' as const,
      color: '#3498db',
      icon: Building2
    },
    {
      id: 'gmp',
      title: '🧪 GMP 22716',
      description: '화장품 우수제조관리기준 준수 시스템',
      tables: 25,
      status: 'pending' as const,
      color: '#9b59b6',
      icon: FlaskConical
    },
    {
      id: 'iso',
      title: '🏆 ISO 9001',
      description: '품질경영시스템 인증 관리',
      tables: 30,
      status: 'pending' as const,
      color: '#f39c12',
      icon: Award
    },
    {
      id: 'rd',
      title: '🔬 R&D Management',
      description: '신제품 개발 및 혁신 관리 시스템',
      tables: 24,
      status: 'pending' as const,
      color: '#e67e22',
      icon: Microscope
    },
    {
      id: 'supplier',
      title: '🤝 Supplier Portal',
      description: '공급업체 관리 및 협력 시스템',
      tables: 20,
      status: 'pending' as const,
      color: '#2ecc71',
      icon: Handshake
    },
    {
      id: 'reverse',
      title: '📦 Reverse Logistics',
      description: '반품 처리 및 고객 불만 관리 시스템',
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
      title: '핵심 ERP',
      description: '기본 ERP + B2C/B2B (60 tables)',
      tasks: ['통합 마스터 데이터', '주문-재고-송장 시스템', '기본 재무 모듈'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 2',
      weeks: 'Week 5-8',
      title: '품질 시스템',
      description: 'GMP 22716 + ISO 9001 (55 tables)',
      tasks: ['GMP 준수 모듈 구축', 'ISO 9001 품질경영시스템', '배치 생산 관리'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 3',
      weeks: 'Week 9-12',
      title: 'R&D + 공급업체',
      description: 'R&D/NPI + 공급업체 관리 (30 tables)',
      tasks: ['신제품 개발 시스템', '공급업체 포털', '포뮬러 관리'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 4',
      weeks: 'Week 13-16',
      title: '역물류 + 규제',
      description: '역물류 + 규제 관리 (25 tables)',
      tasks: ['고객 불만 처리', '글로벌 규제 준수', 'CAPA 시스템'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 5',
      weeks: 'Week 17-18',
      title: '통합 & 최적화',
      description: '시스템 통합 및 성능 최적화',
      tasks: ['전체 시스템 통합 테스트', '성능 튜닝', '보안 강화'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 6',
      weeks: 'Week 19-20',
      title: '교육 & Go-Live',
      description: '사용자 교육 및 실운영 시작',
      tasks: ['사용자 교육 프로그램', '데이터 마이그레이션', 'Go-Live 및 안정화'],
      progress: 0,
      status: 'pending' as const
    }
  ];

  const kpis = [
    { value: '95%', label: '전체 업무 효율성 향상', icon: Zap },
    { value: '70%', label: '규제 준수 비용 절감', icon: Shield },
    { value: '90%', label: '문서 작업 자동화', icon: Database },
    { value: '100%', label: '제품 추적 가능성', icon: Target },
    { value: '50%', label: '신제품 출시 시간 단축', icon: Clock },
    { value: '80%', label: '고객 불만 해결 시간 단축', icon: Users },
    { value: '60%', label: '인증 유지 비용 절감', icon: Award },
    { value: '40%', label: '공급업체 관리 효율화', icon: Handshake },
    { value: '85%', label: '재고 최적화', icon: Building2 },
    { value: '25%', label: '전체 운영비용 절감', icon: BarChart3 }
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
                  🌟 ERP Saboo Plan
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>화장품 제조업 통합 플랫폼</span>
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
              { id: 'overview', label: '📊 개요', icon: BarChart3 },
              { id: 'modules', label: '🔧 모듈', icon: Building2 },
              { id: 'timeline', label: '📅 일정', icon: Calendar },
              { id: 'kpis', label: '📈 KPI', icon: Target },
              { id: 'shopify', label: '🛒 Shopify 연동', icon: ShoppingCart }
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
                완벽한 화장품 제조업 통합 플랫폼
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                B2C + B2B, GMP 22716, ISO 9001, R&D, 공급업체 관리, 역물류까지 모든 비즈니스 프로세스를 통합 관리하는 완전한 ERP 시스템
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Database className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">170+</p>
                    <p className="text-gray-600">총 데이터 테이블</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">6</p>
                    <p className="text-gray-600">주요 모듈</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">20</p>
                    <p className="text-gray-600">구현 주차</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                    <p className="text-gray-600">진행률</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ 기술 스택</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🏆 규제 준수</h3>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🔧 시스템 모듈</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📅 구현 일정</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📈 기대 효과</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🛒 Shopify 연동 전략</h2>
            
            {/* 현재 상황 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 현재 상황</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">기존 Shopify 쇼핑몰 운영 중</h4>
                  <p className="text-blue-700">고객 접점으로 안정적으로 운영</p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-2">신규 ERP 시스템 구축</h4>
                  <p className="text-green-700">화장품 제조업 전용 통합 관리 시스템</p>
                </div>
              </div>
            </div>

            {/* 연동 목표 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 연동 목표</h3>
              <p className="text-lg text-gray-700">기존 Shopify 쇼핑몰과 신규 ERP 시스템의 완전한 실시간 연동을 통한 업무 효율성 극대화</p>
            </div>

            {/* 연동 아키텍처 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🏗️ 연동 아키텍처</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">기존 Shopify 쇼핑몰 유지</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 고객 접점 및 브랜드 경험 보존</li>
                    <li>• 온라인 주문 접수</li>
                    <li>• 결제 처리</li>
                    <li>• 고객 커뮤니케이션</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">신규 ERP 시스템과 실시간 연동</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 백엔드 비즈니스 프로세스 통합</li>
                    <li>• 재고 관리</li>
                    <li>• GMP 생산</li>
                    <li>• 품질 관리</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 연동 방식 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🔄 연동 방식</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Webhook (Shopify → ERP)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 주문 정보 실시간 전송</li>
                    <li>• 결제 정보 동기화</li>
                    <li>• 고객 정보 업데이트</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">REST API (ERP → Shopify)</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 재고 정보 실시간 업데이트</li>
                    <li>• 주문 상태 동기화</li>
                    <li>• 배송 정보 전송</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 구현 일정 */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 연동 구현 일정 (13주)</h3>
              <div className="space-y-4">
                {[
                  { phase: 'Phase 1', weeks: '8주', title: 'ERP 백엔드 개발', tasks: ['ERP 시스템 핵심 모듈 구축', 'Shopify 연동 API 엔드포인트 설계', '데이터베이스 스키마 최적화'] },
                  { phase: 'Phase 2', weeks: '2주', title: 'Shopify 연동 API 개발', tasks: ['Shopify Webhook 수신 시스템 구축', 'ERP → Shopify API 연동 개발', '데이터 매핑 및 변환 로직 구현'] },
                  { phase: 'Phase 3', weeks: '2주', title: '통합 테스트', tasks: ['엔드투엔드 통합 테스트', '성능 테스트 및 최적화', '사용자 수용 테스트'] },
                  { phase: 'Phase 4', weeks: '1주', title: '데이터 마이그레이션 및 Go-Live', tasks: ['기존 데이터 마이그레이션', '시스템 전환 및 Go-Live', '모니터링 및 안정화'] }
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

            {/* 비용 및 효과 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 예상 비용</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">연동 개발비</span>
                    <span className="font-semibold">$15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">인프라 비용 (월)</span>
                    <span className="font-semibold">$500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">유지보수비 (월)</span>
                    <span className="font-semibold">$1,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 기대 효과</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">현재 쇼핑몰 운영 중단 없음</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">재고 관리 자동화</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">주문 처리 효율 90% 향상</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">GMP/ISO 9001 품질 관리 체계화</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">B2B 도매 기능 추가 가능</span>
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
              © 2024 ERP Saboo Plan. 화장품 제조업 통합 플랫폼 구축 프로젝트
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
