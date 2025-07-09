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
 * Hook para manejar el carrito: carga de localStorage, expansión y cálculos.
 */
export function useCart() {
  const [expandedCart, setExpandedCart] = useState<ExtendedProduct[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      const parsed: (FeatureProduct & { quantity: number })[] = JSON.parse(stored)
      const newCart: ExtendedProduct[] = []
      parsed.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          newCart.push({ ...item, cartIndex: newCart.length })
        }
      })
      setExpandedCart(newCart)
    }
  }, [])

  const totalAmount = expandedCart.reduce((sum, item) => sum + item.price, 0)
  const halfAmount = Math.floor(totalAmount / 2)

  return { expandedCart, totalAmount, halfAmount }
}

/**
 * Hook para manejar el formulario y flujo de checkout.
 */
export function useCheckoutForm(totalAmount: number) {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)

  const {
    validateSingleField,
    validateAllFields,
    setFieldTouched,
    getFieldError,
    hasFieldError,
  } = useFormValidation(validationConfig)

  // Clases dinámicas según estado de error
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

  // Manejadores de inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [name]: value }))

    if (validationConfig[name as keyof FieldConfig]) {
      validateSingleField(name, value)
      const err = getFieldError(name)
      if (err) console.log(`Error en ${name}: ${err}`)
    }

    if (name === 'provincia') {
      setFormData(prev => ({ ...prev, canton: '' }))
      validateSingleField('canton', '')
    }
  }

  const handleInputBlur = (field: string, value: string) => {
    setFieldTouched(field)
    if (validationConfig[field as keyof FieldConfig]) {
      validateSingleField(field, value)
      const err = getFieldError(field)
      if (err) console.log(`Error en ${field}: ${err}`)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPaymentFile(file)
  }

  // Navegación de pasos
  const canProceed = () => {
    if (step === 2) {
      const required = ['nombre','correo','telefono','provincia','canton','entrega']
      const data = Object.fromEntries(required.map(f => [f, formData[f] || '']))
      return validateAllFields(data)
    }
    return true
  }
  const nextStep = () => {
    if (canProceed()) setStep(s => s + 1)
    else {
      ['nombre','correo','telefono','provincia','canton','entrega'].forEach(f => {
        const err = getFieldError(f)
        if (err) console.log(`Error en ${f}: ${err}`)
      })
    }
  }
  const prevStep = () => setStep(s => s - 1)

  // Botón de pagar después del Step 2
  const finalizeOrder = () => {
    showModal({
      type: 'info', title: 'Pago por Sinpe Móvil',
      content: (
        <div className="space-y-4 text-center">
          <img src="/images/sinpe.png" alt="Sinpe Móvil" className="mx-auto h-16" />
          <p>Depositar el 50% del monto total a:</p>
          <p className="font-semibold">Número: 8888-8888</p>
          <p className="font-semibold">Monto a depositar: ₡{Math.floor(totalAmount/2).toLocaleString()}</p>
          <label className="block border-2 border-dashed rounded p-6 cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <span className="text-sm text-gray-500">Haz clic para subir comprobante</span>
          </label>
          {paymentFile && <p className="text-sm text-gray-600">Archivo: {paymentFile.name}</p>}
          <div className="flex justify-center space-x-4 mt-4">
            <button onClick={() => hideModal()} className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">Regresar</button>
            <button onClick={() => {
                if (!paymentFile) { console.log('Debes agregar una imagen'); return }
                hideModal()
                showModal({ type: 'info', title: 'Pedido en proceso', content: (
                  <div className="space-y-4 text-center">
                    <p className="text-lg font-medium">Tu pedido está en proceso</p>
                    <button onClick={() => { hideModal(); localStorage.removeItem('cart'); navigate('/') }} className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Aceptar</button>
                  </div>
                )})
              }} className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >Aceptar</button>
          </div>
        </div>
      )
    })
  }

  /** Mostrar mensaje de error bajo el campo */
  const ErrorMessage: React.FC<{ fieldName: string }> = ({ fieldName }) => {
    const err = getFieldError(fieldName)
    return err ? <span className="text-red-500 text-sm mt-1 block">{err}</span> : null
  }

  return {
    step,
    formData,
    paymentFile,
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
