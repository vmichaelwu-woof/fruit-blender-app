export default function FruitCard({ fruit, onAddToCart }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{fruit.emoji}</span>
        <div>
          <h3 className="font-semibold text-lg text-black">{fruit.name}</h3>
          <p className="text-green-600 font-bold">${fruit.price.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={() => onAddToCart(fruit.id)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
      >
        Add to Blender
      </button>
    </div>
  );
}
