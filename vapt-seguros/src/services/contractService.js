// Serviço para integração com o backend de contratação

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

class ContractService {
  async createContract(contractData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contracts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar contrato')
      }

      return data
    } catch (error) {
      console.error('Erro ao criar contrato:', error)
      throw error
    }
  }

  async sendConfirmationEmail(policyNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/email/send-contract-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ policy_number: policyNumber })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar e-mail')
      }

      return data
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw error
    }
  }

  async getContract(policyNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contracts/${policyNumber}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar contrato')
      }

      return data
    } catch (error) {
      console.error('Erro ao buscar contrato:', error)
      throw error
    }
  }

  async testBackendConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contracts/health`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao conectar com backend:', error)
      throw error
    }
  }

  async validateCPF(cpf) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contracts/validate-cpf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao validar CPF')
      }

      return data
    } catch (error) {
      console.error('Erro ao validar CPF:', error)
      throw error
    }
  }
}

export default new ContractService()

