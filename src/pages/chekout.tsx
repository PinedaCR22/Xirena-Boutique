import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCreditCard } from 'react-icons/fi'
import { useModal } from '../context/ModalContext'
import { useTheme } from '../context/ThemeContext'
import { useFormValidation, type FieldConfig } from '../hooks/useFormValidation'
import type { FeatureProduct } from '../data/datafeatures'

interface ExtendedProduct extends FeatureProduct {
  cartIndex: number // Para diferenciar productos iguales con cantidades > 1
}

export default function Checkout() {
  const { isLightMode } = useTheme()
  const { showModal, hideModal } = useModal()
  const navigate = useNavigate()

  // Estados principales
  const [cart, setCart] = useState<ExtendedProduct[]>([])
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)

  // Configuración de validaciones
  const validationConfig: FieldConfig = {
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

  const {
    validateSingleField,
    validateAllFields,
    setFieldTouched,
    getFieldError,
    hasFieldError,
  } = useFormValidation(validationConfig)

  // Cargar y procesar carrito al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      const parsedCart: (FeatureProduct & { quantity: number })[] = JSON.parse(stored)
      const expandedCart: ExtendedProduct[] = []
      
      parsedCart.forEach((item) => {
        // Si quantity > 1, crear productos separados
        for (let i = 0; i < item.quantity; i++) {
          expandedCart.push({
            ...item,
            cartIndex: expandedCart.length, // Índice único

          })
        }
      })
      
      setCart(expandedCart)
    }
  }, [])

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
    : 'bg-[#f7e6e2] text-black'
  const inputBase = 'transition-colors rounded-lg'
  const inputClasses = isLightMode
    ? 'bg-white border border-gray-300 text-gray-800'
    : 'bg-gray-800 border border-white text-white'
  const errorInputClasses = 'border-red-500 bg-red-50'
  
  const getInputClasses = (fieldName: string) => {
    const baseClasses = `${inputBase} p-4 w-full ${inputClasses}`
    return hasFieldError(fieldName) 
      ? `${baseClasses} ${errorInputClasses}` 
      : baseClasses
  }
  
  const getSelectClasses = (fieldName: string) => {
    const baseClasses = `${inputBase} p-2 w-full ${inputClasses}`
    return hasFieldError(fieldName) 
      ? `${baseClasses} ${errorInputClasses}` 
      : baseClasses
  }

  // Handler para inputs con validación
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const value = e.target.value
    
    // Actualizar formData
    setFormData((prev: Record<string, any>) => ({
      ...prev,
      [name]: value
    }))

    // Validar campo si ha sido tocado
    if (validationConfig[name]) {
      validateSingleField(name, value)
    }

    // Limpiar cantón si cambia provincia
    if (name === 'provincia') {
      setFormData((prev: Record<string, any>) => ({
        ...prev,
        canton: ''
      }))
      if (hasFieldError('canton')) {
        validateSingleField('canton', '')
      }
    }
  }

  // Handler para blur (cuando el usuario sale del campo)
  const handleInputBlur = (fieldName: string, value: string) => {
    setFieldTouched(fieldName)
    if (validationConfig[fieldName]) {
      validateSingleField(fieldName, value)
    }
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

  // Validar paso antes de continuar
  const canProceedToNextStep = () => {
    if (step === 2) {
      // Validar campos requeridos del paso 2
      const requiredFields = ['nombre', 'correo', 'telefono', 'provincia', 'canton', 'entrega']
      const stepData = Object.fromEntries(
        requiredFields.map(field => [field, formData[field] || ''])
      )
      return validateAllFields(stepData)
    }
    return true
  }

  // Función que lanza los modales de pago
  const finalizeOrder = () => {
    if (!canProceedToNextStep()) {
      showModal({
        type: 'error',
        title: 'Datos incompletos',
        content: (
          <div className="text-center">
            <p>Por favor, completa todos los campos requeridos correctamente.</p>
          </div>
        )
      })
      return
    }

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
            <button
              onClick={() => hideModal()}
              className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Regresar
            </button>
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

  // Componente para mostrar errores
  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    const error = getFieldError(fieldName)
    if (!error) return null
    
    return (
      <span className="text-red-500 text-sm mt-1 block">
        {error}
      </span>
    )
  }

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No hay productos en el carrito</h2>
          <button
            onClick={() => navigate('/cart')}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Ir al carrito
          </button>
        </div>
      </div>
    )
  }

  return (
    <section
      className={`py-12 px-4 sm:px-8 lg:px-16 min-h-screen transition-colors ${
        isLightMode
          ? 'bg-white text-gray-800'
          : 'bg-[#f7e6e2] text-black'
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
              key={prod.cartIndex}
              className={`shadow-lg rounded-lg p-6 transition-colors ${cardBg}`}
            >
              <h2 className="mb-4 text-xl font-semibold">
                {prod.name} - Producto #{prod.cartIndex + 1}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Talla</label>
                  <select
                    className={`${inputBase} p-2 w-full ${inputClasses}`}
                    value={formData[`size-${prod.cartIndex}`] || 'XS'}
                    onChange={(e) =>
                      handleInputChange(e, `size-${prod.cartIndex}`)
                    }
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Color</label>
                  <select
                    className={`${inputBase} p-2 w-full ${inputClasses}`}
                    value={formData[`color-${prod.cartIndex}`] || 'Blanco'}
                    onChange={(e) =>
                      handleInputChange(e, `color-${prod.cartIndex}`)
                    }
                  >
                    {[
                      'Blanco', 'Negro', 'Rojo', 'Amarillo', 'Verde',
                      'Azul', 'Rosado', 'Fucsia', 'Celeste', 'Beige', 'Café'
                    ].map((c) => (
                      <option key={c} value={c}>{c}</option>
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
                  className={`${inputBase} p-4 w-full ${inputClasses}`}
                  value={formData[`medidas-${prod.cartIndex}`] || ''}
                  onChange={(e) =>
                    handleInputChange(e, `medidas-${prod.cartIndex}`)
                  }
                />
                <span className="block text-right text-sm text-gray-500">
                  {(formData[`medidas-${prod.cartIndex}`]?.length || 0)}/100
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
                  className={getInputClasses('nombre')}
                  value={formData.nombre || ''}
                  onChange={(e) => handleInputChange(e, 'nombre')}
                  onBlur={(e) => handleInputBlur('nombre', e.target.value)}
                />
                <ErrorMessage fieldName="nombre" />
              </div>
              
              <div>
                <label className="block font-medium mb-1">
                  Correo electrónico 
                </label>
                <input
                  type="email"
                  maxLength={50}
                  placeholder="Tu correo electrónico"
                  className={getInputClasses('correo')}
                  value={formData.correo || ''}
                  onChange={(e) => handleInputChange(e, 'correo')}
                  onBlur={(e) => handleInputBlur('correo', e.target.value)}
                />
                <ErrorMessage fieldName="correo" />
              </div>
              
              <div>
                <label className="block font-medium mb-1">
                  Número de teléfono 
                </label>
                <input
                  type="text"
                  maxLength={8}
                  placeholder="Tu teléfono (8 dígitos)"
                  className={getInputClasses('telefono')}
                  value={formData.telefono || ''}
                  onChange={(e) => handleInputChange(e, 'telefono')}
                  onBlur={(e) => handleInputBlur('telefono', e.target.value)}
                />
                <ErrorMessage fieldName="telefono" />
              </div>
              
              <div>
                <label className="block font-medium mb-1">
                  Provincia 
                </label>
                <select
                  className={getSelectClasses('provincia')}
                  value={formData.provincia || ''}
                  onChange={(e) => handleInputChange(e, 'provincia')}
                  onBlur={(e) => handleInputBlur('provincia', e.target.value)}
                >
                  <option value="">Selecciona provincia</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ErrorMessage fieldName="provincia" />
              </div>
              
              <div>
                <label className="block font-medium mb-1">
                  Cantón 
                </label>
                <select
                  disabled={!formData.provincia}
                  className={`${getSelectClasses('canton')} ${
                    !formData.provincia
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  value={formData.canton || ''}
                  onChange={(e) => handleInputChange(e, 'canton')}
                  onBlur={(e) => handleInputBlur('canton', e.target.value)}
                >
                  <option value="">Selecciona cantón</option>
                  {cantones.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ErrorMessage fieldName="canton" />
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
              className={getSelectClasses('entrega')}
              value={formData.entrega || ''}
              onChange={(e) => handleInputChange(e, 'entrega')}
              onBlur={(e) => handleInputBlur('entrega', e.target.value)}
            >
              <option value="">Selecciona método</option>
              <option value="Envío por correo">Envío por correo</option>
              <option value="Entrega en Santa Cruz">Entrega en Santa Cruz</option>
              <option value="Entrega en Liberia">Entrega en Liberia</option>
              <option value="Entrega en Junquillal">Entrega en Junquillal</option>
            </select>
            <ErrorMessage fieldName="entrega" />
          </div>
        </div>
      )}

      {/* Resumen del pedido */}
      <div className={`mt-6 p-4 rounded-lg ${cardBg}`}>
        <h3 className="text-lg font-semibold mb-2">Resumen del pedido</h3>
        <p>Total de productos: {cart.length}</p>
        <p className="text-xl font-bold text-pink-500">
          Total: ₡{totalAmount.toLocaleString()}
        </p>
      </div>

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