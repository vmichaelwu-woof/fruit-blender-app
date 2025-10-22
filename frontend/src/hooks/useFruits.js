import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export function useFruits() {
  const [fruits, setFruits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/fruits`)
      .then(res => res.json())
      .then(data => setFruits(data.fruits || []))
      .catch(err => console.error('Failed to load fruits:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return { fruits, isLoading };
}
