// src/sections/chekouts/ordersummary.tsx
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface OrderSummaryProps {
  step: number
  totalAmount: number
  halfAmount: number
  prevStep: () => void
  nextStep: () => void
  proceedToPayment: () => void    // Nueva función para ir al paso 3
  openPaymentModal: () => void    // Nueva función para abrir modal
}

export default function OrderSummary({
  step,
  totalAmount,
  prevStep,
  nextStep,
  proceedToPayment,
  openPaymentModal
}: OrderSummaryProps) {
  const navigate = useNavigate()

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
        {/* Si step>1 volvemos con prevStep(), si no, al carrito */}
        <button
          onClick={() => (step > 1 ? prevStep() : navigate('/cart'))}
          className="w-full px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          <FiArrowLeft className="inline mr-2" /> Anterior
        </button>

        {/* Botón principal dependiendo del paso */}
        {step === 1 ? (
          <button
            onClick={nextStep}
            className="w-full px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Siguiente <FiArrowRight className="inline ml-2" />
          </button>
        ) : step === 2 ? (
          <button
            onClick={proceedToPayment}  // Ir al paso 3
            className="w-full px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Continuar al pago <FiArrowRight className="inline ml-2" />
          </button>
        ) : step === 3 ? (
          <button
            onClick={openPaymentModal}  // Abrir modal de pago
            className="w-full px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Realizar pago
          </button>
        ) : null}
      </div>
    </div>
  )
}