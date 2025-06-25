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
    <nav className="bg-[#A3E9D0] px-6 sm:px-10 py-6 md:py-8 lg:py-10 flex flex-col">
      {/* Fila principal: logo, menú escritorio, iconos */}
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="w-20 h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 bg-white rounded" />
        </Link>

        {/* Menú de escritorio */}
        <ul className="hidden md:flex space-x-12 border-b-2 border-pink-500 pb-2">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="text-white font-medium text-lg md:text-xl lg:text-2xl hover:opacity-80"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Iconos + hamburguesa */}
        <div className="flex items-center space-x-6 text-3xl md:text-4xl lg:text-5xl">
          <Link to="/wishlist" className="text-white hover:opacity-80">
            <FiHeart />
          </Link>
          <Link to="/cart" className="text-white hover:opacity-80">
            <FiShoppingCart />
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil: ahora en flujo de documento para empujar contenido */}
      {open && (
        <div className="w-full mt-4 md:hidden bg-[#A3E9D0] border-t border-pink-500">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white font-medium text-lg hover:opacity-80"
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
