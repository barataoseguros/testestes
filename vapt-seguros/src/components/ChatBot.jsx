import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  HelpCircle,
  Shield,
  Car,
  DollarSign,
  Phone
} from 'lucide-react'
import ChatBotService from '../services/chatbotService'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! 👋 Sou o assistente virtual da Vapt Seguros. Como posso te ajudar hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatbotService = useRef(new ChatBotService())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: Shield, text: 'Tipos de Cobertura', action: () => sendQuickMessage('Quais são os tipos de cobertura?') },
    { icon: Car, text: 'Como Cotar', action: () => sendQuickMessage('Como fazer uma cotação?') },
    { icon: DollarSign, text: 'Preços', action: () => sendQuickMessage('Como são calculados os preços?') },
    { icon: Phone, text: 'Contato', action: () => sendQuickMessage('Como entrar em contato?') }
  ]

  const sendQuickMessage = (message) => {
    setInputMessage(message)
    handleSendMessage(message)
  }

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular delay de digitação mais realista
    const typingDelay = Math.min(messageText.length * 50 + 500, 2500)
    
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: chatbotService.current.processMessage(messageText),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, typingDelay)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessage = (content) => {
    // Converter markdown simples para JSX
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="font-semibold">{line.slice(2, -2)}</div>
      }
      if (line.includes('**')) {
        const parts = line.split('**')
        return (
          <div key={index}>
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </div>
        )
      }
      return <div key={index}>{line}</div>
    })
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg animate-pulse"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-90">
            Precisa de ajuda? 💬
          </div>
          {/* Indicador de notificação */}
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-accent text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bot className="h-5 w-5" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <CardTitle className="text-sm">Assistente Vapt Seguros</CardTitle>
              <p className="text-xs opacity-90">Online agora • Resposta rápida</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                      message.type === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-white text-gray-900 rounded-bl-sm border'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                      )}
                      <div className="text-sm">
                        {formatMessage(message.content)}
                      </div>
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-70" />
                      )}
                    </div>
                    <div className={`text-xs mt-1 opacity-60 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm border rounded-bl-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-accent" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">Perguntas frequentes:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-auto p-2 text-xs hover:bg-accent hover:text-white transition-colors"
                          onClick={action.action}
                        >
                          <action.icon className="h-3 w-3 mr-1" />
                          {action.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Dica</span>
                    </div>
                    <p className="text-xs text-blue-700">
                      Posso ajudar com dúvidas sobre coberturas, preços, seguradoras e como fazer sua cotação!
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-3 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 border-gray-300 focus:border-accent"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  size="icon"
                  className="bg-accent hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Powered by Vapt Seguros IA
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default ChatBot

