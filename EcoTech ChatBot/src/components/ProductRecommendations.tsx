// src/components/ProductRecommendations.tsx

import React, { useState } from 'react';
// ProductDetailModal को इम्पोर्ट करें (यदि आप इसका उपयोग कर रहे हैं)
import ProductDetailModal from './ProductDetailModal'
import { ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  ecoScore: number;
  energyRating: string;
  features: string[];
  sustainabilityHighlights: string[];
  image: string;
  description?: string;
}

const products: Product[] = [
  {
    id: 'fairphone5',
    name: 'Fairphone 5',
    brand: 'Fairphone',
    category: 'Smartphones',
    price: '₹1,09,999',
    ecoScore: 95,
    energyRating: 'A+',
    features: ['Modular design', 'Replaceable parts', 'Ethical sourcing'],
    sustainabilityHighlights: ['10-year software support', 'Conflict-free minerals', 'E-waste reduction'],
    image: 'data:image/jpeg;base64,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', 
    description: 'The Fairphone 5 is designed for longevity and repairability, making it one of the most sustainable smartphones on the market. It features a modular design allowing users to easily replace components, reducing electronic waste.'
  },
  {
    id: 'frameworklaptop',
    name: 'Framework Laptop',
    brand: 'Framework',
    category: 'Laptops',
    price: '₹94,000',
    ecoScore: 94,
    energyRating: 'A+',
    features: ['Modular design', 'Upgradeable ports', 'Repairable'],
    sustainabilityHighlights: ['Hope to repair', 'Modular design'],
    image: 'data:image/jpeg;base64,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',
    description: 'The Framework Laptop is a highly repairable and upgradeable notebook, designed to minimize electronic waste. Its modular components allow users to swap out parts, from ports to motherboards, extending the lifespan of the device.'
  },
  {
    id: 'macbookairm2',
    name: 'MacBook Air M2',
    brand: 'Apple',
    category: 'Laptops',
    price: '₹99,900',
    ecoScore: 92,
    energyRating: 'A+',
    features: ['18hr battery', 'Fanless design', 'Recycled aluminum'],
    sustainabilityHighlights: ['Carbon neutral by 2030', '100% recycled rare earth elements'],
    image: 'https://cdn.mos.cms.futurecdn.net/ocEeBSQ9YQsJDZLfvQqAt8.jpg',
    description: 'The MacBook Air M2 features a fanless design for quiet operation and is built with 100% recycled aluminum. Apple aims for its products to be carbon neutral by 2030, making this a more environmentally conscious choice.'
  },
  {
    id: 'delllatitude',
    name: 'Dell Latitude 7420',
    brand: 'Dell',
    category: 'Laptops',
    price: '₹85,000',
    ecoScore: 80,
    energyRating: 'A',
    features: ['Recycled content', 'EPEAT Gold registered', 'Energy Star certified'],
    sustainabilityHighlights: ['Closed-loop recycled plastics', 'Waterborne paint'],
    image: 'https://laptopmedia.com/wp-content/uploads/2021/05/2.jpg',
    description: 'The Dell Latitude 7420 is designed with a focus on sustainability, incorporating recycled materials and adhering to strict environmental standards. It is EPEAT Gold registered and Energy Star certified for energy efficiency.'
  },
  {
    id: 'samsunggalaxys23',
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    category: 'Smartphones',
    price: '₹74,999',
    ecoScore: 85,
    energyRating: 'A',
    features: ['Recycled glass', 'Recycled PET film', 'EPEAT Gold certified'],
    sustainabilityHighlights: ['Ocean-bound plastic', 'Eco-friendly packaging'],
    image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1715785378/Croma%20Assets/Communication/Mobiles/Images/268993_0_ujhcoa.png',
    description: 'The Samsung Galaxy S23 uses recycled glass and PET film, and incorporates ocean-bound plastics in its design. Its packaging is also made from eco-friendly materials, contributing to reduced environmental impact.'
  },
  {
    id: 'teracube2e',
    name: 'Teracube 2e',
    brand: 'Teracube',
    category: 'Smartphones',
    price: '₹17,999',
    ecoScore: 90,
    energyRating: 'A+',
    features: ['Repairable', 'Long warranty', 'Recycled materials'],
    sustainabilityHighlights: ['4-year warranty', 'Biodegradable case', 'Reduced e-waste'],
    image: 'https://phandroid.com/wp-content/uploads/2021/04/Teracube-2e-Review_6822.jpg',
    description: 'The Teracube 2e is built to be easily repairable by users, reducing the need for frequent replacements. It comes with a 4-year warranty and a biodegradable case, emphasizing its commitment to sustainability.'
  },
  {
    id: 'hpelitedragonfly',
    name: 'HP Elite Dragonfly',
    brand: 'HP',
    category: 'Laptops',
    price: '₹1,20,000',
    ecoScore: 88,
    energyRating: 'A',
    features: ['Recycled magnesium', 'Ocean-bound plastic speakers', 'Energy efficient'],
    sustainabilityHighlights: ['Sustainable materials', 'Reduced carbon footprint'],
    image: 'https://m.media-amazon.com/images/I/61oWQCrHQoL.jpg',
    description: 'The HP Elite Dragonfly incorporates recycled magnesium in its chassis and uses ocean-bound plastics in its speaker enclosure. It is designed to be energy efficient, reducing its overall carbon footprint.'
  },
  {
    id: 'googlepixel7',
    name: 'Google Pixel 7',
    brand: 'Google',
    category: 'Smartphones',
    price: '₹59,999',
    ecoScore: 82,
    energyRating: 'A',
    features: ['Recycled aluminum frame', 'Eco-friendly packaging', 'Energy efficient'],
    sustainabilityHighlights: ['Recycled materials', 'Commitment to renewable energy'],
    image: 'https://cliktodeal.com/wp-content/uploads/2024/10/google-pixel-7-pro.jpg',
    description: 'The Google Pixel 7 features a recycled aluminum frame and comes in packaging made from 100% recycled materials. Google is committed to using renewable energy in its operations, supporting sustainable practices.'
  },
  {
    id: 'acerchromebookvero',
    name: 'Acer Chromebook Vero 514',
    brand: 'Acer',
    category: 'Laptops',
    price: '₹35,000',
    ecoScore: 87,
    energyRating: 'A',
    features: ['Post-consumer recycled plastic chassis', 'Ocean-bound plastic touchpad', 'Recyclable packaging'],
    sustainabilityHighlights: ['PCR plastic usage', 'Easy repairability', 'EPEAT Gold certified'],
    image: 'https://www.tradeinn.com/f/14036/140360466_2/acer-chromebook-vero-514-cbv514-14-i5-1235u-8gb-256gb-ssd-laptop.webp',
    description: 'The Acer Chromebook Vero 514 is an eco-conscious laptop made with a significant amount of post-consumer recycled (PCR) plastic in its chassis and ocean-bound plastic in its touchpad. It comes in recyclable packaging and is designed for easy repairability.'
  },
  {
    id: 'oneplusaudiobudspro',
    name: 'OnePlus Buds Pro 2',
    brand: 'OnePlus',
    category: 'Audio',
    price: '₹11,999',
    ecoScore: 75,
    energyRating: 'B+',
    features: ['Compact charging case', 'Long battery life', 'Recycled packaging'],
    sustainabilityHighlights: ['Reduced packaging waste', 'Energy efficient charging'],
    image: 'https://dukaan.b-cdn.net/700x700/webp/media/85c33e50-48ff-4de4-8665-f00f9641eb09.jpg',
    description: 'The OnePlus Buds Pro 2 offers a blend of premium audio and a focus on reducing environmental impact through its compact design and the use of recycled materials in its packaging.'
  },
  {
    id: 'logitechmxmaster3s',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    category: 'Accessories',
    price: '₹10,995',
    ecoScore: 80,
    energyRating: 'A',
    features: ['Recycled plastic', 'Energy efficient sensor', 'Long battery life'],
    sustainabilityHighlights: ['Certified carbon neutral', 'PCR plastic content'],
    image: 'https://cdn.mos.cms.futurecdn.net/kmGSWfzvDD942khjeQUERd.jpg',
    description: 'The Logitech MX Master 3S mouse is a certified carbon-neutral product, made with a high percentage of post-consumer recycled plastic. Its energy-efficient design contributes to a lower environmental footprint.'
  },
  {
    id: 'sonysmartwatch4',
    name: 'Sony Smartwatch 4',
    brand: 'Sony',
    category: 'Wearables',
    price: '₹25,000',
    ecoScore: 70,
    energyRating: 'B',
    features: ['Recycled plastic straps', 'Low power mode', 'Eco-friendly packaging'],
    sustainabilityHighlights: ['Reduced material impact', 'Energy saving features'],
    image: 'https://cdn.mos.cms.futurecdn.net/49efa278f8d4326595a4911691798f7a-1200-80.jpg',
    description: 'The Sony Smartwatch 4 features straps made from recycled plastics and includes power-saving modes to extend battery life and reduce energy consumption. It also comes in environmentally friendly packaging.'
  }
];


