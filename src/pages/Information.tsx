// src/pages/Information.tsx
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const Information: React.FC = () => {
  const { isLightMode } = useTheme()

  return (
    <div
      className={`
        min-h-screen transition-colors duration-500
        ${isLightMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-gray-100"}
      `}
    >
      {/* espacio para el navbar global: reducido */}
     <div className="h-2 md:h-4" />



      <motion.div
        className="w-full flex flex-col items-center py-16 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Card 1 */}
        <motion.div
          className={`
            w-full flex flex-col md:flex-row items-center
            ${isLightMode ? "bg-white" : "bg-gray-800"} 
            shadow-lg rounded-lg p-6 mb-10
          `}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/LOGO.jpg"
              alt="Logo"
              className="w-full max-w-md md:max-w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-6">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Bienvenidos a Xirena Boutique
            </motion.h2>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Descubre nuestra exclusiva selección de moda femenina: calidad, estilo y trato personalizado.
            </motion.p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className={`
            w-full flex flex-col md:flex-row-reverse items-center
            ${isLightMode ? "bg-white" : "bg-gray-800"} 
            shadow-lg rounded-lg p-6 mb-10
          `}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/LOGO.jpg"
              alt="Logo"
              className="w-full max-w-md md:max-w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-6">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              ¿Qué ofrecemos?
            </motion.h2>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Asesoría de estilo, colecciones exclusivas y envíos rápidos a todo el país.
            </motion.p>
            <motion.p
              className="text-lg mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              Devoluciones gratuitas en GAM y atención 24/7 vía WhatsApp.
            </motion.p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className={`
            w-full flex flex-col md:flex-row items-center
            ${isLightMode ? "bg-white" : "bg-gray-800"} 
            shadow-lg rounded-lg p-6
          `}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/LOGO.jpg"
              alt="Logo"
              className="w-full max-w-md md:max-w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-6">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              Colecciones y precios
            </motion.h2>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <strong>Básica (₡20.000):</strong> Diseños atemporales.
            </motion.p>
            <motion.p
              className="text-lg mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <strong>Premium (₡50.000):</strong> Materiales de alta calidad.
            </motion.p>
            <motion.p
              className="text-lg mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.6 }}
            >
              <strong>Exclusiva (₡100.000):</strong> Ediciones limitadas.
            </motion.p>
            <motion.p
              className="text-lg mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.8 }}
            >
              <strong>Nota:</strong> Envío gratis en GAM; fuera, costo adicional.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Information
