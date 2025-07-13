// src/components/Navbar.tsx
import { useState, useEffect, type ReactElement } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
} from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

export default function Navbar(): ReactElement {
  const { isLightMode, toggleMode } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [wishCount, setWishCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Actualiza contadores leyendo localStorage
  const updateCounts = () => {
    const w = JSON.parse(localStorage.getItem('wishlist') ?? '[]')
    const c = JSON.parse(localStorage.getItem('cart') ?? '[]')
    setWishCount(Array.isArray(w) ? w.length : 0)
    setCartCount(Array.isArray(c) ? c.length : 0)
  }

  useEffect(() => {
    // Ajusta padding para el navbar fijo
    document.body.style.paddingTop = '4rem'
    updateCounts()
    // Escucha eventos de storage (ej. desde otras pestañas)
    window.addEventListener('storage', updateCounts)
    return () => {
      document.body.style.paddingTop = ''
      window.removeEventListener('storage', updateCounts)
    }
  }, [])

  // Si cambias rutas que usan same-tab localStorage.setItem,
  // puedes forzar manualmente updateCounts tras esos cambios.

  const links = [
    { to: '/', label: 'INICIO' },
    { to: '/', label: 'PRODUCTOS', scrollTo: 'featured' },
    { to: '/', label: 'CATEGORÍAS', scrollTo: 'categories' },
    { to: '/', label: 'SOBRE MÍ', scrollTo: 'aboutme' },
    { to: '/', label: 'CONTACTO', scrollTo: 'contact' },
  ]

  const lightGradient = 'bg-gradient-to-r from-[#8FD4C8] to-[#F2D189]'
  const darkSolid = 'bg-[#F3D5D0]'

  const handleClick = (link: typeof links[0]) => {
    setMenuOpen(false)
    if (link.scrollTo) {
      if (pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(link.scrollTo!)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.getElementById(link.scrollTo!)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(link.to)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 sm:px-10 py-4 flex flex-col transition-colors duration-500 z-50 ${
        isLightMode ? `${lightGradient} text-gray-900` : `${darkSolid} text-black`
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={isLightMode ? '/images/LOGOO.png' : '/images/WHITE.png'}
            alt="Xirena Logo"
            className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 object-contain"
          />
        </Link>

        {/* Menú escritorio */}
        <ul
          className={`hidden md:flex space-x-10 pb-1 transition-colors duration-300 ${
            isLightMode ? 'border-b border-black' : 'border-b border-black/50'
          }`}
        >
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleClick(link)}
                className="font-semibold text-base md:text-lg hover:opacity-80 transition"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Íconos + toggle + hamburger */}
        <div className="flex items-center space-x-3 md:space-x-5 text-xl md:text-2xl lg:text-3xl">
          <button
            onClick={toggleMode}
            className="hidden md:inline-flex hover:opacity-80 transition"
          >
            {isLightMode ? <FiMoon /> : <FiSun />}
          </button>

          {/* Wishlist icon with badge */}
          <button
            onClick={() => navigate('/wishes')}
            className="relative hover:opacity-80 transition"
          >
            <FiHeart />
            {wishCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {wishCount}
              </span>
            )}
          </button>

          {/* Cart icon with badge */}
          <button
            onClick={() => navigate('/cart')}
            className="relative hover:opacity-80 transition"
          >
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger mobile */}
          <button
            className="md:hidden hover:opacity-80 transition"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          className={`mt-3 md:hidden transition-colors duration-500 ${
            isLightMode ? lightGradient : darkSolid
          } border-t border-white/50 pb-3`}
        >
          <ul className="flex flex-col items-center space-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleClick(link)}
                  className="font-semibold text-base hover:opacity-80 transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={toggleMode} className="text-xl hover:opacity-80 transition">
                {isLightMode ? <FiMoon /> : <FiSun />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
