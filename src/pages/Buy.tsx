import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiInfo,
  FiShoppingCart,
  FiLink2 as FiCopyLink,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi'
import { FaHeart, FaHeartBroken } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useModal } from '../context/ModalContext'
import type { FeatureProduct } from '../data/datafeatures'

export default function Buy() {
  const { isLightMode } = useTheme()
  const { showModal } = useModal()
  const navigate = useNavigate()

  const [cart, setCart] = useState<FeatureProduct[]>([])
  const [page, setPage] = useState(1)
  const perPage = 3

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  const remove = (id: number) => {
    const next = cart.filter((p) => p.id !== id)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
    showModal({
      type: 'removed',
      title: '¡Eliminado!',
      message: '¡El producto fue quitado del carrito!',
    })
    if ((page - 1) * perPage >= next.length && page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const pageCount = Math.ceil(cart.length / perPage)
  const pageItems = cart.slice((page - 1) * perPage, page * perPage)

  if (!cart.length) {
    return (
      <div
        className={`min-h-[60vh] flex flex-col items-center justify-center transition-colors duration-300 ${
          isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
        }`}
      >
        <FaHeartBroken className="text-6xl mb-4 text-red-500" />
        <h2 className="text-3xl font-semibold mb-2">Carrito vacío</h2>
        <p>No tienes productos en tu carrito.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Regresar
        </button>
      </div>
    )
  }

  return (
    <section
      className={`transition-colors duration-300 py-12 px-4 sm:px-8 lg:px-16 ${
        isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
      }`}
    >
      <h1 className="flex items-center mb-8 text-4xl font-bold space-x-3">
        <FiShoppingCart className="text-pink-500" />
        <span>Mi Carrito</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-center">Producto</th>
              <th className="px-4 py-2 border-b text-center">Acciones</th>
              <th className="px-4 py-2 border-b text-center">Compartir</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((prod) => (
              <tr key={prod.id}>
                <td className="px-4 py-3 border-b text-center">
                  <div className="inline-flex flex-col items-center space-y-2">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <h3 className="font-semibold">{prod.name}</h3>
                    <span className="text-pink-500 font-bold">
                      ₡{prod.price.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 border-b text-center">
                  <div className="inline-flex items-center space-x-4 text-2xl">
                    <button
                      onClick={() =>
                        showModal({
                          type: 'info',
                          title: prod.name,
                          content: (
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="w-full lg:w-1/2">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="rounded-lg w-full object-cover"
                                />
                              </div>
                              <div className="w-full lg:w-1/2 flex flex-col justify-between p-4">
                                <h2 className="text-2xl font-semibold mb-2">
                                  {prod.name}
                                </h2>
                                <p className="mb-4">{prod.description}</p>
                              </div>
                            </div>
                          ),
                        })
                      }
                      className="hover:text-pink-500"
                    >
                      <FiInfo />
                    </button>
                    <button
                      onClick={() => remove(prod.id)}
                      className="hover:text-pink-500"
                    >
                      <FaHeart />
                    </button>
                    <button
                      onClick={() =>
                        showModal({
                          type: 'added',
                          title: '¡Agregado!',
                          message: '¡Producto confirmado en tu carrito!',
                        })
                      }
                      className="hover:text-pink-500"
                    >
                      <FiShoppingCart />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 border-b text-center">
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/product/${prod.id}`
                      navigator.clipboard.writeText(url)
                      showModal({
                        type: 'added',
                        title: '¡Enlace copiado!',
                        message:
                          '¡URL del producto copiada al portapapeles!',
                      })
                    }}
                    className="text-2xl hover:text-pink-500"
                  >
                    <FiCopyLink />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {pageCount > 1 && (
        <div className="mt-10 flex justify-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded border border-gray-400 bg-white text-black disabled:opacity-50"
          >
            <FiArrowLeft />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded border ${
                page === i + 1
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="p-2 rounded border border-gray-400 bg-white text-black disabled:opacity-50"
          >
            <FiArrowRight />
          </button>
        </div>
      )}

      {/* Botones finales */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={() => {
            showModal({
              type: 'added',
              title: '¡Compra confirmada!',
              message: 'Gracias por tu compra',
            })
          }}
          className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Finalizar compra
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-50 transition"
        >
          Regresar
        </button>
      </div>
    </section>
  )
}
