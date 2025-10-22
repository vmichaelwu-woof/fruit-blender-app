export default function FruitCard({ fruit, onAddToCart }) {
  return (
    <div className="fruit-card">
      <div className="fruit-card-info">
        <h3>{fruit.name}</h3>
        <p className="fruit-card-price">${fruit.price.toFixed(2)}</p>
      </div>
      <button onClick={() => onAddToCart(fruit.id)} className="fruit-card-button">
        Add
      </button>
    </div>
  );
}
