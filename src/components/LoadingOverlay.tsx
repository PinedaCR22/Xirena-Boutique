// src/components/LoadingOverlay.tsx
import React from 'react'

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = "Procesando pago..." 
}) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center space-y-4">
        {/* Spinner animado */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        
        {/* Mensaje */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {message}
          </h3>
          <p className="text-sm text-gray-600">
            Confirmando pedido, espera un momento...
          </p>
        </div>
        
        {/* Puntos animados */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay