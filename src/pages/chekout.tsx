// src/pages/checkout.tsx
import { FiCreditCard } from 'react-icons/fi'
import { useCart, useCheckoutForm } from '../sections/chekouts/hooks'
import Steps from '../sections/chekouts/steps'
import OrderSummary from '../sections/chekouts/ordersummary'
import PaymentModal from '../components/PaymentModal'

export default function CheckoutPage() {
  // Obtenemos carrito y totales mediante useCart
  const { expandedCart, totalAmount, halfAmount } = useCart()

  // Pasamos totales y carrito al hook de checkout
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
    isPaymentOpen,
    openPayment,
    closePayment,
    handleFileUpload,
    paymentFile,
    fileError,
    isUploading,
    uploadProgress,
    confirmPayment,
    removeFile,          // Handler para eliminar la imagen
  } = useCheckoutForm(totalAmount, expandedCart)

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 min-h-screen transition-colors">
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
            openPaymentModal={openPayment}
          />
        </div>
      </div>

      {/* Modal de pago separado */}
      {isPaymentOpen && (
        <PaymentModal
          totalAmount={halfAmount}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          paymentFile={paymentFile}
          fileError={fileError}
          onUpload={handleFileUpload}
          onRemoveFile={removeFile}   // Proporcionamos removeFile aquí
          onCancel={closePayment}
          onConfirm={confirmPayment}
        />
      )}
    </section>
  )
}
