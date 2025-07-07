import { useState } from 'react'
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

export default function Navbar() {
  const { isLightMode, toggleMode } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

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
      className={`px-6 sm:px-10 py-6 flex flex-col transition-colors duration-500 ${
        isLightMode ? `${lightGradient} text-gray-900` : `${darkSolid} text-black`
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={isLightMode ? '/images/LOGOO.png' : '/images/WHITE.png'}
            alt="Xirena Logo"
            className="w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24 object-contain"
          />
        </Link>

        {/* Menú escritorio */}
        <ul
          className={`hidden md:flex space-x-12 pb-2 transition-colors duration-300 ${
            isLightMode ? 'border-b-2 border-black' : 'border-b-2 border-black/50'
          }`}
        >
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleClick(link)}
                className="font-semibold text-lg md:text-xl hover:opacity-80 transition"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Icons + toggle + hamburger */}
        <div className="flex items-center space-x-4 md:space-x-6 text-2xl md:text-3xl lg:text-4xl">
          <button
            onClick={toggleMode}
            className="hidden md:inline-flex hover:opacity-80 transition"
          >
            {isLightMode ? <FiMoon /> : <FiSun />}
          </button>
          <button onClick={() => navigate('/wishes')} className="hover:opacity-80 transition">
            <FiHeart />
          </button>
          <button onClick={() => navigate('/cart')} className="hover:opacity-80 transition">
            <FiShoppingCart />
          </button>
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
          className={`mt-4 md:hidden transition-colors duration-500 ${
            isLightMode ? lightGradient : darkSolid
          } border-t border-white/50 pb-4`}
        >
          <ul className="flex flex-col items-center space-y-4">
            {links.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleClick(link)}
                  className="font-semibold text-lg hover:opacity-80 transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={toggleMode} className="text-2xl hover:opacity-80 transition">
                {isLightMode ? <FiMoon /> : <FiSun />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
