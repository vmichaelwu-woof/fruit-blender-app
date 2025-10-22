'use client'

import { useState, useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import AppLayout from '../../components/AppLayout';
import ShopPage from '../../components/ShopPage';
import { useCart } from '../../hooks/useCart';
import { useFruits } from '../../hooks/useFruits';

export default function Shop() {
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

  // Track view when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && datadogRum.getInitConfiguration()) {
      datadogRum.startView({
        name: 'Shop Page',
        service: 'fruit-blender-frontend',
        version: '1.0.0'
      });
      console.log('📊 Datadog RUM: Tracked view - Shop Page');
    }
  }, []);

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
    <AppLayout>
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
    </AppLayout>
  );
}

