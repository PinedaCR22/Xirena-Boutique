// src/sections/chekouts/hooks.tsx
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'
import { useFormValidation, type FieldConfig } from '../../hooks/useFormValidation'
import type { FeatureProduct } from '../../data/datafeatures'
import { validationConfig } from '../../data/checkoutConfig'
import { FiCheckCircle } from 'react-icons/fi'

// ----------------------------------------
// Tipos
// ----------------------------------------
export interface ExtendedProduct extends FeatureProduct {
  cartIndex: number
}

export interface UseCartResult {
  expandedCart: ExtendedProduct[]
  totalAmount: number
  halfAmount: number
}

export interface UseCheckoutFormResult {
  step: number
  formData: Record<string, any>
  paymentFile: File | null
  fileError: string
  getInputClasses: (field: string) => string
  getSelectClasses: (field: string) => string
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    name: string
  ) => void
  handleInputBlur: (field: string, value: string) => void
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  ErrorMessage: React.FC<{ fieldName: string }>
  nextStep: () => void
  prevStep: () => void
  proceedToPayment: () => void
  openPaymentModal: () => void
  clearErrors: () => void
}

// ----------------------------------------
// useCart
// ----------------------------------------
export function useCart(): UseCartResult {
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

// ----------------------------------------
// useCheckoutForm
// ----------------------------------------
export function useCheckoutForm(
  totalAmount: number,
  cart: ExtendedProduct[]
): UseCheckoutFormResult {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  // Inicializar tallas/colores
  useEffect(() => {
    setFormData(prev => {
      const initial: Record<string, any> = {}
      cart.forEach(item => {
        const sizeKey = `size-${item.cartIndex}`
        const colorKey = `color-${item.cartIndex}`
        if (!(sizeKey in prev)) initial[sizeKey] = 'XS'
        if (!(colorKey in prev)) initial[colorKey] = 'Blanco'
      })
      return Object.keys(initial).length ? { ...prev, ...initial } : prev
    })
  }, [cart])

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

  // Persistir cambios
  useEffect(() => {
    if (Object.keys(formData).length) {
      localStorage.setItem('checkoutData', JSON.stringify({ formData, step }))
    }
  }, [formData, step])

  // Configuración de validación (paso 1 y 2)
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

  const getInputClasses = (f: string) => {
    const base = `transition-colors rounded-lg p-4 w-full`
    return hasFieldError(f)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border border-gray-300 bg-white text-gray-800`
  }
  const getSelectClasses = (f: string) => {
    const base = `transition-colors rounded-lg p-2 w-full`
    return hasFieldError(f)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border border-gray-300 bg-white text-gray-800`
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  // Helper para renderizar siempre la versión actual del modal
  const renderPaymentModal = useCallback(() => ({
    type: 'info' as const,
    title: 'Pago por Sinpe Móvil',
    content: (
      <div className="space-y-4 text-center">
        <img src="/images/sinpe.png" alt="Sinpe Móvil" className="mx-auto h-16" />
        <p>Depositar el 50% del monto total a:</p>
        <p className="font-semibold">Número: 8888-8888</p>
        <p className="font-semibold">
          Monto a depositar: ₡{Math.floor(totalAmount / 2).toLocaleString()}
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

          {/* Barra de progreso */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded mt-2 h-2 overflow-hidden">
              <div className="h-2 bg-pink-500" style={{ width: `${uploadProgress}%` }} />
            </div>
          )}

          {/* Nombre de archivo */}
          {paymentFile && !isUploading && (
            <p className="mt-2 text-sm text-gray-700">
              Archivo seleccionado: <strong>{paymentFile.name}</strong>
            </p>
          )}
        </label>

        {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => hideModal()}
            className="px-6 py-2 bg-gray-200 rounded"
          >
            Regresar
          </button>
          <button
            onClick={() => {
              if (!paymentFile) {
                setFileError('Debes subir el comprobante de pago')
                // re-render modal
                showModal(renderPaymentModal())
                return
              }
              hideModal()
              showModal({
                type: 'success' as const,
                title: '¡Pago Exitoso!',
                content: (
                  <div className="space-y-4 text-center">
                    <FiCheckCircle className="mx-auto text-4xl text-green-500" />
                    <p className="text-lg font-medium">
                      ¡Tu pago se ha procesado correctamente!
                    </p>
                    <p className="text-sm text-gray-600">Te contactaremos pronto.</p>
                    <button
                      onClick={() => {
                        hideModal()
                        // Vaciar carrito + notificar navbar
                        localStorage.removeItem('cart')
                        window.dispatchEvent(new Event('cartUpdated'))
                        clearErrors()
                        navigate('/')
                      }}
                      className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                    >
                      Cerrar
                    </button>
                  </div>
                )
              })
            }}
            disabled={!paymentFile}
            className={`px-6 py-2 rounded ${
              paymentFile
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirmar pago
          </button>
        </div>
      </div>
    )
  }), [
    totalAmount,
    handleFileUpload,
    isUploading,
    uploadProgress,
    paymentFile,
    fileError,
    hideModal,
    clearErrors,
    navigate
  ])

  // Subida con FileReader y re-showModal para actualizar progreso
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setFileError('')
    setUploadProgress(0)
    // primer showModal para iniciar barra
    showModal(renderPaymentModal())

    const reader = new FileReader()
    reader.onprogress = event => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        setUploadProgress(percent)
        showModal(renderPaymentModal())
      }
    }
    reader.onloadend = () => {
      setPaymentFile(file)
      setIsUploading(false)
      setUploadProgress(100)
      showModal(renderPaymentModal())
    }
    reader.readAsDataURL(file)
  }

  // Validación paso a paso (opción 2)
  const canProceed = () => {
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
      return valid
    }
    if (step === 2) {
      const ok = validateAllFields(formData)
      if (!ok) {
        const required = ['nombre','correo','telefono','provincia','canton','entrega']
        required.forEach(f => {
          setFieldTouched(f)
          validateSingleField(f, formData[f] || '')
        })
      }
      return ok
    }
    return true
  }

  const nextStep = () => { if (canProceed()) setStep(s => s+1) }
  const prevStep = () => setStep(s => s-1)
  const proceedToPayment = () => { if (step===2 && canProceed()) setStep(3) }
  const openPaymentModal = () => { if (step===3) showModal(renderPaymentModal()) }

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
    proceedToPayment,
    openPaymentModal,
    clearErrors
  }
}
