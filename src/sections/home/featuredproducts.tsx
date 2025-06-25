// src/sections/home/featuredProducts.tsx
import { useState, type ChangeEvent } from 'react'
import {
  FiSearch,
  FiInfo,
  FiHeart,
  FiShoppingCart,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi'

interface Product {
  id: number
  name: string
  price: string
  image: string
}

interface FeaturedProductsProps {
  isLightMode: boolean
}

const PRODUCTS: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: `₡${(Math.floor(Math.random() * 9 + 1) * 10000).toLocaleString()}`,
  image: `/images/PRUEBA${(i % 5) + 1}.jpg`,
}))

export default function FeaturedProducts({
  isLightMode,
}: FeaturedProductsProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const pageCount = Math.ceil(filtered.length / perPage)
  const start = (page - 1) * perPage
  const pageItems = filtered.slice(start, start + perPage)

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <section id="featured"
      className={`transition-colors duration-300 py-12 px-4 sm:px-8 lg:px-16 ${
        isLightMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
      }`}
    >
      {/* Título */}
      <h2 className="text-4xl font-bold text-center mb-8">
        ¡Productos Destacados!
      </h2>

      {/* Buscador */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <FiSearch
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
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

      {/* Grid de cards: 2 en móviles, 4 en desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {pageItems.map((prod) => (
          <div
            key={prod.id}
            className={`rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${
              isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            {/* Imagen con efecto pan al hover */}
            <div className="h-48 overflow-hidden group">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:object-top"
              />
            </div>

            {/* Pie de card */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{prod.name}</h3>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-pink-500 font-bold">{prod.price}</span>
                <div className="flex space-x-3 text-xl">
                  <button
                    aria-label="Más info"
                    className="hover:text-pink-500 transition-colors"
                  >
                    <FiInfo />
                  </button>
                  <button
                    aria-label="Añadir a deseos"
                    className="hover:text-pink-500 transition-colors"
                  >
                    <FiHeart />
                  </button>
                  <button
                    aria-label="Añadir al carrito"
                    className="hover:text-pink-500 transition-colors"
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-10 flex justify-center items-center space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-2 rounded bg-gray-700 text-white disabled:opacity-50"
          aria-label="Anterior"
        >
          <FiArrowLeft />
        </button>

        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded font-medium transition ${
              page === i + 1
                ? 'bg-pink-500 text-white'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className="p-2 rounded bg-gray-700 text-white disabled:opacity-50"
          aria-label="Siguiente"
        >
          <FiArrowRight />
        </button>
      </div>
    </section>
  )
}
