import { useTheme } from '../context/ThemeContext'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { isLightMode } = useTheme()

  const lightGradient = 'bg-gradient-to-r from-[#8FD4C8] to-[#F2D189]'
  const bgClass = isLightMode ? lightGradient : 'bg-[#F3D5D0]'
  const textClass = isLightMode ? 'text-gray-900' : 'text-black'
  const borderClr = 'border-black'

  const categories = ['Bikinis', 'Tops', 'Salidas de playa', 'Bottoms', 'Crochets', 'Accesorios']

  return (
    <footer className={`${bgClass} ${textClass} w-full py-12 px-4 sm:px-8 lg:px-16`}>
      {/* Grid: 2 columnas en móvil, 4 en escritorio */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + título */}
        <div className="order-1 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src={isLightMode ? '/images/LOGOO.png' : '/images/WHITE.png'}
            alt="Xirena Boutique"
            className="h-24 w-auto mb-3 object-contain"
          />
          <span className="font-bold text-xl">Xirena Boutique</span>
        </div>

        {/* Contacto */}
        <div className="order-2 lg:order-4 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>Contactos</h3>
          <ul className="space-y-3 text-base">
            <li>
              <a
                href="https://wa.me/50661237935"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <FaWhatsapp className="text-2xl shrink-0" />
                <span className={textClass}>: (+506) 6123-7935</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/share/16Xm5wr5tC/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <FaFacebookF className="text-2xl shrink-0" />
                <span className={textClass}>: Xirena</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/xirena_design?igsh=djlibnp0c3N1Y3Jk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <FaInstagram className="text-2xl shrink-0" />
                <span className={textClass}>: xirenaboutique</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@xirenaboutique?_t=ZM-8xosrTNZfYk&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <FaTiktok className="text-2xl shrink-0" />
                <span className={textClass}>: @xirenaboutique</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="order-3 lg:order-2 text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>Categorías</h3>
          <ul className="space-y-2 text-base">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/?category=${encodeURIComponent(cat)}`}
                  className={`hover:underline ${textClass}`}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Acerca de */}
        <div className="order-4 lg:order-3 text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Acerca de nuestra tienda
          </h3>
          <p className={`text-base leading-relaxed ${textClass}`}>
            En Xirena confeccionamos bikinis, vestidos y piezas femeninas únicas, hechas a mano.
            Nos inspira el cuerpo real de cada mujer y apostamos por la moda personalizada.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className={`border-t mt-8 ${borderClr}`} />

      {/* Pie de página */}
      <div className="mt-4 text-center text-base">
        © Página creada por Visual View Creations 2025. Todos los derechos reservados.
      </div>
    </footer>
  )
}
