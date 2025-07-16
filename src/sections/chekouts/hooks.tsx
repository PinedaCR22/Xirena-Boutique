import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'
import { useFormValidation, type FieldConfig } from '../../hooks/useFormValidation'
import type { FeatureProduct } from '../../data/datafeatures'
import { validationConfig } from '../../data/checkoutConfig'
import emailjs from '@emailjs/browser'
import imageCompression from 'browser-image-compression'
import { useReceiptGenerator } from '../../data/useReceiptGenerator'

export interface ExtendedProduct extends FeatureProduct {
  cartIndex: number
}

export interface UseCartResult {
  expandedCart: ExtendedProduct[]
  totalAmount: number
  halfAmount: number
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

export interface UseCheckoutFormResult {
  step: number
  formData: Record<string, any>
  paymentFile: File | null
  fileError: string
  isUploading: boolean
  uploadProgress: number
  isPaymentOpen: boolean
  isSending: boolean
  isProcessingPayment: boolean
  openPayment: () => void
  closePayment: () => void
  confirmPayment: () => void
  removeFile: () => void
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
  clearErrors: () => void
}

export function useCheckoutForm(
  halfAmount: number,
  cart: ExtendedProduct[]
): UseCheckoutFormResult {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()
  const { generatePDF } = useReceiptGenerator()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)

  const [isPaymentOpen, setPaymentOpen] = useState(false)
  const openPayment = () => setPaymentOpen(true)
  const closePayment = () => setPaymentOpen(false)

  const removeFile = useCallback(() => {
    setPaymentFile(null)
    setFileError('')
  }, [])

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

  useEffect(() => {
    if (Object.keys(formData).length) {
      localStorage.setItem('checkoutData', JSON.stringify({ formData, step }))
    }
  }, [formData, step])

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

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setFileError('Solo se permiten archivos de imagen')
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

  const sendEmail = async () => {
    if (!paymentFile) return

    setIsSending(true)
    let base64 = ''
    try {
      const compressedFile = await imageCompression(paymentFile, {
        maxSizeMB: 0.04,
        maxWidthOrHeight: 720,
        useWebWorker: true
      })

      base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(compressedFile)
      })

      if (base64.length > 90000) {
        console.warn('Base64 demasiado grande, no se enviará la imagen.')
        base64 = ''
      }

    } catch (error) {
      console.error('Error al comprimir o convertir imagen:', error)
      base64 = ''
    }

    const productos = cart.map(item => {
      const talla = formData[`size-${item.cartIndex}`]
      const color = formData[`color-${item.cartIndex}`]
      const medidas = formData[`medidas-${item.cartIndex}`]
      return `• ${item.name}\n  Talla: ${talla}, Color: ${color}, Medidas: ${medidas}, Precio: ₡${item.price.toLocaleString()}`
    }).join('\n\n')

    const templateParams = {
      nombre: formData.nombre,
      correo: formData.correo,
      telefono: formData.telefono,
      provincia: formData.provincia,
      canton: formData.canton,
      entrega: formData.entrega,
      productos,
      monto: halfAmount.toLocaleString(),
      fecha: new Date().toLocaleString('es-CR'),
      comprobante: base64 || 'No disponible (excedía el tamaño permitido)'
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('Correo enviado correctamente')
    } catch (err) {
      console.error('Error al enviar el correo:', err)
    } finally {
      setIsSending(false)
    }
  }

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
        const required = ['nombre', 'correo', 'telefono', 'provincia', 'canton', 'entrega']
        required.forEach(f => {
          setFieldTouched(f)
          validateSingleField(f, formData[f] || '')
        })
      }
      return ok
    }
    return true
  }

  const nextStep = () => { if (canProceed()) setStep(s => s + 1) }
  const prevStep = () => setStep(s => s - 1)
  const proceedToPayment = () => { if (step === 2 && canProceed()) setStep(3) }

  const confirmPayment = async () => {
    if (!paymentFile) {
      setFileError('Debes subir el comprobante de pago')
      return
    }
    
    setIsProcessingPayment(true)
    closePayment()
    
    try {
      await sendEmail()

      showModal({
        type: 'success',
        title: '¡Pago Exitoso!',
        message: 'Gracias por tu compra, te contactaremos pronto.',
        action: () => {
          localStorage.removeItem('cart')
          localStorage.removeItem('checkoutData')
          window.dispatchEvent(new Event('cartUpdated'))
          clearErrors()
          hideModal('toast')
          navigate('/')
        },
        secondaryLabel: 'Generar comprobante',
        secondaryAction: () => {
          generatePDF({
            nombre: formData.nombre,
            correo: formData.correo,
            telefono: formData.telefono,
            provincia: formData.provincia,
            canton: formData.canton,
            entrega: formData.entrega,
            productos: cart,
            monto: halfAmount,
            fecha: new Date().toLocaleString('es-CR'),
            formData
          })
        }
      })
    } catch (error) {
      console.error('Error en el procesamiento:', error)
      // Opcional: mostrar modal de error
    } finally {
      setIsProcessingPayment(false)
    }
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
    isSending,
    isProcessingPayment,
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