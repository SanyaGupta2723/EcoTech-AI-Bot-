// src/components/ProductDetailModal.tsx

import React from 'react';

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

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{product.name}</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-lg mb-4" />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg text-emerald-600 mb-2 font-semibold">{product.brand} - {product.category}</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">{product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            <div className="mb-4">
              <span className="font-medium text-gray-800 mr-2">Eco Score:</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">{product.ecoScore}</span>
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-800 mr-2">Energy Rating:</span>
              <span className="text-gray-700">{product.energyRating}</span>
            </div>

            <div className="mb-4">
              <p className="font-medium text-gray-800 mb-2">Key Features:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {product.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">Sustainability Highlights:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {product.sustainabilityHighlights.map((highlight, idx) => <li key={idx}>{highlight}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;