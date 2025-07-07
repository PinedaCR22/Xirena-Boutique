import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const cards = [
  {
    delay: 0.2,
    content:
      "En Xirena Design creemos que la ropa no solo se usa, también se siente… Nacimos del deseo de crear prendas que abracen el cuerpo, pero también la esencia de cada mujer. Desde bikinis llenos de actitud hasta vestidos de gala, confeccionamos diseños únicos para mujeres que se eligen todos los días.",
    image: "/images/inf1.jpg",
  },
  {
    delay: 0.6,
    content:
      "Nos inspira la idea de que cada chica merece una prenda tan única como ella, que refleje quién es y la acompañe en su versión más auténtica.\n\nCada pieza es pensada con intención, confeccionada con detalle y hecha para convertirse en parte de su esencia, no solo de su armario.",
    image: "/images/inf2.jpg",
  },
  {
    delay: 1.0,
    content:
      "Además, en Xirena apostamos por un camino más consciente. Trabajamos bajo los principios del slow fashion, con procesos responsables, materiales de calidad y confección personalizada. Así reducimos el desperdicio y creamos prendas que duran y tienen valor real.\n\nDiseño, estilo, poder y propósito a tu medida.",
    image: "/images/inf3.jpg",
  },
]

const Information: React.FC = () => {
  const { isLightMode } = useTheme()

  return (
    <div
      className={`
        min-h-screen transition-colors duration-500
        ${isLightMode ? "bg-gray-100 text-gray-900" : 'bg-[#f7e6e2] text-black'}
      `}
    >
      <div className="h-2 md:h-4" />

      <motion.div
        className="w-full flex flex-col items-center py-16 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`
              w-full flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}
              ${isLightMode ? "bg-white" : 'bg-[#f7e6e2] text-black'} 
              shadow-lg rounded-lg p-6 mb-10
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: card.delay }}
          >
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-md md:max-w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={card.image}
                  alt={`Card ${index + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-6">
              <motion.p
                className="text-lg whitespace-pre-line"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: card.delay + 0.2 }}
              >
                {card.content}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Information
