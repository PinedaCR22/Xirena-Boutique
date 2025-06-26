import { createContext, useContext, useState } from 'react'
import type { ReactNode, FC } from 'react'
import { useTheme } from './ThemeContext'
import { FiShoppingCart } from 'react-icons/fi'
import { FaHeartBroken } from 'react-icons/fa'

export type ModalType = 'added' | 'removed' | 'info'

export interface ModalConfig {
  type: ModalType
  title: string
  message?: string      // para added/removed
  content?: ReactNode   // para info
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

  // Ancho distinto para info vs added/removed
  const widthClass =
    config.type === 'info'
      ? 'w-11/12 max-w-sm md:max-w-lg lg:max-w-4xl'
      : 'w-11/12 max-w-sm md:max-w-md lg:max-w-2xl'

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`
              rounded-lg p-6 text-center transition-colors my-8
              ${widthClass}
              ${isLightMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}
            `}
          >
            {/* Icono + título + cerrar sólo para added/removed */}
            {config.type !== 'info' && (
              <>
                <div className="text-5xl mb-4">
                  {config.type === 'added' && (
                    <FiShoppingCart className="mx-auto text-green-500" size={32} />
                  )}
                  {config.type === 'removed' && (
                    <FaHeartBroken className="mx-auto text-red-500" size={32} />
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-4">{config.title}</h2>
              </>
            )}

            {/* Contenido: si hay content (info), lo muestra; si no, message */}
            {config.content ? (
              <div className="mb-4">{config.content}</div>
            ) : (
              <p className="mb-4">{config.message}</p>
            )}

            {/* Botón “Cerrar” sólo para added/removed */}
            {config.type !== 'info' && (
              <button
                onClick={hideModal}
                className={`
                  mt-2 px-4 py-2 rounded transition
                  ${isLightMode
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-pink-400 text-white hover:bg-pink-500'}
                `}
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
