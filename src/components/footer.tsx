import { useTheme } from '../context/ThemeContext'
import { useCategoriesScroll } from '../context/CategoriesScrollContext'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const { isLightMode } = useTheme()
  const { scrollTo } = useCategoriesScroll()

  const lightGradient = 'bg-gradient-to-r from-[#8FD4C8] to-[#F2D189]'
  const bgClass = isLightMode ? lightGradient : 'bg-[#F3D5D0]'
  const textClass = isLightMode ? 'text-gray-900' : 'text-black'
  const borderClr = isLightMode ? 'border-black' : 'border-black'

  const categories = ['Bikinis', 'Vestidos', 'Conjuntos', 'Prendas', 'Disfraces']

  return (
    <footer className={`${bgClass} ${textClass} w-full py-12 px-4 sm:px-8 lg:px-16`}>
      {/* Grid */}
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
            <li className="flex items-center space-x-2">
              <FaWhatsapp className="text-2xl" />
              <span className={textClass}>: (+506) 6123-7935</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaFacebookF className="text-2xl" />
              <span className={textClass}>: Xirena</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaInstagram className="text-2xl" />
              <span className={textClass}>: xirenaboutique</span>
            </li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="order-3 lg:order-3 text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>Categorías</h3>
          <ul className="space-y-2 text-base">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => scrollTo(cat)}
                  className={`hover:underline ${textClass}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Acerca de */}
        <div className="order-4 lg:order-2 text-center lg:text-left">
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
