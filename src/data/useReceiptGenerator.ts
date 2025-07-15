/*import { useReceiptGenerator } from '../hooks/useReceiptGenerator'

// Dentro del hook:
const { generatePDF } = useReceiptGenerator()

// En la parte donde llamas showModal:
showModal({
  type: 'success',
  title: '¡Pago Exitoso!',
  message: 'Gracias por tu compra, te contactaremos pronto.',
  action: () => {
    // ...
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
*/