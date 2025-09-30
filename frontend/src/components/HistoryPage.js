export default function HistoryPage({ blendHistory }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-black">Blend History 📊</h2>
      
      {blendHistory.length === 0 ? (
        <div className="text-center py-8 text-black">
          <div className="text-6xl mb-4">📊</div>
          <p>No blends yet</p>
          <p className="text-sm">Start blending to see your history!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blendHistory.map((blend) => (
            <div key={blend.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-black">Blend #{blend.id.toString().slice(-4)}</h3>
                  <p className="text-sm text-black">{blend.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-green-600">${blend.totalPrice.toFixed(2)}</p>
                  <p className="text-sm text-black">{blend.totalItems} items</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {blend.items.map((item, index) => (
                  <span key={index} className="bg-white px-3 py-1 rounded-full text-sm border text-black">
                    {item.emoji} {item.name} x{item.count}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-black">Total Blends: {blendHistory.length}</span>
              <span className="font-bold text-lg text-green-600">
                ${blendHistory.reduce((sum, blend) => sum + blend.totalPrice, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
