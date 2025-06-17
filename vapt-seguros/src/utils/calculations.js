// Simulação de seguradoras e seus fatores de preço
const insurers = [
  {
    id: 'porto_seguro',
    name: 'Porto Seguro',
    baseFactor: 1.0,
    ageFactor: { min: 0.9, max: 1.3 },
    genderFactor: { M: 1.1, F: 0.95 },
    stateFactor: { 'SP': 1.2, 'RJ': 1.15, 'MG': 1.0, 'RS': 0.95 },
    coverageFactor: { basica: 0.8, intermediaria: 1.0, completa: 1.3 },
    deductibleFactor: { 1000: 1.2, 2000: 1.0, 3000: 0.9, 5000: 0.8 }
  },
  {
    id: 'bradesco',
    name: 'Bradesco Seguros',
    baseFactor: 1.05,
    ageFactor: { min: 0.85, max: 1.25 },
    genderFactor: { M: 1.08, F: 0.97 },
    stateFactor: { 'SP': 1.18, 'RJ': 1.12, 'MG': 0.98, 'RS': 0.92 },
    coverageFactor: { basica: 0.75, intermediaria: 0.95, completa: 1.25 },
    deductibleFactor: { 1000: 1.15, 2000: 0.95, 3000: 0.85, 5000: 0.75 }
  },
  {
    id: 'sulamerica',
    name: 'SulAmérica',
    baseFactor: 0.95,
    ageFactor: { min: 0.88, max: 1.28 },
    genderFactor: { M: 1.12, F: 0.93 },
    stateFactor: { 'SP': 1.22, 'RJ': 1.17, 'MG': 1.02, 'RS': 0.97 },
    coverageFactor: { basica: 0.82, intermediaria: 1.02, completa: 1.35 },
    deductibleFactor: { 1000: 1.25, 2000: 1.05, 3000: 0.95, 5000: 0.85 }
  },
  {
    id: 'allianz',
    name: 'Allianz',
    baseFactor: 1.08,
    ageFactor: { min: 0.92, max: 1.32 },
    genderFactor: { M: 1.06, F: 0.98 },
    stateFactor: { 'SP': 1.16, 'RJ': 1.10, 'MG': 0.96, 'RS': 0.90 },
    coverageFactor: { basica: 0.78, intermediaria: 0.98, completa: 1.28 },
    deductibleFactor: { 1000: 1.18, 2000: 0.98, 3000: 0.88, 5000: 0.78 }
  },
  {
    id: 'azul',
    name: 'Azul Seguros',
    baseFactor: 0.92,
    ageFactor: { min: 0.86, max: 1.26 },
    genderFactor: { M: 1.14, F: 0.91 },
    stateFactor: { 'SP': 1.24, 'RJ': 1.19, 'MG': 1.04, 'RS': 0.99 },
    coverageFactor: { basica: 0.85, intermediaria: 1.05, completa: 1.38 },
    deductibleFactor: { 1000: 1.28, 2000: 1.08, 3000: 0.98, 5000: 0.88 }
  }
]

// Função para calcular o preço base do veículo
export const calculateBasePrice = (vehicleValue, vehicleYear) => {
  const currentYear = new Date().getFullYear()
  const vehicleAge = currentYear - vehicleYear
  
  // Preço base é uma porcentagem do valor do veículo
  let basePercentage = 0.08 // 8% do valor do veículo
  
  // Ajuste por idade do veículo
  if (vehicleAge <= 2) {
    basePercentage *= 1.2 // Veículos novos são mais caros para segurar
  } else if (vehicleAge <= 5) {
    basePercentage *= 1.0
  } else if (vehicleAge <= 10) {
    basePercentage *= 0.9
  } else {
    basePercentage *= 0.8
  }
  
  return vehicleValue * basePercentage
}

// Função para calcular fator de idade do condutor
export const calculateAgeFactor = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  
  if (age < 25) return 1.4 // Jovens pagam mais
  if (age < 30) return 1.2
  if (age < 40) return 1.0
  if (age < 50) return 0.9
  if (age < 65) return 0.85
  return 1.1 // Idosos pagam um pouco mais
}

// Função para calcular fator de uso do veículo
export const calculateUsageFactor = (usage) => {
  const factors = {
    particular: 1.0,
    comercial: 1.3,
    uber: 1.5,
    taxi: 1.8
  }
  return factors[usage] || 1.0
}

// Função para calcular fator de garagem
export const calculateGarageFactor = (hasGarage) => {
  const factors = {
    sim: 0.9,
    nao: 1.2,
    as_vezes: 1.05
  }
  return factors[hasGarage] || 1.0
}

// Função principal para calcular cotações
export const calculateQuotes = (formData) => {
  const {
    vehicleValue,
    vehicleYear,
    birthDate,
    gender,
    state,
    usage,
    hasGarage,
    coverage,
    deductible
  } = formData
  
  const basePrice = calculateBasePrice(parseFloat(vehicleValue), parseInt(vehicleYear))
  const ageFactor = calculateAgeFactor(birthDate)
  const usageFactor = calculateUsageFactor(usage)
  const garageFactor = calculateGarageFactor(hasGarage)
  
  const quotes = insurers.map(insurer => {
    let price = basePrice * insurer.baseFactor
    
    // Aplicar fatores específicos da seguradora
    price *= ageFactor * (insurer.ageFactor.min + (insurer.ageFactor.max - insurer.ageFactor.min) * Math.random())
    price *= insurer.genderFactor[gender] || 1.0
    price *= insurer.stateFactor[state] || 1.0
    price *= insurer.coverageFactor[coverage] || 1.0
    price *= insurer.deductibleFactor[deductible] || 1.0
    price *= usageFactor
    price *= garageFactor
    
    // Adicionar variação aleatória pequena para simular diferenças reais
    price *= (0.95 + Math.random() * 0.1)
    
    // Calcular parcelas (12x com juros)
    const monthlyPrice = price / 10 // Aproximadamente 12x com juros
    
    return {
      id: insurer.id,
      insurerName: insurer.name,
      annualPrice: Math.round(price),
      monthlyPrice: Math.round(monthlyPrice),
      coverage: coverage,
      deductible: deductible,
      features: getCoverageFeatures(coverage),
      rating: Math.round((4 + Math.random()) * 10) / 10, // Rating entre 4.0 e 5.0
      processingTime: Math.floor(Math.random() * 5) + 1 + ' dia útil'
    }
  })
  
  // Ordenar por preço
  return quotes.sort((a, b) => a.annualPrice - b.annualPrice)
}

// Função para obter características da cobertura
const getCoverageFeatures = (coverage) => {
  const features = {
    basica: [
      'Danos a terceiros',
      'Roubo e furto',
      'Incêndio',
      'Assistência 24h'
    ],
    intermediaria: [
      'Danos a terceiros',
      'Roubo e furto',
      'Incêndio',
      'Colisão',
      'Vidros',
      'Assistência 24h',
      'Guincho'
    ],
    completa: [
      'Danos a terceiros',
      'Roubo e furto',
      'Incêndio',
      'Colisão',
      'Vidros',
      'Fenômenos naturais',
      'Carro reserva',
      'Assistência 24h',
      'Guincho',
      'Chaveiro'
    ]
  }
  
  return features[coverage] || features.basica
}

// Função para simular delay de processamento
export const simulateProcessingDelay = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 2000 + Math.random() * 1000) // 2-3 segundos
  })
}

