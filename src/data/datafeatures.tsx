// src/data/datafeatures.tsx

export interface FeatureProduct {
  id: number
  name: string
  price: number        // precio unitario puro
  image: string        // ruta relativa en public/images
  description: string  // descripción completa para el modal
}

export const ALL_PRODUCTS: FeatureProduct[] = [
  { id: 1,  name: 'Bolso vestido',       price: 80000, image: '/images/sinpe.png', description: 'Bolso de cuero genuino con asa ajustable y cierre metálico.' },
  { id: 2,  name: 'Vestido Floral Veraniego',      price: 38000, image: '/images/PRUEBA2.jpg', description: 'Vestido largo con estampado floral y tirantes finos.' },
  { id: 3,  name: 'Blusa de seda Elegante',        price: 28000, image: '/images/PRUEBA3.jpg', description: 'Blusa de seda con cuello en V y mangas abullonadas.' },
  { id: 4,  name: 'Falda midi Plisada',            price: 32000, image: '/images/PRUEBA4.jpg', description: 'Falda midi plisada con cintura elástica.' },
  { id: 5,  name: 'Bufanda de Cachemira',          price: 22000, image: '/images/PRUEBA5.jpg', description: 'Bufanda suave de cachemira en tonos neutros.' },
  { id: 6,  name: 'Blazer Ajustado Negro',         price: 60000, image: '/images/PRUEBA1.jpg', description: 'Blazer entallado con un botón y forro interior de satén.' },
  { id: 7,  name: 'Pantalón Palazzo',              price: 42000, image: '/images/PRUEBA2.jpg', description: 'Pantalón ancho de pierna ancha y cintura alta.' },
  { id: 8,  name: 'Chaqueta Vaquera Clásica',     price: 35000, image: '/images/PRUEBA3.jpg', description: 'Chaqueta vaquera con detalle desgastado y botones metálicos.' },
  { id: 9,  name: 'Sombrero Fedora de Fieltro',    price: 18000, image: '/images/PRUEBA4.jpg', description: 'Sombrero fedora con cinta decorativa.' },
  { id: 10, name: 'Sandalias Plataforma',          price: 30000, image: '/images/PRUEBA5.jpg', description: 'Sandalias de plataforma con tiras cruzadas y cierre ajustable.' },
  { id: 11, name: 'Cinturón Trenzado',            price: 12000, image: '/images/PRUEBA1.jpg', description: 'Cinturón trenzado de cuero con hebilla metálica.' },
  { id: 12, name: 'Bolso Clutch Chic',             price: 50000, image: '/images/PRUEBA2.jpg', description: 'Bolso clutch rígido con cierre imantado.' },
  { id: 13, name: 'Gafas de Sol Vintage',          price: 25000, image: '/images/PRUEBA3.jpg', description: 'Gafas de sol con montura redonda y lentes oscuras.' },
  { id: 14, name: 'Suéter de Punto Grueso',       price: 40000, image: '/images/PRUEBA4.jpg', description: 'Suéter oversized de punto grueso y cuello alto.' },
  { id: 15, name: 'Pantalones Cortos de Lino',     price: 29000, image: '/images/PRUEBA5.jpg', description: 'Shorts de lino con cordón en la cintura.' },
  { id: 16, name: 'Blusa Off-Shoulder',            price: 27000, image: '/images/PRUEBA1.jpg', description: 'Blusa off-shoulder con volantes en el escote.' },
  { id: 17, name: 'Vestido de Noche Satinado',     price: 65000, image: '/images/PRUEBA2.jpg', description: 'Vestido de noche de satén con abertura lateral.' },
  { id: 18, name: 'Bolso Tote Espiguilla',         price: 48000, image: '/images/PRUEBA3.jpg', description: 'Bolso tote de rafia con asas largas.' },
  { id: 19, name: 'Zapatillas Runner',             price: 55000, image: '/images/PRUEBA4.jpg', description: 'Zapatillas deportivas con suela acolchada.' },
  { id: 20, name: 'Collar de Perlas Moderno',       price: 33000, image: '/images/PRUEBA5.jpg', description: 'Collar de perlas cultivadas con cierre ajustable.' },
]