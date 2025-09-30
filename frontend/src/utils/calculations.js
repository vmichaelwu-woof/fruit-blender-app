import { FRUITS } from '../constants/fruits';

export const calculateTotalItems = (cart) => {
  return Object.values(cart).reduce((sum, count) => sum + count, 0);
};

export const calculateTotalPrice = (cart) => {
  return Object.entries(cart).reduce((total, [fruitId, count]) => {
    const fruit = FRUITS.find(f => f.id === fruitId);
    return total + (fruit.price * count);
  }, 0);
};

export const createBlendItems = (cart) => {
  return Object.entries(cart).map(([fruitId, count]) => {
    const fruit = FRUITS.find(f => f.id === fruitId);
    return { name: fruit.name, emoji: fruit.emoji, count, price: fruit.price };
  });
};
