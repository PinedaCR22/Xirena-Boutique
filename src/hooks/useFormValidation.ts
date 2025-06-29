import { useState, useCallback } from 'react'

export interface ValidationErrors {
  [key: string]: string
}

export interface ValidationRules {
  required?: boolean
  email?: boolean
  onlyLetters?: boolean
  onlyNumbers?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
}

export interface FieldConfig {
  [fieldName: string]: ValidationRules
}

export const useFormValidation = (fieldConfig: FieldConfig) => {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Función para validar un campo específico
  const validateField = useCallback((fieldName: string, value: string): string => {
    const rules = fieldConfig[fieldName]
    if (!rules) return ''

    // Requerido
    if (rules.required && (!value || value.trim() === '')) {
      return 'Este campo es requerido'
    }

    // Si está vacío y no es requerido, no validar más
    if (!value || value.trim() === '') return ''

    // Solo letras (incluyendo espacios, acentos y ñ)
    if (rules.onlyLetters) {
      const letterPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
      if (!letterPattern.test(value)) {
        return 'Solo se permiten letras'
      }
    }

    // Solo números
    if (rules.onlyNumbers) {
      const numberPattern = /^[0-9]+$/
      if (!numberPattern.test(value)) {
        return 'Solo se permiten números'
      }
    }

    // Email
    if (rules.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(value)) {
        return 'Ingresa un correo electrónico válido'
      }
    }

    // Longitud mínima
    if (rules.minLength && value.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`
    }

    // Longitud máxima
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Máximo ${rules.maxLength} caracteres`
    }

    // Patrón personalizado
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Formato inválido'
    }

    return ''
  }, [fieldConfig])

  // Validar un campo y actualizar errores
  const validateSingleField = useCallback((fieldName: string, value: string) => {
    const error = validateField(fieldName, value)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))
    return error === ''
  }, [validateField])

  // Validar todos los campos
  const validateAllFields = useCallback((formData: Record<string, any>) => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(fieldConfig).forEach(fieldName => {
      const value = formData[fieldName] || ''
      const error = validateField(fieldName, value)
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [fieldConfig, validateField])

  // Marcar campo como tocado
  const setFieldTouched = useCallback((fieldName: string) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
  }, [])

  // Limpiar errores
  const clearErrors = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  // Obtener error de un campo específico
  const getFieldError = useCallback((fieldName: string) => {
    return touched[fieldName] ? errors[fieldName] : ''
  }, [errors, touched])

  // Verificar si un campo tiene error
  const hasFieldError = useCallback((fieldName: string) => {
    return touched[fieldName] && !!errors[fieldName]
  }, [errors, touched])

  return {
    errors,
    touched,
    validateSingleField,
    validateAllFields,
    setFieldTouched,
    clearErrors,
    getFieldError,
    hasFieldError
  }
}