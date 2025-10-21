export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        {/* Loading Icon */}
        <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Yannova Bouw</h2>
        <p className="text-gray-600 mb-6">Pagina wordt geladen...</p>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-yannova-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-yannova-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-yannova-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
