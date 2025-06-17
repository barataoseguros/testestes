// Serviço de chatbot com base de conhecimento local
class ChatBotService {
  constructor() {
    this.knowledgeBase = {
      // Informações sobre coberturas
      coberturas: {
        keywords: ['cobertura', 'coberturas', 'protege', 'proteção', 'inclui', 'cobre', 'tipo', 'tipos'],
        responses: [
          'Oferecemos 3 tipos de cobertura:\n\n🔵 **Básica**: Danos a terceiros, roubo/furto, incêndio e assistência 24h\n\n🟡 **Intermediária**: Tudo da básica + colisão, vidros e guincho\n\n🟢 **Completa**: Cobertura total + carro reserva, fenômenos naturais e chaveiro',
          'Nossas coberturas incluem:\n\n• **Responsabilidade Civil** - Danos a terceiros\n• **Roubo e Furto** - Proteção total do veículo\n• **Colisão** - Acidentes e batidas\n• **Incêndio** - Proteção contra fogo\n• **Fenômenos Naturais** - Enchentes, granizo, etc.\n• **Assistência 24h** - Guincho, chaveiro, pane seca'
        ]
      },

      // Informações sobre seguradoras
      seguradoras: {
        keywords: ['seguradora', 'seguradoras', 'empresa', 'empresas', 'parceiros', 'porto', 'bradesco', 'sulamerica', 'allianz', 'azul'],
        responses: [
          'Trabalhamos com as principais seguradoras do mercado:\n\n🏢 **Porto Seguro** - Líder em seguros auto no Brasil\n🏢 **Bradesco Seguros** - Tradição e confiança há décadas\n🏢 **SulAmérica** - Excelência em atendimento\n🏢 **Allianz** - Qualidade e padrão internacional\n🏢 **Azul Seguros** - Inovação e tecnologia',
          'Nossas seguradoras parceiras são reconhecidas pela:\n\n✅ **Solidez financeira**\n✅ **Rapidez no atendimento**\n✅ **Rede de oficinas credenciadas**\n✅ **Assistência 24 horas**\n✅ **Facilidade para acionamento'
        ]
      },

      // Informações sobre preços
      precos: {
        keywords: ['preço', 'preços', 'valor', 'valores', 'custa', 'custo', 'barato', 'caro', 'quanto', 'mensalidade'],
        responses: [
          'O valor do seguro varia conforme:\n\n📊 **Perfil do condutor** (idade, experiência, histórico)\n🚗 **Veículo** (modelo, ano, valor FIPE)\n📍 **Localização** (cidade, CEP, região)\n🛡️ **Cobertura escolhida** (básica, intermediária, completa)\n🏠 **Local de estacionamento** (garagem, rua)\n\nFaça uma cotação gratuita para ver os melhores preços!',
          'Fatores que influenciam o preço:\n\n• **Idade do condutor** - Jovens pagam mais\n• **Experiência** - Mais tempo de habilitação = desconto\n• **Histórico** - Sem sinistros = preço melhor\n• **CEP** - Regiões mais seguras pagam menos\n• **Uso do veículo** - Particular vs comercial\n• **Franquia** - Maior franquia = menor preço'
        ]
      },

      // Informações sobre franquia
      franquia: {
        keywords: ['franquia', 'franquias', 'participação', 'obrigatória', 'reduzida'],
        responses: [
          'A franquia é o valor que você paga em caso de sinistro:\n\n💰 **Baixa (R$ 1.000)** - Menor valor em sinistros, prêmio mais alto\n💰 **Média (R$ 2.000)** - Equilíbrio entre custo e benefício\n💰 **Alta (R$ 3.000+)** - Menor prêmio mensal, maior participação em sinistros\n\nEscolha conforme seu perfil e orçamento!',
          'Tipos de franquia disponíveis:\n\n🔸 **Franquia Normal** - Valor fixo por sinistro\n🔸 **Franquia Reduzida** - Menor valor para oficinas credenciadas\n🔸 **Franquia Diferenciada** - Valores diferentes por tipo de sinistro'
        ]
      },

      // Informações sobre sinistros
      sinistro: {
        keywords: ['sinistro', 'sinistros', 'acidente', 'acidentes', 'batida', 'colisão', 'roubo', 'furto'],
        responses: [
          'Em caso de sinistro:\n\n📞 **1.** Ligue imediatamente para a seguradora\n📋 **2.** Faça o boletim de ocorrência se necessário\n📸 **3.** Tire fotos do local e dos danos\n🚗 **4.** Solicite guincho se preciso\n📄 **5.** Reúna toda a documentação necessária\n\n⚡ **Importante**: Mantenha sempre os telefones de emergência salvos!',
          'Documentos necessários para sinistro:\n\n📋 **CNH** do condutor\n📋 **CRLV** do veículo\n📋 **Apólice** do seguro\n📋 **Boletim de Ocorrência** (quando aplicável)\n📋 **Laudo do IML** (em casos graves)\n📋 **Fotos** dos danos'
        ]
      },

      // Informações de contato
      contato: {
        keywords: ['contato', 'telefone', 'whatsapp', 'email', 'falar', 'atendimento', 'horário'],
        responses: [
          'Entre em contato conosco:\n\n📞 **Telefone**: (11) 3000-0000\n📱 **WhatsApp**: (11) 99999-9999\n📧 **E-mail**: contato@vaptseguros.com.br\n🕒 **Horário**: Segunda a sexta, 8h às 18h\n📍 **Endereço**: São Paulo - SP\n\n💬 **Chat online**: Disponível 24/7 aqui no site!'
        ]
      },

      // Informações sobre cotação
      cotacao: {
        keywords: ['cotação', 'cotações', 'orçamento', 'simular', 'calcular', 'cotar'],
        responses: [
          'Para fazer sua cotação:\n\n1️⃣ Clique em "Cotação" no menu\n2️⃣ Preencha seus dados pessoais\n3️⃣ Informe os dados do veículo (ou busque pela placa)\n4️⃣ Escolha o tipo de uso\n5️⃣ Selecione a cobertura desejada\n\n✨ Em poucos minutos você terá as melhores ofertas de múltiplas seguradoras!',
          'Nossa cotação online oferece:\n\n🔍 **Busca por placa** - Dados automáticos do veículo\n📊 **Múltiplas seguradoras** - Compare preços\n⚡ **Resultado instantâneo** - Sem espera\n💰 **Melhores preços** - Negociação direta\n📱 **Atendimento especializado** - Suporte completo'
        ]
      },

      // Informações sobre documentação
      documentos: {
        keywords: ['documento', 'documentos', 'documentação', 'cnh', 'crlv', 'cpf', 'rg'],
        responses: [
          'Documentos necessários para contratar:\n\n👤 **Pessoais**: CPF, RG, CNH\n🚗 **Veículo**: CRLV, nota fiscal (0km)\n🏠 **Comprovantes**: Residência e renda\n📋 **Formulários**: Questionário de avaliação de risco\n\n📝 **Dica**: Tenha tudo em mãos para agilizar o processo!'
        ]
      },

      // Informações sobre assistência 24h
      assistencia: {
        keywords: ['assistência', 'assistencia', '24h', 'guincho', 'chaveiro', 'pane', 'socorro'],
        responses: [
          'Nossa assistência 24h inclui:\n\n🚛 **Guincho** - Remoção do veículo\n🔑 **Chaveiro** - Abertura e confecção de chaves\n⛽ **Pane seca** - Combustível de emergência\n🔋 **Pane elétrica** - Auxílio com bateria\n🛞 **Troca de pneu** - Instalação do estepe\n🏥 **Transporte médico** - Em caso de acidente\n\n📞 **Disponível 24/7** em todo território nacional!'
        ]
      }
    }

    this.greetings = [
      'Olá! 👋 Sou o assistente virtual da Vapt Seguros. Como posso te ajudar hoje?',
      'Oi! 😊 Seja bem-vindo à Vapt Seguros! Em que posso ajudá-lo?',
      'Olá! Estou aqui para esclarecer suas dúvidas sobre seguros. Como posso ajudar?'
    ]

    this.farewells = [
      'Por nada! 😊 Fico feliz em ajudar! Se tiver mais dúvidas, estarei aqui.',
      'Foi um prazer ajudar! 🤝 Volte sempre que precisar!',
      'Obrigado pelo contato! 💙 Estamos sempre à disposição.'
    ]

    this.defaultResponses = [
      'Entendi sua pergunta! 🤔 Para te dar a melhor resposta, você pode:\n\n• Fazer uma cotação personalizada\n• Falar com nossos especialistas pelo telefone (11) 3000-0000\n• Enviar um e-mail para contato@vaptseguros.com.br\n\nPosso te ajudar com algo mais específico sobre seguros?',
      'Ótima pergunta! 💡 Nossa equipe especializada pode te dar uma resposta mais detalhada:\n\n📞 **(11) 3000-0000**\n📱 **WhatsApp: (11) 99999-9999**\n\nOu que tal fazer uma cotação gratuita para ver as melhores opções para você?'
    ]
  }

