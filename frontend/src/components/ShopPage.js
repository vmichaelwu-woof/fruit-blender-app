import FruitCard from './FruitCard';
import BlenderCart from './BlenderCart';

export default function ShopPage({ 
  fruits, 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onBlend, 
  isBlending, 
  getTotalItems, 
  getTotalPrice 
}) {
  return (
    <div className="shop-grid">
      <div className="shop-section">
        <h2 className="section-title">Available Fruits</h2>
        <div>
          {fruits.map(fruit => (
            <FruitCard 
              key={fruit.id} 
              fruit={fruit} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>

      <BlenderCart
        cart={cart}
        fruits={fruits}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
        onBlend={onBlend}
        isBlending={isBlending}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />
    </div>
  );
}
