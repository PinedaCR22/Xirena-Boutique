// src/sections/home/Contact.tsx
import { motion } from 'framer-motion'
import { FaCreditCard, FaWhatsapp, FaHeart, FaTruck } from 'react-icons/fa'

interface ContactProps {
  isLightMode: boolean
}

const items = [
  {
    icon: FaCreditCard,
    lightColor: 'text-orange-500',
    darkColor: 'text-orange-300',
    title: 'Métodos de pago seguros',
    desc: ['Aceptamos métodos de pago como depósitos y pagos sinpe móvil'],
  },
  {
    icon: FaWhatsapp,
    lightColor: 'text-green-500',
    darkColor: 'text-green-300',
    title: 'Estamos para ti',
    desc: ['Nuestro whatsapp 6123-7935 para aclarar cualquier duda'],
  },
  {
    icon: FaHeart,
    lightColor: 'text-pink-500',
    darkColor: 'text-pink-300',
    title: 'Moda femenina para la mujer moderna y empoderada.',
    desc: ['Moda totalmente a la medida para vos.'],
  },
  {
    icon: FaTruck,
    lightColor: 'text-yellow-500',
    darkColor: 'text-yellow-300',
    title: 'Hasta la puerta de tu casa',
    desc: ['Envíos a todo el país mediante Correos de Costa Rica.'],
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Contact({ isLightMode }: ContactProps) {
  const bgClass = isLightMode ? 'bg-white' : 'bg-[#f7e6e2]'
  const textPrimary = isLightMode ? 'text-gray-900' : 'text-black'
  const textSecondary = isLightMode ? 'text-gray-700' : 'text-black/70'
  const borderColor = isLightMode ? 'border-black' : 'border-black'

  return (
    <motion.section
      className={`py-12 transition-colors duration-300 ${bgClass}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-16 px-4 md:px-0">
        {items.map((item, idx) => {
          const Icon = item.icon
          const dividerClass =
            idx < items.length - 1 ? `border-r-0 md:border-r ${borderColor}` : ''

          return (
            <motion.div
              key={idx}
              className={`flex flex-col items-center text-center px-2 md:px-8 ${dividerClass}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon
                className={`mb-4 text-4xl ${
                  isLightMode ? item.lightColor : item.darkColor
                }`}
              />

              <h3 className={`font-bold mb-2 md:mb-4 ${textPrimary}`}> {item.title} </h3>

              <div className="space-y-1 md:space-y-3">
                {item.desc.map((line, i) => (
                  <p
                    key={i}
                    className={`text-base md:text-lg ${textSecondary} md:leading-loose`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
