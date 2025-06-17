import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      location: "São Paulo, SP",
      text: "Economizei mais de R$ 800 no meu seguro! O processo foi super rápido e fácil. Recomendo a todos!",
      rating: 5
    },
    {
      name: "João Santos",
      location: "Rio de Janeiro, RJ",
      text: "Excelente serviço! Em poucos minutos consegui comparar várias opções e escolher a melhor para mim.",
      rating: 5
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte, MG",
      text: "Muito prático e confiável. Consegui renovar meu seguro com um preço muito melhor que o anterior.",
      rating: 5
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depoimentos reais de quem já economizou com a Vapt Seguros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Quote className="h-8 w-8 text-accent" />
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

