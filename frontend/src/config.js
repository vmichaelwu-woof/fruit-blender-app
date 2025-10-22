// API Configuration
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3001/api';

// Fruit data
export const FRUITS = [
  { id: 'banana', name: 'Banana', price: 0.50 },
  { id: 'apple', name: 'Apple', price: 0.75 },
  { id: 'strawberry', name: 'Strawberry', price: 1.00 }
];

// Fruit ID mapping for URL routes
export const FRUIT_ID_TO_NAME = {
  1: 'banana',
  2: 'apple',
  3: 'strawberry'
};

export const FRUIT_ID_TO_DISPLAY = {
  1: 'Banana',
  2: 'Apple',
  3: 'Strawberry'
};

