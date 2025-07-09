import type { FieldConfig } from '../hooks/useFormValidation'

export const validationConfig: FieldConfig = {
  nombre: {
    required: true,
    onlyLetters: true,
    minLength: 2,
    maxLength: 30
  },
  correo: {
    required: true,
    email: true,
    maxLength: 50
  },
  telefono: {
    required: true,
    onlyNumbers: true,
    minLength: 8,
    maxLength: 8
  },
  provincia: {
    required: true
  },
  canton: {
    required: true
  },
  entrega: {
    required: true
  }
}

export const provinces: string[] = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón'
]

export const cantonesData: Record<string, string[]> = {
  'San José': [
    'San José', 'Escazú', 'Desamparados', 'Puriscal', 'Tarrazú',
    'Aserrí', 'Mora', 'Goicoechea', 'Santa Ana', 'Alajuelita',
    'Tibás', 'Moravia', 'Montes de Oca', 'Curridabat', 'Dota',
    'Perez Zeledon', 'León Cortés'
  ],
  Alajuela: [
    'Alajuela', 'San Ramón', 'Grecia', 'San Mateo', 'Atenas',
    'Naranjo', 'Palmares', 'Poás', 'Orotina', 'San Carlos',
    'Zarcero', 'Sarchí', 'Valverde Vega', 'Upala', 'Los Chiles',
    'Guatuso'
  ],
  Cartago: [
    'Cartago', 'Paraíso', 'La Unión', 'Jiménez', 'Turrialba',
    'Alvarado', 'Oreamuno', 'El Guarco'
  ],
  Heredia: [
    'Heredia', 'Barva', 'Santo Domingo', 'Santa Bárbara',
    'San Rafael', 'San Isidro', 'Belén', 'Flores', 'San Pablo'
  ],
  Guanacaste: [
    'Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces', 'Carrillo',
    'Cañas', 'Abangares', 'Tilarán', 'Nandayure', 'La Cruz',
    'Hojancha'
  ],
  Puntarenas: [
    'Puntarenas', 'Esparza', 'Buenos Aires', 'Montes de Oro',
    'Osa', 'Quepos', 'Golfito', 'Coto Brus', 'Parrita',
    'Corredores', 'Garabito'
  ],
  Limón: [
    'Limón', 'Pococí', 'Siquirres', 'Talamanca', 'Matina',
    'Guácimo'
  ]
}
