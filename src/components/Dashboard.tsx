'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { 
  Bell, Settings, Users, TrendingUp, Database, RefreshCw,
  Package, ShoppingCart, Factory, Truck, ClipboardCheck, AlertTriangle,
  BarChart3, Beaker, Shield, Award, QrCode, Scale, MapPin, Timer, CheckCircle, Clock
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const t = useTranslations();

  // Sample Data
  const kpiData = [
    { name: t('dashboard.totalProducts'), value: 1247, icon: Package, color: 'bg-blue-500', change: '+12%' },
    { name: t('dashboard.lowStockAlerts'), value: 23, icon: AlertTriangle, color: 'bg-red-500', change: '-5%' },
    { name: t('dashboard.productionOrders'), value: 89, icon: Factory, color: 'bg-green-500', change: '+8%' },
    { name: t('dashboard.pendingOrders'), value: 156, icon: Timer, color: 'bg-yellow-500', change: '+15%' }
  ];

  const inventoryData = [
    { month: 'Jan', raw_materials: 85, finished_goods: 92, packaging: 78 },
    { month: 'Feb', raw_materials: 88, finished_goods: 89, packaging: 82 },
    { month: 'Mar', raw_materials: 82, finished_goods: 95, packaging: 85 },
    { month: 'Apr', raw_materials: 90, finished_goods: 87, packaging: 88 },
    { month: 'May', raw_materials: 87, finished_goods: 93, packaging: 90 },
    { month: 'Jun', raw_materials: 92, finished_goods: 91, packaging: 87 }
  ];

  const productionEfficiency = [
    { line: 'Line A', efficiency: 95, target: 90 },
    { line: 'Line B', efficiency: 88, target: 90 },
    { line: 'Line C', efficiency: 92, target: 90 },
    { line: 'Line D', efficiency: 87, target: 90 }
  ];

  const lotTrackingData = [
    { lot: 'LOT-2024-001', product: 'Face Cream', expiry: '2025-12-31', status: 'Active', quantity: '500kg' },
    { lot: 'LOT-2024-002', product: 'Shampoo', expiry: '2025-10-15', status: 'Active', quantity: '800L' },
    { lot: 'LOT-2024-003', product: 'Lotion', expiry: '2025-08-20', status: 'Expired', quantity: '300L' }
  ];

  const gmpComplianceData = [
    { name: 'Documentation', value: 95 },
    { name: 'Training', value: 88 },
    { name: 'Facilities', value: 92 },
    { name: 'Equipment', value: 90 }
  ];

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: t('navigation.dashboard') },
    { id: 'users', icon: Users, label: t('navigation.userManagement') },
    { id: 'products', icon: Package, label: t('navigation.productManagement') },
    { id: 'inventory', icon: Database, label: t('navigation.inventoryManagement') },
    { id: 'procurement', icon: ShoppingCart, label: t('navigation.procurement') },
    { id: 'production', icon: Factory, label: t('navigation.production') },
    { id: 'sales', icon: TrendingUp, label: t('navigation.sales') },
    { id: 'gmp', icon: Shield, label: t('navigation.gmpCompliance') },
    { id: 'iso', icon: Award, label: t('navigation.isoQuality') },
    { id: 'rd', icon: Beaker, label: t('navigation.rdManagement') },
    { id: 'returns', icon: Truck, label: t('navigation.returnLogistics') }
  ];

  const COLORS = ['#f472b6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-pink-400 to-pink-500 text-white overflow-y-auto">
        <div className="p-6">
          {/* Logo Area */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">S</span>
            </div>
            <h1 className="text-xl font-bold">SABOO ERP</h1>
            <p className="text-pink-100 text-sm">Cosmetics Manufacturing</p>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                    activeModule === item.id
                      ? 'bg-white bg-opacity-20 shadow-lg'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              );
            })}
          </nav>

          {/* Quick Features */}
          <div className="mt-8 pt-8 border-t border-pink-300">
            <h3 className="text-sm font-semibold mb-4 text-pink-100">QUICK ACCESS</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 text-pink-100 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                <QrCode className="w-4 h-4" />
                <span className="text-xs">{t('features.barcodeIntegration')}</span>
              </div>
              <div className="flex items-center space-x-2 p-2 text-pink-100 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                <Scale className="w-4 h-4" />
                <span className="text-xs">{t('features.unitConversion')}</span>
              </div>
              <div className="flex items-center space-x-2 p-2 text-pink-100 hover:bg-white hover:bg-opacity-10 rounded cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{t('features.multiWarehouse')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saboo ERP {t('navigation.dashboard')}</h1>
            <p className="text-gray-600">
              {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{kpi.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value.toLocaleString()}</p>
                    <p className={`text-sm mt-1 ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {kpi.change} vs last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${kpi.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Inventory Levels */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-pink-500" />
              {t('dashboard.inventoryLevels')}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="raw_materials" stackId="1" stroke="#f472b6" fill="#f472b6" />
                <Area type="monotone" dataKey="finished_goods" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                <Area type="monotone" dataKey="packaging" stackId="1" stroke="#06b6d4" fill="#06b6d4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Production Efficiency */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Factory className="w-5 h-5 mr-2 text-pink-500" />
              {t('dashboard.productionEfficiency')}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionEfficiency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="line" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#10b981" />
                <Bar dataKey="target" fill="#e5e7eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lot/Batch Tracking */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <QrCode className="w-5 h-5 mr-2 text-pink-500" />
              {t('features.lotBatchTracking')}
            </h3>
            <div className="space-y-3">
              {lotTrackingData.map((lot, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{lot.lot}</p>
                    <p className="text-xs text-gray-600">{lot.product}</p>
                    <p className="text-xs text-gray-500">Exp: {lot.expiry}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      lot.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {lot.status}
                    </span>
                    <p className="text-xs text-gray-600 mt-1">{lot.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GMP Compliance */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-pink-500" />
              {t('dashboard.gmpCompliance')}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={gmpComplianceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {gmpComplianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <RefreshCw className="w-5 h-5 mr-2 text-pink-500" />
              {t('dashboard.quickActions')}
            </h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <QrCode className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium">{t('actions.scanBarcode')}</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <ClipboardCheck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">{t('actions.qualityCheck')}</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Factory className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">{t('actions.newProductionOrder')}</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">{t('actions.stockAdjustment')}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-pink-500" />
            {t('dashboard.recentActivities')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{t('activities.productionCompleted')}</p>
                <p className="text-sm text-gray-600">{t('activities.faceCreamBatch')}</p>
                <p className="text-xs text-gray-500">{t('activities.twoHoursAgo')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{t('activities.rawMaterialReceived')}</p>
                <p className="text-sm text-gray-600">{t('activities.vitaminEOil')}</p>
                <p className="text-xs text-gray-500">{t('activities.fourHoursAgo')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{t('activities.lowStockAlert')}</p>
                <p className="text-sm text-gray-600">{t('activities.packagingBottles')}</p>
                <p className="text-xs text-gray-500">{t('activities.sixHoursAgo')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;