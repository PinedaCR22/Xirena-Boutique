// src/sections/home/carousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  '/images/PRUEBA1.jpg',
  '/images/PRUEBA2.jpg',
  '/images/PRUEBA3.jpg',
  '/images/PRUEBA4.jpg',
  '/images/PRUEBA5.jpg',
];

export default function Carousel() {
  return (
    <section className="bg-gray-100 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-500">
          XIRENA BOUTIQUE
        </h1>
        <p className="text-lg md:text-xl text-pink-300 mt-2">
          (Hacete un slogan para pegarlo acá)
        </p>
      </div>

      {/* Carrusel Swiper con padding para separar flechas de bordes */}
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
              <div className="w-full h-64 md:h-80 lg:h-96 bg-pink-50 rounded-lg overflow-hidden">
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
