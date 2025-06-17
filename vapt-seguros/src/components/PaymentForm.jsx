import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard, Building2, Shield } from 'lucide-react'

const PaymentForm = ({ onNext, onBack, selectedQuote, additionalData }) => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentData, setPaymentData] = useState({
    // Cartão de Crédito
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cardCpf: '',
    // Débito em Conta
    bank: '',
    agency: '',
    account: '',
    accountCpf: ''
  })

  const [errors, setErrors] = useState({})

  const bancos = [
    'Banco do Brasil', 'Bradesco', 'Caixa Econômica Federal', 'Itaú',
    'Santander', 'Nubank', 'Inter', 'BTG Pactual', 'Safra', 'Sicoob',
    'Sicredi', 'Banrisul', 'BRB', 'Banco Original', 'Banco Pan',
    'Banco BMG', 'Banco Votorantim', 'Banco Pine', 'Outro'
  ]

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const formatCardNumber = (value) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
  }

  const formatExpiryDate = (value) => {
    const numericValue = value.replace(/\D/g, '')
    if (numericValue.length >= 2) {
      return numericValue.replace(/(\d{2})(\d{0,2})/, '$1/$2')
    }
    return numericValue
  }

  const formatCPF = (value) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const validateCPF = (cpf) => {
    const numericCPF = cpf.replace(/\D/g, '')
    if (numericCPF.length !== 11) return false
    
    // Verificação básica de CPF
    if (/^(\d)\1{10}$/.test(numericCPF)) return false
    
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numericCPF.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(numericCPF.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numericCPF.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(numericCPF.charAt(10))) return false
    
    return true
  }

  const validateCardNumber = (cardNumber) => {
    const numericCard = cardNumber.replace(/\D/g, '')
    return numericCard.length >= 13 && numericCard.length <= 19
  }

  const validateForm = () => {
    const newErrors = {}

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Selecione uma forma de pagamento'
    }

    if (paymentMethod === 'credit') {
      if (!paymentData.cardNumber) {
        newErrors.cardNumber = 'Número do cartão é obrigatório'
      } else if (!validateCardNumber(paymentData.cardNumber)) {
        newErrors.cardNumber = 'Número do cartão inválido'
      }

      if (!paymentData.cardHolder) {
        newErrors.cardHolder = 'Nome do titular é obrigatório'
      }

      if (!paymentData.expiryDate) {
        newErrors.expiryDate = 'Data de validade é obrigatória'
      } else {
        const [month, year] = paymentData.expiryDate.split('/')
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1

        if (!month || !year || month < 1 || month > 12) {
          newErrors.expiryDate = 'Data de validade inválida'
        } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          newErrors.expiryDate = 'Cartão expirado'
        }
      }

      if (!paymentData.cardCpf) {
        newErrors.cardCpf = 'CPF do titular é obrigatório'
      } else if (!validateCPF(paymentData.cardCpf)) {
        newErrors.cardCpf = 'CPF inválido'
      }
    }

    if (paymentMethod === 'debit') {
      if (!paymentData.bank) {
        newErrors.bank = 'Banco é obrigatório'
      }

      if (!paymentData.agency) {
        newErrors.agency = 'Agência é obrigatória'
      }

      if (!paymentData.account) {
        newErrors.account = 'Conta é obrigatória'
      }

      if (!paymentData.accountCpf) {
        newErrors.accountCpf = 'CPF do titular é obrigatório'
      } else if (!validateCPF(paymentData.accountCpf)) {
        newErrors.accountCpf = 'CPF inválido'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        method: paymentMethod,
        data: paymentData
      })
    }
  }

  const renderCreditCardForm = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-green-600" />
        <h4 className="font-semibold">Dados do Cartão de Crédito</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="cardNumber">Número do Cartão *</Label>
          <Input
            id="cardNumber"
            value={paymentData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={errors.cardNumber ? 'border-red-500' : ''}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div>
          <Label htmlFor="cardHolder">Nome do Titular *</Label>
          <Input
            id="cardHolder"
            value={paymentData.cardHolder}
            onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
            placeholder="NOME COMO NO CARTÃO"
            className={errors.cardHolder ? 'border-red-500' : ''}
          />
          {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
        </div>

        <div>
          <Label htmlFor="expiryDate">Data de Validade *</Label>
          <Input
            id="expiryDate"
            value={paymentData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
            placeholder="MM/AA"
            maxLength={5}
            className={errors.expiryDate ? 'border-red-500' : ''}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="cardCpf">CPF do Titular *</Label>
          <Input
            id="cardCpf"
            value={paymentData.cardCpf}
            onChange={(e) => handleInputChange('cardCpf', formatCPF(e.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
            className={errors.cardCpf ? 'border-red-500' : ''}
          />
          {errors.cardCpf && <p className="text-red-500 text-sm mt-1">{errors.cardCpf}</p>}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg mt-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            <strong>Segurança:</strong> Seus dados são protegidos com criptografia SSL e não são armazenados em nossos servidores.
          </p>
        </div>
      </div>
    </div>
  )

  const renderDebitForm = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-blue-600" />
        <h4 className="font-semibold">Dados Bancários</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="bank">Banco *</Label>
          <Select value={paymentData.bank} onValueChange={(value) => handleInputChange('bank', value)}>
            <SelectTrigger className={errors.bank ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione seu banco" />
            </SelectTrigger>
            <SelectContent>
              {bancos.map((banco) => (
                <SelectItem key={banco} value={banco}>
                  {banco}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bank && <p className="text-red-500 text-sm mt-1">{errors.bank}</p>}
        </div>

        <div>
          <Label htmlFor="agency">Agência *</Label>
          <Input
            id="agency"
            value={paymentData.agency}
            onChange={(e) => handleInputChange('agency', e.target.value.replace(/\D/g, ''))}
            placeholder="1234"
            className={errors.agency ? 'border-red-500' : ''}
          />
          {errors.agency && <p className="text-red-500 text-sm mt-1">{errors.agency}</p>}
        </div>

        <div>
          <Label htmlFor="account">Conta Corrente *</Label>
          <Input
            id="account"
            value={paymentData.account}
            onChange={(e) => handleInputChange('account', e.target.value.replace(/\D/g, ''))}
            placeholder="12345-6"
            className={errors.account ? 'border-red-500' : ''}
          />
          {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="accountCpf">CPF do Titular *</Label>
          <Input
            id="accountCpf"
            value={paymentData.accountCpf}
            onChange={(e) => handleInputChange('accountCpf', formatCPF(e.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
            className={errors.accountCpf ? 'border-red-500' : ''}
          />
          {errors.accountCpf && <p className="text-red-500 text-sm mt-1">{errors.accountCpf}</p>}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-800">
            <strong>Débito Automático:</strong> O valor será debitado mensalmente na data de vencimento escolhida.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Forma de Pagamento</CardTitle>
        <CardDescription>
          Escolha como deseja pagar seu seguro automotivo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Resumo do Seguro:</h4>
            <div className="text-green-800">
              <p><strong>Seguradora:</strong> {selectedQuote.company}</p>
              <p><strong>Cobertura:</strong> {selectedQuote.coverage}</p>
              <p><strong>Valor Mensal:</strong> R$ {selectedQuote.monthlyPrice}</p>
              <p><strong>Valor Anual:</strong> R$ {selectedQuote.annualPrice}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">Selecione a forma de pagamento *</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="mt-3"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Cartão de Crédito
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="h-4 w-4" />
                  Débito em Conta
                </Label>
              </div>
            </RadioGroup>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
          </div>

          {paymentMethod === 'credit' && renderCreditCardForm()}
          {paymentMethod === 'debit' && renderDebitForm()}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700"
            disabled={!paymentMethod}
          >
            Finalizar Contratação
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentForm

