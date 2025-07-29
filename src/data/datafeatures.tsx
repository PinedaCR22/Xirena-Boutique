export interface FeatureProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
  quantity: number
}


export const FEATURED_PRODUCTS: FeatureProduct[] = [
  { id: 1, name: 'Amelie bikini', price: 25600, image: 'https://i.ibb.co/WvN5YLKt/Amelie-bikini-25-600-1.webp', description: '', quantity: 1 },
  { id: 2, name: 'Angélica Dress', price: 53700, image: 'https://i.ibb.co/wXmhf5g/Ang-lica-Dress-53-700-1.webp', description: '', quantity: 1 },
  { id: 3, name: 'Brisa Blkini', price: 31700, image: 'https://i.ibb.co/VpCXt9qC/Brisa-BIkini-31-700.webp', description: 'https://i.ibb.co/2YMXyhkM/Brisa-BIkini-31-700.webp', quantity: 1 },
  { id: 4, name: 'Coco dulce bikini', price: 28700, image: 'https://i.ibb.co/gFgd6TFD/COCODULCE.webp', description: '', quantity: 1 },
  { id: 5, name: 'Conjunto alma', price: 28800, image: 'https://i.ibb.co/8nQctpkj/Conjunto-alma-28-800.webp', description: '', quantity: 1 },
  { id: 6, name: 'Conjunto Eimy', price: 27500, image: 'https://i.ibb.co/SDd2Q6NQ/EIMY.webp', description: '', quantity: 1 },
  { id: 7, name: 'Conjunto personalizado', price: 38900, image: 'https://i.ibb.co/F4SWpVs5/Conjunto-personalizado-38-900.webp', description: '', quantity: 1 },
  { id: 8, name: 'Disfraz completo terrifier', price: 44800, image: 'https://i.ibb.co/KxtZ2H2Y/Disfraz-completo-terrifier-44-800.webp', description: '', quantity: 1 },
  { id: 9, name: 'Dreams G dress', price: 35500, image: 'https://i.ibb.co/nNH2cjpk/Dreams-G-dress-35-500.webp', description: '', quantity: 1 },
  { id: 10, name: 'Hibiscus bikini', price: 27700, image: 'https://i.ibb.co/84RxR2tz/Hibiscus-bikini-27-700.webp', description: '', quantity: 1 },
  { id: 11, name: 'Julissa Dress', price: 33500, image: 'https://i.ibb.co/6Rw1nTt1/Julissa-Dress-33-500.webp', description: '', quantity: 1 },
  { id: 12, name: 'Leonora body', price: 38600, image: 'https://i.ibb.co/VcxYr6cy/Leonora-body-38-600.webp', description: '', quantity: 1 },
  { id: 13, name: 'Salty bikini', price: 28900, image: 'https://i.ibb.co/Mx4dJCKs/Salty-bikini-28-900.webp', description: '', quantity: 1 },
  { id: 14, name: 'Sun Kiss Bikini', price: 18900, image: 'https://i.ibb.co/mCRk31DD/SUNKIS.webp', description: '', quantity: 1 },
  { id: 15, name: 'Yarlin bustier', price: 22300, image: 'https://i.ibb.co/Xfmn2Txx/YARLIN-JPEG.webp', description: '', quantity: 1 },
]

// ✅ Exportar para que no falle tu import
export const ALL_PRODUCTS = FEATURED_PRODUCTS
