export default function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h1 className="text-2xl font-bold text-black mb-8 text-center">
        🥤 Fruit Blender
      </h1>
      
      <nav className="space-y-2">
        <button
          onClick={() => setCurrentPage('shop')}
          className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
            currentPage === 'shop' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          🛒 Shop
        </button>
        <button
          onClick={() => setCurrentPage('history')}
          className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
            currentPage === 'history' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          📊 History
        </button>
      </nav>
    </div>
  );
}
