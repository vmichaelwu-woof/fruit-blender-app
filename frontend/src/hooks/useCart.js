import { useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { calculateTotalItems, calculateTotalPrice } from '../utils/calculations';
import { handleApiError } from '../utils/errorHandler';

export function useCart() {
  const [cart, setCart] = useState({});
  const [blendHistory, setBlendHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      setIsLoading(true);
      const data = await cartService.getCart();
      setCart(data.cart || {});
      setBlendHistory(data.blendHistory || []);
    } catch (err) {
      setError(handleApiError(err, 'Loading cart data'));
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (fruitId) => {
    try {
      const data = await cartService.addToCart(fruitId);
      setCart(data.cart);
      setBlendHistory(data.blendHistory);
    } catch (err) {
      setError(handleApiError(err, 'Adding to cart'));
    }
  };

  const removeFromCart = async (fruitId) => {
    try {
      const data = await cartService.removeFromCart(fruitId);
      setCart(data.cart);
      setBlendHistory(data.blendHistory);
    } catch (err) {
      setError(handleApiError(err, 'Removing from cart'));
    }
  };

  const blendCart = async () => {
    try {
      const data = await cartService.blendCart();
      setCart(data.cart);
      setBlendHistory(data.blendHistory);
      return data.blend;
    } catch (err) {
      setError(handleApiError(err, 'Blending cart'));
      throw err;
    }
  };

  const getTotalItems = () => calculateTotalItems(cart);
  const getTotalPrice = () => calculateTotalPrice(cart);

  return {
    cart,
    blendHistory,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    blendCart,
    getTotalItems,
    getTotalPrice,
    loadCartData
  };
}
