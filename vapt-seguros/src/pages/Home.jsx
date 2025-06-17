import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Clock, Users, CheckCircle, Car, Calculator, FileText } from 'lucide-react'
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'

const Home = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: "Rapidez",
      description: "Cotação em menos de 2 minutos"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Segurança",
      description: "Dados protegidos e criptografados"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Múltiplas Seguradoras",
      description: "Compare preços de várias empresas"
    }
  ]

  const howItWorks = [
    {
      step: "1",
      icon: <Car className="h-6 w-6" />,
      title: "Informe os Dados",
      description: "Preencha as informações do seu veículo e perfil"
    },
    {
      step: "2",
      icon: <Calculator className="h-6 w-6" />,
      title: "Compare Cotações",
      description: "Receba propostas de múltiplas seguradoras"
    },
    {
      step: "3",
      icon: <FileText className="h-6 w-6" />,
      title: "Escolha e Contrate",
      description: "Selecione a melhor opção e finalize"
    }
  ]

  const insurers = [
    "Porto Seguro", "Bradesco Seguros", "SulAmérica", "Allianz", 
    "Azul Seguros", "HDI Seguros", "Tokio Marine", "Mapfre"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Seguro Auto
              <span className="text-accent block">Rápido e Fácil</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Compare cotações de múltiplas seguradoras em segundos. 
              Encontre o melhor preço para o seu veículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/cotacao">Fazer Cotação Grátis</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher a Vapt Seguros?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência em cotação de seguros automotivos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Processo simples e rápido em apenas 3 passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">{step.step}</span>
                  </div>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Insurers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seguradoras Parceiras
            </h2>
            <p className="text-lg text-gray-600">
              Trabalhamos com as principais seguradoras do mercado
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {insurers.map((insurer, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="font-medium text-gray-700">{insurer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Economizar?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Faça sua cotação agora e encontre o melhor seguro para seu veículo
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/cotacao">Começar Agora</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home

