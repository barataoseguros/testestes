import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Phone, 
  Mail, 
  Star,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react'
import { insurerLogos } from '../data/insurerLogos'
import PDFService from '../services/pdfService'
import contractService from '../services/contractService'
import AdditionalDataForm from './AdditionalDataForm'
import PaymentForm from './PaymentForm'
import ContractSuccess from './ContractSuccess'

const QuoteResults = ({ quotes, onNewQuote, formData }) => {
  const [sortBy, setSortBy] = useState('price')
  const [filterBy, setFilterBy] = useState('all')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [contractFlow, setContractFlow] = useState({
    step: 'results', // 'results', 'additional-data', 'payment', 'success'
    selectedQuote: null,
    additionalData: null,
    paymentData: null,
    contractData: null
  })

  const pdfService = new PDFService()

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleGenerateComparativePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const result = await pdfService.generateComparativePDF(quotes, formData)
      if (result.success) {
        alert(`PDF comparativo gerado: ${result.fileName}`)
      }
    } catch (error) {
      alert(`Erro ao gerar PDF: ${error.message}`)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleGenerateQuotePDF = async (quote) => {
    setIsGeneratingPDF(true)
    try {
      const result = await pdfService.generateQuotePDF([quote], quote, formData)
      if (result.success) {
        alert(`PDF da cotação gerado: ${result.fileName}`)
      }
    } catch (error) {
      alert(`Erro ao gerar PDF: ${error.message}`)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleContractQuote = (quote) => {
    setContractFlow({
      step: 'additional-data',
      selectedQuote: quote,
      additionalData: null,
      paymentData: null,
      contractData: null
    })
  }

  const handleAdditionalDataNext = (additionalData) => {
    setContractFlow(prev => ({
      ...prev,
      step: 'payment',
      additionalData: { ...formData, ...additionalData }
    }))
  }

  const handlePaymentNext = async (paymentData) => {
    try {
      // Preparar dados para envio ao backend
      const contractData = {
        selectedQuote: contractFlow.selectedQuote,
        additionalData: contractFlow.additionalData,
        paymentData: paymentData
      }

      // Criar contrato no backend
      const contractResult = await contractService.createContract(contractData)
      
      if (contractResult.success) {
        // Enviar e-mail de confirmação
        const emailData = {
          contractData: {
            ...contractResult.contract,
            selectedQuote: contractFlow.selectedQuote
          },
          additionalData: contractFlow.additionalData,
          paymentData: paymentData
        }

        try {
          await contractService.sendConfirmationEmail(emailData)
        } catch (emailError) {
          console.warn('Erro ao enviar e-mail, mas contrato foi criado:', emailError)
        }

        // Atualizar estado com dados do contrato
        setContractFlow(prev => ({
          ...prev,
          step: 'success',
          paymentData,
          contractData: contractResult.contract
        }))
      } else {
        throw new Error('Falha ao criar contrato')
      }
    } catch (error) {
      console.error('Erro no processamento:', error)
      alert(`Erro ao processar contratação: ${error.message}`)
    }
  }

  const handleBackToResults = () => {
    setContractFlow({
      step: 'results',
      selectedQuote: null,
      additionalData: null,
      paymentData: null,
      contractData: null
    })
  }

  const handleNewQuote = () => {
    setContractFlow({
      step: 'results',
      selectedQuote: null,
      additionalData: null,
      paymentData: null,
      contractData: null
    })
    onNewQuote()
  }

  // Renderizar fluxo de contratação
  if (contractFlow.step === 'additional-data') {
    return (
      <AdditionalDataForm
        selectedQuote={contractFlow.selectedQuote}
        onBack={handleBackToResults}
        onNext={handleAdditionalDataNext}
        initialData={formData}
      />
    )
  }

  if (contractFlow.step === 'payment') {
    return (
      <PaymentForm
        selectedQuote={contractFlow.selectedQuote}
        additionalData={contractFlow.additionalData}
        onBack={() => setContractFlow(prev => ({ ...prev, step: 'additional-data' }))}
        onNext={handlePaymentNext}
      />
    )
  }

  if (contractFlow.step === 'success') {
    return (
      <ContractSuccess
        selectedQuote={contractFlow.selectedQuote}
        additionalData={contractFlow.additionalData}
        paymentData={contractFlow.paymentData}
        contractData={contractFlow.contractData}
        onNewQuote={handleNewQuote}
      />
    )
  }

  // Filtrar e ordenar cotações
  let filteredQuotes = quotes
  if (filterBy !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.coverage.toLowerCase() === filterBy)
  }

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.annualPrice - b.annualPrice
      case 'rating':
        return b.rating - a.rating
      case 'insurer':
        return a.insurerName.localeCompare(b.insurerName)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Suas Cotações de Seguro Auto
          </h1>
          <p className="text-lg text-gray-600">
            Encontramos {quotes.length} opções para você. Compare e escolha a melhor!
          </p>
        </div>

        {/* Controles de filtro e ordenação */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div className="flex flex-wrap gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="price">Ordenar por Preço</option>
              <option value="rating">Ordenar por Avaliação</option>
              <option value="insurer">Ordenar por Seguradora</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">Todas as Coberturas</option>
              <option value="básica">Cobertura Básica</option>
              <option value="intermediária">Cobertura Intermediária</option>
              <option value="completa">Cobertura Completa</option>
            </select>
          </div>

          <Button
            onClick={handleGenerateComparativePDF}
            disabled={isGeneratingPDF}
            variant="outline"
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF ? 'Gerando...' : 'PDF Comparativo'}
          </Button>
        </div>

        {/* Lista de cotações */}
        <div className="space-y-4">
          {sortedQuotes.map((quote, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Informações da seguradora */}
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="w-16 h-16 flex items-center justify-center bg-white border rounded-lg">
                      <img
                        src={insurerLogos[quote.insurerName]}
                        alt={quote.insurerName}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {quote.insurerName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < quote.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({quote.rating}/5)
                        </span>
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {quote.coverage}
                      </Badge>
                    </div>
                  </div>

                  {/* Preços */}
                  <div className="text-center lg:text-right mb-4 lg:mb-0">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {formatCurrency(quote.annualPrice)}
                    </div>
                    <div className="text-lg text-gray-600">
                      ou {formatCurrency(quote.monthlyPrice)}/mês
                    </div>
                    <div className="text-sm text-gray-500">
                      Franquia: {formatCurrency(quote.deductible)}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    <Button
                      onClick={() => handleContractQuote(quote)}
                      className="bg-accent hover:bg-accent/90 flex items-center justify-center"
                    >
                      Contratar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleGenerateQuotePDF(quote)}
                      disabled={isGeneratingPDF}
                      variant="outline"
                      className="flex items-center justify-center"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar PDF
                    </Button>
                  </div>
                </div>

                {/* Detalhes da cobertura */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Coberturas Incluídas:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {quote.coverageDetails.map((coverage, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{coverage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Informações Importantes</h3>
          </div>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Todas as cotações são válidas por 30 dias</p>
            <p>• Os valores podem variar após a vistoria do veículo</p>
            <p>• Documentação necessária: CNH, CPF, RG e documento do veículo</p>
            <p>• Dúvidas? Entre em contato: (11) 3000-0000</p>
          </div>
        </div>

        {/* Botão para nova cotação */}
        <div className="text-center mt-8">
          <Button
            onClick={onNewQuote}
            variant="outline"
            className="flex items-center mx-auto"
          >
            Fazer Nova Cotação
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuoteResults

