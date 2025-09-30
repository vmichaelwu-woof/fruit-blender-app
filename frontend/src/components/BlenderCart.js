export default function BlenderCart({ 
  cart, 
  fruits, 
  onAddToCart, 
  onRemoveFromCart, 
  onBlend, 
  isBlending, 
  getTotalItems, 
  getTotalPrice 
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-black">Your Blender 🥤</h2>
      
      {isBlending ? (
        <div className="text-center py-8 text-black">
          <div className="text-6xl mb-4 animate-spin">🥤</div>
          <h3 className="text-xl font-bold mb-2">Blending in progress...</h3>
          <p className="text-sm">Your delicious smoothie is being prepared!</p>
        </div>
      ) : Object.keys(cart).length === 0 ? (
        <div className="text-center py-8 text-black">
          <div className="text-6xl mb-4">🥤</div>
          <p>Your blender is empty</p>
          <p className="text-sm">Add some fruits to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(cart).map(([fruitId, count]) => {
            const fruit = fruits.find(f => f.id === fruitId);
            return (
              <div key={fruitId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{fruit.emoji}</span>
                  <span className="font-semibold text-black">{fruit.name}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                    {count}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveFromCart(fruitId)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded text-sm font-bold"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onAddToCart(fruitId)}
                    className="bg-green-100 hover:bg-green-200 text-green-600 px-2 py-1 rounded text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-black">Total Items: {getTotalItems()}</span>
              <span className="font-bold text-lg text-black">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <button
              onClick={onBlend}
              disabled={isBlending}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${
                isBlending 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600 hover:scale-105'
              }`}
            >
              {isBlending ? '🔄 Blending...' : '🥤 BLEND IT!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
