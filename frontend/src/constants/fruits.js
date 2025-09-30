export const FRUITS = [
  { id: 'banana', name: 'Banana', emoji: '🍌', price: 0.50 },
  { id: 'apple', name: 'Apple', emoji: '🍎', price: 0.75 },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', price: 1.00 }
];

export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api' 
    : 'http://localhost:3001/api'
};
