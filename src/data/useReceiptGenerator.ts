import { useCallback } from 'react'
import jsPDF from 'jspdf'
import type { ExtendedProduct } from '../sections/chekouts/hooks'

export interface ReceiptData {
  nombre: string
  correo: string
  telefono: string
  provincia: string
  canton: string
  entrega: string
  productos: ExtendedProduct[]
  monto: number
  fecha: string
  formData: Record<string, any>
}

export function useReceiptGenerator() {
  const generatePDF = useCallback(async (data: ReceiptData) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    let currentY = 20

    // Fondo suave
    doc.setFillColor(255, 245, 250)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    // Logo superior derecha
    try {
      const logo = await fetch('/images/LOGO.jpg')
      const blob = await logo.blob()
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          const imgWidth = 40
          const imgHeight = 20
          doc.addImage(reader.result as string, 'JPEG', pageWidth - imgWidth - margin, currentY, imgWidth, imgHeight)
          resolve()
        }
      })
    } catch (error) {
      console.error('No se pudo cargar el logo:', error)
    }

    // Encabezado
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(219, 39, 119)
    doc.text('COMPROBANTE DE COMPRA', margin, currentY + 15)
    currentY += 35

    const addText = (
      text: string,
      fontSize = 12,
      isBold = false,
      color: [number, number, number] = [0, 0, 0],
      indent = 0
    ) => {
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', isBold ? 'bold' : 'normal')
      doc.setTextColor(...color)
      doc.text(text, margin + indent, currentY)
      currentY += fontSize * 0.5 + 3
    }

    const addSectionTitle = (title: string) => {
      addText(title, 16, true, [0, 0, 0])
    }

    const addLine = () => {
      doc.setDrawColor(200)
      doc.line(margin, currentY, pageWidth - margin, currentY)
      currentY += 10
    }

    // Información del cliente
    addSectionTitle('INFORMACIÓN DEL CLIENTE')
    addText(`Nombre: ${data.nombre}`)
    addText(`Correo: ${data.correo}`)
    addText(`Teléfono: ${data.telefono}`)
    addText(`Provincia: ${data.provincia}`)
    addText(`Cantón: ${data.canton}`)
    addText(`Entrega: ${data.entrega}`)
    addText(`Fecha: ${data.fecha}`)
    currentY += 5
    addLine()

    // Productos
    addSectionTitle('DETALLE DE PRODUCTOS')
    data.productos.forEach((item, index) => {
      const talla = data.formData[`size-${item.cartIndex}`]
      const color = data.formData[`color-${item.cartIndex}`]
      const medidas = data.formData[`medidas-${item.cartIndex}`]

      addText(`${index + 1}. ${item.name}`, 12, true)
      addText(`Talla: ${talla}`, 11, false, [0, 0, 0], 5)
      addText(`Color: ${color}`, 11, false, [0, 0, 0], 5)
      addText(`Medidas: ${medidas}`, 11, false, [0, 0, 0], 5)
      addText(`Precio: ₡${item.price.toLocaleString('es-CR', { minimumFractionDigits: 2 })}`, 12, false, [0, 0, 0], 5)

      currentY += 5
      if (currentY > pageHeight - 60) {
        doc.addPage()
        currentY = 20
      }
    })

    currentY += 5

    // Resumen de pago (con fondo rosa)
    const resumenY = currentY
    const resumenHeight = 30
    doc.setFillColor(255, 229, 237)
    doc.roundedRect(margin, resumenY, pageWidth - 2 * margin, resumenHeight, 5, 5, 'F')

    currentY += 8
    doc.setTextColor(219, 39, 119)
    addText('RESUMEN DE PAGO', 14, true)
    doc.setTextColor(0, 0, 0)

    const adelanto = data.monto
    const totalGeneral = adelanto * 2
    const pendiente = totalGeneral - adelanto

    addText(`Total General: ₡${totalGeneral.toLocaleString('es-CR', { minimumFractionDigits: 2 })}`)
    addText(`Adelanto (50%): ₡${adelanto.toLocaleString('es-CR', { minimumFractionDigits: 2 })}`, 12, true, [219, 39, 119])
    addText(`Pendiente: ₡${pendiente.toLocaleString('es-CR', { minimumFractionDigits: 2 })}`)
    currentY = resumenY + resumenHeight + 10

    addLine()

    // Nota
    addText('NOTA IMPORTANTE:', 12, true)
    addText('Este comprobante es válido para el seguimiento de su pedido.')
    addText('Conserve este documento hasta recibir su producto.')
    currentY += 10
    addLine()

    // Guardar PDF
    const fileName = `comprobante_${data.nombre.replace(/\s+/g, '_')}_${Date.now()}.pdf`
    doc.save(fileName)
  }, [])

  return { generatePDF }
}
