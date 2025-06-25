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
    <nav className="bg-[#A3E9D0] px-10 py-8 md:py-10 lg:py-12 flex items-center justify-between relative">
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

      {/* Iconos y botón hamburguesa */}
      <div className="flex items-center space-x-6 text-3xl md:text-4xl lg:text-5xl">
        <Link to="/wishlist" className="text-white hover:opacity-80">
          <FiHeart />
        </Link>
        <Link to="/cart" className="text-white hover:opacity-80">
          <FiShoppingCart />
        </Link>
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#A3E9D0] border-b-2 border-pink-500 md:hidden">
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
