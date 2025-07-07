// src/data/datacategories.tsx

export interface CategoryProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: 'Bikinis' | 'Vestidos' | 'Conjuntos' | 'Disfraces' | 'Crochets'
}

export const CATEGORY_PRODUCTS: CategoryProduct[] = [
  // Bikinis
  { id: 21, name: 'Bikini Tropical', price: 25000, image: '/images/PRUEBA1.jpg', description: 'Bikini con estampado tropical y tirantes ajustables.', category: 'Bikinis' },
  { id: 22, name: 'Bikini de Rayas', price: 26000, image: '/images/PRUEBA2.jpg', description: 'Conjunto de bikini a rayas multicolor con top triangular.', category: 'Bikinis' },
  { id: 23, name: 'Bikini Blanco Clásico', price: 24000, image: '/images/PRUEBA3.jpg', description: 'Bikini blanco con textura acanalada y diseño minimalista.', category: 'Bikinis' },
  { id: 24, name: 'Bikini con Volantes', price: 28000, image: '/images/PRUEBA4.jpg', description: 'Bikini color pastel con volantes en los bordes.', category: 'Bikinis' },
  { id: 25, name: 'Bikini Deportivo', price: 27000, image: '/images/PRUEBA5.jpg', description: 'Bikini estilo deportivo ideal para nadar.', category: 'Bikinis' },
  { id: 26, name: 'Bikini Floral Vintage', price: 29000, image: '/images/PRUEBA1.jpg', description: 'Diseño vintage con estampado floral y sujetador halter.', category: 'Bikinis' },
  { id: 27, name: 'Bikini Animal Print', price: 30000, image: '/images/PRUEBA2.jpg', description: 'Bikini con estampado animal print y corte alto.', category: 'Bikinis' },
  { id: 28, name: 'Bikini Bandeau Rosa', price: 25000, image: '/images/PRUEBA3.jpg', description: 'Conjunto bandeau en tono rosa pálido con lazo.', category: 'Bikinis' },

  // Vestidos
  { id: 29, name: 'Vestido Bohemio', price: 38000, image: '/images/PRUEBA4.jpg', description: 'Vestido largo con estampado boho y mangas acampanadas.', category: 'Vestidos' },
  { id: 30, name: 'Vestido Corto Negro', price: 35000, image: '/images/PRUEBA5.jpg', description: 'Vestido corto negro elegante con escote cruzado.', category: 'Vestidos' },
  { id: 31, name: 'Vestido de Encaje', price: 40000, image: '/images/PRUEBA1.jpg', description: 'Vestido ajustado con encaje delicado.', category: 'Vestidos' },
  { id: 32, name: 'Vestido Floral Pastel', price: 36000, image: '/images/PRUEBA2.jpg', description: 'Vestido fluido con flores y escote corazón.', category: 'Vestidos' },
  { id: 33, name: 'Vestido Lencero', price: 39000, image: '/images/PRUEBA3.jpg', description: 'Vestido tipo lencero satinado ideal para noche.', category: 'Vestidos' },
  { id: 34, name: 'Vestido Maxi Rayas', price: 42000, image: '/images/PRUEBA4.jpg', description: 'Vestido largo de rayas verticales.', category: 'Vestidos' },
  { id: 35, name: 'Vestido Vintage Floral', price: 37000, image: '/images/PRUEBA5.jpg', description: 'Vestido floral estilo retro con cinturón.', category: 'Vestidos' },
  { id: 36, name: 'Vestido de Gasa', price: 41000, image: '/images/PRUEBA1.jpg', description: 'Vestido ligero de gasa con tirantes finos.', category: 'Vestidos' },

  // Conjuntos
  { id: 37, name: 'Conjunto de Lino Natural', price: 45000, image: '/images/PRUEBA2.jpg', description: 'Blusa y pantalón corto de lino beige.', category: 'Conjuntos' },
  { id: 38, name: 'Conjunto Deportivo', price: 46000, image: '/images/PRUEBA3.jpg', description: 'Conjunto deportivo para entrenamiento y descanso.', category: 'Conjuntos' },
  { id: 39, name: 'Conjunto Floral', price: 48000, image: '/images/PRUEBA4.jpg', description: 'Conjunto top y falda con estampado floral.', category: 'Conjuntos' },
  { id: 40, name: 'Conjunto Blanco Chic', price: 47000, image: '/images/PRUEBA5.jpg', description: 'Top corto y pantalón blanco de vestir.', category: 'Conjuntos' },
  { id: 41, name: 'Conjunto Casual Rayas', price: 44000, image: '/images/PRUEBA1.jpg', description: 'Conjunto casual con rayas horizontales.', category: 'Conjuntos' },
  { id: 42, name: 'Conjunto Elegante de Satén', price: 49000, image: '/images/PRUEBA2.jpg', description: 'Top halter y pantalón de satén.', category: 'Conjuntos' },
  { id: 43, name: 'Conjunto Denim', price: 43000, image: '/images/PRUEBA3.jpg', description: 'Chaqueta corta y short de mezclilla.', category: 'Conjuntos' },
  { id: 44, name: 'Conjunto Boho', price: 45500, image: '/images/PRUEBA4.jpg', description: 'Conjunto con estampado bohemio y tela fluida.', category: 'Conjuntos' },

  // Disfraces
  { id: 45, name: 'Disfraz de Pirata', price: 30000, image: '/images/PRUEBA5.jpg', description: 'Disfraz de pirata femenino con falda y sombrero.', category: 'Disfraces' },
  { id: 46, name: 'Disfraz de Gatita', price: 32000, image: '/images/PRUEBA1.jpg', description: 'Disfraz sexy de gatita con orejas y cola.', category: 'Disfraces' },
  { id: 47, name: 'Disfraz de Conejita', price: 31000, image: '/images/PRUEBA2.jpg', description: 'Conjunto con orejas, corbatín y corset negro.', category: 'Disfraces' },
  { id: 48, name: 'Disfraz de Ángel', price: 33000, image: '/images/PRUEBA3.jpg', description: 'Disfraz blanco con alas y corona.', category: 'Disfraces' },
  { id: 49, name: 'Disfraz de Enfermera', price: 34000, image: '/images/PRUEBA4.jpg', description: 'Conjunto blanco con accesorios rojos.', category: 'Disfraces' },
  { id: 50, name: 'Disfraz de Superhéroe', price: 35000, image: '/images/PRUEBA5.jpg', description: 'Disfraz ceñido con capa y antifaz.', category: 'Disfraces' },
  { id: 51, name: 'Disfraz de Caperucita', price: 36000, image: '/images/PRUEBA1.jpg', description: 'Vestido rojo con capa y encaje.', category: 'Disfraces' },
  { id: 52, name: 'Disfraz de Marinera', price: 32000, image: '/images/PRUEBA2.jpg', description: 'Vestido azul con gorro y anclas.', category: 'Disfraces' },

  // Prendas femeninas
  { id: 53, name: 'Top Corto con Encaje', price: 20000, image: '/images/PRUEBA3.jpg', description: 'Top corto negro con detalles de encaje.', category: 'Crochets' },
  { id: 54, name: 'Camisa Oversize', price: 27000, image: '/images/PRUEBA4.jpg', description: 'Camisa blanca estilo oversize con bolsillos.', category: 'Crochets' },
  { id: 55, name: 'Pantalones Culotte', price: 29000, image: '/images/PRUEBA5.jpg', description: 'Pantalones amplios hasta la pantorrilla.', category: 'Crochets' },
  { id: 56, name: 'Crop Top Fluido', price: 21000, image: '/images/PRUEBA1.jpg', description: 'Crop top de tirantes con tela fluida.', category: 'Crochets' },
  { id: 57, name: 'Body Transparente', price: 31000, image: '/images/PRUEBA2.jpg', description: 'Body con transparencias y detalles florales.', category: 'Crochets' },
  { id: 58, name: 'Blusa con Nudo Frontal', price: 26000, image: '/images/PRUEBA3.jpg', description: 'Blusa con mangas sueltas y nudo.', category: 'Crochets' },
  { id: 59, name: 'Falda Mini con Botones', price: 23000, image: '/images/PRUEBA4.jpg', description: 'Falda mini con botones decorativos.', category: 'Crochets' },
  { id: 60, name: 'Leggings Texturizados', price: 28000, image: '/images/PRUEBA5.jpg', description: 'Leggings con textura y cintura alta.', category: 'Crochets' },
]
