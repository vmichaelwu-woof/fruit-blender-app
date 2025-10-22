export default function HistoryPage({ blendHistory }) {
  return (
    <div className="history-container">
      <h2 className="history-title">Blend History</h2>
      
      {blendHistory.length === 0 ? (
        <div className="history-empty">
          <p>No blends yet</p>
          <p className="history-empty-subtitle">Start blending to see your history</p>
        </div>
      ) : (
        <div className="history-grid">
          {blendHistory.map((blend, index) => (
            <div key={index} className="history-card">
              <div className="history-card-header">
                <span className="history-card-number">Blend #{blendHistory.length - index}</span>
                <span className="history-card-date">
                  {new Date(blend.timestamp).toLocaleString()}
                </span>
              </div>
              
              <div className="history-items">
                {blend.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="history-item">
                    <span>{item.name} x{item.count}</span>
                    <span className="history-item-price">
                      ${(item.price * item.count).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="history-total">
                <span>Total</span>
                <span>${blend.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
