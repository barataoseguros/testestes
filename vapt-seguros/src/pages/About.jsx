import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, Award, Target } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Confiança",
      description: "Transparência e segurança em todas as transações"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Atendimento",
      description: "Suporte especializado para todas as suas dúvidas"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Qualidade",
      description: "Parcerias com as melhores seguradoras do mercado"
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Eficiência",
      description: "Processo otimizado para economia de tempo"
    }
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sobre a Vapt Seguros
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos especialistas em multicalculo de seguros automotivos, 
            oferecendo a melhor experiência para encontrar o seguro ideal para seu veículo.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-600 mb-4">
              Simplificar a busca por seguros automotivos, oferecendo uma plataforma 
              intuitiva que conecta você às melhores opções do mercado em questão de segundos.
            </p>
            <p className="text-lg text-gray-600">
              Acreditamos que encontrar o seguro ideal não deve ser complicado. 
              Por isso, desenvolvemos uma solução que torna esse processo rápido, 
              transparente e eficiente.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Por que Existimos?</h3>
            <p className="text-lg mb-4">
              O mercado de seguros pode ser complexo e demorado. Nossa missão é 
              democratizar o acesso à informação e facilitar a comparação entre 
              diferentes opções.
            </p>
            <p className="text-lg">
              Queremos que você tome a melhor decisão para proteger seu patrimônio, 
              economizando tempo e dinheiro no processo.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e relacionamento com os clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How We Work Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Trabalhamos
            </h2>
            <p className="text-lg text-gray-600">
              Nosso processo é desenhado para oferecer a melhor experiência possível
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Coleta de Dados</h3>
              <p className="text-gray-600">
                Coletamos apenas as informações essenciais para gerar cotações precisas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Processamento</h3>
              <p className="text-gray-600">
                Nosso sistema consulta múltiplas seguradoras simultaneamente
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apresentação</h3>
              <p className="text-gray-600">
                Organizamos os resultados de forma clara para facilitar sua decisão
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Números que Falam por Si
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10+</div>
              <p className="text-lg text-gray-600">Seguradoras Parceiras</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">2min</div>
              <p className="text-lg text-gray-600">Tempo Médio de Cotação</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <p className="text-lg text-gray-600">Disponibilidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

