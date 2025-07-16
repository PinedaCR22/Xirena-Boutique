// src/context/ModalContext.tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode, FC } from 'react'
import { useTheme } from './ThemeContext'
import { FiShoppingCart, FiCheckCircle } from 'react-icons/fi'
import { FaHeartBroken, FaHeart } from 'react-icons/fa'

export type ModalType = 'added' | 'removed' | 'info' | 'error' | 'success'

export interface ModalConfig {
  type: ModalType
  title: string
  message?: string         // Texto adicional opcional
  content?: ReactNode
  action?: () => void      // Función al cerrar
  secondaryAction?: () => void // Acción secundaria (ej. generar comprobante)
  secondaryLabel?: string      // Texto del segundo botón
}

interface ModalContextValue {
  showModal: (config: ModalConfig) => void
  hideModal: (target?: 'info' | 'toast') => void
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be inside ModalProvider')
  return ctx
}

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLightMode } = useTheme()
  const [infoModal, setInfoModal] = useState<ModalConfig | null>(null)
  const [toastModal, setToastModal] = useState<ModalConfig | null>(null)

  const showModal = (config: ModalConfig) => {
    if (config.type === 'info') setInfoModal(config)
    else setToastModal(config)
  }

  const hideModal = (target?: 'info' | 'toast') => {
    if (target === 'info') setInfoModal(null)
    else if (target === 'toast') setToastModal(null)
    else {
      setInfoModal(null)
      setToastModal(null)
    }
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      {/* Info Modal */}
      {infoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`relative rounded-lg p-6 w-11/12 max-w-4xl shadow-lg transition-colors ${
              isLightMode ? 'bg-white text-gray-900' : 'bg-[#f7e6e2] text-black'
            }`}
          >
            <div className="mb-4">{infoModal.content}</div>
            {infoModal.action && (
              <button
                onClick={() => {
                  infoModal.action!()
                  hideModal('info')
                }}
                className={`mt-2 px-4 py-2 rounded transition ${
                  isLightMode
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-pink-400 text-white hover:bg-pink-500'
                }`}
              >
                Aceptar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toast Modal */}
      {toastModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`flex flex-col items-center rounded-lg p-6 w-11/12 max-w-md shadow-lg transition-colors ${
              isLightMode ? 'bg-white text-gray-900' : 'bg-[#f7e6e2] text-black'
            }`}
          >
            <div className="text-5xl mb-4">
              {toastModal.type === 'added' && toastModal.title === '¡Agregado!' ? (
                <FaHeart className="text-pink-500" size={32} />
              ) : toastModal.type === 'added' ? (
                <FiShoppingCart className="text-pink-500" size={32} />
              ) : toastModal.type === 'removed' ? (
                <FaHeartBroken className="text-red-500" size={32} />
              ) : toastModal.type === 'success' ? (
                <FiCheckCircle className="text-green-500" size={32} />
              ) : null}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{toastModal.title}</h2>
            {toastModal.message && (
              <p className="mb-4 text-sm text-center whitespace-pre-line">{toastModal.message}</p>
            )}
            <div className="flex space-x-4">
  {toastModal.secondaryAction && toastModal.secondaryLabel && (
    <button
      onClick={toastModal.secondaryAction}
      className={`px-6 py-2 rounded transition ${
        isLightMode
          ? 'bg-pink-500 text-white hover:bg-pink-600'
          : 'bg-pink-400 text-white hover:bg-pink-500'
      }`}
    >
      {toastModal.secondaryLabel}
    </button>
  )}
  <button
    onClick={() => {
      toastModal.action?.()
      hideModal('toast')
    }}
    className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
  >
    Cerrar
  </button>
</div>

          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
