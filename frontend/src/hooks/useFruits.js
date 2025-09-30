import { useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { handleApiError } from '../utils/errorHandler';

export function useFruits() {
  const [fruits, setFruits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFruits();
  }, []);

  const loadFruits = async () => {
    try {
      setIsLoading(true);
      const fruitsData = await cartService.getFruits();
      setFruits(fruitsData);
    } catch (err) {
      setError(handleApiError(err, 'Loading fruits'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fruits,
    isLoading,
    error,
    loadFruits
  };
}
