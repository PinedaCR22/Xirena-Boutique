import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCreditCard } from 'react-icons/fi'
import { useModal } from '../context/ModalContext'
import { useTheme } from '../context/ThemeContext'
import type { FeatureProduct } from '../data/datafeatures'

export default function Checkout() {
  const { isLightMode } = useTheme()
  const { showModal, hideModal } = useModal()
  const navigate = useNavigate()

  // Carrito desde localStorage
  const cart: FeatureProduct[] = JSON.parse(
    localStorage.getItem('cart') || '[]'
  )
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)

  // Cálculo de montos
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0)
  const halfAmount = Math.floor(totalAmount / 2)

  // Datos de provincias y cantones
  const provinces = [
    'San José',
    'Alajuela',
    'Cartago',
    'Heredia',
    'Guanacaste',
    'Puntarenas',
    'Limón'
  ]
  const cantonesData: Record<string, string[]> = {
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
  const cantones = formData.provincia
    ? cantonesData[formData.provincia] || []
    : []

  // Estilos según tema
  const cardBg = isLightMode
    ? 'bg-white text-gray-800'
    : 'bg-gray-800 text-gray-200'
  const inputBase = 'transition-colors rounded-lg'
  const inputClasses = isLightMode
    ? 'bg-white border border-gray-300 text-gray-800'
    : 'bg-gray-800 border border-white text-white'
  const selectClasses = `${inputBase} p-2 w-full ${inputClasses}`
  const textInputClasses = `${inputBase} p-4 w-full ${inputClasses}`

  // Handler unificado para <input>, <select> y <textarea>
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    name: string
  ) => {
    const value = e.target.value
    setFormData((prev: Record<string, any>) => ({
      ...prev,
      [name]: value
    }))
  }

  // Carga de archivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentFile(file)
      setFormData((prev: Record<string, any>) => ({
        ...prev,
        comprobante: file
      }))
    }
  }

  // Función que lanza los modales de pago y de pedido en proceso
  const finalizeOrder = () => {
    showModal({
      type: 'info',
      title: 'Pago por Sinpe Móvil',
      content: (
        <div className="space-y-4 text-center">
          <img
            src="/images/sinpe.png"
            alt="Sinpe Móvil"
            className="mx-auto h-16"
          />
          <p>Depositar el 50% del monto total a:</p>
          <p className="font-semibold">Número: 8888-8888</p>
          <p className="font-semibold">
            Monto a depositar: ₡{halfAmount.toLocaleString()}
          </p>
          <label className="block border-2 border-dashed rounded p-6 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="text-sm text-gray-500">
              Haz clic para subir comprobante
            </span>
          </label>
          {paymentFile && (
            <p className="text-sm text-gray-600">
              Archivo: {paymentFile.name}
            </p>
          )}
          <div className="flex justify-center space-x-4 mt-4">
            {/* Sólo cierra el modal */}
            <button
              onClick={() => {
                hideModal()
              }}
              className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Regresar
            </button>
            {/* Avanza al modal final */}
            <button
              onClick={() => {
                hideModal()
                showModal({
                  type: 'info',
                  title: 'Pedido en proceso',
                  content: (
                    <div className="space-y-4 text-center">
                      <p className="text-lg font-medium">
                        Tu pedido está en proceso
                      </p>
                      <button
                        onClick={() => {
                          hideModal()
                          localStorage.removeItem('cart')
                          navigate('/')
                        }}
                        className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                      >
                        Aceptar
                      </button>
                    </div>
                  )
                })
              }}
              className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Aceptar
            </button>
          </div>
        </div>
      )
    })
  }

  return (
    <section
      className={`py-12 px-4 sm:px-8 lg:px-16 min-h-screen transition-colors ${
        isLightMode
          ? 'bg-white text-gray-800'
          : 'bg-gray-900 text-gray-200'
      }`}
    >
      <h1 className="flex items-center mb-6 text-3xl font-bold">
        <FiCreditCard className="mr-2 text-pink-500" />
        Formulario de Compra
      </h1>

      {/* Paso 1: Selección de tallas, colores y medidas */}
      {step === 1 && (
        <div className="space-y-6">
          {cart.map((prod) => (
            <div
              key={prod.id}
              className={`shadow-lg rounded-lg p-6 transition-colors ${cardBg}`}
            >
              <h2 className="mb-4 text-xl font-semibold">{prod.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Talla</label>
                  <select
                    className={selectClasses}
                    value={formData[`size-${prod.id}`] || 'XS'}
                    onChange={(e) =>
                      handleInputChange(e, `size-${prod.id}`)
                    }
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Color</label>
                  <select
                    className={selectClasses}
                    value={formData[`color-${prod.id}`] || 'Blanco'}
                    onChange={(e) =>
                      handleInputChange(e, `color-${prod.id}`)
                    }
                  >
                    {[
                      'Blanco',
                      'Negro',
                      'Rojo',
                      'Amarillo',
                      'Verde',
                      'Azul',
                      'Rosado',
                      'Fucsia',
                      'Celeste',
                      'Beige',
                      'Café'
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-1">
                  Toma de medidas
                </label>
                <textarea
                  maxLength={100}
                  placeholder="Ej: cintura, largo, etc."
                  className={textInputClasses}
                  value={formData[`medidas-${prod.id}`] || ''}
                  onChange={(e) =>
                    handleInputChange(e, `medidas-${prod.id}`)
                  }
                />
                <span className="block text-right text-sm text-gray-500">
                  {(formData[`medidas-${prod.id}`]?.length || 0)}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paso 2: Datos personales y método de entrega */}
      {step === 2 && (
        <div className="space-y-6 mt-6">
          <div
            className={`shadow-lg rounded-lg p-6 transition-colors ${cardBg}`}
          >
            <h2 className="mb-4 text-xl font-semibold">
              Datos de la persona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Tu nombre completo"
                  className={textInputClasses}
                  value={formData.nombre || ''}
                  onChange={(e) => handleInputChange(e, 'nombre')}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  maxLength={30}
                  placeholder="Tu correo electrónico"
                  className={textInputClasses}
                  value={formData.correo || ''}
                  onChange={(e) => handleInputChange(e, 'correo')}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Número de teléfono
                </label>
                <input
                  type="text"
                  maxLength={8}
                  placeholder="Tu teléfono"
                  className={textInputClasses}
                  value={formData.telefono || ''}
                  onChange={(e) => handleInputChange(e, 'telefono')}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Provincia
                </label>
                <select
                  className={selectClasses}
                  value={formData.provincia || ''}
                  onChange={(e) => {
                    handleInputChange(e, 'provincia')
                    handleInputChange(
                      { target: { value: '' } } as any,
                      'canton'
                    )
                  }}
                >
                  <option value="">Selecciona provincia</option>
                  {provinces.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Cantón
                </label>
                <select
                  disabled={!formData.provincia}
                  className={`${selectClasses} ${
                    !formData.provincia
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  value={formData.canton || ''}
                  onChange={(e) => handleInputChange(e, 'canton')}
                >
                  <option value="">Selecciona cantón</option>
                  {cantones.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div
            className={`shadow-lg rounded-lg p-6 transition-colors ${cardBg}`}
          >
            <h2 className="mb-4 text-xl font-semibold">
              Método de Entrega
            </h2>
            <select
              className={selectClasses}
              value={formData.entrega || ''}
              onChange={(e) => handleInputChange(e, 'entrega')}
            >
              <option value="">Selecciona método</option>
              <option>Envío por correo</option>
              <option>Entrega en Santa Cruz</option>
              <option>Entrega en Liberia</option>
              <option>Entrega en Junquillal</option>
            </select>
          </div>
        </div>
      )}

      {/* Controles de navegación */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={() => {
            if (step === 1) navigate('/cart')
            else setStep(step - 1)
          }}
          className="px-6 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded"
        >
          Anterior
        </button>
        {step < 2 && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Siguiente
          </button>
        )}
        {step === 2 && (
          <button
            onClick={finalizeOrder}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Realizar pago
          </button>
        )}
      </div>
    </section>
  )
}
