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
    <div className="shop-section">
      <h2 className="section-title">Your Cart</h2>
      
      {isBlending ? (
        <div className="blending-container">
          <p className="blending-text">Blending...</p>
        </div>
      ) : Object.keys(cart).length === 0 ? (
        <div className="cart-empty">
          <p>Cart is empty</p>
          <p className="cart-empty-subtitle">Add fruits to get started</p>
        </div>
      ) : (
        <div>
          {Object.entries(cart).map(([fruitId, count]) => {
            const fruit = fruits.find(f => f.id === fruitId);
            return (
              <div key={fruitId} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{fruit.name}</span>
                  <span className="cart-item-count">x{count}</span>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => onRemoveFromCart(fruitId)} className="cart-button">
                    -
                  </button>
                  <button onClick={() => onAddToCart(fruitId)} className="cart-button">
                    +
                  </button>
                </div>
              </div>
            );
          })}
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total Items: {getTotalItems()}</span>
              <span className="cart-total-price">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <button
              onClick={onBlend}
              disabled={isBlending}
              className="cart-blend-button"
            >
              {isBlending ? 'Blending...' : 'Blend'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
