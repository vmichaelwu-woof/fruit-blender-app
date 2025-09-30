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
    <div className="grid md:grid-cols-2 gap-8">
      {/* Fruit Shop */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-black">Fresh Fruits</h2>
        <div className="space-y-4">
          {fruits.map(fruit => (
            <FruitCard 
              key={fruit.id} 
              fruit={fruit} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>

      {/* Blender Cart */}
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
