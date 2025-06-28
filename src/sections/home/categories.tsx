// src/sections/home/categories.tsx
import { useState, useEffect } from 'react'
import {
  FiInfo,
  FiHeart as HeartOutline,
  FiShoppingCart,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'
import { useModal } from '../../context/ModalContext'
import { CATEGORY_PRODUCTS, type CategoryProduct } from '../../data/datacategories'

export default function Categories() {
  const { isLightMode } = useTheme()
  const { showModal, hideModal } = useModal()

  const [selected, setSelected] = useState('Vestidos')
  const [page, setPage] = useState(1)
  const [modalVersion, setModalVersion] = useState(0)

  const wishlistKey = 'wishlist'
  const cartKey = 'cart'

  const [wishlist, setWishlist] = useState<CategoryProduct[]>([])
  const [cart, setCart] = useState<CategoryProduct[]>([])

  useEffect(() => {
    const w = localStorage.getItem(wishlistKey)
    if (w) setWishlist(JSON.parse(w))
    const c = localStorage.getItem(cartKey)
    if (c) setCart(JSON.parse(c))
  }, [])

  const filtered = CATEGORY_PRODUCTS.filter(p => p.category === selected)
  const perPage = window.innerWidth < 768 ? 2 : 6
  const pageCount = Math.ceil(filtered.length / perPage)
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleWishlist = (prod: CategoryProduct) => {
    const exists = wishlist.some(p => p.id === prod.id)
    const next = exists ? wishlist.filter(p => p.id !== prod.id) : [...wishlist, prod]
    showModal({
      type: exists ? 'removed' : 'added',
      title: exists ? '¡Eliminado!' : '¡Agregado!',
      message: exists ? `${prod.name} fue removido` : `${prod.name} fue agregado a deseos`,
    })
    setWishlist(next)
    localStorage.setItem(wishlistKey, JSON.stringify(next))
    setModalVersion(v => v + 1)
  }

  const toggleCart = (prod: CategoryProduct) => {
    const exists = cart.some(p => p.id === prod.id)
    const next = exists ? cart.filter(p => p.id !== prod.id) : [...cart, prod]
    showModal({
      type: exists ? 'removed' : 'added',
      title: exists ? '¡Eliminado!' : '¡Agregado al carrito!',
      message: exists ? `${prod.name} se removió del carrito` : `${prod.name} se agregó al carrito`,
    })
    setCart(next)
    localStorage.setItem(cartKey, JSON.stringify(next))
    setModalVersion(v => v + 1)
  }

  return (
    <section
      className={`py-12 px-4 sm:px-8 lg:px-16 transition-colors min-h-screen ${
        isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      <div
        className={`w-full rounded-xl shadow-xl p-4 md:p-6 lg:p-8 ${
          isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
        } lg:bg-transparent`}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/5">
            <h2 className="text-2xl font-bold mb-4 lg:mb-8 text-center lg:text-left">
              ¡EXPLORA NUESTRAS<br className="hidden lg:block" /> CATEGORÍAS DE PRODUCTOS!
            </h2>
            <div className="flex flex-wrap justify-center lg:flex-col gap-2 overflow-x-auto max-w-full">
              {[...new Set(CATEGORY_PRODUCTS.map(p => p.category))].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelected(cat)
                    setPage(1)
                  }}
                  className={`px-4 py-2 rounded text-left transition-all font-semibold text-sm lg:text-base ${
                    cat === selected
                      ? 'bg-black text-white'
                      : isLightMode
                      ? 'text-black hover:bg-gray-100'
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-4/5">
            <h3 className="text-3xl font-bold text-center mb-6">{selected}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {pageItems.map(prod => (
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
                    <h4 className="text-lg font-semibold mb-1">{prod.name}</h4>
                    <span className="text-pink-500 font-bold block mb-4">
                      ₡{prod.price.toLocaleString()}
                    </span>
                    <div className="flex justify-end gap-4 text-xl">
                      <button
                        aria-label="Más info"
                        onClick={() =>
                          showModal({
                            type: 'info',
                            title: prod.name,
                            content: (
                              <div key={modalVersion} className="flex flex-col lg:flex-row gap-6">
                                <div className="w-full lg:w-1/2">
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="rounded-lg w-full object-cover"
                                  />
                                </div>
                                <div className="w-full lg:w-1/2 flex flex-col justify-between p-4">
                                  <h2 className="text-2xl font-semibold mb-2">{prod.name}</h2>
                                  <p className="mb-4">{prod.description}</p>

                                  <span className="font-bold text-pink-500 mb-4 block">
                                    ₡{prod.price.toLocaleString()}
                                  </span>

                                  <div className="flex justify-center items-center space-x-2 mb-4 lg:hidden">
                                    <button
                                      onClick={() => toggleWishlist(prod)}
                                      className={`p-2 rounded ${
                                        wishlist.some(p => p.id === prod.id)
                                          ? 'bg-pink-500 text-white'
                                          : 'bg-gray-200 text-black hover:bg-gray-300'
                                      }`}
                                    >
                                      {wishlist.some(p => p.id === prod.id) ? <FaHeart /> : <HeartOutline />}
                                    </button>
                                    <button
                                      onClick={() => toggleCart(prod)}
                                      className={`p-2 rounded ${
                                        cart.some(p => p.id === prod.id)
                                          ? 'bg-pink-500 text-white'
                                          : 'bg-gray-200 text-black hover:bg-gray-300'
                                      }`}
                                    >
                                      <FiShoppingCart />
                                    </button>
                                    <button
                                      onClick={() => hideModal()}

                                      className="p-2 rounded bg-gray-200 text-black hover:bg-gray-300"
                                    >
                                      Regresar
                                    </button>
                                  </div>

                                  <div className="hidden lg:flex justify-end space-x-2">
                                    <button
                                      onClick={() => toggleWishlist(prod)}
                                      className={`px-4 py-2 rounded ${
                                        wishlist.some(p => p.id === prod.id)
                                          ? 'bg-pink-500 text-white'
                                          : 'bg-gray-200 text-black hover:bg-gray-300'
                                      }`}
                                    >
                                      {wishlist.some(p => p.id === prod.id) ? <FaHeart /> : <HeartOutline />}
                                    </button>
                                    <button
                                      onClick={() => toggleCart(prod)}
                                      className={`px-4 py-2 rounded ${
                                        cart.some(p => p.id === prod.id)
                                          ? 'bg-pink-500 text-white'
                                          : 'bg-gray-200 text-black hover:bg-gray-300'
                                      }`}
                                    >
                                      <FiShoppingCart />
                                    </button>
                                    <button
                                      onClick={() => hideModal()}

                                      className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300"
                                    >
                                      Regresar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ),
                          })
                        }
                        className="hover:text-pink-500 transition-colors"
                      >
                        <FiInfo />
                      </button>
                      <button
                        aria-label="Deseos"
                        onClick={() => toggleWishlist(prod)}
                        className={`transition-colors ${
                          wishlist.some(p => p.id === prod.id) ? 'text-pink-500' : 'hover:text-pink-500'
                        }`}
                      >
                        {wishlist.some(p => p.id === prod.id) ? <FaHeart /> : <HeartOutline />}
                      </button>
                      <button
                        aria-label="Carrito"
                        onClick={() => toggleCart(prod)}
                        className={`transition-colors ${
                          cart.some(p => p.id === prod.id) ? 'text-pink-500' : 'hover:text-pink-500'
                        }`}
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded border border-black bg-white disabled:opacity-50"
              >
                <FiArrowLeft />
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded border border-black ${
                    page === i + 1 ? 'bg-pink-500 text-white' : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="p-2 rounded border border-black bg-white disabled:opacity-50"
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
