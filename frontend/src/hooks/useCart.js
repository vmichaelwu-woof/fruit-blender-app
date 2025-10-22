import { useState, useEffect } from 'react';
import { API_URL, FRUITS } from '../config';

export function useCart() {
  const [cart, setCart] = useState({});
  const [blendHistory, setBlendHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial cart state
  useEffect(() => {
    fetch(`${API_URL}/cart`)
      .then(res => res.json())
      .then(data => {
        setCart(data.cart || {});
        setBlendHistory(data.blendHistory || []);
      })
      .catch(err => console.error('Failed to load cart:', err));
  }, []);

  const addToCart = async (fruitId) => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', fruitId })
      });
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (fruitId) => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', fruitId })
      });
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const blendCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'blend' })
      });
      const data = await res.json();
      setCart(data.cart);
      setBlendHistory(data.blendHistory);
    } catch (err) {
      console.error('Failed to blend:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total items
  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [fruitId, count]) => {
      const fruit = FRUITS.find(f => f.id === fruitId);
      return total + (fruit?.price || 0) * count;
    }, 0);
  };

  return {
    cart,
    blendHistory,
    isLoading,
    addToCart,
    removeFromCart,
    blendCart,
    getTotalItems,
    getTotalPrice
  };
}
