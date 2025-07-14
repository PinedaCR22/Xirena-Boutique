// src/pages/checkout.tsx
import { FiCreditCard } from 'react-icons/fi'
import { useCart, useCheckoutForm } from '../sections/chekouts/hooks'
import Steps from '../sections/chekouts/steps'
import OrderSummary from '../sections/chekouts/ordersummary'

export default function CheckoutPage() {
  const { expandedCart, totalAmount, halfAmount } = useCart()
  const {
    step,
    formData,
    getInputClasses,
    getSelectClasses,
    handleInputChange,
    handleInputBlur,
    ErrorMessage,
    nextStep,
    prevStep,
    proceedToPayment,
    openPaymentModal
  } = useCheckoutForm(totalAmount, expandedCart)

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16 min-h-screen transition-colors">
      <h1 className="flex items-center mb-6 text-3xl font-bold">
        <FiCreditCard className="mr-2 text-pink-500" />
        Formulario de Compra
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Steps
            step={step}
            cart={expandedCart}
            formData={formData}
            getInputClasses={getInputClasses}
            getSelectClasses={getSelectClasses}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            ErrorMessage={ErrorMessage}
          />
        </div>
        <div>
          <OrderSummary
            step={step}
            totalAmount={totalAmount}
            halfAmount={halfAmount}
            prevStep={prevStep}
            nextStep={nextStep}
            proceedToPayment={proceedToPayment}
            openPaymentModal={openPaymentModal}
          />
        </div>
      </div>
    </section>
  )
}
