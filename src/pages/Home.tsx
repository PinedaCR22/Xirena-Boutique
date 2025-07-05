import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import Carousel from '../sections/home/carousel'
import FeaturedProducts from '../sections/home/featuredproducts'
import Categories, { type CategoriesHandle } from '../sections/home/categories'
import Contact from '../sections/home/contact'
import AboutMe from '../sections/home/aboutme'

export default function Home() {
  const { isLightMode } = useTheme()

  // 🔧 Este ref es la CLAVE para conectar el contexto con el componente
  const categoriesRef = useRef<CategoriesHandle>(null)

  return (
    <div className="pt-0">
      {/* Carousel */}
      <Carousel isLightMode={isLightMode} />
      <div className="h-16 md:h-24" />

      {/* Featured Products */}
      <div id="featured">
        <FeaturedProducts isLightMode={isLightMode} />
      </div>
      <div className="h-16 md:h-24" />

      {/* Categories - aquí se pasa el ref */}
      <div id="categories">
        <Categories ref={categoriesRef} />
      </div>

      {/* About Me */}
      <div id="aboutme">
        <AboutMe />
      </div>

      {/* Contact */}
      <div id="contact">
        <Contact isLightMode={isLightMode} />
      </div>
    </div>
  )
}
