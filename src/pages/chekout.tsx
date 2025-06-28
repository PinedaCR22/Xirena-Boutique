import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import { useTheme } from '../context/ThemeContext'
import type { FeatureProduct } from '../data/datafeatures'

export default function Checkout() {
  const { isLightMode } = useTheme()
  const { showModal, hideModal } = useModal()
  const navigate = useNavigate()

  const cart: FeatureProduct[] = JSON.parse(localStorage.getItem('cart') || '[]')

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [paymentFile, setPaymentFile] = useState<File | null>(null)

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0)
  const halfAmount = Math.floor(totalAmount / 2)

  const handleInputChange = (e: any, name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: e.target.value }))
  }

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    setPaymentFile(file)
    setFormData((prev: any) => ({ ...prev, comprobante: file }))
  }

  const finalizeOrder = () => {
    showModal({
      type: 'info',
      title: 'Pedido en Progreso',
      content: (
        <div>
          <p>
            ¡Gracias por tu compra! Tu pedido está siendo procesado.
          </p>
          <button
            onClick={() => {
              hideModal('info')
              navigate('/')
            }}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Aceptar
          </button>
        </div>
      )
    })
  }

  return (
    <section
      className={`transition-colors duration-300 py-12 px-4 sm:px-8 lg:px-16 min-h-screen ${
        isLightMode ? 'bg-white text-gray-800' : 'bg-gray-900 text-gray-200'
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Formulario de Compra</h1>

      {step === 1 && (
        <div className="space-y-6">
          {cart.map((prod) => (
            <div key={prod.id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold mb-2">{prod.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Talla</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={formData[`size-${prod.id}`] || 'XS'}
                    onChange={(e) => handleInputChange(e, `size-${prod.id}`)}
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <option key={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium">Color</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={formData[`color-${prod.id}`] || 'Blanco'}
                    onChange={(e) => handleInputChange(e, `color-${prod.id}`)}
                  >
                    {["Blanco", "Negro", "Rojo", "Amarillo", "Verde", "Azul", "Rosado", "Fucsia", "Celeste", "Beige", "Café"].map((color) => (
                      <option key={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="block font-medium mt-4">Toma de medidas</label>
              <input
                type="text"
                placeholder="Ej: cintura, largo, etc."
                className="w-full border p-2 rounded"
                value={formData[`medidas-${prod.id}`] || ''}
                onChange={(e) => handleInputChange(e, `medidas-${prod.id}`)}
              />
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 mt-6">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">Datos de la persona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Nombre completo" value={formData.nombre || ''} onChange={(e) => handleInputChange(e, 'nombre')} />
              <input className="border p-2 rounded" placeholder="Correo electrónico" value={formData.correo || ''} onChange={(e) => handleInputChange(e, 'correo')} />
              <input className="border p-2 rounded" placeholder="Número de teléfono" value={formData.telefono || ''} onChange={(e) => handleInputChange(e, 'telefono')} />
              <input className="border p-2 rounded" placeholder="Provincia y cantón" value={formData.ubicacion || ''} onChange={(e) => handleInputChange(e, 'ubicacion')} />
            </div>
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-semibold mb-2">Método de Entrega</h2>
            <select className="w-full border p-2 rounded" value={formData.entrega || ''} onChange={(e) => handleInputChange(e, 'entrega')}>
              <option>Envío por correo</option>
              <option>Entrega en Santa Cruz</option>
              <option>Entrega en Liberia</option>
              <option>Entrega en Junquillal</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded"
          >
            Anterior
          </button>
        )}
        {step < 2 && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Siguiente
          </button>
        )}
        {step === 2 && (
          <button
            onClick={() => showModal({
              type: 'info',
              title: 'Pago por Sinpe Móvil',
              content: (
                <div className="space-y-4 text-center">
                  <img src="/images/sinpe.png" alt="Sinpe Móvil" className="mx-auto h-16" />
                  <p>Depositar el 50% del monto total a:</p>
                  <p className="font-semibold">Número: 8888-8888</p>
                  <p className="font-semibold">Monto a depositar: ₡{halfAmount.toLocaleString()}</p>
                  <label className="block border-2 border-dashed rounded p-6 cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                    <span className="text-sm text-gray-500">Haz clic para subir una imagen del comprobante</span>
                  </label>
                  {paymentFile && (
                    <p className="text-sm text-gray-600 mt-2">Archivo seleccionado: {paymentFile.name}</p>
                  )}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => hideModal('info')}
                      className="px-6 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded"
                    >
                      Regresar
                    </button>
                    <button
                      onClick={finalizeOrder}
                      className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                    >
                      Finalizar pedido
                    </button>
                  </div>
                </div>
              )
            })}
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Realizar pago
          </button>
        )}
      </div>
    </section>
  )
}
