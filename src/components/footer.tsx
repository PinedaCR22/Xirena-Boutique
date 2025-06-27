// src/components/footer.tsx
import { useTheme } from '../context/ThemeContext';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const { isLightMode } = useTheme();

  const lightGradient = 'bg-gradient-to-r from-[#8FD4C8] to-[#F2D189]';
  const darkGradient = 'bg-gradient-to-r from-teal-500 to-pink-500';
  const bgClass   = isLightMode ? lightGradient : darkGradient;
  const textClass = isLightMode ? 'text-gray-900' : 'text-white';
  const borderClr = isLightMode ? 'border-black' : 'border-white';

  const categories = ['Bikinis', 'Vestidos', 'Conjuntos', 'Prendas', 'Disfraces'];

  return (
    <footer className={`${bgClass} ${textClass} w-full py-12 px-4 sm:px-8 lg:px-16`}>
      {/* Grid: 2 cols mobile, 4 cols desktop with custom ordering */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + título: mobile order 1, desktop order 1 */}
        <div className="order-1 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
  src={isLightMode ? '/images/LOGOO.png' : '/images/WHITE.png'}
  alt="Xirena Boutique"
  className="h-24 w-auto mb-3 object-contain"
/>

          <span className="font-bold text-xl">Xirena Boutique</span>
        </div>

        {/* Contacto: mobile order 2, desktop order 4 */}
        <div className="order-2 lg:order-4 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Contactos
          </h3>
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

        {/* Categorías: mobile order 3, desktop order 3 */}
        <div className="order-3 lg:order-3 text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Categorías
          </h3>
          <ul className="space-y-2 text-base">
            {categories.map(cat => (
              <li key={cat}>
                <a href={`#${cat.toLowerCase()}`} className={`hover:underline ${textClass}`}>
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Acerca de nuestra tienda: mobile order 4, desktop order 2 */}
        <div className="order-4 lg:order-2 text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Acerca de nuestra tienda
          </h3>
          <p className={`text-base leading-relaxed ${textClass}`}>
            En Xirena confeccionamos bikinis, vestidos y piezas femeninas únicas, hechas a mano en Costa Rica con amor y atención al detalle. Nos inspira el cuerpo real de cada mujer y apostamos por la moda consciente, personalizada y con actitud.
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
  );
}