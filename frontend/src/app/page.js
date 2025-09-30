'use client'

import { useState } from 'react';
import "./SDKInitializer";
import Sidebar from '../components/Sidebar';
import ShopPage from '../components/ShopPage';
import HistoryPage from '../components/HistoryPage';
import { useCart } from '../hooks/useCart';
import { useFruits } from '../hooks/useFruits';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('shop');
  const [isBlending, setIsBlending] = useState(false);
  
  const { 
    cart, 
    blendHistory, 
    addToCart, 
    removeFromCart, 
    blendCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  const { fruits } = useFruits();

  const handleBlend = async () => {
    setIsBlending(true);
    try {
      await blendCart();
    } catch (error) {
      console.error('Blend failed:', error);
    } finally {
      setTimeout(() => {
        setIsBlending(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            {currentPage === 'shop' && (
              <ShopPage
                fruits={fruits}
                cart={cart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onBlend={handleBlend}
                isBlending={isBlending}
                getTotalItems={getTotalItems}
                getTotalPrice={getTotalPrice}
              />
            )}
            {currentPage === 'history' && (
              <HistoryPage blendHistory={blendHistory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}