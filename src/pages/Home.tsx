// src/pages/Home.tsx
import { useTheme } from '../context/ThemeContext';
import Carousel from '../sections/home/carousel';

export default function Home() {
  const { isLightMode } = useTheme();

  return (
    <div className="pt-0">
      <Carousel isLightMode={isLightMode} />
    </div>
  );
}
