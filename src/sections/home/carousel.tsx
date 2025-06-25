// src/sections/home/carousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  isLightMode: boolean;
}

const slides = [
  '/images/PRUEBA1.jpg',
  '/images/PRUEBA2.jpg',
  '/images/PRUEBA3.jpg',
  '/images/PRUEBA4.jpg',
  '/images/PRUEBA5.jpg',
];

export default function Carousel({ isLightMode }: CarouselProps) {
  // Decide qué logo mostrar según el tema
  const logoSrc = isLightMode ? '/images/LOGOO.png' : '/images/WHITE.png';

  return (
    <section
      className={`py-8 transition-colors duration-300 ${
        isLightMode ? 'bg-white' : 'bg-gray-800'
      }`}
    >
      {/* Hero con logo dinámico */}
      <div className="text-center mb-8">
        <div className="mx-auto w-48 md:w-64 lg:w-80 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg">
          <img
            src={logoSrc}
            alt="Xirena Boutique Logo"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <p
          className={`mt-4 text-lg md:text-xl transition-colors duration-300 ${
            isLightMode ? 'text-black' : 'text-gray-200'
          }`}
        >
          (Hacete un slogan para pegarlo acá)
        </p>
      </div>

      {/* Swiper */}
      <div className="relative px-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={800}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden transition-colors duration-300 ${
                  isLightMode ? 'bg-pink-50' : 'bg-gray-700'
                }`}
              >
                <img
                  src={src}
                  alt={`slide-${idx}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
