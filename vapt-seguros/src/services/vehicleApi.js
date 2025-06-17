// Serviços para integração com APIs de veículos
const BRASIL_API_BASE = 'https://brasilapi.com.br/api/fipe'

// Função para buscar marcas de carros
export const fetchCarBrands = async () => {
  try {
    const response = await fetch(`${BRASIL_API_BASE}/marcas/v1/carros`)
    if (!response.ok) throw new Error('Erro ao buscar marcas')
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar marcas:', error)
    return []
  }
}

// Função para buscar modelos de uma marca
export const fetchCarModels = async (brandCode) => {
  try {
    const response = await fetch(`${BRASIL_API_BASE}/marcas/${brandCode}/modelos/v1/carros`)
    if (!response.ok) throw new Error('Erro ao buscar modelos')
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar modelos:', error)
    return []
  }
}

// Função para buscar anos de um modelo
export const fetchCarYears = async (brandCode, modelCode) => {
  try {
    const response = await fetch(`${BRASIL_API_BASE}/marcas/${brandCode}/modelos/${modelCode}/anos/v1/carros`)
    if (!response.ok) throw new Error('Erro ao buscar anos')
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar anos:', error)
    return []
  }
}

// Função para buscar valor FIPE de um veículo específico
export const fetchCarFipeValue = async (brandCode, modelCode, year) => {
  try {
    const response = await fetch(`${BRASIL_API_BASE}/marcas/${brandCode}/modelos/${modelCode}/anos/${year}/v1/carros`)
    if (!response.ok) throw new Error('Erro ao buscar valor FIPE')
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar valor FIPE:', error)
    return null
  }
}

// Função simulada para buscar dados por placa (não há API gratuita disponível)
export const fetchVehicleByPlate = async (plate) => {
  // Simulação de busca por placa
  // Em um ambiente real, seria necessário usar uma API paga
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dados simulados baseados na placa
      const mockData = {
        placa: plate,
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: '2020',
        combustivel: 'Flex',
        cor: 'Prata',
        chassi: 'ABC123456789',
        renavam: '123456789',
        fipeValue: 85000,
        fipeCode: '005004-1'
      }
      resolve(mockData)
    }, 1500) // Simula delay da API
  })
}

// Função para validar formato de placa
export const validatePlate = (plate) => {
  // Remove espaços e converte para maiúsculo
  const cleanPlate = plate.replace(/\s/g, '').toUpperCase()
  
  // Valida formato antigo (ABC1234) ou Mercosul (ABC1D23)
  const oldFormat = /^[A-Z]{3}[0-9]{4}$/
  const mercosulFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/
  
  return {
    isValid: oldFormat.test(cleanPlate) || mercosulFormat.test(cleanPlate),
    cleanPlate,
    format: oldFormat.test(cleanPlate) ? 'old' : mercosulFormat.test(cleanPlate) ? 'mercosul' : 'invalid'
  }
}

// Função para formatar placa para exibição
export const formatPlate = (plate) => {
  const { cleanPlate, format } = validatePlate(plate)
  
  if (format === 'old') {
    return `${cleanPlate.slice(0, 3)}-${cleanPlate.slice(3)}`
  } else if (format === 'mercosul') {
    return `${cleanPlate.slice(0, 3)}${cleanPlate.slice(3, 4)}${cleanPlate.slice(4, 5)}${cleanPlate.slice(5)}`
  }
  
  return cleanPlate
}

