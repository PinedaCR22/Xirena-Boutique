import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'
import { useFormValidation, type FieldConfig } from '../../hooks/useFormValidation'
import type { FeatureProduct } from '../../data/datafeatures'
import { validationConfig } from '../../data/checkoutConfig'

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
  isUploading: boolean
  uploadProgress: number
  isPaymentOpen: boolean
  openPayment: () => void
  closePayment: () => void
  confirmPayment: () => void
  removeFile: () => void // Nuevo handler para eliminar archivo
  getInputClasses: (field: string) => string
  getSelectClasses: (field: string) => string
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => void
  handleInputBlur: (field: string, value: string) => void
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  ErrorMessage: React.FC<{ fieldName: string }>
  nextStep: () => void
  prevStep: () => void
  proceedToPayment: () => void
  clearErrors: () => void
}

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

// Prefix totalAmount with underscore para evitar warning de variable no usada
export function useCheckoutForm(
  _totalAmount: number,
  cart: ExtendedProduct[]
): UseCheckoutFormResult {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  // Control del modal de pago separado
  const [isPaymentOpen, setPaymentOpen] = useState(false)
  const openPayment = () => setPaymentOpen(true)
  const closePayment = () => setPaymentOpen(false)

  // Handler para eliminar el comprobante cargado
  const removeFile = useCallback(() => {
    setPaymentFile(null)
    setFileError('')
  }, [])

  // Inicializar tallas y colores
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

  // Configuración de validación
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

  // Clases dinámicas
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

  // Handlers de formulario
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

  // Subida de archivo
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setFileError('Solo se permiten archivos de imagen')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('El archivo debe ser menor a 5MB')
      return
    }
    setIsUploading(true)
    setFileError('')
    setUploadProgress(0)
    const reader = new FileReader()
    reader.onloadstart = () => setUploadProgress(0)
    reader.onprogress = event => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100))
      }
    }
    reader.onload = () => {
      setUploadProgress(100)
      setPaymentFile(file)
      setIsUploading(false)
    }
    reader.onerror = () => {
      setFileError('Error al cargar el archivo')
      setIsUploading(false)
      setUploadProgress(0)
    }
    reader.readAsDataURL(file)
  }, [])

  // Validación de pasos
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

  // Confirmar pago: cierra modal y muestra toast
  const confirmPayment = () => {
    if (!paymentFile) {
      setFileError('Debes subir el comprobante de pago')
      return
    }
    closePayment()
    showModal({
      type: 'success',
      title: '¡Pago Exitoso!',
      action: () => {
        hideModal()
        localStorage.removeItem('cart')
        localStorage.removeItem('checkoutData')
        window.dispatchEvent(new Event('cartUpdated'))
        clearErrors()
        navigate('/')
      }
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
    isUploading,
    uploadProgress,
    isPaymentOpen,
    openPayment,
    closePayment,
    confirmPayment,
    removeFile,
    getInputClasses,
    getSelectClasses,
    handleInputChange,
    handleInputBlur,
    handleFileUpload,
    ErrorMessage,
    nextStep,
    prevStep,
    proceedToPayment,
    clearErrors
  }
}
