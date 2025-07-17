// src/data/datacategories.tsx

export interface CategoryProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
  // Aquí corregimos el literal de 'Crochet' a 'Crochets' para que coincida con los datos
  category: 'Bikinis' | 'Tops' | 'Vestidos' | 'Crochet' | 'Bottoms' | 'Salidas de playa' | 'Accesorios'
  quantity: number
}

export const CATEGORY_PRODUCTS: CategoryProduct[] = [
  // Bikinis
  { id: 21, name: 'Bikini Tropical',      price: 25000, image: '/images/PRUEBA1.jpg', description: 'Bikini con estampado tropical y tirantes ajustables.',        category: 'Bikinis', quantity: 1 },
  { id: 22, name: 'Bikini de Rayas',       price: 26000, image: '/images/PRUEBA2.jpg', description: 'Conjunto de bikini a rayas multicolor con top triangular.',   category: 'Bikinis', quantity: 1 },
  { id: 23, name: 'Bikini Blanco Clásico', price: 24000, image: '/images/PRUEBA3.jpg', description: 'Bikini blanco con textura acanalada y diseño minimalista.',   category: 'Bikinis', quantity: 1 },
  { id: 24, name: 'Bikini con Volantes',   price: 28000, image: '/images/PRUEBA4.jpg', description: 'Bikini color pastel con volantes en los bordes.',            category: 'Bikinis', quantity: 1 },
  { id: 25, name: 'Bikini Deportivo',      price: 27000, image: '/images/PRUEBA5.jpg', description: 'Bikini estilo deportivo ideal para nadar.',                  category: 'Bikinis', quantity: 1 },
  { id: 26, name: 'Bikini Floral Vintage', price: 29000, image: '/images/PRUEBA1.jpg', description: 'Diseño vintage con estampado floral y sujetador halter.',     category: 'Bikinis', quantity: 1 },
  { id: 27, name: 'Bikini Animal Print',   price: 30000, image: '/images/PRUEBA2.jpg', description: 'Bikini con estampado animal print y corte alto.',             category: 'Bikinis', quantity: 1 },
  { id: 28, name: 'Bikini Bandeau Rosa',   price: 25000, image: '/images/PRUEBA3.jpg', description: 'Conjunto bandeau en tono rosa pálido con lazo.',              category: 'Bikinis', quantity: 1 },

  // Tops
  { id: 30, name: 'Vestido Corto Negro',    price: 35000, image: '/images/PRUEBA5.jpg', description: 'Vestido corto negro elegante con escote cruzado.',           category: 'Tops',    quantity: 1 },
  { id: 31, name: 'Vestido de Encaje',      price: 40000, image: '/images/PRUEBA1.jpg', description: 'Vestido ajustado con encaje delicado.',                     category: 'Tops',    quantity: 1 },
  { id: 32, name: 'Vestido Floral Pastel',  price: 36000, image: '/images/PRUEBA2.jpg', description: 'Vestido fluido con flores y escote corazón.',                category: 'Tops',    quantity: 1 },
  { id: 33, name: 'Vestido Lencero',        price: 39000, image: '/images/PRUEBA3.jpg', description: 'Vestido tipo lencero satinado ideal para noche.',            category: 'Tops',    quantity: 1 },
  { id: 34, name: 'Vestido Maxi Rayas',     price: 42000, image: '/images/PRUEBA4.jpg', description: 'Vestido largo de rayas verticales.',                         category: 'Tops',    quantity: 1 },
  { id: 35, name: 'Vestido Vintage Floral', price: 37000, image: '/images/PRUEBA5.jpg', description: 'Vestido floral estilo retro con cinturón.',                 category: 'Tops',    quantity: 1 },
  { id: 36, name: 'Vestido de Gasa',        price: 41000, image: '/images/PRUEBA1.jpg', description: 'Vestido ligero de gasa con tirantes finos.',                category: 'Tops',    quantity: 1 },

  // Vestidos
{ id: 77, name: 'Alina dress', price: 23500, image: '/images/categories/vestidos/Alina dress (23,500).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 78, name: 'Angélica Dress', price: 53700, image: '/images/categories/vestidos/Angelicadress.jpg', description: '', category: 'Vestidos', quantity: 1 },
{ id: 79, name: 'Catalina Dress', price: 25800, image: '/images/categories/vestidos/CATALINA.JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 80, name: 'Celeste Dress', price: 19600, image: '/images/categories/vestidos/Celeste Dress (19,600).jpg', description: '', category: 'Vestidos', quantity: 1 },
{ id: 81, name: 'Chonta Dress', price: 28700, image: '/images/categories/vestidos/Chonta Dress (28,700).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 82, name: 'Daiane Dress', price: 27800, image: '/images/categories/vestidos/Daiane Dress (27,800).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 83, name: 'Dani Dress', price: 25200, image: '/images/categories/vestidos/Dani Dress (25,200).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 84, name: 'Emely Dress', price: 18800, image: '/images/categories/vestidos/Emely Dress (18,800).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 85, name: 'Emely Dress largo', price: 19800, image: '/images/categories/vestidos/Emely Dress largo (19,800).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 86, name: 'Ericka Dress', price: 19300, image: '/images/categories/vestidos/Ericka Dress (19,300).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 87, name: 'Leslie dress', price: 18800, image: '/images/categories/vestidos/Leslie dress (18,800).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 88, name: 'Linsay Dress', price: 19600, image: '/images/categories/vestidos/Linsay Dress (19,600).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 89, name: 'Loreto Dress', price: 19700, image: '/images/categories/vestidos/Loreto Dress (19,700).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 90, name: 'Mayara Dress', price: 21800, image: '/images/categories/vestidos/Mayara Dress (21,800).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 91, name: 'Mónica Dress', price: 29900, image: '/images/categories/vestidos/Mónica Dress( 29,900).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 92, name: 'Rosa Dress', price: 26200, image: '/images/categories/vestidos/Rosa Dress (26,200).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 93, name: 'Trace Dress', price: 23400, image: '/images/categories/vestidos/Trace Dress (23,400).JPG', description: '', category: 'Vestidos', quantity: 1 },
{ id: 94, name: 'Violeta Dress', price: 23700, image: '/images/categories/vestidos/Violeta Dress (23,700).JPG', description: '', category: 'Vestidos', quantity: 1 },



  // Crochets
  { id: 53, name: 'Afrodita Top',         price: 22800, image: '/images/categories/crochets/AFRODITA TOP (22,800).JPG', description: 'Top de crochet con textura calada y tirantes finos.', category: 'Crochet', quantity: 1 },
  { id: 54, name: 'Althea Bikini',         price: 22600, image: '/images/categories/crochets/ALTHEA BIKINI (22,600).JPG', description: 'Bikini de crochet con tirantes ajustables.',          category: 'Crochet', quantity: 1 },
  { id: 55, name: 'Athena Bikini',         price: 23600, image: '/images/categories/crochets/ATHENA BIKINI (23,600).JPG', description: 'Bikini de crochet con motivos clásicos.',              category: 'Crochet', quantity: 1 },
  { id: 56, name: 'Aya Top',               price: 17600, image: '/images/categories/crochets/AYA TOP (17,600).JPG', description: 'Top de crochet con escote cuadrado y detalle en la espalda.', category: 'Crochet', quantity: 1 },
  { id: 57, name: 'Conjunto Selene',       price: 31300, image: '/images/categories/crochets/CONJUNTO SELENE (31,300).JPG', description: 'Conjunto de crochet con top y falda coordinados.',   category: 'Crochet', quantity: 1 },
  { id: 58, name: 'Freya Top',             price: 26750, image: '/images/categories/crochets/FREYA TOP (26,750).JPG', description: 'Top de crochet calado con patrón delicado.',          category: 'Crochet', quantity: 1 },
  { id: 59, name: 'Gaia Bikini',           price: 21200, image: '/images/categories/crochets/GAIA bikini (21,200).JPG', description: 'Bikini de crochet con ribetes ondulados.',            category: 'Crochet', quantity: 1 },
  { id: 60, name: 'Hera Top',              price: 17500, image: '/images/categories/crochets/HERA TOP (17,500).JPG', description: 'Top de crochet asimétrico con detalle artesanal.',    category: 'Crochet', quantity: 1 },
  { id: 61, name: 'Kali Salida de Playa',  price: 16800, image: '/images/categories/crochets/KALI SALIDA DE PLAYA (16,800).JPG', description: 'Salida de playa de crochet con flecos en el borde.', category: 'Crochet', quantity: 1 },
  { id: 62, name: 'Nefertari Bikini',      price: 23400, image: '/images/categories/crochets/NEFERTARI BIKINI (23,400).JPG', description: 'Bikini de crochet con inspiración egipcia y volantes.', category: 'Crochet', quantity: 1 },
  { id: 63, name: 'Noa Top',               price: 15300, image: '/images/categories/crochets/NOA TOP (15,300).JPG', description: 'Top de crochet ligero con tirantes ajustables.',      category: 'Crochet', quantity: 1 },
  { id: 64, name: 'Nyx Top',               price: 14600, image: '/images/categories/crochets/NYX TOP (14,600).JPG', description: 'Top de crochet de escote pronunciado y textura suave.',category: 'Crochet', quantity: 1 },
  { id: 65, name: 'Set Innana',            price: 35800, image: '/images/categories/crochets/SET INNANA ( 35,800).JPG', description: 'Set de crochet con top y pantalón estilo bohemio.',   category: 'Crochet', quantity: 1 },
  { id: 66, name: 'Thalía Top',            price: 17300, image: '/images/categories/crochets/THALÍA TOP (17,300).JPG', description: 'Top de crochet con volantes delicados y escote corazón.', category: 'Crochet', quantity: 1 },
  { id: 67, name: 'Venus Top',             price: 16700, image: '/images/categories/crochets/VENUS TOP (16,700).JPG', description: 'Top de crochet con hombros descubiertos.',             category: 'Crochet', quantity: 1 },
  { id: 68, name: 'Zafiro Bikini',         price: 23800, image: '/images/categories/crochets/ZAFIRO BIKINI (23,800).JPG', description: 'Bikini de crochet con detalles brillantes.',          category: 'Crochet', quantity: 1 },

   // Bottoms
  { id: 45, name: 'Disfraz de Pirata',     price: 30000, image: '/images/PRUEBA5.jpg', description: 'Disfraz de pirata femenino con falda y sombrero.',      category: 'Bottoms',  quantity: 1 },
  { id: 46, name: 'Disfraz de Gatita',     price: 32000, image: '/images/PRUEBA1.jpg', description: 'Disfraz sexy de gatita con orejas y cola.',             category: 'Bottoms',  quantity: 1 },
  { id: 47, name: 'Disfraz de Conejita',   price: 31000, image: '/images/PRUEBA2.jpg', description: 'Conjunto con orejas, corbatín y corset negro.',         category: 'Bottoms',  quantity: 1 },
  { id: 48, name: 'Disfraz de Ángel',      price: 33000, image: '/images/PRUEBA3.jpg', description: 'Disfraz blanco con alas y corona.',                    category: 'Bottoms',  quantity: 1 },
  { id: 49, name: 'Disfraz de Enfermera',  price: 34000, image: '/images/PRUEBA4.jpg', description: 'Conjunto blanco con accesorios rojos.',                 category: 'Bottoms',  quantity: 1 },
  { id: 50, name: 'Disfraz de Superhéroe', price: 35000, image: '/images/PRUEBA5.jpg', description: 'Disfraz ceñido con capa y antifaz.',                   category: 'Bottoms',  quantity: 1 },
  { id: 51, name: 'Disfraz de Caperucita', price: 36000, image: '/images/PRUEBA1.jpg', description: 'Vestido rojo con capa y encaje.',                       category: 'Bottoms',  quantity: 1 },
  { id: 52, name: 'Disfraz de Marinera',   price: 32000, image: '/images/PRUEBA2.jpg', description: 'Vestido azul con gorro y anclas.',                     category: 'Bottoms',  quantity: 1 },

 // Salidas de playa
{ id: 37, name: 'Falda Almeja flotante',     price: 15800, image: '/images/categories/playa/Falda Almeja flotante (15,800).JPG',     description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 38, name: 'Falda Brisa bonita',        price: 15700, image: '/images/categories/playa/Falda Brisa bonita (15,700).JPG',        description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 39, name: 'Falda Colibrí',             price: 18600, image: '/images/categories/playa/Falda Colibrí (18,600).JPG',             description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 40, name: 'Falda Luna nocturna',       price: 19200, image: '/images/categories/playa/Falda Luna nocturna (19,200).JPG',       description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 41, name: 'Falda Mariposa del mar',    price: 14900, image: '/images/categories/playa/Falda Mariposa del mar (14,900).JPG',    description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 42, name: 'Falda ocelote lino',        price: 13800, image: '/images/categories/playa/Falda ocelote lino (13,800).JPG',        description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 43, name: 'Falda Perla',               price: 17800, image: '/images/categories/playa/Falda Perla.JPG',               description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 44, name: 'Falda tigra',               price: 14700, image: '/images/categories/playa/Falda tigra (14,700).JPG',               description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 45, name: 'Pantalón Manta oceánica',   price: 22400, image: '/images/categories/playa/Pantalón Manta oceánica (22,400).JPG',   description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 46, name: 'Pantalón pantera',          price: 19900, image: '/images/categories/playa/Pantalón pantera (19,900).JPG',          description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 47, name: 'Vestido Coconut',           price: 23200, image: '/images/categories/playa/Vestido coconut (23,200).JPG',           description: '', category: 'Salidas de playa', quantity: 1 },
{ id: 48, name: 'Vestido Coco',              price: 23200, image: '/images/categories/playa/Vestido Coconut (23,200) (1).JPG',       description: '', category: 'Salidas de playa', quantity: 1 },



  // Accesorios
  { id: 69, name: 'Top Corto',  price: 20000, image: '/images/PRUEBA3.jpg', description: 'Top corto negro con detalles de encaje.',             category: 'Accesorios', quantity: 1 },
  { id: 70, name: 'Camisa Oversize',       price: 27000, image: '/images/PRUEBA4.jpg', description: 'Camisa blanca estilo oversize con bolsillos.',         category: 'Accesorios', quantity: 1 },
  { id: 71, name: 'Pantalones Culotte',    price: 29000, image: '/images/PRUEBA5.jpg', description: 'Pantalones amplios hasta la pantorrilla.',            category: 'Accesorios', quantity: 1 },
  { id: 72, name: 'Crop Top Fluido',       price: 21000, image: '/images/PRUEBA1.jpg', description: 'Crop top de tirantes con tela fluida.',               category: 'Accesorios', quantity: 1 },
  { id: 73, name: 'Body Transparente',     price: 31000, image: '/images/PRUEBA2.jpg', description: 'Body con transparencias y detalles florales.',         category: 'Accesorios', quantity: 1 },
  { id: 74, name: 'Blusa con Nudo Frontal',price: 26000, image: '/images/PRUEBA3.jpg', description: 'Blusa con mangas sueltas y nudo.',                     category: 'Accesorios', quantity: 1 },
  { id: 75, name: 'Falda Mini con Botones',price: 23000, image: '/images/PRUEBA4.jpg', description: 'Falda mini con botones decorativos.',                 category: 'Accesorios', quantity: 1 },
  { id: 76, name: 'Leggings Texturizados', price: 28000, image: '/images/PRUEBA5.jpg', description: 'Leggings con textura y cintura alta.',                 category: 'Accesorios', quantity: 1 },
]
