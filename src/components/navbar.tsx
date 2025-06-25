// src/components/navbar.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isLightMode, toggleMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'INICIO' },
    { to: '/products', label: 'PRODUCTOS' },
    { to: '/categories', label: 'CATEGORÍAS' },
    { to: '/contact', label: 'CONTACTO' },
  ];

  // Gradientes solicitados
  const lightGradient = 'bg-gradient-to-r from-[#8FD4C8] to-[#F2D189]';
  const darkGradient  = 'bg-gradient-to-r from-teal-500 to-pink-500';

  return (
    <nav
      className={`px-6 sm:px-10 py-6 flex flex-col transition-colors duration-500 ${
        isLightMode
          ? `${lightGradient} text-gray-900`
          : `${darkGradient} text-white`
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/LOGO.jpg"
            alt="Xirena Logo"
            className="w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24 object-contain"
          />
        </Link>

        {/* Menú escritorio */}
        <ul className="hidden md:flex space-x-12 border-b-2 pb-2 border-white/50">
          {links.map(({ to, label }) => (
            <li key={to}>
              <button
                onClick={() => navigate(to)}
                className="font-semibold text-lg md:text-xl hover:opacity-80 transition"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Icons + toggle + hamburger */}
        <div className="flex items-center space-x-4 md:space-x-6 text-2xl md:text-3xl lg:text-4xl">
          <button onClick={toggleMode} className="hover:opacity-80 transition">
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
            isLightMode ? lightGradient : darkGradient
          } border-t border-white/50 pb-4`}
        >
          <ul className="flex flex-col items-center space-y-4">
            {links.map(({ to, label }) => (
              <li key={to}>
                <button
                  onClick={() => {
                    navigate(to);
                    setMenuOpen(false);
                  }}
                  className="font-semibold text-lg hover:opacity-80 transition"
                >
                  {label}
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
  );
}
