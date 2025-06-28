// src/sections/home/AboutMe.tsx
import { useTheme } from '../../context/ThemeContext'

export default function AboutMe() {
  const { isLightMode } = useTheme()

  return (
    <section
      id="aboutme"
      className={`
        px-6 sm:px-10 py-12 flex justify-center transition-colors duration-500
        ${isLightMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}
      `}
    >
      <img
        src="https://mary-and-francisco.neocities.org/images/seccion-construccion.jpg"
        alt="Sección en construcción"
        className="max-w-full h-auto"
      />
    </section>
  )
}
