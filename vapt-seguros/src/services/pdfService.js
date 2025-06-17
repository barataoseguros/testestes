import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Serviço para geração de PDF das cotações
class PDFService {
  constructor() {
    this.logoBase64 = null
  }

  // Converter imagem para base64
  async imageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = reject
      img.src = imagePath
    })
  }

  // Gerar PDF da cotação
  async generateQuotePDF(quoteData, selectedQuote, formData) {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Configurações de cores
      const primaryColor = [30, 58, 138] // Azul escuro da marca
      const accentColor = [239, 68, 68] // Vermelho da marca
      const grayColor = [107, 114, 128] // Cinza
      
      // Cabeçalho
      pdf.setFillColor(...primaryColor)
      pdf.rect(0, 0, pageWidth, 40, 'F')
      
      // Logo (se disponível)
      try {
        if (!this.logoBase64) {
          this.logoBase64 = await this.imageToBase64('/src/assets/logo.png')
        }
        pdf.addImage(this.logoBase64, 'PNG', 15, 8, 40, 24)
      } catch (error) {
        console.log('Logo não carregada, usando texto')
      }
      
      // Título
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('COTAÇÃO DE SEGURO AUTO', pageWidth - 15, 20, { align: 'right' })
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Vapt Seguros - Sua proteção em boas mãos', pageWidth - 15, 30, { align: 'right' })
      
      // Linha separadora
      pdf.setDrawColor(...accentColor)
      pdf.setLineWidth(2)
      pdf.line(15, 45, pageWidth - 15, 45)
      
      let yPosition = 60
      
      // Informações do cliente
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('DADOS DO SEGURADO', 15, yPosition)
      
      yPosition += 10
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      const clientInfo = [
        ['Nome:', formData.name || 'Não informado'],
        ['E-mail:', formData.email || 'Não informado'],
        ['Telefone:', formData.phone || 'Não informado'],
        ['CPF:', formData.cpf || 'Não informado'],
        ['Data de Nascimento:', formData.birthDate || 'Não informado'],
        ['Cidade/Estado:', `${formData.city || 'Não informado'} - ${formData.state || 'Não informado'}`]
      ]
      
      clientInfo.forEach(([label, value]) => {
        pdf.setFont('helvetica', 'bold')
        pdf.text(label, 15, yPosition)
        pdf.setFont('helvetica', 'normal')
        pdf.text(value, 50, yPosition)
        yPosition += 6
      })
      
      yPosition += 10
      
      // Informações do veículo
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('DADOS DO VEÍCULO', 15, yPosition)
      
      yPosition += 10
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      const vehicleInfo = [
        ['Marca/Modelo:', `${formData.brand || 'Não informado'} ${formData.model || ''}`],
        ['Ano:', formData.year || 'Não informado'],
        ['Placa:', formData.plate || 'Não informado'],
        ['Valor FIPE:', formData.fipeValue ? `R$ ${formData.fipeValue}` : 'Não informado'],
        ['Uso do Veículo:', formData.usage || 'Não informado'],
        ['Possui Garagem:', formData.hasGarage === 'yes' ? 'Sim' : 'Não']
      ]
      
      vehicleInfo.forEach(([label, value]) => {
        pdf.setFont('helvetica', 'bold')
        pdf.text(label, 15, yPosition)
        pdf.setFont('helvetica', 'normal')
        pdf.text(value, 50, yPosition)
        yPosition += 6
      })
      
      yPosition += 15
      
      // Oferta selecionada - Destaque
      pdf.setFillColor(240, 248, 255) // Azul claro
      pdf.rect(10, yPosition - 5, pageWidth - 20, 45, 'F')
      
      pdf.setDrawColor(...primaryColor)
      pdf.setLineWidth(1)
      pdf.rect(10, yPosition - 5, pageWidth - 20, 45)
      
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(...primaryColor)
      pdf.text('OFERTA SELECIONADA', 15, yPosition + 5)
      
      yPosition += 15
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text(`${selectedQuote.insurerName}`, 15, yPosition)
      
      // Preço em destaque
      pdf.setFontSize(20)
      pdf.setTextColor(...accentColor)
      pdf.text(`R$ ${selectedQuote.annualPrice.toLocaleString('pt-BR')}`, pageWidth - 15, yPosition, { align: 'right' })
      
      pdf.setFontSize(10)
      pdf.setTextColor(...grayColor)
      pdf.text('por ano', pageWidth - 15, yPosition + 8, { align: 'right' })
      
      yPosition += 15
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Parcelas: 12x de R$ ${selectedQuote.monthlyPrice.toLocaleString('pt-BR')}`, 15, yPosition)
      pdf.text(`Cobertura: ${selectedQuote.coverage}`, 15, yPosition + 6)
      pdf.text(`Franquia: R$ ${selectedQuote.deductible}`, 15, yPosition + 12)
      
      yPosition += 25
      
      // Coberturas incluídas
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('COBERTURAS INCLUÍDAS', 15, yPosition)
      
      yPosition += 10
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      selectedQuote.features.forEach((feature, index) => {
        pdf.text(`• ${feature}`, 20, yPosition)
        yPosition += 5
      })
      
      yPosition += 15
      
      // Outras cotações
      if (quoteData.length > 1) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('OUTRAS OFERTAS DISPONÍVEIS', 15, yPosition)
        
        yPosition += 10
        
        const otherQuotes = quoteData.filter(quote => quote.id !== selectedQuote.id)
        
        otherQuotes.forEach((quote, index) => {
          if (yPosition > pageHeight - 40) {
            pdf.addPage()
            yPosition = 20
          }
          
          pdf.setFillColor(248, 250, 252)
          pdf.rect(15, yPosition - 3, pageWidth - 30, 20, 'F')
          
          pdf.setFontSize(11)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(0, 0, 0)
          pdf.text(quote.insurerName, 20, yPosition + 5)
          
          pdf.setFont('helvetica', 'normal')
          pdf.text(`R$ ${quote.annualPrice.toLocaleString('pt-BR')}/ano`, 20, yPosition + 12)
          
          pdf.setTextColor(...grayColor)
          pdf.text(`12x R$ ${quote.monthlyPrice.toLocaleString('pt-BR')}`, pageWidth - 20, yPosition + 5, { align: 'right' })
          pdf.text(`${quote.coverage}`, pageWidth - 20, yPosition + 12, { align: 'right' })
          
          yPosition += 25
        })
      }
      
      // Rodapé
      const footerY = pageHeight - 25
      pdf.setDrawColor(...grayColor)
      pdf.setLineWidth(0.5)
      pdf.line(15, footerY, pageWidth - 15, footerY)
      
      pdf.setFontSize(8)
      pdf.setTextColor(...grayColor)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Vapt Seguros - (11) 3000-0000 - contato@vaptseguros.com.br', 15, footerY + 8)
      pdf.text(`Cotação gerada em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, pageWidth - 15, footerY + 8, { align: 'right' })
      
      pdf.text('Esta cotação é válida por 30 dias. Valores sujeitos à análise de risco.', 15, footerY + 15)
      
      // Salvar o PDF
      const fileName = `cotacao_${selectedQuote.insurerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
      return { success: true, fileName }
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      return { success: false, error: error.message }
    }
  }

  // Gerar PDF comparativo com todas as cotações
  async generateComparativePDF(quoteData, formData) {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Configurações de cores
      const primaryColor = [30, 58, 138]
      const accentColor = [239, 68, 68]
      const grayColor = [107, 114, 128]
      
      // Cabeçalho
      pdf.setFillColor(...primaryColor)
      pdf.rect(0, 0, pageWidth, 40, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('COMPARATIVO DE COTAÇÕES', pageWidth / 2, 25, { align: 'center' })
      
      let yPosition = 60
      
      // Informações básicas
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Cliente: ${formData.name || 'Não informado'}`, 15, yPosition)
      pdf.text(`Veículo: ${formData.brand || ''} ${formData.model || ''} ${formData.year || ''}`, 15, yPosition + 8)
      
      yPosition += 25
      
      // Tabela de comparação
      const tableHeaders = ['Seguradora', 'Valor Anual', 'Valor Mensal', 'Cobertura']
      const colWidths = [50, 40, 40, 50]
      const startX = 15
      
      // Cabeçalho da tabela
      pdf.setFillColor(...primaryColor)
      pdf.rect(startX, yPosition, colWidths.reduce((a, b) => a + b, 0), 10, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      
      let xPosition = startX + 2
      tableHeaders.forEach((header, index) => {
        pdf.text(header, xPosition, yPosition + 7)
        xPosition += colWidths[index]
      })
      
      yPosition += 10
      
      // Dados da tabela
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'normal')
      
      quoteData.forEach((quote, index) => {
        const fillColor = index % 2 === 0 ? [248, 250, 252] : [255, 255, 255]
        pdf.setFillColor(...fillColor)
        pdf.rect(startX, yPosition, colWidths.reduce((a, b) => a + b, 0), 8, 'F')
        
        xPosition = startX + 2
        const rowData = [
          quote.insurerName,
          `R$ ${quote.annualPrice.toLocaleString('pt-BR')}`,
          `R$ ${quote.monthlyPrice.toLocaleString('pt-BR')}`,
          quote.coverage
        ]
        
        rowData.forEach((data, colIndex) => {
          pdf.text(data, xPosition, yPosition + 6)
          xPosition += colWidths[colIndex]
        })
        
        yPosition += 8
      })
      
      // Rodapé
      const footerY = pageHeight - 25
      pdf.setDrawColor(...grayColor)
      pdf.setLineWidth(0.5)
      pdf.line(15, footerY, pageWidth - 15, footerY)
      
      pdf.setFontSize(8)
      pdf.setTextColor(...grayColor)
      pdf.text('Vapt Seguros - Comparativo de Cotações', 15, footerY + 8)
      pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - 15, footerY + 8, { align: 'right' })
      
      const fileName = `comparativo_cotacoes_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
      return { success: true, fileName }
      
    } catch (error) {
      console.error('Erro ao gerar PDF comparativo:', error)
      return { success: false, error: error.message }
    }
  }
}

export default PDFService

