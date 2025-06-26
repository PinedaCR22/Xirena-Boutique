// src/pages/Buy.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheck, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

interface CartItem {
  id: number
  name: string
  image: string
  price: number       // precio unitario en ₡, como número
  quantity: number
}

export default function Buy() {
  const { isLightMode } = useTheme()
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartItem[]>([])

  // 1. Carga inicial y normalización de cart desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (!stored) return
    try {
      const raw = JSON.parse(stored) as any[]
      const normalized = raw.map(item => ({
        id:       item.id,
        name:     item.name,
        image:    item.image,
        price:    typeof item.price === 'number'
                     ? item.price
                     : Number(String(item.price).replace(/[^0-9.-]+/g, '')),
        quantity: typeof item.quantity === 'number'
                     ? item.quantity
                     : 1,
      }))
      setCart(normalized)
    } catch {
      setCart([])
    }
  }, [])

  // 2. Persistir cart cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // 3. Funciones para incrementar / decrementar cantidad
  const increment = (id: number) =>
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))

  const decrement = (id: number) =>
    setCart(cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    )

  const clearCart = () => {
    setCart([])
  }

  // 4. Cálculo del total general
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 5. Estado vacío
  if (cart.length === 0) {
    return (
      <div
        className={`min-h-[60vh] flex flex-col items-center justify-center transition-colors duration-300 ${
          isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
        }`}
      >
        <FiShoppingCart className="text-6xl mb-4 text-pink-500" />
        <h2 className="text-3xl font-semibold mb-2">¡Ups!</h2>
        <p>¡No tienes productos en el carrito!</p>
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
      {/* 1. Indicador de pasos */}
      <div className="flex justify-center items-center space-x-10 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
            <FiCheck className="text-white" />
          </div>
          <span className="mt-2 text-sm">Compras</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-pink-500 flex items-center justify-center">
            <span className="text-pink-500">2</span>
          </div>
          <span className="mt-2 text-sm">Cliente</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <span className="text-gray-300">3</span>
          </div>
          <span className="mt-2 text-sm">Pago</span>
        </div>
      </div>

      {/* 2. Tabla CRUD */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Producto</th>
              <th className="px-4 py-2 border-b text-center">Cantidad</th>
              <th className="px-4 py-2 border-b text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-3 border-b flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <span className="font-medium">{item.name}</span>
                </td>
                <td className="px-4 py-3 border-b text-center">
                  <div className="inline-flex items-center space-x-2 text-xl">
                    <button onClick={() => decrement(item.id)} aria-label="Menos">
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.id)} aria-label="Más">
                      <FiPlus />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 border-b text-right font-bold">
                  ₡{(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr>
              <td />
              <td className="px-4 py-3 text-right font-semibold">Total:</td>
              <td className="px-4 py-3 text-right font-bold">
                ₡{total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Botones de acción */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-pink-500 text-pink-500 rounded hover:bg-pink-50 transition"
        >
          ← Seguir comprando
        </button>
        <button
          onClick={clearCart}
          className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Vaciar carrito
        </button>
      </div>
    </section>
  )
}
