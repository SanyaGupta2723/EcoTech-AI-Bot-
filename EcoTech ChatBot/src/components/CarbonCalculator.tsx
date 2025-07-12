import React, { useState } from 'react';
import { Calculator, Zap, Wifi, Monitor, Smartphone, Car, Leaf, TrendingDown, BarChart3 } from 'lucide-react';

const CarbonCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    laptopHours: 8,
    phoneHours: 6,
    streamingHours: 4,
    gamingHours: 2,
    cloudStorage: 100,
    emails: 50,
    videoCallHours: 3,
    smartHomeDevices: 5
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateCarbon = () => {
    // Carbon footprint calculations (kg CO2 per day)
    const laptopCarbon = (formData.laptopHours * 0.05); // 50g CO2 per hour
    const phoneCarbon = (formData.phoneHours * 0.008); // 8g CO2 per hour
    const streamingCarbon = (formData.streamingHours * 0.036); // 36g CO2 per hour
    const gamingCarbon = (formData.gamingHours * 0.15); // 150g CO2 per hour
    const cloudCarbon = (formData.cloudStorage * 0.0005); // 0.5g CO2 per GB
    const emailCarbon = (formData.emails * 0.004); // 4g CO2 per email
    const videoCallCarbon = (formData.videoCallHours * 0.024); // 24g CO2 per hour
    const smartHomeCarbon = (formData.smartHomeDevices * 0.1); // 100g CO2 per device per day

    const dailyTotal = laptopCarbon + phoneCarbon + streamingCarbon + gamingCarbon + 
                      cloudCarbon + emailCarbon + videoCallCarbon + smartHomeCarbon;

    const yearlyTotal = dailyTotal * 365;
    const monthlyTotal = dailyTotal * 30;

    const breakdown = {
      laptop: laptopCarbon,
      phone: phoneCarbon,
      streaming: streamingCarbon,
      gaming: gamingCarbon,
      cloud: cloudCarbon,
      email: emailCarbon,
      videoCalls: videoCallCarbon,
      smartHome: smartHomeCarbon
    };

    setResults({
      daily: dailyTotal,
      monthly: monthlyTotal,
      yearly: yearlyTotal,
      breakdown,
      treeEquivalent: Math.round(yearlyTotal / 22), // 22kg CO2 per tree per year
      carEquivalent: Math.round(yearlyTotal / 2.31) // 2.31kg CO2 per mile
    });
  };

  const getTips = () => {
    const tips = [
      "Enable power-saving mode on devices to reduce energy consumption by 20%",
      "Use dark mode to extend battery life and reduce screen energy usage",
      "Close unused browser tabs and applications to minimize CPU load",
      "Choose video streaming at 720p instead of 4K to reduce data usage",
      "Unplug chargers when not in use to avoid phantom power draw",
      "Use cloud storage efficiently - clean up old files regularly",
      "Switch to renewable energy providers for your home",
      "Consider upgrading to energy-efficient devices when replacements are needed"
    ];
    return tips;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Digital Carbon Footprint Calculator</h2>
            <p className="text-gray-600">Calculate your daily tech usage environmental impact</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Usage</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Monitor className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Laptop/Desktop (hours)</label>
                  <input
                    type="number"
                    value={formData.laptopHours}
                    onChange={(e) => handleInputChange('laptopHours', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    min="0"
                    max="24"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Smartphone (hours)</label>
                  <input
                    type="number"
                    value={formData.phoneHours}
                    onChange={(e) => handleInputChange('phoneHours', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    min="0"
                    max="24"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Video Streaming (hours)</label>
                  <input
                    type="number"
                    value={formData.streamingHours}
                    onChange={(e) => handleInputChange('streamingHours', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    min="0"
                    max="24"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Gaming (hours)</label>
                  <input
                    type="number"
                    value={formData.gamingHours}
                    onChange={(e) => handleInputChange('gamingHours', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    min="0"
                    max="24"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Cloud Storage (GB)</label>
                  <input
                    type="number"
                    value={formData.cloudStorage}
                    onChange={(e) => handleInputChange('cloudStorage', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    min="0"
                    step="10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Car className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Emails Sent</label>
                  <input
                    type="number"
                    value={formData.emails}
                    onChange={(e) => handleInputChange('emails', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    min="0"
                    step="5"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculateCarbon}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium"
            >
              Calculate Carbon Footprint
            </button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {results ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Carbon Footprint</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-700">Daily</span>
                      <span className="text-2xl font-bold text-emerald-600">{results.daily.toFixed(2)} kg</span>
                    </div>
                    <p className="text-xs text-emerald-600 mt-1">CO₂ equivalent</p>
                  </div>
                  
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-teal-700">Monthly</span>
                      <span className="text-2xl font-bold text-teal-600">{results.monthly.toFixed(1)} kg</span>
                    </div>
                    <p className="text-xs text-teal-600 mt-1">CO₂ equivalent</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-700">Yearly</span>
                      <span className="text-2xl font-bold text-blue-600">{results.yearly.toFixed(0)} kg</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">CO₂ equivalent</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Environmental Context</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        Equivalent to {results.treeEquivalent} trees needed for offset
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Same as driving {results.carEquivalent} miles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Calculator className="w-12 h-12 mb-4" />
                <p className="text-center">Enter your usage details and click calculate to see your carbon footprint</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingDown className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-semibold text-gray-900">Reduction Tips</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getTips().map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-sm text-emerald-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;