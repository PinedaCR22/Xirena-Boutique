// src/pages/Home.tsx
import { useTheme } from '../context/ThemeContext'
import Carousel from '../sections/home/carousel'
import FeaturedProducts from '../sections/home/featuredproducts'
import Categories from '../sections/home/categories'
import Contact from '../sections/home/contact'
import AboutMe from '../sections/home/aboutme'

export default function Home() {
  const { isLightMode } = useTheme()

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

      {/* Categories */}
      <div id="categories">
        <Categories />
      </div>
      <div className="h-16 md:h-24" />

       {/* AboutMe */}
      <div id="aboutme">
        <AboutMe />
      </div>
      <div className="h-16 md:h-24" />

      {/* Contact */}
      <div id="contact">
        <Contact isLightMode={isLightMode} />
      </div>
    </div>
  )
}