  // Método principal para processar mensagens
  processMessage(message) {
    const normalizedMessage = this.normalizeMessage(message)
    
    // Verificar saudações
    if (this.isGreeting(normalizedMessage)) {
      return this.getRandomResponse(this.greetings)
    }

    // Verificar agradecimentos/despedidas
    if (this.isFarewell(normalizedMessage)) {
      return this.getRandomResponse(this.farewells)
    }

    // Buscar na base de conhecimento
    const response = this.searchKnowledgeBase(normalizedMessage)
    if (response) {
      return response
    }

    // Resposta padrão
    return this.getRandomResponse(this.defaultResponses)
  }

  // Normalizar mensagem (remover acentos, converter para minúsculo)
  normalizeMessage(message) {
    return message
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  // Verificar se é uma saudação
  isGreeting(message) {
    const greetingKeywords = ['oi', 'ola', 'olá', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'e ai', 'eai']
    return greetingKeywords.some(keyword => message.includes(keyword))
  }

  // Verificar se é despedida/agradecimento
  isFarewell(message) {
    const farewellKeywords = ['obrigad', 'valeu', 'brigad', 'tchau', 'ate logo', 'falou', 'vlw']
    return farewellKeywords.some(keyword => message.includes(keyword))
  }

  // Buscar na base de conhecimento
  searchKnowledgeBase(message) {
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        return this.getRandomResponse(data.responses)
      }
    }
    return null
  }

  // Obter resposta aleatória de um array
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Método para adicionar nova entrada na base de conhecimento
  addKnowledge(category, keywords, responses) {
    this.knowledgeBase[category] = {
      keywords: keywords,
      responses: responses
    }
  }

  // Método para obter estatísticas da base de conhecimento
  getStats() {
    const categories = Object.keys(this.knowledgeBase).length
    const totalKeywords = Object.values(this.knowledgeBase)
      .reduce((total, data) => total + data.keywords.length, 0)
    const totalResponses = Object.values(this.knowledgeBase)
      .reduce((total, data) => total + data.responses.length, 0)

    return {
      categories,
      totalKeywords,
      totalResponses
    }
  }
}

// Exportar o serviço
export default ChatBotService

