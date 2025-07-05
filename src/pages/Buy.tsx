import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiShoppingCart,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi'
import { FaHeartBroken, FaTrash } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useModal } from '../context/ModalContext'
import type { FeatureProduct } from '../data/datafeatures'

interface CartItem extends FeatureProduct {
  quantity: number
}

export default function Buy() {
  const { isLightMode } = useTheme()
  const { showModal } = useModal()
  const navigate = useNavigate()

  const [cart, setCart] = useState<CartItem[]>([])
  const [page, setPage] = useState(1)
  const perPage = 3

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      const parsed: FeatureProduct[] = JSON.parse(stored)
      const enriched = parsed.map((item) => ({ ...item, quantity: 1 }))
      setCart(enriched)
    }
  }, [])

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          if (newQty < 1) {
            showModal({
              type: 'removed',
              title: '¡Eliminado!',
              message: `${item.name} fue removido del carrito`,
            })
            return null
          }
          return { ...item, quantity: newQty }
        }
        return item
      }).filter(Boolean) as CartItem[]
      localStorage.setItem('cart', JSON.stringify(updated))
      return updated
    })
  }

  const pageCount = Math.ceil(cart.length / perPage)
  const pageItems = cart.slice((page - 1) * perPage, page * perPage)

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
        isLightMode ? 'bg-white text-gray-800' : 'bg-[#f7e6e2] text-black'
      }`}
    >
      <h1 className="flex items-center mb-8 text-4xl font-bold space-x-3">
        <FiShoppingCart className="text-pink-500" />
        <span>Mi Carrito</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">Producto</th>
                <th className="px-4 py-2 border-b text-center">Cantidad</th>
                <th className="px-4 py-2 border-b text-center">Precio total</th>
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
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(prod.id, -1)}
                        className="bg-gray-200 text-black px-2 rounded"
                      >
                        {prod.quantity === 1 ? <FaTrash /> : '-'}
                      </button>
                      <span className="w-6 text-center">{prod.quantity}</span>
                      <button
                        onClick={() => updateQuantity(prod.id, 1)}
                        className="bg-gray-200 text-black px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b text-center font-bold text-pink-500">
                    ₡{(prod.price * prod.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </div>

        {/* Card lateral */}
        <div className="w-full lg:w-1/3 border rounded-lg p-6 shadow-md flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Resumen de compra</h2>
            <p className="text-sm text-gray-500 mb-4">
              Explora tu estilo con Xirena Boutique. Elegancia, comodidad y moda en un solo lugar.
            </p>
            <p className="text-2xl font-bold text-pink-600">
              Total: ₡{totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <button
  onClick={() => navigate('/checkout')}
  className="w-full px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
>
  Continuar compra
</button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
