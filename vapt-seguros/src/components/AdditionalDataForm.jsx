import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { User, MapPin, Car, Calendar, CheckCircle } from 'lucide-react'

const AdditionalDataForm = ({ onNext, onBack, selectedQuote, formData }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState({
    rg: '',
    renda: '',
    isPoliticallyExposed: false,
    profissao: '',
    endereco: {
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    corCarro: '',
    emailConfirmacao: '',
    confirmaContratacao: false,
    diaVistoria: '',
    diaParcelas: ''
  })

  const [errors, setErrors] = useState({})

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  const coresCarro = [
    'Branco', 'Preto', 'Prata', 'Cinza', 'Azul', 'Vermelho',
    'Verde', 'Amarelo', 'Marrom', 'Bege', 'Dourado', 'Outro'
  ]

  const diasSemana = [
    'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira',
    'Sexta-feira', 'Sábado', 'Domingo'
  ]

  const diasMes = Array.from({ length: 28 }, (_, i) => i + 1)

  const profissoes = [
    'Administrador', 'Advogado', 'Arquiteto', 'Contador', 'Dentista',
    'Economista', 'Enfermeiro', 'Engenheiro', 'Farmacêutico', 'Fisioterapeuta',
    'Jornalista', 'Médico', 'Professor', 'Psicólogo', 'Veterinário',
    'Autônomo', 'Empresário', 'Funcionário Público', 'Aposentado', 'Estudante',
    'Outro'
  ]

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '')
    const formattedValue = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return formattedValue
  }

  const formatCEP = (value) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!data.rg) newErrors.rg = 'RG é obrigatório'
      if (!data.renda) newErrors.renda = 'Renda é obrigatória'
      if (!data.profissao) newErrors.profissao = 'Profissão é obrigatória'
    }

    if (step === 2) {
      if (!data.endereco.rua) newErrors['endereco.rua'] = 'Rua é obrigatória'
      if (!data.endereco.numero) newErrors['endereco.numero'] = 'Número é obrigatório'
      if (!data.endereco.bairro) newErrors['endereco.bairro'] = 'Bairro é obrigatório'
      if (!data.endereco.cidade) newErrors['endereco.cidade'] = 'Cidade é obrigatória'
      if (!data.endereco.estado) newErrors['endereco.estado'] = 'Estado é obrigatório'
      if (!data.endereco.cep) newErrors['endereco.cep'] = 'CEP é obrigatório'
    }

    if (step === 3) {
      if (!data.corCarro) newErrors.corCarro = 'Cor do carro é obrigatória'
      if (!data.emailConfirmacao) newErrors.emailConfirmacao = 'E-mail de confirmação é obrigatório'
      if (data.emailConfirmacao !== formData.email) {
        newErrors.emailConfirmacao = 'E-mail deve ser igual ao informado na cotação'
      }
      if (!data.confirmaContratacao) newErrors.confirmaContratacao = 'Você deve confirmar a contratação'
      if (!data.diaVistoria) newErrors.diaVistoria = 'Dia para vistoria é obrigatório'
      if (!data.diaParcelas) newErrors.diaParcelas = 'Dia para parcelas é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        onNext(data)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Dados Pessoais Complementares</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rg">RG *</Label>
          <Input
            id="rg"
            value={data.rg}
            onChange={(e) => handleInputChange('rg', e.target.value)}
            placeholder="Ex: 12.345.678-9"
            className={errors.rg ? 'border-red-500' : ''}
          />
          {errors.rg && <p className="text-red-500 text-sm mt-1">{errors.rg}</p>}
        </div>

        <div>
          <Label htmlFor="renda">Renda Mensal *</Label>
          <Input
            id="renda"
            value={data.renda}
            onChange={(e) => handleInputChange('renda', formatCurrency(e.target.value))}
            placeholder="R$ 0,00"
            className={errors.renda ? 'border-red-500' : ''}
          />
          {errors.renda && <p className="text-red-500 text-sm mt-1">{errors.renda}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="profissao">Profissão *</Label>
          <Select value={data.profissao} onValueChange={(value) => handleInputChange('profissao', value)}>
            <SelectTrigger className={errors.profissao ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione sua profissão" />
            </SelectTrigger>
            <SelectContent>
              {profissoes.map((profissao) => (
                <SelectItem key={profissao} value={profissao}>
                  {profissao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.profissao && <p className="text-red-500 text-sm mt-1">{errors.profissao}</p>}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="politicallyExposed"
              checked={data.isPoliticallyExposed}
              onCheckedChange={(checked) => handleInputChange('isPoliticallyExposed', checked)}
            />
            <Label htmlFor="politicallyExposed" className="text-sm">
              Sou pessoa politicamente exposta (PPE)
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Pessoa que exerce ou exerceu nos últimos 5 anos cargo, emprego ou função pública relevante
          </p>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Endereço Completo</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="rua">Rua/Avenida *</Label>
          <Input
            id="rua"
            value={data.endereco.rua}
            onChange={(e) => handleInputChange('endereco.rua', e.target.value)}
            placeholder="Ex: Rua das Flores"
            className={errors['endereco.rua'] ? 'border-red-500' : ''}
          />
          {errors['endereco.rua'] && <p className="text-red-500 text-sm mt-1">{errors['endereco.rua']}</p>}
        </div>

        <div>
          <Label htmlFor="numero">Número *</Label>
          <Input
            id="numero"
            value={data.endereco.numero}
            onChange={(e) => handleInputChange('endereco.numero', e.target.value)}
            placeholder="123"
            className={errors['endereco.numero'] ? 'border-red-500' : ''}
          />
          {errors['endereco.numero'] && <p className="text-red-500 text-sm mt-1">{errors['endereco.numero']}</p>}
        </div>

        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            value={data.endereco.complemento}
            onChange={(e) => handleInputChange('endereco.complemento', e.target.value)}
            placeholder="Apto 45, Bloco B"
          />
        </div>

        <div>
          <Label htmlFor="bairro">Bairro *</Label>
          <Input
            id="bairro"
            value={data.endereco.bairro}
            onChange={(e) => handleInputChange('endereco.bairro', e.target.value)}
            placeholder="Centro"
            className={errors['endereco.bairro'] ? 'border-red-500' : ''}
          />
          {errors['endereco.bairro'] && <p className="text-red-500 text-sm mt-1">{errors['endereco.bairro']}</p>}
        </div>

        <div>
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            id="cidade"
            value={data.endereco.cidade}
            onChange={(e) => handleInputChange('endereco.cidade', e.target.value)}
            placeholder="São Paulo"
            className={errors['endereco.cidade'] ? 'border-red-500' : ''}
          />
          {errors['endereco.cidade'] && <p className="text-red-500 text-sm mt-1">{errors['endereco.cidade']}</p>}
        </div>

        <div>
          <Label htmlFor="estado">Estado *</Label>
          <Select value={data.endereco.estado} onValueChange={(value) => handleInputChange('endereco.estado', value)}>
            <SelectTrigger className={errors['endereco.estado'] ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors['endereco.estado'] && <p className="text-red-500 text-sm mt-1">{errors['endereco.estado']}</p>}
        </div>

        <div>
          <Label htmlFor="cep">CEP *</Label>
          <Input
            id="cep"
            value={data.endereco.cep}
            onChange={(e) => handleInputChange('endereco.cep', formatCEP(e.target.value))}
            placeholder="12345-678"
            maxLength={9}
            className={errors['endereco.cep'] ? 'border-red-500' : ''}
          />
          {errors['endereco.cep'] && <p className="text-red-500 text-sm mt-1">{errors['endereco.cep']}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Confirmações e Preferências</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="corCarro">Cor do Veículo *</Label>
          <Select value={data.corCarro} onValueChange={(value) => handleInputChange('corCarro', value)}>
            <SelectTrigger className={errors.corCarro ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione a cor" />
            </SelectTrigger>
            <SelectContent>
              {coresCarro.map((cor) => (
                <SelectItem key={cor} value={cor}>
                  {cor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.corCarro && <p className="text-red-500 text-sm mt-1">{errors.corCarro}</p>}
        </div>

        <div>
          <Label htmlFor="emailConfirmacao">Confirme seu E-mail *</Label>
          <Input
            id="emailConfirmacao"
            type="email"
            value={data.emailConfirmacao}
            onChange={(e) => handleInputChange('emailConfirmacao', e.target.value)}
            placeholder="seu@email.com"
            className={errors.emailConfirmacao ? 'border-red-500' : ''}
          />
          {errors.emailConfirmacao && <p className="text-red-500 text-sm mt-1">{errors.emailConfirmacao}</p>}
        </div>

        <div>
          <Label htmlFor="diaVistoria">Melhor dia para vistoria *</Label>
          <Select value={data.diaVistoria} onValueChange={(value) => handleInputChange('diaVistoria', value)}>
            <SelectTrigger className={errors.diaVistoria ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione o dia" />
            </SelectTrigger>
            <SelectContent>
              {diasSemana.map((dia) => (
                <SelectItem key={dia} value={dia}>
                  {dia}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.diaVistoria && <p className="text-red-500 text-sm mt-1">{errors.diaVistoria}</p>}
        </div>

        <div>
          <Label htmlFor="diaParcelas">Melhor dia para cobrança *</Label>
          <Select value={data.diaParcelas} onValueChange={(value) => handleInputChange('diaParcelas', value)}>
            <SelectTrigger className={errors.diaParcelas ? 'border-red-500' : ''}>
              <SelectValue placeholder="Dia do mês" />
            </SelectTrigger>
            <SelectContent>
              {diasMes.map((dia) => (
                <SelectItem key={dia} value={dia.toString()}>
                  Dia {dia}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.diaParcelas && <p className="text-red-500 text-sm mt-1">{errors.diaParcelas}</p>}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmaContratacao"
              checked={data.confirmaContratacao}
              onCheckedChange={(checked) => handleInputChange('confirmaContratacao', checked)}
            />
            <Label htmlFor="confirmaContratacao" className="text-sm">
              Confirmo que desejo contratar este seguro e aceito os termos e condições *
            </Label>
          </div>
          {errors.confirmaContratacao && <p className="text-red-500 text-sm mt-1">{errors.confirmaContratacao}</p>}
        </div>
      </div>
    </div>
  )

  const progress = (currentStep / 3) * 100

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Dados Adicionais para Contratação</CardTitle>
        <CardDescription>
          Preencha os dados complementares para finalizar a contratação do seu seguro
        </CardDescription>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Etapa {currentStep} de 3</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Seguro Selecionado:</h4>
            <p className="text-blue-800">
              {selectedQuote.company} - {selectedQuote.coverage} - 
              <span className="font-bold"> R$ {selectedQuote.monthlyPrice}/mês</span>
            </p>
          </div>
        </div>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
          >
            {currentStep === 1 ? 'Voltar às Cotações' : 'Anterior'}
          </Button>

          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === 3 ? 'Continuar para Pagamento' : 'Próximo'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalDataForm

