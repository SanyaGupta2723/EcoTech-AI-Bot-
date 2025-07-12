import React from 'react';
import { TrendingUp, Users, Zap, TreePine } from 'lucide-react';

const StatsOverview: React.FC = () => {
  const stats = [
    { 
      label: 'CO₂ Saved', 
      value: '2.4T', 
      icon: TreePine, 
      color: 'emerald',
      trend: '+12%',
      description: 'This month'
    },
    { 
      label: 'Energy Efficient', 
      value: '89%', 
      icon: Zap, 
      color: 'yellow',
      trend: '+5%',
      description: 'Recommendations'
    },
    { 
      label: 'Users Helped', 
      value: '15.2K', 
      icon: Users, 
      color: 'blue',
      trend: '+18%',
      description: 'This week'
    },
    { 
      label: 'Impact Score', 
      value: '94.2', 
      icon: TrendingUp, 
      color: 'teal',
      trend: '+3%',
      description: 'Global rating'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">{stat.description}</div>
              <div className="text-xs font-semibold text-emerald-600">{stat.trend}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;