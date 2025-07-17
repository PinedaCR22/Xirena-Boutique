export interface FeatureProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
  quantity: number
}


export const FEATURED_PRODUCTS: FeatureProduct[] = [
  { id: 1, name: 'Amelie bikini', price: 25600, image: '/images/best/Amelie bikini (25,600) (1).PNG', description: '', quantity: 1 },
  { id: 2, name: 'Angélica Dress', price: 53700, image: '/images/best/Angélica Dress (53,700) (1).JPG', description: '', quantity: 1 },
  { id: 3, name: 'Brisa Blkini', price: 31700, image: '/images/best/Brisa BIkini (31,700).PNG', description: '', quantity: 1 },
  { id: 4, name: 'Coco dulce bikini', price: 28700, image: '/images/best/COCODULCE.jpg', description: '', quantity: 1 },
  { id: 5, name: 'Conjunto alma', price: 28800, image: '/images/best/Conjunto alma (28,800).PNG', description: '', quantity: 1 },
  { id: 6, name: 'Conjunto Eimy', price: 27500, image: '/images/best/EIMY.jpg', description: '', quantity: 1 },
  { id: 7, name: 'Conjunto personalizado', price: 38900, image: '/images/best/Conjunto personalizado (38,900).PNG', description: '', quantity: 1 },
  { id: 8, name: 'Disfraz completo terrifier', price: 44800, image: '/images/best/Disfraz completo terrifier (44,800).JPG', description: '', quantity: 1 },
  { id: 9, name: 'Dreams G dress', price: 35500, image: '/images/best/Dreams G dress (35,500).JPG', description: '', quantity: 1 },
  { id: 10, name: 'Hibiscus bikini', price: 27700, image: '/images/best/Hibiscus bikini (27,700).JPG', description: '', quantity: 1 },
  { id: 11, name: 'Julissa Dress', price: 33500, image: '/images/best/Julissa Dress (33,500).JPG', description: '', quantity: 1 },
  { id: 12, name: 'Leonora body', price: 38600, image: '/images/best/Leonora body (38,600).PNG', description: '', quantity: 1 },
  { id: 13, name: 'Salty bikini', price: 28900, image: '/images/best/Salty bikini (28,900).jpeg', description: '', quantity: 1 },
  { id: 14, name: 'Sun Kiss Bikini', price: 18900, image: '/images/best/SUNKIS.jpg', description: '', quantity: 1 },
  { id: 15, name: 'Yarlin bustier', price: 22300, image: '/images/best/YARLIN.JPEG.jpg', description: '', quantity: 1 },
]

// ✅ Exportar para que no falle tu import
export const ALL_PRODUCTS = FEATURED_PRODUCTS
