// src/components/EwasteGuide.tsx
import React, { useState } from 'react';
import { Recycle, MapPin, Calendar, Phone, Laptop, Smartphone, Headphones, Search, ExternalLink } from 'lucide-react';

const EWasteGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchZip, setSearchZip] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Electronics', icon: Recycle },
    { id: 'phones', label: 'Smartphones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'audio', label: 'Audio Devices', icon: Headphones },
  ];

  const recyclingOptions = [
    {
      id: '1',
      name: 'Apple Trade In',
      type: 'Manufacturer Program',
      category: 'phones',
      description: 'Free recycling for all Apple devices, trade-in credit for eligible devices',
      website: 'apple.com/trade-in',
      acceptedItems: ['iPhone', 'iPad', 'Mac', 'Apple Watch', 'AirPods'],
      benefits: ['Free shipping', 'Trade-in credit', 'Data destruction', 'Environmental report']
    },
    {
      id: '2',
      name: 'Best Buy Recycling',
      type: 'Retailer Program',
      category: 'all',
      description: 'Free recycling for most electronics, in-store drop-off available',
      website: 'bestbuy.com/recycling',
      acceptedItems: ['Phones', 'Laptops', 'Tablets', 'Cables', 'Batteries'],
      benefits: ['No purchase required', 'In-store drop-off', 'Data destruction', 'Wide acceptance']
    },
    {
      id: '3',
      name: 'Dell Reconnect',
      type: 'Manufacturer Program',
      category: 'laptops',
      description: 'Partnership with Goodwill for computer recycling',
      website: 'dell.com/reconnect',
      acceptedItems: ['Computers', 'Monitors', 'Printers', 'Keyboards', 'Mice'],
      benefits: ['Free drop-off', 'Goodwill locations', 'Job training support', 'Refurbishment program']
    },
    {
      id: '4',
      name: 'Staples Tech Recycling',
      type: 'Retailer Program',
      category: 'all',
      description: 'Free recycling for small electronics, fee for large items',
      website: 'staples.com/sbd/cre/noheader/sustainability-recycling.html',
      acceptedItems: ['Phones', 'Tablets', 'Ink cartridges', 'Batteries', 'Cables'],
      benefits: ['Convenient locations', 'Regular collection events', 'Small item focus', 'Business solutions']
    },
    {
      id: '5',
      name: 'Call2Recycle',
      type: 'Battery Specialist',
      category: 'all',
      description: 'Specialized battery and cell phone recycling program',
      website: 'call2recycle.org',
      acceptedItems: ['Batteries', 'Cell phones', 'Power tools', 'E-bikes', 'Tablets'],
      benefits: ['Battery specialist', 'Drop-off locations', 'Mail-in options', 'Business programs']
    },
    {
      id: '6',
      name: 'ecoATM',
      type: 'Kiosk Program',
      category: 'phones',
      description: 'Automated kiosks that buy and recycle mobile devices',
      website: 'ecoatm.com',
      acceptedItems: ['Smartphones', 'Tablets', 'MP3 players'],
      benefits: ['Instant cash', 'Automated process', 'Multiple locations', 'Device evaluation']
    }
  ];

  const preparationSteps = [
    {
      title: 'Backup Your Data',
      description: 'Save important files, photos, and documents to cloud storage or external drive',
      icon: '💾'
    },
    {
      title: 'Sign Out of Accounts',
      description: 'Remove your accounts from all apps and services on the device',
      icon: '🔐'
    },
    {
      title: 'Factory Reset',
      description: 'Perform a complete factory reset to erase all personal data',
      icon: '🔄'
    },
    {
      title: 'Remove Storage',
      description: 'Take out SD cards, SIM cards, and any removable storage',
      icon: '💳'
    },
    {
      title: 'Check for Accessories',
      description: 'Include original chargers, cables, and accessories if accepted',
      icon: '🔌'
    }
  ];

  const filteredOptions = recyclingOptions.filter(option =>
    selectedCategory === 'all' || option.category === selectedCategory
  );

  // Handler for the "Find Locations" button
  const handleFindLocations = () => {
    if (searchZip.trim() === '') {
      setSearchResult("Please enter a ZIP code (e.g., 110001 for Delhi) to search.");
      return;
    }

    console.log(`Searching for recycling options for ZIP code: ${searchZip}`);

    let cityDisplayName = '';

    // Map common Indian PIN codes to city names
    switch (searchZip) {
      case '110001':
      case '110002':
      case '110003': // Example for other Delhi PIN codes
        cityDisplayName = 'Delhi';
        break;
      case '400001':
      case '400002':
      case '400003': // Example for other Mumbai PIN codes
        cityDisplayName = 'Mumbai';
        break;
      case '560001':
      case '560002': // Example for Bengaluru
        cityDisplayName = 'Bengaluru';
        break;
      case '700001':
      case '700002': // Example for Kolkata
        cityDisplayName = 'Kolkata';
        break;
      case '600001':
      case '600002': // Example for Chennai
        cityDisplayName = 'Chennai';
        break;
      // Add more specific PIN codes and cities as needed
      default:
        // Check if it looks like a valid 6-digit number (Indian PIN code format)
        if (searchZip.length === 6 && !isNaN(Number(searchZip))) {
          cityDisplayName = `PIN code ${searchZip}`;
        } else {
          // Default for invalid format
          setSearchResult(`Invalid ZIP/PIN code format. Please enter a valid 5-digit ZIP or 6-digit PIN code.`);
          return;
        }
    }

    // Now, construct the message using the identified city/PIN code
    if (cityDisplayName) {
      setSearchResult(`Our local e-waste recycling search feature for ${cityDisplayName} is currently under development. For now, please refer to national e-waste portals or manufacturer take-back programs listed below.`);
    } else {
      // This else block should ideally not be hit if all paths are covered above
      setSearchResult(`Our local e-waste recycling search feature is under development. Please check back later!`);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">E-Waste Recycling Guide</h2>
            <p className="text-gray-600">Find responsible recycling options for your electronic devices</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Location Search */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your ZIP code to find local options"
                value={searchZip}
                onChange={(e) => setSearchZip(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={handleFindLocations}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Find Locations</span>
            </button>
          </div>
          {/* Display search result message */}
          {searchResult && (
            <p className="mt-2 text-sm text-gray-800 bg-emerald-100 p-3 rounded-md border border-emerald-200">
              {searchResult}
            </p>
          )}
        </div>
      </div>

      {/* Preparation Steps */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Before You Recycle</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preparationSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl">{step.icon}</div>
              <div>
                <h4 className="font-medium text-gray-900">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recycling Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Recycling Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{option.name}</h4>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full mt-1">
                    {option.type}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
              
              <p className="text-gray-600 mb-4">{option.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Accepted Items</h5>
                  <div className="flex flex-wrap gap-1">
                    {option.acceptedItems.map((item, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Benefits</h5>
                  <div className="grid grid-cols-2 gap-1">
                    {option.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a 
                  href={`https://${option.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Why E-Waste Recycling Matters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50M</div>
            <p className="text-sm text-emerald-100">Tons of e-waste generated globally each year</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">80%</div>
            <p className="text-sm text-emerald-100">Of e-waste materials can be recycled</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">$57B</div>
            <p className="text-sm text-emerald-100">Value of recoverable materials in e-waste</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EWasteGuide;