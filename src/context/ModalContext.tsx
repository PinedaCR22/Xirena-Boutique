// src/context/ModalContext.tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode, FC } from 'react'
import { useTheme } from './ThemeContext'
import { FiHeart } from 'react-icons/fi'
import { FaHeartBroken } from 'react-icons/fa'

type ModalType = 'added' | 'removed'

interface ModalConfig {
  type: ModalType
  title: string
  message: string
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
  const { isLightMode } = useTheme()    // <-- traemos el theme
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ModalConfig>({
    type: 'added',
    title: '',
    message: '',
  })

  const showModal = (cfg: ModalConfig) => {
    setConfig(cfg)
    setIsOpen(true)
  }
  const hideModal = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-11/12 max-w-sm text-center transition-colors
              ${isLightMode
                ? 'bg-white text-gray-800'
                : 'bg-gray-800 text-white'}`
            }
          >
            <div className="text-5xl mb-4">
              {config.type === 'added'
                ? <FiHeart className={`mx-auto ${isLightMode ? 'text-pink-500' : 'text-pink-400'}`} />
                : <FaHeartBroken className="mx-auto text-red-500" />
              }
            </div>
            <h2 className="text-2xl font-semibold mb-2">{config.title}</h2>
            <p className="mb-4">{config.message}</p>
            <button
              onClick={hideModal}
              className={`mt-2 px-4 py-2 rounded transition
                ${isLightMode
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-pink-400 text-white hover:bg-pink-500'}`
              }
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
