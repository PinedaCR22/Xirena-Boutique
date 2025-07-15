// src/components/PaymentModal.tsx
import React from 'react'
import { FiUpload, FiLoader, FiCheckCircle } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

interface PaymentModalProps {
  totalAmount: number
  isUploading: boolean
  uploadProgress: number
  paymentFile: File | null
  fileError: string
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: () => void
  onCancel: () => void
  onConfirm: () => void
}

export default function PaymentModal({
  totalAmount,
  isUploading,
  uploadProgress,
  paymentFile,
  fileError,
  onUpload,
  onRemoveFile,
  onCancel,
  onConfirm,
}: PaymentModalProps) {
  const { isLightMode } = useTheme()

  // En modo claro: modal blanco con overlay
  // En modo oscuro: modal coral sin overlay
  const modalBg = isLightMode ? 'bg-white' : 'bg-[#F3D5D0]'
  const overlayClass = isLightMode ? 'absolute inset-0 bg-black/50' : ''
  const borderColor = 'border-black'
  const iconTextColor = 'text-black'

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {overlayClass && <div className={overlayClass} />}

      <div
        className={`relative rounded-lg p-6 w-11/12 max-w-3xl shadow-lg transition-colors ${modalBg} ${borderColor}`}
      >
        {/* Header */}
        <div className="mb-4 text-center">
          <img src="/images/sinpe.png" alt="Sinpe Móvil" className="mx-auto h-16" />
          <p className="mt-2">Depositar el 50% del monto total a:</p>
        </div>

        {/* Instrucciones de pago */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="font-semibold text-lg">Número: 8888-8888</p>
          <p className="font-semibold text-lg text-pink-600">
            Monto: ₡{totalAmount.toLocaleString()}
          </p>
        </div>

        {/* Zona de subida de comprobante */}
        <label className="block mb-4">
          <div className={`border-2 border-dashed border-black hover:border-pink-400 rounded-lg p-6 cursor-pointer transition-all ${modalBg}`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUpload}
              disabled={isUploading}
            />
            <div className="flex flex-col items-center space-y-2">
              {isUploading ? (
                <FiLoader className={`text-2xl animate-spin ${iconTextColor}`} />
              ) : (
                <FiUpload className={`text-2xl ${iconTextColor}`} />
              )}
              <span className={`${iconTextColor} text-sm`}>
                {isUploading ? 'Cargando archivo...' : 'Haz clic para subir comprobante'}
              </span>
            </div>

            {/* Progreso */}
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full mt-3 h-2 overflow-hidden">
                <div
                  className="h-2 bg-pink-500 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {/* Archivo seleccionado */}
            {paymentFile && !isUploading && (
              <div className="mt-3 flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <p className="text-sm text-green-700 flex items-center">
                  <FiCheckCircle className="inline mr-1" />
                  {paymentFile.name}
                </p>
                <button
                  onClick={onRemoveFile}
                  className="text-black hover:text-red-600 transition-colors text-xl font-bold"
                  aria-label="Eliminar archivo"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </label>

        {/* Error */}
        {fileError && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded mb-4">
            {fileError}
          </p>
        )}

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={!paymentFile || isUploading}
            className={`px-6 py-2 rounded ${
              paymentFile && !isUploading
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isUploading ? 'Procesando...' : 'Confirmar pago'}
          </button>
        </div>
      </div>
    </div>
  )
}
