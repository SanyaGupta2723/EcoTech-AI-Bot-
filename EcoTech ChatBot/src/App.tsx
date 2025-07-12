import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface'; // Import the new ChatInterface component
import ProductRecommendations from './components/ProductRecommendations';
import CarbonCalculator from './components/CarbonCalculator';
import EWasteGuide from './components/EWasteGuide';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatsOverview from './components/StatsOverview';
import ProductDetailsModal from './components/ProductDetailModal'; 


function App() {
  const [activeSection, setActiveSection] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />; // Now renders the ChatInterface component
      case 'products':
        return <ProductRecommendations />;
      case 'calculator':
        return <CarbonCalculator />;
      case 'ewaste':
        return <EWasteGuide />;
      case 'stats':
        return <StatsOverview />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Menu Button */}
        <div className="bg-white shadow-sm border-b border-emerald-100">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <Header />
            </div>
          </div>
        </div>

        {/* Main Section Area where active component is rendered */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto h-full">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
