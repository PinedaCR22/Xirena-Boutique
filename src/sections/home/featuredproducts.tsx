// src/components/FeaturedProducts.tsx
import { useState, useEffect, type ChangeEvent } from 'react'
import {
  FiSearch,
  FiInfo,
  FiHeart as HeartOutline,
  FiShoppingCart,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { useModal } from '../../context/ModalContext'

interface Product {
  id: number
  name: string
  price: number       // precio unitario puro
  image: string
}

interface CartItem extends Product {
  quantity: number
}

interface FeaturedProductsProps {
  isLightMode: boolean
}

const ALL_PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: (Math.floor(Math.random() * 9) + 1) * 10000,  // precio numérico
  image: `/images/PRUEBA${(i % 5) + 1}.jpg`,
}))

export default function FeaturedProducts({
  isLightMode,
}: FeaturedProductsProps) {
  const { showModal } = useModal()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  // wishlist (igual que antes)
  const [wishlist, setWishlist] = useState<Product[]>([])
  useEffect(() => {
    const w = localStorage.getItem('wishlist')
    if (w) setWishlist(JSON.parse(w))
  }, [])

  // carrito con cantidad
  const [cart, setCart] = useState<CartItem[]>([])
  useEffect(() => {
    const c = localStorage.getItem('cart')
    if (c) setCart(JSON.parse(c))
  }, [])

  // guardar carrito tras cada cambio
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // filtrado + paginación
  const filtered = ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const pageCount = Math.ceil(filtered.length / perPage)
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const toggleWishlist = (prod: Product) => {
    const exists = wishlist.some(p => p.id === prod.id)
    const next = exists
      ? wishlist.filter(p => p.id !== prod.id)
      : [...wishlist, prod]

    showModal({
      type: exists ? 'removed' : 'added',
      title: exists ? '¡Eliminado!' : '¡Agregado!',
      message: exists
        ? `¡${prod.name} fue removido de tu lista de deseos!`
        : `¡${prod.name} se agregó a tu lista de deseos!`,
    })

    setWishlist(next)
    localStorage.setItem('wishlist', JSON.stringify(next))
  }

  const toggleCart = (prod: Product) => {
    const exists = cart.some(p => p.id === prod.id)
    const next = exists
      ? cart.filter(p => p.id !== prod.id)
      : [...cart, { ...prod, quantity: 1 }]

    showModal({
      type: exists ? 'removed' : 'added',
      title: exists ? '¡Eliminado del carrito!' : '¡Agregado al carrito!',
      message: exists
        ? `¡${prod.name} se eliminó del carrito!`
        : `¡${prod.name} se agregó al carrito!`,
    })

    setCart(next)
  }

  return (
    <section
      id="featured"
      className={`transition-colors duration-300 py-12 px-4 sm:px-8 lg:px-16 ${
        isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        ¡Productos Destacados!
      </h2>

      {/* Buscador */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <FiSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isLightMode ? 'text-gray-500' : 'text-gray-300'
            }`}
          />
          <input
            type="text"
            value={search}
            onChange={onSearch}
            placeholder="Buscar…"
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none transition-colors ${
              isLightMode
                ? 'bg-gray-100 text-black placeholder-gray-500 border-gray-300 focus:border-gray-500'
                : 'bg-gray-800 text-white placeholder-white border-gray-700 focus:border-white'
            }`}
          />
        </div>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pageItems.map(prod => {
          const inWishlist = wishlist.some(p => p.id === prod.id)
          const inCart     = cart.some(p => p.id === prod.id)

          return (
            <div
              key={prod.id}
              className={`rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${
                isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
              }`}
            >
              <div className="h-48 overflow-hidden group">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{prod.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-pink-500 font-bold">
                    ₡{prod.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-4 text-xl">
                    <button
                      aria-label="Más info"
                      className="hover:text-pink-500 transition-colors"
                    >
                      <FiInfo />
                    </button>

                    <button
                      aria-label={
                        inWishlist ? 'Remover de deseos' : 'Añadir a deseos'
                      }
                      onClick={() => toggleWishlist(prod)}
                      className={`transition-colors ${
                        inWishlist ? 'text-pink-500' : 'hover:text-pink-500'
                      }`}
                    >
                      {inWishlist ? <FaHeart /> : <HeartOutline />}
                    </button>

                    <button
                      aria-label={inCart ? 'Remover del carrito' : 'Añadir al carrito'}
                      onClick={() => toggleCart(prod)}
                      className={`transition-colors ${
                        inCart ? 'text-pink-500' : 'hover:text-pink-500'
                      }`}
                    >
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Paginación */}
      <div className="mt-10 flex justify-center items-center space-x-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`p-2 rounded border border-black ${
            isLightMode
              ? 'bg-white text-black disabled:opacity-50'
              : 'bg-gray-700 text-white disabled:opacity-50'
          }`}
          aria-label="Anterior"
        >
          <FiArrowLeft />
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded font-medium transition border border-black ${
              page === i + 1
                ? 'bg-pink-500 text-white'
                : isLightMode
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className={`p-2 rounded border border-black ${
            isLightMode
              ? 'bg-white text-black disabled:opacity-50'
              : 'bg-gray-700 text-white disabled:opacity-50'
          }`}
          aria-label="Siguiente"
        >
          <FiArrowRight />
        </button>
      </div>
    </section>
  )
}
