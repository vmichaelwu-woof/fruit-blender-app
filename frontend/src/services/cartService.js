import { API_CONFIG } from '../constants/fruits';

export const cartService = {
  async getFruits() {
    const response = await fetch(`${API_CONFIG.BASE_URL}/fruits`);
    const data = await response.json();
    return data.fruits;
  },

  async getCart() {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cart`);
    const data = await response.json();
    return data;
  },

  async addToCart(fruitId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'add',
        fruitId
      })
    });
    const data = await response.json();
    return data;
  },

  async removeFromCart(fruitId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'remove',
        fruitId
      })
    });
    const data = await response.json();
    return data;
  },

  async blendCart() {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'blend'
      })
    });
    const data = await response.json();
    return data;
  }
};
