// Dados de veículos para auto-complete
export const vehicleBrands = [
  'Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Honda', 'Toyota', 'Hyundai', 
  'Nissan', 'Renault', 'Peugeot', 'Citroën', 'BMW', 'Mercedes-Benz', 'Audi'
]

export const vehicleModels = {
  'Chevrolet': ['Onix', 'Prisma', 'Cruze', 'Tracker', 'Equinox', 'S10', 'Spin'],
  'Volkswagen': ['Gol', 'Polo', 'Virtus', 'T-Cross', 'Tiguan', 'Amarok', 'Fox'],
  'Fiat': ['Argo', 'Cronos', 'Pulse', 'Fastback', 'Toro', 'Strada', 'Mobi'],
  'Ford': ['Ka', 'EcoSport', 'Territory', 'Ranger', 'Edge', 'Fusion'],
  'Honda': ['City', 'Civic', 'Fit', 'HR-V', 'CR-V', 'Accord'],
  'Toyota': ['Etios', 'Yaris', 'Corolla', 'RAV4', 'Hilux', 'Camry'],
  'Hyundai': ['HB20', 'Creta', 'Tucson', 'Santa Fe', 'Azera'],
  'Nissan': ['March', 'Versa', 'Sentra', 'Kicks', 'X-Trail', 'Frontier'],
  'Renault': ['Kwid', 'Logan', 'Sandero', 'Duster', 'Captur', 'Oroch'],
  'Peugeot': ['208', '2008', '3008', '5008', 'Partner'],
  'Citroën': ['C3', 'C4 Cactus', 'Aircross', 'Berlingo'],
  'BMW': ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5'],
  'Mercedes-Benz': ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC', 'GLE'],
  'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7']
}

export const fuelTypes = [
  'Gasolina',
  'Álcool',
  'Flex',
  'Diesel',
  'GNV',
  'Elétrico',
  'Híbrido'
]

export const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export const genderOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' }
]

export const maritalStatusOptions = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' }
]

export const usageOptions = [
  { value: 'particular', label: 'Particular' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'uber', label: 'Uber/99' },
  { value: 'taxi', label: 'Táxi' }
]

export const garageOptions = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
  { value: 'as_vezes', label: 'Às vezes' }
]

export const coverageOptions = [
  {
    id: 'basica',
    name: 'Básica',
    description: 'Cobertura essencial',
    features: ['Danos a terceiros', 'Roubo e furto', 'Incêndio']
  },
  {
    id: 'intermediaria',
    name: 'Intermediária',
    description: 'Proteção ampliada',
    features: ['Danos a terceiros', 'Roubo e furto', 'Incêndio', 'Colisão', 'Vidros']
  },
  {
    id: 'completa',
    name: 'Completa',
    description: 'Máxima proteção',
    features: ['Danos a terceiros', 'Roubo e furto', 'Incêndio', 'Colisão', 'Vidros', 'Fenômenos naturais', 'Carro reserva']
  }
]

export const deductibleOptions = [
  { value: 1000, label: 'R$ 1.000' },
  { value: 2000, label: 'R$ 2.000' },
  { value: 3000, label: 'R$ 3.000' },
  { value: 5000, label: 'R$ 5.000' }
]

