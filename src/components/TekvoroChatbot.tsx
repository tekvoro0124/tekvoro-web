import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader, Bot, User, Sparkles, Calendar, HelpCircle, Phone, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  intent?: string;
  suggestedActions?: Array<{ label: string; action: string }>;
  collectInfo?: string[];
}

interface ServiceRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

const TekvoroChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Tekvoro's AI Assistant. I can help you explore our services, book a demo, get a quote, or answer any questions. What would you like to know?",
      timestamp: new Date(),
      suggestedActions: [
        { label: 'Explore Services', action: 'services' },
        { label: 'Book a Demo', action: 'demo' },
        { label: 'Get a Quote', action: 'quote' },
        { label: 'Support', action: 'support' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [collectingInfo, setCollectingInfo] = useState<{ type: string; fields: string[]; data: Partial<ServiceRequest> } | null>(null);
  const [currentField, setCurrentField] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const addMessage = (type: 'user' | 'assistant', content: string, extra?: Partial<Message>) => {
    const msg: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      ...extra
    };
    setMessages(prev => [...prev, msg]);
    return msg;
  };

  const handleSuggestedAction = async (action: string) => {
    const actionMessages: Record<string, string> = {
      services: "Tell me about your services",
      demo: "I'd like to book a demo",
      quote: "I'd like to get a quote",
      support: "I need support",
      sales: "I'd like to speak with sales",
      callback: "Please call me back",
      faq: "Show me FAQs",
      about: "Tell me about Tekvoro",
      contact: "How can I contact you?"
    };
    
    const message = actionMessages[action] || action;
    
    if (['demo', 'quote', 'support', 'callback'].includes(action)) {
      addMessage('user', message);
      
      const fields = action === 'support' 
        ? ['name', 'email', 'message'] 
        : ['name', 'email', 'company', 'service'];
      
      setCollectingInfo({ type: action, fields, data: {} });
      setCurrentField(fields[0]);
      
      const prompts: Record<string, string> = {
        demo: "I'd be happy to schedule a demo for you! Let me collect some information. What's your name?",
        quote: "Great! I'll help you get a custom quote. First, what's your name?",
        support: "I'm here to help! To create a support ticket, please tell me your name.",
        callback: "I'll arrange for someone to call you back. What's your name?"
      };
      
      addMessage('assistant', prompts[action] || "Let me help you with that. What's your name?");
    } else {
      setInputValue(message);
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }, 100);
    }
  };

  const handleInfoCollection = async (value: string) => {
    if (!collectingInfo) return;
    
    const { type, fields, data } = collectingInfo;
    const updatedData = { ...data, [currentField]: value };
    
    const currentIndex = fields.indexOf(currentField);
    const nextField = fields[currentIndex + 1];
    
    if (nextField) {
      setCollectingInfo({ type, fields, data: updatedData });
      setCurrentField(nextField);
      
      const prompts: Record<string, string> = {
        email: "What's your email address?",
        company: "What company are you with?",
        phone: "What's your phone number? (optional - press Enter to skip)",
        service: "Which service interests you? (AI Solutions, Web Development, Mobile Apps, Cloud Services, Healthcare Tech, or Automation)",
        message: "Please describe your issue or question:"
      };
      
      addMessage('assistant', prompts[nextField] || `What's your ${nextField}?`);
    } else {
      setCollectingInfo(null);
      setCurrentField('');
      
      addMessage('assistant', "Thank you! Let me submit your request...");
      setLoading(true);
      
      try {
        const response = await fetch(`${apiUrl}/api/chat/submit-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            sessionId,
            ...updatedData
          })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
          addMessage('assistant', result.data.message, {
            suggestedActions: [
              { label: 'Explore Services', action: 'services' },
              { label: 'Ask a Question', action: 'question' }
            ]
          });
        } else {
          addMessage('assistant', "I couldn't submit your request right now. Please email us at info@tekvoro.com or try again.");
        }
      } catch (err) {
        addMessage('assistant', "I'm having trouble connecting. Please email us directly at info@tekvoro.com");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = inputValue.trim();
    addMessage('user', userMessage);
    setInputValue('');

    if (collectingInfo) {
      handleInfoCollection(userMessage);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        addMessage('assistant', data.data.message, {
          intent: data.data.intent,
          suggestedActions: data.data.suggestedActions,
          collectInfo: data.data.collectInfo
        });
        
        if (data.data.collectInfo) {
          setCollectingInfo({ 
            type: data.data.intent.toLowerCase().replace('_request', ''), 
            fields: data.data.collectInfo, 
            data: {} 
          });
          setCurrentField(data.data.collectInfo[0]);
        }
      } else {
        addMessage('assistant', data.fallback || "I'm having trouble understanding. Could you rephrase that?");
      }
    } catch (err) {
      console.error('Chat error:', err);
      addMessage('assistant', "I'm having trouble connecting right now. You can reach us at info@tekvoro.com");
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([{
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Tekvoro's AI Assistant. How can I help you today?",
      timestamp: new Date(),
      suggestedActions: [
        { label: 'Explore Services', action: 'services' },
        { label: 'Book a Demo', action: 'demo' },
        { label: 'Get a Quote', action: 'quote' },
        { label: 'Support', action: 'support' }
      ]
    }]);
    setCollectingInfo(null);
    setCurrentField('');
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl hover:shadow-orange-500/25 transition flex items-center justify-center"
        title="Chat with Tekvoro AI"
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X className="w-6 h-6" /> : (
            <>
              <Bot className="w-6 h-6" />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-3 h-3 bg-green-400 rounded-full top-0 right-0 border-2 border-white"
              />
            </>
          )}
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[600px] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Tekvoro AI Assistant</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/20 rounded-lg transition">
                    <ChevronDown className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                        : 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <div className={`rounded-2xl p-3 text-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-tr-none'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-sm'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {/* Suggested Actions */}
                      {message.suggestedActions && message.suggestedActions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.suggestedActions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestedAction(action.action)}
                              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-500/30 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-3 shadow-sm">
                      <div className="flex gap-1">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-orange-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-orange-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-orange-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={collectingInfo ? `Enter your ${currentField}...` : "Type your message..."}
                  disabled={loading}
                  className="flex-1 text-sm px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="p-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <button type="button" onClick={handleNewChat} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition">
                    New chat
                  </button>
                </div>
                <p className="text-xs text-gray-400">Powered by Tekvoro AI</p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized State */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <Bot className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">Tekvoro AI</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TekvoroChatbot;
