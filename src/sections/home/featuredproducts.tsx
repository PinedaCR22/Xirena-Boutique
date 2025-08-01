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
import { ALL_PRODUCTS, type FeatureProduct } from '../../data/datafeatures'

interface FeaturedProductsProps {
  isLightMode: boolean
}

export default function FeaturedProducts({ isLightMode }: FeaturedProductsProps) {
  const { showModal, hideModal } = useModal()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  const [wishlist, setWishlist] = useState<FeatureProduct[]>([])
  useEffect(() => {
    const w = localStorage.getItem('wishlist')
    if (w) setWishlist(JSON.parse(w))
  }, [])

  const [cart, setCart] = useState<FeatureProduct[]>([])
  useEffect(() => {
    const c = localStorage.getItem('cart')
    if (c) setCart(JSON.parse(c))
  }, [])

  const filtered = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const pageCount = Math.ceil(filtered.length / perPage)
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const toggleWishlist = (prod: FeatureProduct) => {
    const exists = wishlist.some((p) => p.id === prod.id)
    const next = exists ? wishlist.filter((p) => p.id !== prod.id) : [...wishlist, prod]
    showModal({
      type: exists ? 'removed' : 'added',
      title: exists ? '¡Eliminado!' : '¡Agregado!',
      message: exists
        ? `${prod.name} fue removido de deseos`
        : `${prod.name} fue agregado a deseos`,
    })
    setWishlist(next)
    localStorage.setItem('wishlist', JSON.stringify(next))
    window.dispatchEvent(new Event('wishUpdated'))
  }

  const toggleCart = (prod: FeatureProduct) => {
    const exists = cart.some((p) => p.id === prod.id)
    const next = exists ? cart.filter((p) => p.id !== prod.id) : [...cart, prod]
    showModal({
      type: exists ? 'removed' : 'added',
      title: exists ? '¡Eliminado!' : '¡Agregado al carrito!',
      message: exists
        ? `${prod.name} se removió del carrito`
        : `${prod.name} se agregó al carrito`,
    })
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const openInfo = (prod: FeatureProduct) => {
    showModal({
      type: 'info',
      title: prod.name,
      content: (
        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className="w-full lg:w-1/2 overflow-hidden group cursor-pointer"
            onClick={() => openInfo(prod)}
          >
            <img
              src={prod.image}
              alt={prod.name}
              className="rounded-lg w-full h-80 object-cover transition-all duration-500 group-hover:object-top"
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
                  wishlist.some((p) => p.id === prod.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {wishlist.some((p) => p.id === prod.id) ? <FaHeart /> : <HeartOutline />}
              </button>
              <button
                onClick={() => toggleCart(prod)}
                className={`p-2 rounded ${
                  cart.some((p) => p.id === prod.id)
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
                  wishlist.some((p) => p.id === prod.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {wishlist.some((p) => p.id === prod.id) ? <FaHeart /> : <HeartOutline />}
              </button>
              <button
                onClick={() => toggleCart(prod)}
                className={`px-4 py-2 rounded ${
                  cart.some((p) => p.id === prod.id)
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

  return (
    <section
      id="featured"
      className={`py-12 px-4 sm:px-8 lg:px-16 transition-colors ${
        isLightMode ? 'bg-white text-black' : 'bg-[#f7e6e2] text-black'
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-8">¡Productos Destacados!</h2>
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <FiSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isLightMode ? 'text-gray-500' : 'text-black'
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
                : 'bg-[#F3D5D0] text-black placeholder-black border-black focus:border-black'
            }`}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pageItems.map((prod) => {
          const inWishlist = wishlist.some((p) => p.id === prod.id)
          const inCart = cart.some((p) => p.id === prod.id)
          return (
            <div
              key={prod.id}
              className={`rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${
                isLightMode ? 'bg-white text-black' : 'bg-[#f7e6e2] text-black'
              }`}
            >
              <div
                className="h-48 overflow-hidden group cursor-pointer"
                onClick={() => openInfo(prod)}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:object-top"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>
                <span className="text-pink-500 font-bold block mb-4">
                  ₡{prod.price.toLocaleString()}
                </span>
                <div className="flex justify-end gap-4 text-xl">
                  <button
                    aria-label="Más info"
                    onClick={() => openInfo(prod)}
                    className="hover:text-pink-500 transition-colors"
                  >
                    <FiInfo />
                  </button>
                  <button
                    aria-label="Deseos"
                    onClick={() => toggleWishlist(prod)}
                    className={`transition-colors ${inWishlist ? 'text-pink-500' : 'hover:text-pink-500'}`}
                  >
                    {inWishlist ? <FaHeart /> : <HeartOutline />}
                  </button>
                  <button
                    aria-label="Carrito"
                    onClick={() => toggleCart(prod)}
                    className={`transition-colors ${inCart ? 'text-pink-500' : 'hover:text-pink-500'}`}
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-10 flex justify-center space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
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
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className="p-2 rounded border border-black bg-white disabled:opacity-50"
        >
          <FiArrowRight />
        </button>
      </div>
    </section>
  )
}