const ProductRecommendations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('ecoScore');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to hold the product for the modal

  // Function to handle viewing product details
  const handleViewDetails = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product); // Set the product to be displayed in the modal
    }
  };

  // Function to close the product detail modal
  const handleCloseModal = () => {
    setSelectedProduct(null); // Clear the selected product to close the modal
  };

  const filteredProducts = products.filter(product =>
    selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
  ).sort((a, b) => {
    if (sortBy === 'ecoScore') {
      return b.ecoScore - a.ecoScore; // Sort in descending order by Eco Score
    }
    // Add other sorting logic here if needed
    return 0;
  });

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white rounded-2xl shadow-sm border border-emerald-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eco-Friendly Tech Recommendations</h2>
      <p className="text-gray-600 mb-6">Discover sustainable technology products with high environmental ratings</p>

      {/* Filters (Category & Sort By) */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center space-x-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300  border border-emerald-200 focus:outline-none focus:ring-emerald-200 focus:border-emerald-500 sm:text-sm rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
            <option value="audio">Audio</option>
            <option value="accessories">Accessories</option>
            <option value="wearables">Wearables</option>
          </select>
        </div>

         <div className="flex items-center space-x-2">
            <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="ecoScore">Eco Score</option>
            </select>
          </div>
        </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col items-center text-center transition-all hover:shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.brand} | {product.category}</p>
            <p className="text-xl font-bold text-emerald-600 mb-4">{product.price}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
              <span className="font-medium">Eco Score:</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-semibold">{product.ecoScore}</span>
            </div>
            <div className="text-sm text-gray-700 mb-4">
              <span className="font-medium">Energy Rating:</span> {product.energyRating}
            </div>
            <div className="text-left w-full mb-4">
              <p className="font-medium text-gray-800 mb-2">Key Features:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {product.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
              </ul>
            </div>
            <div className="text-left w-full mb-6">
              <p className="font-medium text-gray-800 mb-2">Sustainability Highlights:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {product.sustainabilityHighlights.map((highlight, idx) => <li key={idx}>{highlight}</li>)}
              </ul>
            </div>
            <button
              onClick={() => handleViewDetails(product.id)}
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Product Detail Modal conditionally rendered */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductRecommendations;