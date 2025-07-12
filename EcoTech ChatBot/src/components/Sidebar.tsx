import React from 'react';
import { 
  MessageCircle, 
  ShoppingBag, 
  Calculator, 
  Recycle, 
  BarChart3,
  X,
  Leaf,
  TrendingUp,
  Users,
  Zap,
  TreePine
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeSection, onSectionChange }) => {
  const navItems = [
    { 
      id: 'chat', 
      label: 'Chat Advisor', 
      icon: MessageCircle, 
      description: 'Get personalized sustainability advice',
      color: 'emerald'
    },
    { 
      id: 'stats', 
      label: 'Impact Dashboard', 
      icon: BarChart3, 
      description: 'View environmental impact metrics',
      color: 'blue'
    },
    { 
      id: 'products', 
      label: 'Eco Products', 
      icon: ShoppingBag, 
      description: 'Sustainable tech recommendations',
      color: 'green'
    },
    { 
      id: 'calculator', 
      label: 'Carbon Calculator', 
      icon: Calculator, 
      description: 'Measure your digital footprint',
      color: 'yellow'
    },
    { 
      id: 'ewaste', 
      label: 'E-Waste Guide', 
      icon: Recycle, 
      description: 'Recycling and disposal solutions',
      color: 'teal'
    },
  ];

  const quickStats = [
    { label: 'CO₂ Saved', value: '2.4T', icon: TreePine, color: 'emerald' },
    { label: 'Energy Efficient', value: '89%', icon: Zap, color: 'yellow' },
    { label: 'Users Helped', value: '15.2K', icon: Users, color: 'blue' },
    { label: 'Impact Score', value: '94.2', icon: TrendingUp, color: 'teal' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white shadow-xl border-r border-emerald-100 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">EcoTech Advisor</h1>
                  <p className="text-xs text-emerald-600 font-medium">Sustainability Guide</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 border-b border-emerald-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                      <span className="text-xs text-gray-600">{stat.label}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Navigation</h3>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full group relative p-4 rounded-xl transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'hover:bg-emerald-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-white/20' : `bg-${item.color}-100 group-hover:bg-${item.color}-200`
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : `text-${item.color}-600`}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-900'}`}>
                          {item.label}
                        </div>
                        <div className={`text-xs mt-1 ${isActive ? 'text-emerald-100' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-emerald-100">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-semibold">Eco Tip</span>
              </div>
              <p className="text-xs text-emerald-100">
                Enable dark mode on your devices to save battery and reduce energy consumption by up to 20%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;