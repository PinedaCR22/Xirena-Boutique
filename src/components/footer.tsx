// src/components/footer.tsx
import { useTheme } from '../context/ThemeContext';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const { isLightMode } = useTheme();

  // Gradientes del navbar
  const lightGradient = 'bg-gradient-to-r from-[#8FD4C8] to-[#F2D189]';
  const darkGradient  = 'bg-gradient-to-r from-teal-500 to-pink-500';
  const bgClass   = isLightMode ? lightGradient : darkGradient;
  const textClass = isLightMode ? 'text-gray-900' : 'text-white';
  // Línea negra en claro, blanca en oscuro
  const borderClr = isLightMode ? 'border-black' : 'border-white';

  const categories = ['Accesorios', 'Blusas', 'Bolsos', 'Enterizos', 'Faldas'];

  return (
    <footer className={`${bgClass} ${textClass} w-full py-12 px-4 sm:px-8 lg:px-16`}>
      {/* Grid principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + título */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src="/images/LOGO.jpg"
            alt="Xirena Boutique"
            className="h-24 w-auto mb-3 object-contain"
          />
          <span className="font-bold text-xl">Xirena Boutique</span>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Contacto
          </h3>
          <ul className="space-y-3 text-base">
            <li className="flex items-center space-x-2">
              <FaWhatsapp className="text-2xl" />
              <span className={textClass}>: +506 2666-8806</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaFacebookF className="text-2xl" />
              <span className={textClass}>: facebook.com/tu-perfil</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaInstagram className="text-2xl" />
              <span className={textClass}>: @tu_usuario</span>
            </li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="text-center sm:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Categorías
          </h3>
          <ul className="space-y-2 text-base">
            {categories.map(cat => (
              <li key={cat} className="text-center sm:text-left">
                <a
                  href={`#${cat.toLowerCase()}`}
                  className={`hover:underline ${textClass}`}
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Acerca de nuestra tienda */}
        <div className="text-center sm:text-left">
          <h3 className={`w-full font-bold mb-4 pb-2 border-b-2 ${borderClr}`}>
            Acerca de nuestra tienda
          </h3>
          <p className={`text-base leading-relaxed ${textClass}`}>
            Desde 2024, Xirena Boutique empodera tu estilo con colecciones diseñadas
            para resaltar tu personalidad. Moda ética y artesanal, calidad y diseño
            exclusivo. Compra online o visítanos en tienda.
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
