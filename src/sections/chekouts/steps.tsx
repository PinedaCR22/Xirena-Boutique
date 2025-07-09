import React from 'react'
import type { FeatureProduct } from '../../data/datafeatures'

export interface ExtendedProduct extends FeatureProduct {
  cartIndex: number
}

interface StepsProps {
  step: number
  cart: ExtendedProduct[]
  formData: Record<string, any>
  getInputClasses: (field: string) => string
  getSelectClasses: (field: string) => string
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => void
  handleInputBlur: (field: string, value: string) => void
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  ErrorMessage: React.FC<{ fieldName: string }>
}

export default function Steps({
  step,
  cart,
  formData,
  getInputClasses,
  getSelectClasses,
  handleInputChange,
  handleInputBlur,
  ErrorMessage
}: StepsProps) {
  if (step === 1) {
    return (
      <div className="space-y-6">
        {cart.map((prod) => (
          <div key={prod.cartIndex} className="shadow-lg rounded-lg p-6 transition-colors">
            <h2 className="mb-4 text-xl font-semibold">
              {prod.name} - Producto #{prod.cartIndex + 1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Talla</label>
                <select
                  className={getSelectClasses(`size-${prod.cartIndex}`)}
                  value={formData[`size-${prod.cartIndex}`] || 'XS'}
                  onChange={(e) => handleInputChange(e, `size-${prod.cartIndex}`)}
                >
                  {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Color</label>
                <select
                  className={getSelectClasses(`color-${prod.cartIndex}`)}
                  value={formData[`color-${prod.cartIndex}`] || 'Blanco'}
                  onChange={(e) => handleInputChange(e, `color-${prod.cartIndex}`)}
                >
                  {[
                    'Blanco', 'Negro', 'Rojo', 'Amarillo', 'Verde',
                    'Azul', 'Rosado', 'Fucsia', 'Celeste', 'Beige', 'Café'
                  ].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1">Toma de medidas</label>
              <textarea
                maxLength={100}
                placeholder="Ej: cintura, largo, etc."
                className={getInputClasses(`medidas-${prod.cartIndex}`)}
                value={formData[`medidas-${prod.cartIndex}`] || ''}
                onChange={(e) => handleInputChange(e, `medidas-${prod.cartIndex}`)}
              />
              <span className="block text-right text-sm text-gray-500">
                {(formData[`medidas-${prod.cartIndex}`]?.length || 0)}/100
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // step === 2
  return (
    <div className="space-y-6 mt-6">
      <div className="shadow-lg rounded-lg p-6 transition-colors">
        <h2 className="mb-4 text-xl font-semibold">Datos de la persona</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              maxLength={30}
              placeholder="Tu nombre completo"
              className={getInputClasses('nombre')}
              value={formData.nombre || ''}
              onChange={(e) => handleInputChange(e, 'nombre')}
              onBlur={(e) => handleInputBlur('nombre', e.target.value)}
            />
            <ErrorMessage fieldName="nombre" />
          </div>
          <div>
            <label className="block font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              maxLength={50}
              placeholder="Tu correo electrónico"
              className={getInputClasses('correo')}
              value={formData.correo || ''}
              onChange={(e) => handleInputChange(e, 'correo')}
              onBlur={(e) => handleInputBlur('correo', e.target.value)}
            />
            <ErrorMessage fieldName="correo" />
          </div>
          <div>
            <label className="block font-medium mb-1">Número de teléfono</label>
            <input
              type="text"
              maxLength={8}
              placeholder="Tu teléfono (8 dígitos)"
              className={getInputClasses('telefono')}
              value={formData.telefono || ''}
              onChange={(e) => handleInputChange(e, 'telefono')}
              onBlur={(e) => handleInputBlur('telefono', e.target.value)}
            />
            <ErrorMessage fieldName="telefono" />
          </div>
          <div>
            <label className="block font-medium mb-1">Provincia</label>
            <select
              className={getSelectClasses('provincia')}
              value={formData.provincia || ''}
              onChange={(e) => handleInputChange(e, 'provincia')}
              onBlur={(e) => handleInputBlur('provincia', e.target.value)}
            >
              <option value="">Selecciona provincia</option>
            </select>
            <ErrorMessage fieldName="provincia" />
          </div>
          <div>
            <label className="block font-medium mb-1">Cantón</label>
            <select
              disabled={!formData.provincia}
              className={`${getSelectClasses('canton')} ${!formData.provincia ? 'opacity-50 cursor-not-allowed' : ''}`}
              value={formData.canton || ''}
              onChange={(e) => handleInputChange(e, 'canton')}
              onBlur={(e) => handleInputBlur('canton', e.target.value)}
            >
              <option value="">Selecciona cantón</option>
            </select>
            <ErrorMessage fieldName="canton" />
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-lg p-6 transition-colors">
        <h2 className="mb-4 text-xl font-semibold">Método de Entrega</h2>
        <select
          className={getSelectClasses('entrega')}
          value={formData.entrega || ''}
          onChange={(e) => handleInputChange(e, 'entrega')}
          onBlur={(e) => handleInputBlur('entrega', e.target.value)}
        >
          <option value="">Selecciona método</option>
        </select>
        <ErrorMessage fieldName="entrega" />
      </div>
    </div>
  )
}
