import { createContext, useContext, useState } from 'react'
import type { ReactNode, FC } from 'react'
import { useTheme } from './ThemeContext'
import { FiShoppingCart } from 'react-icons/fi'
import { FaHeartBroken } from 'react-icons/fa'

export type ModalType = 'added' | 'removed' | 'info'

export interface ModalConfig {
  type: ModalType
  title: string
  message?: string
  content?: ReactNode
}

interface ModalContextValue {
  showModal: (config: ModalConfig) => void
  hideModal: () => void
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
    if (config.type === 'info') {
      setInfoModal(config)
    } else {
      setToastModal(config)
    }
  }

  const hideModal = () => {
    setInfoModal(null)
    setToastModal(null)
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      {/* Modal informativo */}
      {infoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div
            className={`rounded-lg p-6 text-center transition-colors my-8 w-11/12 max-w-4xl
              ${isLightMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4">{infoModal.title}</h2>
            <div className="mb-4">{infoModal.content}</div>
          </div>
        </div>
      )}

      {/* Modal de éxito o eliminación */}
      {toastModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 text-center transition-colors my-8 w-11/12 max-w-md
              ${isLightMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
          >
            <div className="text-5xl mb-4">
              {toastModal.type === 'added' && (
                <FiShoppingCart className="mx-auto text-green-500" size={32} />
              )}
              {toastModal.type === 'removed' && (
                <FaHeartBroken className="mx-auto text-red-500" size={32} />
              )}
            </div>
            <h2 className="text-2xl font-semibold mb-4">{toastModal.title}</h2>
            <p className="mb-4">{toastModal.message}</p>
            <button
              onClick={() => setToastModal(null)}
              className={`mt-2 px-4 py-2 rounded transition
                ${isLightMode
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-pink-400 text-white hover:bg-pink-500'}`}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
