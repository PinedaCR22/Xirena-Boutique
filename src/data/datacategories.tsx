// src/data/datacategories.tsx

export interface CategoryProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: 'Bikinis' | 'Tops' | 'Salidas de playa' | 'Bottoms' | 'Crochets' | 'Accesorios'
  quantity: number
}

export const CATEGORY_PRODUCTS: CategoryProduct[] = [
  // Bikinis
  { id: 21, name: 'Bikini Tropical',        price: 25000, image: '/images/PRUEBA1.jpg', description: 'Bikini con estampado tropical y tirantes ajustables.',                  category: 'Bikinis',       quantity: 1 },
  { id: 22, name: 'Bikini de Rayas',         price: 26000, image: '/images/PRUEBA2.jpg', description: 'Conjunto de bikini a rayas multicolor con top triangular.',           category: 'Bikinis',       quantity: 1 },
  { id: 23, name: 'Bikini Blanco Clásico',   price: 24000, image: '/images/PRUEBA3.jpg', description: 'Bikini blanco con textura acanalada y diseño minimalista.',           category: 'Bikinis',       quantity: 1 },
  { id: 24, name: 'Bikini con Volantes',     price: 28000, image: '/images/PRUEBA4.jpg', description: 'Bikini color pastel con volantes en los bordes.',                    category: 'Bikinis',       quantity: 1 },
  { id: 25, name: 'Bikini Deportivo',        price: 27000, image: '/images/PRUEBA5.jpg', description: 'Bikini estilo deportivo ideal para nadar.',                          category: 'Bikinis',       quantity: 1 },
  { id: 26, name: 'Bikini Floral Vintage',   price: 29000, image: '/images/PRUEBA1.jpg', description: 'Diseño vintage con estampado floral y sujetador halter.',             category: 'Bikinis',       quantity: 1 },
  { id: 27, name: 'Bikini Animal Print',     price: 30000, image: '/images/PRUEBA2.jpg', description: 'Bikini con estampado animal print y corte alto.',                     category: 'Bikinis',       quantity: 1 },
  { id: 28, name: 'Bikini Bandeau Rosa',     price: 25000, image: '/images/PRUEBA3.jpg', description: 'Conjunto bandeau en tono rosa pálido con lazo.',                      category: 'Bikinis',       quantity: 1 },

  // Tops  
  { id: 30, name: 'Vestido Corto Negro',     price: 35000, image: '/images/PRUEBA5.jpg', description: 'Vestido corto negro elegante con escote cruzado.',                   category: 'Tops',          quantity: 1 },
  { id: 31, name: 'Vestido de Encaje',       price: 40000, image: '/images/PRUEBA1.jpg', description: 'Vestido ajustado con encaje delicado.',                             category: 'Tops',          quantity: 1 },
  { id: 32, name: 'Vestido Floral Pastel',   price: 36000, image: '/images/PRUEBA2.jpg', description: 'Vestido fluido con flores y escote corazón.',                        category: 'Tops',          quantity: 1 },
  { id: 33, name: 'Vestido Lencero',         price: 39000, image: '/images/PRUEBA3.jpg', description: 'Vestido tipo lencero satinado ideal para noche.',                    category: 'Tops',          quantity: 1 },
  { id: 34, name: 'Vestido Maxi Rayas',      price: 42000, image: '/images/PRUEBA4.jpg', description: 'Vestido largo de rayas verticales.',                                 category: 'Tops',          quantity: 1 },
  { id: 35, name: 'Vestido Vintage Floral',  price: 37000, image: '/images/PRUEBA5.jpg', description: 'Vestido floral estilo retro con cinturón.',                         category: 'Tops',          quantity: 1 },
  { id: 36, name: 'Vestido de Gasa',         price: 41000, image: '/images/PRUEBA1.jpg', description: 'Vestido ligero de gasa con tirantes finos.',                        category: 'Tops',          quantity: 1 },

  // Salidas de playa
  { id: 37, name: 'Conjunto de Lino Natural',price: 45000, image: '/images/PRUEBA2.jpg', description: 'Blusa y pantalón corto de lino beige.',                             category: 'Salidas de playa',quantity: 1 },
  { id: 38, name: 'Conjunto Deportivo',      price: 46000, image: '/images/PRUEBA3.jpg', description: 'Conjunto deportivo para entrenamiento y descanso.',                  category: 'Salidas de playa',quantity: 1 },
  { id: 39, name: 'Conjunto Floral',         price: 48000, image: '/images/PRUEBA4.jpg', description: 'Conjunto top y falda con estampado floral.',                       category: 'Salidas de playa',quantity: 1 },
  { id: 40, name: 'Conjunto Blanco Chic',    price: 47000, image: '/images/PRUEBA5.jpg', description: 'Top corto y pantalón blanco de vestir.',                            category: 'Salidas de playa',quantity: 1 },
  { id: 41, name: 'Conjunto Casual Rayas',   price: 44000, image: '/images/PRUEBA1.jpg', description: 'Conjunto casual con rayas horizontales.',                          category: 'Salidas de playa',quantity: 1 },
  { id: 42, name: 'Conjunto Elegante de Satén', price: 49000, image: '/images/PRUEBA2.jpg', description: 'Top halter y pantalón de satén.',                                 category: 'Salidas de playa',quantity: 1 },
  { id: 43, name: 'Conjunto Denim',          price: 43000, image: '/images/PRUEBA3.jpg', description: 'Chaqueta corta y short de mezclilla.',                              category: 'Salidas de playa',quantity: 1 },
  { id: 44, name: 'Conjunto Boho',           price: 45500, image: '/images/PRUEBA4.jpg', description: 'Conjunto con estampado bohemio y tela fluida.',                     category: 'Salidas de playa',quantity: 1 },

  // Bottoms
  { id: 45, name: 'Disfraz de Pirata',       price: 30000, image: '/images/PRUEBA5.jpg', description: 'Disfraz de pirata femenino con falda y sombrero.',                  category: 'Bottoms',       quantity: 1 },
  { id: 46, name: 'Disfraz de Gatita',       price: 32000, image: '/images/PRUEBA1.jpg', description: 'Disfraz sexy de gatita con orejas y cola.',                         category: 'Bottoms',       quantity: 1 },
  { id: 47, name: 'Disfraz de Conejita',     price: 31000, image: '/images/PRUEBA2.jpg', description: 'Conjunto con orejas, corbatín y corset negro.',                     category: 'Bottoms',       quantity: 1 },
  { id: 48, name: 'Disfraz de Ángel',        price: 33000, image: '/images/PRUEBA3.jpg', description: 'Disfraz blanco con alas y corona.',                                category: 'Bottoms',       quantity: 1 },
  { id: 49, name: 'Disfraz de Enfermera',    price: 34000, image: '/images/PRUEBA4.jpg', description: 'Conjunto blanco con accesorios rojos.',                             category: 'Bottoms',       quantity: 1 },
  { id: 50, name: 'Disfraz de Superhéroe',   price: 35000, image: '/images/PRUEBA5.jpg', description: 'Disfraz ceñido con capa y antifaz.',                               category: 'Bottoms',       quantity: 1 },
  { id: 51, name: 'Disfraz de Caperucita',   price: 36000, image: '/images/PRUEBA1.jpg', description: 'Vestido rojo con capa y encaje.',                                   category: 'Bottoms',       quantity: 1 },
  { id: 52, name: 'Disfraz de Marinera',     price: 32000, image: '/images/PRUEBA2.jpg', description: 'Vestido azul con gorro y anclas.',                                 category: 'Bottoms',       quantity: 1 },

  // Crochets
  { id: 53, name: 'Afrodita Top',           price: 22800, image: '/images/categories/crochets/AFRODITA TOP (22,800).JPG', description: 'Top de crochet con textura calada y tirantes finos.',             category: 'Crochets',      quantity: 1 },
  { id: 54, name: 'Althea Bikini',           price: 22600, image: '/images/categories/crochets/ALTHEA BIKINI (22,600).JPG', description: 'Bikini de crochet con tirantes ajustables.',                      category: 'Crochets',      quantity: 1 },
  { id: 55, name: 'Athena Bikini',           price: 23600, image: '/images/categories/crochets/ATHENA BIKINI (23,600).JPG', description: 'Bikini de crochet con motivos clásicos.',                          category: 'Crochets',      quantity: 1 },
  { id: 56, name: 'Aya Top',                 price: 17600, image: '/images/categories/crochets/AYA TOP (17,600).JPG', description: 'Top de crochet con escote cuadrado y detalle en la espalda.',      category: 'Crochets',      quantity: 1 },
  { id: 57, name: 'Conjunto Selene',         price: 31300, image: '/images/categories/crochets/CONJUNTO SELENE (31,300).JPG', description: 'Conjunto de crochet con top y falda coordinados.',                 category: 'Crochets',      quantity: 1 },
  { id: 58, name: 'Freya Top',               price: 26750, image: '/images/categories/crochets/FREYA TOP (26,750).JPG', description: 'Top de crochet calado con patrón delicado.',                      category: 'Crochets',      quantity: 1 },
  { id: 59, name: 'Gaia Bikini',             price: 21200, image: '/images/categories/crochets/GAIA bikini (21,200).JPG', description: 'Bikini de crochet con ribetes ondulados.',                        category: 'Crochets',      quantity: 1 },
  { id: 60, name: 'Hera Top',                price: 17500, image: '/images/categories/crochets/HERA TOP (17,500).JPG', description: 'Top de crochet asimétrico con detalle artesanal.',                category: 'Crochets',      quantity: 1 },
  { id: 61, name: 'Kali Salida de Playa',    price: 16800, image: '/images/categories/crochets/KALI SALIDA DE PLAYA (16,800).JPG', description: 'Salida de playa de crochet con flecos en el borde.',               category: 'Crochets',      quantity: 1 },
  { id: 62, name: 'Nefertari Bikini',        price: 23400, image: '/images/categories/crochets/NEFERTARI BIKINI (23,400).JPG', description: 'Bikini de crochet con inspiración egipcia y volantes.',             category: 'Crochets',      quantity: 1 },
  { id: 63, name: 'Noa Top',                 price: 15300, image: '/images/categories/crochets/NOA TOP (15,300).JPG', description: 'Top de crochet ligero con tirantes ajustables.',                  category: 'Crochets',      quantity: 1 },
  { id: 64, name: 'Nyx Top',                 price: 14600, image: '/images/categories/crochets/NYX TOP (14,600).JPG', description: 'Top de crochet de escote pronunciado y textura suave.',            category: 'Crochets',      quantity: 1 },
  { id: 65, name: 'Set Innana', price: 35800, image: '/images/categories/crochets/SET INNANA ( 35,800).JPG', description: 'Set de crochet con top y pantalón estilo bohemio.', category: 'Crochets', quantity: 1 },
  { id: 66, name: 'Thalía Top',              price: 17300, image: '/images/categories/crochets/THALÍA TOP (17,300).JPG', description: 'Top de crochet con volantes delicados y escote corazón.',         category: 'Crochets',      quantity: 1 },
  { id: 67, name: 'Venus Top',               price: 16700, image: '/images/categories/crochets/VENUS TOP (16,700).JPG', description: 'Top de crochet con hombros descubiertos.',                         category: 'Crochets',      quantity: 1 },
  { id: 68, name: 'Zafiro Bikini',           price: 23800, image: '/images/categories/crochets/ZAFIRO BIKINI (23,800).JPG', description: 'Bikini de crochet con detalles brillantes.',                      category: 'Crochets',      quantity: 1 },

  // Accesorios
  { id: 69, name: 'Top Corto con Encaje',    price: 20000, image: '/images/PRUEBA3.jpg', description: 'Top corto negro con detalles de encaje.',                         category: 'Accesorios',    quantity: 1 },
  { id: 70, name: 'Camisa Oversize',         price: 27000, image: '/images/PRUEBA4.jpg', description: 'Camisa blanca estilo oversize con bolsillos.',                     category: 'Accesorios',    quantity: 1 },
  { id: 71, name: 'Pantalones Culotte',      price: 29000, image: '/images/PRUEBA5.jpg', description: 'Pantalones amplios hasta la pantorrilla.',                        category: 'Accesorios',    quantity: 1 },
  { id: 72, name: 'Crop Top Fluido',         price: 21000, image: '/images/PRUEBA1.jpg', description: 'Crop top de tirantes con tela fluida.',                           category: 'Accesorios',    quantity: 1 },
  { id: 73, name: 'Body Transparente',       price: 31000, image: '/images/PRUEBA2.jpg', description: 'Body con transparencias y detalles florales.',                     category: 'Accesorios',    quantity: 1 },
  { id: 74, name: 'Blusa con Nudo Frontal',  price: 26000, image: '/images/PRUEBA3.jpg', description: 'Blusa con mangas sueltas y nudo.',                                 category: 'Accesorios',    quantity: 1 },
  { id: 75, name: 'Falda Mini con Botones',  price: 23000, image: '/images/PRUEBA4.jpg', description: 'Falda mini con botones decorativos.',                             category: 'Accesorios',    quantity: 1 },
  { id: 76, name: 'Leggings Texturizados',   price: 28000, image: '/images/PRUEBA5.jpg', description: 'Leggings con textura y cintura alta.',                             category: 'Accesorios',    quantity: 1 },
]
