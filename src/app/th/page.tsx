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

export default function ThaiPlatform() {
  const [activeTab, setActiveTab] = useState('overview');

  const modules = [
    {
      id: 'erp',
      title: '🛒 Core ERP System',
      description: 'ระบบบูรณาการการจัดการคำสั่งซื้อ การจัดการสินค้าคงคลัง การจัดการทางการเงิน',
      tables: 40,
      status: 'pending' as const,
      color: '#3498db',
      icon: Building2
    },
    {
      id: 'gmp',
      title: '🧪 GMP 22716',
      description: 'ระบบการปฏิบัติตามหลักเกณฑ์การผลิตที่ดีสำหรับเครื่องสำอาง',
      tables: 25,
      status: 'pending' as const,
      color: '#9b59b6',
      icon: FlaskConical
    },
    {
      id: 'iso',
      title: '🏆 ISO 9001',
      description: 'การจัดการการรับรองระบบการจัดการคุณภาพ',
      tables: 30,
      status: 'pending' as const,
      color: '#f39c12',
      icon: Award
    },
    {
      id: 'rd',
      title: '🔬 R&D Management',
      description: 'ระบบการพัฒนาผลิตภัณฑ์ใหม่และการจัดการนวัตกรรม',
      tables: 24,
      status: 'pending' as const,
      color: '#e67e22',
      icon: Microscope
    },
    {
      id: 'supplier',
      title: '🤝 Supplier Portal',
      description: 'ระบบการจัดการซัพพลายเออร์และการทำงานร่วมกัน',
      tables: 20,
      status: 'pending' as const,
      color: '#2ecc71',
      icon: Handshake
    },
    {
      id: 'reverse',
      title: '📦 Reverse Logistics',
      description: 'ระบบการประมวลผลการคืนสินค้าและการจัดการข้อร้องเรียนของลูกค้า',
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
      title: 'ERP หลัก',
      description: 'ERP พื้นฐาน + B2C/B2B (60 ตาราง)',
      tasks: ['ข้อมูลหลักแบบบูรณาการ', 'ระบบคำสั่งซื้อ-สินค้าคงคลัง-ใบแจ้งหนี้', 'โมดูลทางการเงินพื้นฐาน'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 2',
      weeks: 'Week 5-8',
      title: 'ระบบคุณภาพ',
      description: 'GMP 22716 + ISO 9001 (55 ตาราง)',
      tasks: ['การสร้างโมดูลการปฏิบัติตาม GMP', 'ระบบการจัดการคุณภาพ ISO 9001', 'การจัดการการผลิตแบบแบทช์'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 3',
      weeks: 'Week 9-12',
      title: 'R&D + ซัพพลายเออร์',
      description: 'การจัดการ R&D/NPI + ซัพพลายเออร์ (30 ตาราง)',
      tasks: ['ระบบการพัฒนาผลิตภัณฑ์ใหม่', 'พอร์ทัลซัพพลายเออร์', 'การจัดการสูตร'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 4',
      weeks: 'Week 13-16',
      title: 'ลอจิสติกส์ย้อนกลับ + กฎระเบียบ',
      description: 'การจัดการลอจิสติกส์ย้อนกลับ + กฎระเบียบ (25 ตาราง)',
      tasks: ['การประมวลผลข้อร้องเรียนของลูกค้า', 'การปฏิบัติตามกฎระเบียบระดับโลก', 'ระบบ CAPA'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 5',
      weeks: 'Week 17-18',
      title: 'การบูรณาการและเพิ่มประสิทธิภาพ',
      description: 'การบูรณาการระบบและการเพิ่มประสิทธิภาพ',
      tasks: ['การทดสอบการบูรณาการระบบทั้งหมด', 'การปรับแต่งประสิทธิภาพ', 'การเพิ่มความปลอดภัย'],
      progress: 0,
      status: 'pending' as const
    },
    {
      phase: 'Phase 6',
      weeks: 'Week 19-20',
      title: 'การฝึกอบรมและ Go-Live',
      description: 'การฝึกอบรมผู้ใช้และการเริ่มต้นการดำเนินงานจริง',
      tasks: ['โปรแกรมการฝึกอบรมผู้ใช้', 'การย้ายข้อมูล', 'Go-Live และการทำให้เสถียร'],
      progress: 0,
      status: 'pending' as const
    }
  ];

  const kpis = [
    { value: '95%', label: 'การปรับปรุงประสิทธิภาพการดำเนินงานโดยรวม', icon: Zap },
    { value: '70%', label: 'การลดต้นทุนการปฏิบัติตามกฎระเบียบ', icon: Shield },
    { value: '90%', label: 'การทำงานเอกสารอัตโนมัติ', icon: Database },
    { value: '100%', label: 'การติดตามผลิตภัณฑ์', icon: Target },
    { value: '50%', label: 'การลดเวลาการเปิดตัวผลิตภัณฑ์ใหม่', icon: Clock },
    { value: '80%', label: 'การลดเวลาการแก้ไขข้อร้องเรียนของลูกค้า', icon: Users },
    { value: '60%', label: 'การลดต้นทุนการบำรุงรักษาการรับรอง', icon: Award },
    { value: '40%', label: 'ประสิทธิภาพการจัดการซัพพลายเออร์', icon: Handshake },
    { value: '85%', label: 'การเพิ่มประสิทธิภาพสินค้าคงคลัง', icon: Building2 },
    { value: '25%', label: 'การลดต้นทุนการดำเนินงานโดยรวม', icon: BarChart3 }
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
                <span>กลับไปยังการเลือกภาษา</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>🇹🇭 ภาษาไทย</span>
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
              { id: 'overview', label: '📊 ภาพรวม', icon: BarChart3 },
              { id: 'modules', label: '🔧 โมดูล', icon: Building2 },
              { id: 'timeline', label: '📅 ไทม์ไลน์', icon: Calendar },
              { id: 'kpis', label: '📈 KPI', icon: Target },
              { id: 'shopify', label: '🛒 การเชื่อมต่อ Shopify', icon: ShoppingCart, href: '/th/shopify' }
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
                แพลตฟอร์มบูรณาการการผลิตเครื่องสำอางที่สมบูรณ์แบบ
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                B2C + B2B, GMP 22716, ISO 9001, R&D, การจัดการซัพพลายเออร์, ลอจิสติกส์ย้อนกลับ - ระบบ ERP ที่สมบูรณ์สำหรับการจัดการกระบวนการทางธุรกิจทั้งหมดแบบบูรณาการ
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Database className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">170+</p>
                    <p className="text-gray-600">ตารางข้อมูลทั้งหมด</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">6</p>
                    <p className="text-gray-600">โมดูลหลัก</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">20</p>
                    <p className="text-gray-600">สัปดาห์การดำเนินการ</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                    <p className="text-gray-600">ความคืบหน้า</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ เทคโนโลยีที่ใช้</h3>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🏆 การปฏิบัติตามกฎระเบียบ</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  '🛒 B2C + B2B',
                  '📊 ERP เต็มรูปแบบ',
                  '🧪 GMP 22716',
                  '🏆 ISO 9001',
                  '🔄 ลอจิสติกส์ย้อนกลับ',
                  '🔬 การจัดการ R&D',
                  '🤝 พอร์ทัลซัพพลายเออร์',
                  '🇪🇺 การปฏิบัติตามกฎระเบียบระดับโลก'
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">🔧 โมดูลระบบ</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📅 ไทม์ไลน์การดำเนินการ (20 สัปดาห์)</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">📈 ประโยชน์ที่คาดหวัง</h2>
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 ERP Saboo Plan. โครงการแพลตฟอร์มบูรณาการการผลิตเครื่องสำอาง
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