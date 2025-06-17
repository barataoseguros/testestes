import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Car, 
  Shield, 
  Calculator,
  MapPin,
  Briefcase
} from 'lucide-react'
import { calculateQuotes, simulateProcessingDelay } from '../utils/calculations'
import QuoteResults from '../components/QuoteResults'
import VehicleSearch from '../components/VehicleSearch'

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [quotes, setQuotes] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    profession: '',
    
    // Endereço
    zipCode: '',
    city: '',
    state: '',
    
    // Dados do veículo
    vehicleType: 'car',
    brand: '',
    model: '',
    year: '',
    fipeValue: '',
    fipeCode: '',
    fuel: '',
    plate: '',
    
    // Uso do veículo
    usage: '',
    dailyKm: '',
    parkingLocation: '',
    hasGarage: '',
    
    // Cobertura desejada
    coverageType: '',
    deductible: '',
    
    // Histórico
    hasInsurance: '',
    claimHistory: '',
    drivingExperience: ''
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleVehicleSelect = (vehicleData) => {
    setSelectedVehicle(vehicleData)
    setFormData(prev => ({
      ...prev,
      brand: vehicleData.brand,
      model: vehicleData.model,
      year: vehicleData.year,
      fipeValue: vehicleData.fipeValue,
      fipeCode: vehicleData.fipeCode,
      fuel: vehicleData.fuel,
      plate: vehicleData.plate || ''
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Simular delay de processamento
      await simulateProcessingDelay()
      
      // Preparar dados para cálculo
      const calculationData = {
        vehicleValue: typeof formData.fipeValue === 'string' 
          ? parseFloat(formData.fipeValue.replace(/[^\d,]/g, '').replace(',', '.')) || 50000
          : formData.fipeValue || 50000,
        vehicleYear: parseInt(formData.year) || 2020,
        birthDate: formData.birthDate,
        gender: formData.gender,
        state: formData.state,
        usage: formData.usage === 'personal' ? 'particular' : formData.usage,
        hasGarage: formData.hasGarage === 'yes' ? 'sim' : 'nao',
        coverage: formData.coverageType || 'intermediaria',
        deductible: formData.deductible === 'low' ? 1000 : formData.deductible === 'medium' ? 2000 : 3000
      }
      
      // Calcular cotações
      const calculatedQuotes = calculateQuotes(calculationData)
      setQuotes(calculatedQuotes)
      setCurrentStep(5) // Ir para a tela de resultados
    } catch (error) {
      console.error('Erro ao calcular cotações:', error)
      alert('Erro ao processar cotação. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewQuote = () => {
    setCurrentStep(1)
    setQuotes(null)
    setSelectedVehicle(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      gender: '',
      maritalStatus: '',
      profession: '',
      zipCode: '',
      city: '',
      state: '',
      vehicleType: 'car',
      brand: '',
      model: '',
      year: '',
      fipeValue: '',
      fipeCode: '',
      fuel: '',
      plate: '',
      usage: '',
      dailyKm: '',
      parkingLocation: '',
      hasGarage: '',
      coverageType: '',
      deductible: '',
      hasInsurance: '',
      claimHistory: '',
      drivingExperience: ''
    })
  }

  if (currentStep === 5 && quotes) {
    return <QuoteResults quotes={quotes} onNewQuote={handleNewQuote} formData={formData} />
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexo *</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3 flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Endereço
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="zipCode">CEP *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Sua cidade"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="BA">Bahia</option>
                      <option value="GO">Goiás</option>
                      <option value="PE">Pernambuco</option>
                      <option value="CE">Ceará</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Dados do Veículo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VehicleSearch 
                onVehicleSelect={handleVehicleSelect}
                selectedVehicle={selectedVehicle}
              />
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Uso do Veículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="usage">Uso Principal *</Label>
                  <select
                    id="usage"
                    value={formData.usage}
                    onChange={(e) => handleInputChange('usage', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="personal">Uso pessoal</option>
                    <option value="work">Trabalho</option>
                    <option value="business">Comercial</option>
                    <option value="uber">Uber/99</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="hasGarage">Possui Garagem? *</Label>
                  <select
                    id="hasGarage"
                    value={formData.hasGarage}
                    onChange={(e) => handleInputChange('hasGarage', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Cobertura Desejada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="coverageType">Tipo de Cobertura *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {['basica', 'intermediaria', 'completa'].map((type) => (
                    <div
                      key={type}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.coverageType === type
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleInputChange('coverageType', type)}
                    >
                      <h4 className="font-medium capitalize">{type}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {type === 'basica' && 'Cobertura básica obrigatória'}
                        {type === 'intermediaria' && 'Cobertura ampla com principais proteções'}
                        {type === 'completa' && 'Cobertura total com todos os benefícios'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="deductible">Franquia Preferida</Label>
                <select
                  id="deductible"
                  value={formData.deductible}
                  onChange={(e) => handleInputChange('deductible', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Selecione</option>
                  <option value="low">Baixa (R$ 1.000)</option>
                  <option value="medium">Média (R$ 2.000)</option>
                  <option value="high">Alta (R$ 3.000+)</option>
                </select>
              </div>

              {/* Resumo dos dados */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Resumo da Cotação</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Segurado:</span>
                    <span>{formData.name || 'Não informado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Veículo:</span>
                    <span>
                      {selectedVehicle 
                        ? `${selectedVehicle.brand} ${selectedVehicle.model} ${selectedVehicle.year}`
                        : 'Não selecionado'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cidade:</span>
                    <span>{formData.city || 'Não informada'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uso:</span>
                    <span>{formData.usage || 'Não informado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cobertura:</span>
                    <span className="capitalize">{formData.coverageType || 'Não selecionada'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.cpf && 
               formData.birthDate && formData.gender && formData.zipCode && 
               formData.city && formData.state
      case 2:
        return selectedVehicle && selectedVehicle.brand && selectedVehicle.model && selectedVehicle.year
      case 3:
        return formData.usage && formData.hasGarage
      case 4:
        return formData.coverageType
      default:
        return false
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Calculando suas cotações...</h2>
          <p className="text-gray-600">Estamos consultando as melhores ofertas para você</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cotação de Seguro Auto
          </h1>
          <p className="text-lg text-gray-600">
            Preencha os dados abaixo para receber suas cotações personalizadas
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% concluído
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Step */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid() || isLoading}
              className="bg-accent hover:bg-accent/90"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calcular Cotações
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quote

