// src/components/navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'INICIO' },
    { to: '/products', label: 'PRODUCTOS' },
    { to: '/categories', label: 'CATEGORÍAS' },
    { to: '/contact', label: 'CONTACTO' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#8FD4C8] to-[#F2D189] px-6 sm:px-10 py-6 md:py-8 lg:py-10 flex flex-col">
      {/* Fila principal */}
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/LOGO.jpg"
            alt="Xirena Boutique Logo"
            className="w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24 object-contain"
          />
        </Link>

        {/* Menú escritorio */}
        <ul className="hidden md:flex space-x-12 border-b-2 border-pink-600 pb-2">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="text-gray-900 font-semibold text-lg md:text-xl lg:text-2xl hover:text-pink-600 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Iconos + hamburguesa */}
        <div className="flex items-center space-x-6 text-3xl md:text-4xl lg:text-5xl">
          <Link to="/wishlist" className="text-gray-900 hover:text-pink-600 transition-colors">
            <FiHeart />
          </Link>
          <Link to="/cart" className="text-gray-900 hover:text-pink-600 transition-colors">
            <FiShoppingCart />
          </Link>
          <button
            className="md:hidden text-gray-900 hover:text-pink-600 transition-colors"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="w-full mt-4 md:hidden bg-gradient-to-r from-[#8FD4C8] to-[#F2D189] border-t border-pink-600">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-900 font-semibold text-lg hover:text-pink-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
