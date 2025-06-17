import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Download, Mail, Calendar, CreditCard, Building2 } from 'lucide-react'

const ContractSuccess = ({ contractData, onNewQuote }) => {
  const generatePolicyNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `VS${timestamp}${random}`
  }

  const policyNumber = generatePolicyNumber()

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  const getPaymentMethodText = () => {
    if (contractData.payment.method === 'credit') {
      return `Cartão de Crédito (****${contractData.payment.data.cardNumber.slice(-4)})`
    } else {
      return `Débito em Conta (${contractData.payment.data.bank})`
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Confirmação de Sucesso */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Contratação Realizada com Sucesso!
            </h2>
            <p className="text-green-700 mb-4">
              Seu seguro foi contratado e você receberá um e-mail de confirmação em breve.
            </p>
            <div className="bg-white p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-600">Número da Apólice</p>
              <p className="text-2xl font-bold text-blue-600">{policyNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Contrato */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Contrato</CardTitle>
          <CardDescription>
            Informações completas do seu seguro automotivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dados do Segurado */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Dados do Segurado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-medium">{contractData.personalData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">E-mail</p>
                <p className="font-medium">{contractData.personalData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CPF</p>
                <p className="font-medium">{contractData.personalData.cpf}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">RG</p>
                <p className="font-medium">{contractData.additionalData.rg}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Profissão</p>
                <p className="font-medium">{contractData.additionalData.profissao}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Renda</p>
                <p className="font-medium">{contractData.additionalData.renda}</p>
              </div>
            </div>
          </div>

          {/* Dados do Veículo */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Dados do Veículo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Marca/Modelo</p>
                <p className="font-medium">{contractData.vehicleData.brand} {contractData.vehicleData.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ano</p>
                <p className="font-medium">{contractData.vehicleData.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Placa</p>
                <p className="font-medium">{contractData.vehicleData.plate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cor</p>
                <p className="font-medium">{contractData.additionalData.corCarro}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor FIPE</p>
                <p className="font-medium">R$ {contractData.vehicleData.fipeValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Uso</p>
                <p className="font-medium">{contractData.vehicleData.usage}</p>
              </div>
            </div>
          </div>

          {/* Dados do Seguro */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Dados do Seguro
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Seguradora</p>
                <p className="font-medium">{contractData.quote.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cobertura</p>
                <p className="font-medium">{contractData.quote.coverage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Mensal</p>
                <p className="font-medium text-green-600">R$ {contractData.quote.monthlyPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Anual</p>
                <p className="font-medium">R$ {contractData.quote.annualPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Franquia</p>
                <p className="font-medium">R$ {contractData.quote.deductible}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vigência</p>
                <p className="font-medium">12 meses</p>
              </div>
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              {contractData.payment.method === 'credit' ? 
                <CreditCard className="h-5 w-5 text-blue-600" /> : 
                <Building2 className="h-5 w-5 text-blue-600" />
              }
              Forma de Pagamento
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{getPaymentMethodText()}</p>
              <p className="text-sm text-gray-600 mt-1">
                Cobrança no dia {contractData.additionalData.diaParcelas} de cada mês
              </p>
            </div>
          </div>

          {/* Preferências */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Preferências
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Melhor dia para vistoria</p>
                <p className="font-medium">{contractData.additionalData.diaVistoria}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dia de cobrança</p>
                <p className="font-medium">Dia {contractData.additionalData.diaParcelas}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
          <CardDescription>
            O que acontece agora?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium">E-mail de Confirmação</h4>
                <p className="text-sm text-gray-600">
                  Você receberá um e-mail com todos os detalhes do contrato e a apólice digital.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium">Agendamento da Vistoria</h4>
                <p className="text-sm text-gray-600">
                  A seguradora entrará em contato para agendar a vistoria prévia do veículo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium">Ativação da Cobertura</h4>
                <p className="text-sm text-gray-600">
                  Após a vistoria aprovada, sua cobertura estará ativa e você estará protegido.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Imprimir Comprovante
        </Button>
        
        <Button
          onClick={onNewQuote}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Nova Cotação
        </Button>
      </div>

      {/* Informações de Contato */}
      <Card className="bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Precisa de Ajuda?</h3>
            <p className="text-blue-800 mb-4">
              Nossa equipe está pronta para te atender
            </p>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>Telefone:</strong> (11) 4000-1234</p>
              <p><strong>WhatsApp:</strong> (11) 99999-1234</p>
              <p><strong>E-mail:</strong> atendimento@vaptseguros.com.br</p>
              <p><strong>Horário:</strong> Segunda a Sexta, 8h às 18h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContractSuccess

