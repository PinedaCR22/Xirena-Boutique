// src/sections/chekouts/hooks.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'
import { useFormValidation, type FieldConfig } from '../../hooks/useFormValidation'
import type { FeatureProduct } from '../../data/datafeatures'
import { validationConfig } from '../../data/checkoutConfig'

export interface ExtendedProduct extends FeatureProduct {
  cartIndex: number
}

/**
 * Hook para cargar y expandir el carrito desde localStorage
 */
export function useCart() {
  const [expandedCart, setExpandedCart] = useState<ExtendedProduct[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        const parsed: (FeatureProduct & { quantity: number })[] = JSON.parse(stored)
        const newCart: ExtendedProduct[] = []
        parsed.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            newCart.push({ ...item, cartIndex: newCart.length })
          }
        })
        setExpandedCart(newCart)
      } catch {
        localStorage.removeItem('cart')
      }
    }
  }, [])

  const totalAmount = expandedCart.reduce((sum, item) => sum + item.price, 0)
  const halfAmount = Math.floor(totalAmount / 2)

  return { expandedCart, totalAmount, halfAmount }
}

/**
 * Hook para manejar flujo de checkout: validación, pasos y modal
 */
export function useCheckoutForm(
  totalAmount: number,
  cart: ExtendedProduct[]
) {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')

  // Inicializar campos dinámicos de talla/color
  useEffect(() => {
    const initial: Record<string, any> = {}
    cart.forEach(item => {
      const sizeKey = `size-${item.cartIndex}`
      const colorKey = `color-${item.cartIndex}`
      if (!formData[sizeKey]) initial[sizeKey] = 'XS'
      if (!formData[colorKey]) initial[colorKey] = 'Blanco'
    })
    if (Object.keys(initial).length) setFormData(prev => ({ ...prev, ...initial }))
  }, [cart.length])

  // Cargar progreso guardado
  useEffect(() => {
    const saved = localStorage.getItem('checkoutData')
    if (saved) {
      try {
        const { formData: fData, step: s } = JSON.parse(saved)
        if (fData) setFormData(fData)
        if (typeof s === 'number' && s >= 1 && s <= 3) setStep(s)
      } catch {
        localStorage.removeItem('checkoutData')
      }
    }
  }, [])

  // Persistir formulario y paso
  useEffect(() => {
    if (Object.keys(formData).length) {
      localStorage.setItem('checkoutData', JSON.stringify({ formData, step }))
    }
  }, [formData, step])

  // Configuración de validación en step 1 y 2
  const dynamicConfig: FieldConfig = {}
  cart.forEach(item => {
    dynamicConfig[`medidas-${item.cartIndex}`] = { required: true }
  })
  const mergedConfig = { ...validationConfig, ...dynamicConfig }

  const {
    validateSingleField,
    validateAllFields,
    setFieldTouched,
    getFieldError,
    hasFieldError,
    clearErrors
  } = useFormValidation(mergedConfig)

  const getInputClasses = (field: string) => {
    const base = `transition-colors rounded-lg p-4 w-full`
    return hasFieldError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border border-gray-300 bg-white text-gray-800`
  }

  const getSelectClasses = (field: string) => {
    const base = `transition-colors rounded-lg p-2 w-full`
    return hasFieldError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border border-gray-300 bg-white text-gray-800`
  }

  // Manejadores de cambio
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [name]: value }))
    if (mergedConfig[name]) validateSingleField(name, value)
    if (name === 'provincia') {
      setFormData(prev => ({ ...prev, canton: '' }))
      validateSingleField('canton', '')
    }
  }

  const handleInputBlur = (field: string, value: string) => {
    setFieldTouched(field)
    if (mergedConfig[field]) validateSingleField(field, value)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentFile(file)
      setFileError('')
    }
  }

  // Validación de cada paso
  const canProceed = () => {
    console.log('Validando paso:', step)
    if (step === 1) {
      let valid = true
      cart.forEach(item => {
        const key = `medidas-${item.cartIndex}`
        const v = formData[key] || ''
        if (!v.trim()) {
          setFieldTouched(key)
          validateSingleField(key, v)
          valid = false
        }
      })
      console.log('Paso 1 válido:', valid)
      return valid
    }

    if (step === 2) {
      const required = ['nombre','correo','telefono','provincia','canton','entrega']
      const data = Object.fromEntries(required.map(f => [f, formData[f] || '']))
      const ok = validateAllFields(data)
      if (!ok) {
        required.forEach(f => {
          console.log(f, getFieldError(f))
          setFieldTouched(f)
          validateSingleField(f, data[f])
        })
      }
      console.log('Paso 2 válido:', ok)
      return ok
    }

    return true
  }

  const nextStep = () => {
    if (canProceed()) setStep(s => s + 1)
  }

  const prevStep = () => setStep(s => s - 1)

  /**
   * Lanza el paso 3 y muestra modal de pago
   */
  const finalizeOrder = () => {
    console.log('Iniciando finalización, paso:', step)
    if (step !== 2) return
    if (!canProceed()) return

    // Avanzar al paso 3 antes de abrir modal
    setStep(3)
    setFileError('')

    showModal({
      type: 'info',
      title: 'Pago por Sinpe Móvil',
      content: (
        <div className="space-y-4 text-center">
          <img src="/images/sinpe.png" alt="Sinpe Móvil" className="mx-auto h-16" />
          <p>Depositar el 50% del monto total a:</p>
          <p className="font-semibold">Número: 8888-8888</p>
          <p className="font-semibold">
            Monto a depositar: ₡{Math.floor(totalAmount/2).toLocaleString()}
          </p>
          <label className="block border-2 border-dashed rounded p-6 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="text-sm text-gray-500">
              Haz clic para subir comprobante de pago
            </span>
          </label>
          {fileError && <span className="text-red-500">{fileError}</span>}
          <div className="flex justify-center space-x-4 mt-4">
            <button onClick={() => hideModal()} className="px-6 py-2 bg-gray-200 rounded">
              Regresar
            </button>
            <button
              onClick={() => {
                if (!paymentFile) return setFileError('Debes subir el comprobante de pago')
                hideModal()
                showModal({
                  type: 'info',
                  title: 'Pedido en proceso',
                  content: (
                    <div className="space-y-4 text-center">
                      <p className="text-lg font-medium">Tu pedido está en proceso</p>
                      <p className="text-sm text-gray-600">
                        Recibirás confirmación por correo
                      </p>
                      <button
                        onClick={() => {
                          hideModal()
                          localStorage.removeItem('cart')
                          localStorage.removeItem('checkoutData')
                          clearErrors()
                          navigate('/')
                        }}
                        className="mt-4 px-6 py-2 bg-pink-500 text-white rounded"
                      >Aceptar</button>
                    </div>
                  )
                })
              }}
              className="px-6 py-2 bg-pink-500 text-white rounded"
            >Confirmar pago</button>
          </div>
        </div>
      )
    })
  }

  const ErrorMessage: React.FC<{ fieldName: string }> = ({ fieldName }) => {
    const err = getFieldError(fieldName)
    return err ? <span className="text-red-500 text-sm">{err}</span> : null
  }

  return {
    step,
    formData,
    paymentFile,
    fileError,
    getInputClasses,
    getSelectClasses,
    handleInputChange,
    handleInputBlur,
    handleFileUpload,
    ErrorMessage,
    nextStep,
    prevStep,
    finalizeOrder
  }
}