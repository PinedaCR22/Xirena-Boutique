// src/pages/Home.tsx
import { useTheme } from '../context/ThemeContext';
import Carousel from '../sections/home/carousel';
import FeaturedProducts from '../sections/home/featuredproducts';

export default function Home() {
  const { isLightMode } = useTheme();

  return (
    <div className="pt-0">
      <Carousel isLightMode={isLightMode} />
      <div className="h-16 md:h-24" />
       <FeaturedProducts isLightMode={isLightMode} />
    </div>
  );
}
