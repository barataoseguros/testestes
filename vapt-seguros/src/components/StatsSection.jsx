import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Shield, Star, TrendingUp } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      number: "2min",
      label: "Tempo médio de cotação",
      description: "Processo super rápido"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      number: "10+",
      label: "Seguradoras parceiras",
      description: "Máxima cobertura do mercado"
    },
    {
      icon: <Star className="h-8 w-8 text-accent" />,
      number: "4.8",
      label: "Avaliação dos clientes",
      description: "Satisfação garantida"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      number: "30%",
      label: "Economia média",
      description: "Comparado ao mercado"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Números que Comprovam nossa Eficiência
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Milhares de clientes já economizaram com a Vapt Seguros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection

