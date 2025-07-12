import React from 'react';
import { Shield, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center space-x-4 lg:hidden">
        <h1 className="text-xl font-bold text-gray-900">EcoTech Chat</h1>
      </div>
      <div className="hidden lg:flex items-center space-x-4 ml-auto">
        <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">Trusted Advisor</span>
        </div>
        <div className="flex items-center space-x-2 bg-teal-50 px-3 py-1.5 rounded-full">
          <Globe className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium text-teal-700">Global Impact</span>
        </div>
      </div>
    </div>
  );
};

export default Header;