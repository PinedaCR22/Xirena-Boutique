import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface OrderSummaryProps {
  step: number
  totalAmount: number
  halfAmount: number
  prevStep: () => void
  nextStep: () => void
}

export default function OrderSummary({
  step,
  totalAmount,
  halfAmount,
  prevStep,
  nextStep
}: OrderSummaryProps) {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()
  const [paymentFile, setPaymentFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPaymentFile(file)
  }

  const openSinpeModal = () => {
    showModal({
      type: 'info',
      title: 'Pago por Sinpe Móvil',
      content: (
        <div className="space-y-4 text-center">
          <img src="/images/sinpe.png" alt="Sinpe Móvil" className="mx-auto h-16" />
          <p>Depositar el 50% del monto total a:</p>
          <p className="font-semibold">Número: 8504-2171</p>
          <p className="font-semibold">Monto a depositar: ₡{halfAmount.toLocaleString()}</p>
          <label className="block border-2 border-dashed rounded p-6 cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <span className="text-sm text-gray-500">Haz clic para subir comprobante</span>
          </label>
          {paymentFile && (<p className="text-sm text-gray-600">Archivo: {paymentFile.name}</p>)}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => hideModal()}
              className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Regresar
            </button>
            <button
              onClick={() => {
                if (!paymentFile) {
                  console.log('Debes agregar una imagen')
                  return
                }
                hideModal()
                showModal({
                  type: 'info',
                  title: 'Pedido en proceso',
                  content: (
                    <div className="space-y-4 text-center">
                      <p className="text-lg font-medium">Tu pedido está en proceso</p>
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
    <div className="border rounded-lg p-6 shadow-md flex flex-col space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Resumen de compra</h2>
        <p className="text-sm text-gray-500 mb-4">
          Explora tu estilo con Xirena Boutique. Elegancia, comodidad y moda en un solo lugar.
        </p>
        <p className="text-2xl font-bold text-pink-600">
          Total: ₡{totalAmount.toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col space-y-3">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="w-full px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            <FiArrowLeft className="inline mr-2" /> Anterior
          </button>
        )}
        {step < 2 && (
          <button
            onClick={nextStep}
            className="w-full px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Siguiente <FiArrowRight className="inline ml-2" />
          </button>
        )}
        {step === 2 && (
          <button
            onClick={openSinpeModal}
            className="w-full px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Realizar pago
          </button>
        )}
      </div>
    </div>
  )
}
