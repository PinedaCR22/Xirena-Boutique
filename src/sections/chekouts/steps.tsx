// src/sections/chekouts/steps.tsx
import React from 'react'
import type { FeatureProduct } from '../../data/datafeatures'
import { provinces, cantonesData } from '../../data/checkoutConfig'

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

// Métodos de entrega disponibles
const deliveryMethods: string[] = [
  'Envío por Correos de Costa Rica',
  'Entrega en Liberia',
  'Entrega en Santa Cruz',
  'Entrega en Junquillal',
]

export default function Steps({
  step,
  cart,
  formData,
  getInputClasses,
  getSelectClasses,
  handleInputChange,
  handleInputBlur,
  handleFileUpload,
  ErrorMessage
}: StepsProps) {
  // Paso 1: selección de talla, color y medidas
  if (step === 1) {
    return (
      <div className="space-y-6">
        {cart.map(prod => (
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
                  onChange={e => handleInputChange(e, `size-${prod.cartIndex}`)}
                >
                  {['XS','S','M','L','XL'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Color</label>
                <select
                  className={getSelectClasses(`color-${prod.cartIndex}`)}
                  value={formData[`color-${prod.cartIndex}`] || 'Blanco'}
                  onChange={e => handleInputChange(e, `color-${prod.cartIndex}`)}
                >
                  {[
                    'Blanco','Negro','Rojo','Amarillo','Verde',
                    'Azul','Rosado','Fucsia','Celeste','Beige','Café'
                  ].map(c => (
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
                onChange={e => handleInputChange(e, `medidas-${prod.cartIndex}`)}
                onBlur={e => handleInputBlur(`medidas-${prod.cartIndex}`, e.target.value)}
              />
              <span className="block text-right text-sm text-gray-500">
                {(formData[`medidas-${prod.cartIndex}`]?.length || 0)}/100
              </span>
              <ErrorMessage fieldName={`medidas-${prod.cartIndex}`} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Paso 2: datos personales y método de entrega
  if (step === 2) {
    return (
      <div className="space-y-6 mt-6">
        <div className="shadow-lg rounded-lg p-6 transition-colors">
          <h2 className="mb-4 text-xl font-semibold">Datos de la persona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre completo */}
            <div>
              <label className="block font-medium mb-1">Nombre completo</label>
              <input
                type="text"
                maxLength={30}
                placeholder="Tu nombre completo"
                className={getInputClasses('nombre')}
                value={formData.nombre || ''}
                onChange={e => handleInputChange(e, 'nombre')}
                onBlur={e => handleInputBlur('nombre', e.target.value)}
              />
              <ErrorMessage fieldName="nombre" />
            </div>

            {/* Correo electrónico */}
            <div>
              <label className="block font-medium mb-1">Correo electrónico</label>
              <input
                type="email"
                maxLength={50}
                placeholder="Tu correo electrónico"
                className={getInputClasses('correo')}
                value={formData.correo || ''}
                onChange={e => handleInputChange(e, 'correo')}
                onBlur={e => handleInputBlur('correo', e.target.value)}
              />
              <ErrorMessage fieldName="correo" />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block font-medium mb-1">Número de teléfono</label>
              <input
                type="text"
                maxLength={8}
                placeholder="Tu teléfono (8 dígitos)"
                className={getInputClasses('telefono')}
                value={formData.telefono || ''}
                onChange={e => handleInputChange(e, 'telefono')}
                onBlur={e => handleInputBlur('telefono', e.target.value)}
              />
              <ErrorMessage fieldName="telefono" />
            </div>

            {/* Provincia */}
            <div>
              <label className="block font-medium mb-1">Provincia</label>
              <select
                className={getSelectClasses('provincia')}
                value={formData.provincia || ''}
                onChange={e => handleInputChange(e, 'provincia')}
                onBlur={e => handleInputBlur('provincia', e.target.value)}
              >
                <option value="" disabled hidden>Selecciona provincia</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ErrorMessage fieldName="provincia" />
            </div>

            {/* Cantón */}
            <div>
              <label className="block font-medium mb-1">Cantón</label>
              <select
                disabled={!formData.provincia}
                className={`${getSelectClasses('canton')} ${!formData.provincia ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={formData.canton || ''}
                onChange={e => handleInputChange(e, 'canton')}
                onBlur={e => handleInputBlur('canton', e.target.value)}
              >
                <option value="" disabled hidden>Selecciona cantón</option>
                {formData.provincia && cantonesData[formData.provincia]?.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
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
            onChange={e => handleInputChange(e, 'entrega')}
            onBlur={e => handleInputBlur('entrega', e.target.value)}
          >
            <option value="" disabled hidden>Selecciona método</option>
            {deliveryMethods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ErrorMessage fieldName="entrega" />
        </div>
      </div>
    )
  }

  // Paso 3: subir comprobante de pago
  if (step === 3) {
    return (
      <div className="space-y-6 mt-6">
        <h2 className="text-xl font-semibold">Paso 3: Subir comprobante de pago</h2>
        <label className="block border-2 border-dashed rounded p-6 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <span className="text-sm text-gray-500">
            Haz clic para subir tu comprobante de pago
          </span>
        </label>
        <ErrorMessage fieldName="paymentFile" />
      </div>
    )
  }

  return null
}
