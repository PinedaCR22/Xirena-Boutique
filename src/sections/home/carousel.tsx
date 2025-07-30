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
  'https://i.ibb.co/QvTnm83x/IMG-1366.webp',
  'https://i.ibb.co/gb24dRgN/IMG-9294.webp',
  'https://i.ibb.co/rKb0TVSj/IMG-9283.webp',
  'https://i.ibb.co/Y4nFZP9j/PRUEBA4.webp',
  'https://i.ibb.co/9mbQ0z5t/PRUEBA3.webp',
];

export default function Carousel({ isLightMode }: CarouselProps) {
  const logoSrc = isLightMode ? '/images/LOGOO.png' : '/images/WHITE.png';

  const bgColor = isLightMode ? 'bg-white' : 'bg-[#f7e6e2]';
  const imgBg = isLightMode ? 'bg-white' : 'bg-[#f7e6e2]';

  return (
    <section className={`py-8 transition-colors duration-300 ${bgColor}`}>
      {/* Hero con logo */}
      <div className="text-center mb-8">
        <div className="mx-auto w-48 md:w-64 lg:w-80 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg">
          <img
            src={logoSrc}
            alt="Xirena Boutique Logo"
            className="object-contain object-center w-full h-full"
          />
        </div>
        <p
          className="mt-4 font-bold text-2xl md:text-3xl transition-colors duration-300 text-black"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          ¡Empodera tu estilo!
        </p>
      </div>

      {/* Carrusel */}
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
                className={`w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden transition-colors duration-300 ${imgBg}`}
              >
                <img
                  src={src}
                  alt={`slide-${idx}`}
                  className="object-contain w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
