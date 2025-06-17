import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Car, 
  Calendar, 
  Fuel, 
  Palette, 
  Hash,
  DollarSign,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { 
  fetchCarBrands, 
  fetchCarModels, 
  fetchCarYears, 
  fetchCarFipeValue,
  fetchVehicleByPlate,
  validatePlate,
  formatPlate
} from '../services/vehicleApi'

const VehicleSearch = ({ onVehicleSelect, selectedVehicle }) => {
  const [searchType, setSearchType] = useState('manual') // 'manual' ou 'plate'
  const [plateInput, setPlateInput] = useState('')
  const [plateLoading, setPlateLoading] = useState(false)
  const [plateData, setPlateData] = useState(null)
  const [plateError, setPlateError] = useState('')

  // Estados para busca manual
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [fipeValue, setFipeValue] = useState(null)
  const [fipeLoading, setFipeLoading] = useState(false)

  // Carregar marcas ao montar o componente
  useEffect(() => {
    const loadBrands = async () => {
      const brandsData = await fetchCarBrands()
      setBrands(brandsData)
    }
    loadBrands()
  }, [])

  // Carregar modelos quando marca é selecionada
  useEffect(() => {
    if (selectedBrand) {
      const loadModels = async () => {
        const modelsData = await fetchCarModels(selectedBrand)
        setModels(modelsData.modelos || [])
        setSelectedModel('')
        setSelectedYear('')
        setYears([])
        setFipeValue(null)
      }
      loadModels()
    }
  }, [selectedBrand])

  // Carregar anos quando modelo é selecionado
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const loadYears = async () => {
        const yearsData = await fetchCarYears(selectedBrand, selectedModel)
        setYears(yearsData)
        setSelectedYear('')
        setFipeValue(null)
      }
      loadYears()
    }
  }, [selectedBrand, selectedModel])

  // Carregar valor FIPE quando ano é selecionado
  useEffect(() => {
    if (selectedBrand && selectedModel && selectedYear) {
      const loadFipeValue = async () => {
        setFipeLoading(true)
        const fipeData = await fetchCarFipeValue(selectedBrand, selectedModel, selectedYear)
        setFipeValue(fipeData)
        setFipeLoading(false)
        
        if (fipeData) {
          onVehicleSelect({
            brand: brands.find(b => b.valor === selectedBrand)?.nome || '',
            model: fipeData.Modelo || '',
            year: fipeData.AnoModelo || '',
            fipeValue: fipeData.Valor || '',
            fipeCode: fipeData.CodigoFipe || '',
            fuel: fipeData.Combustivel || '',
            searchType: 'manual'
          })
        }
      }
      loadFipeValue()
    }
  }, [selectedBrand, selectedModel, selectedYear, brands, onVehicleSelect])

  const handlePlateSearch = async () => {
    const validation = validatePlate(plateInput)
    
    if (!validation.isValid) {
      setPlateError('Formato de placa inválido. Use ABC1234 ou ABC1D23')
      return
    }

    setPlateLoading(true)
    setPlateError('')
    
    try {
      const vehicleData = await fetchVehicleByPlate(validation.cleanPlate)
      setPlateData(vehicleData)
      
      onVehicleSelect({
        brand: vehicleData.marca,
        model: vehicleData.modelo,
        year: vehicleData.ano,
        fipeValue: vehicleData.fipeValue,
        fipeCode: vehicleData.fipeCode,
        fuel: vehicleData.combustivel,
        color: vehicleData.cor,
        plate: formatPlate(plateInput),
        chassi: vehicleData.chassi,
        renavam: vehicleData.renavam,
        searchType: 'plate'
      })
    } catch (error) {
      setPlateError('Erro ao consultar dados da placa. Tente novamente.')
    } finally {
      setPlateLoading(false)
    }
  }

  const formatCurrency = (value) => {
    if (typeof value === 'string') {
      // Remove caracteres não numéricos e converte para número
      const numericValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'))
      if (isNaN(numericValue)) return value
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numericValue)
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Seletor de tipo de busca */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant={searchType === 'plate' ? 'default' : 'outline'}
          onClick={() => setSearchType('plate')}
          className="flex-1"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar por Placa
        </Button>
        <Button
          type="button"
          variant={searchType === 'manual' ? 'default' : 'outline'}
          onClick={() => setSearchType('manual')}
          className="flex-1"
        >
          <Car className="mr-2 h-4 w-4" />
          Busca Manual
        </Button>
      </div>

      {/* Busca por placa */}
      {searchType === 'plate' && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="plate">Placa do Veículo</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="plate"
                    placeholder="ABC1234 ou ABC1D23"
                    value={plateInput}
                    onChange={(e) => setPlateInput(e.target.value.toUpperCase())}
                    className="flex-1"
                    maxLength={7}
                  />
                  <Button 
                    type="button"
                    onClick={handlePlateSearch}
                    disabled={plateLoading || !plateInput}
                  >
                    {plateLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {plateError && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {plateError}
                  </p>
                )}
              </div>

              {plateData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Veículo Encontrado</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{plateData.marca} {plateData.modelo}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{plateData.ano}</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{plateData.combustivel}</span>
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{plateData.cor}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{formatCurrency(plateData.fipeValue)}</span>
                    </div>
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{plateData.fipeCode}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Busca manual */}
      {searchType === 'manual' && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Marca */}
              <div>
                <Label htmlFor="brand">Marca</Label>
                <select
                  id="brand"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Selecione a marca</option>
                  {brands.map((brand) => (
                    <option key={brand.valor} value={brand.valor}>
                      {brand.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modelo */}
              {selectedBrand && (
                <div>
                  <Label htmlFor="model">Modelo</Label>
                  <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Selecione o modelo</option>
                    {models.map((model) => (
                      <option key={model.codigo} value={model.codigo}>
                        {model.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Ano */}
              {selectedModel && (
                <div>
                  <Label htmlFor="year">Ano</Label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Selecione o ano</option>
                    {years.map((year) => (
                      <option key={year.codigo} value={year.codigo}>
                        {year.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Valor FIPE */}
              {fipeLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Consultando valor FIPE...</span>
                </div>
              )}

              {fipeValue && !fipeLoading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Valor FIPE Encontrado</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Modelo:</span>
                      <span>{fipeValue.Modelo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Ano:</span>
                      <span>{fipeValue.AnoModelo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Combustível:</span>
                      <span>{fipeValue.Combustivel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Código FIPE:</span>
                      <span>{fipeValue.CodigoFipe}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium">Valor FIPE:</span>
                      <Badge className="bg-accent text-accent-foreground">
                        {fipeValue.Valor}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumo do veículo selecionado */}
      {selectedVehicle && (
        <Card className="border-accent">
          <CardContent className="pt-6">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-accent mr-2" />
              <h4 className="font-semibold text-accent">Veículo Selecionado</h4>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Veículo:</strong> {selectedVehicle.brand} {selectedVehicle.model}</p>
              <p><strong>Ano:</strong> {selectedVehicle.year}</p>
              {selectedVehicle.plate && <p><strong>Placa:</strong> {selectedVehicle.plate}</p>}
              <p><strong>Valor FIPE:</strong> {typeof selectedVehicle.fipeValue === 'number' ? formatCurrency(selectedVehicle.fipeValue) : selectedVehicle.fipeValue}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default VehicleSearch

