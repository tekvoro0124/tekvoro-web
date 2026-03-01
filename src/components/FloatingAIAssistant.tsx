import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sourceArticles?: Array<{
    title: string;
    url: string;
    trustScore: number;
    summary: string;
  }>;
}

const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Tekvoro's AI Assistant. Ask me any question about corporate news, industry trends, or company insights, and I'll search our database of 1000+ trusted sources to give you a well-researched answer."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/news/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: inputValue,
          limit: 5
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.data.answer,
          sourceArticles: data.data.sourceArticles
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Assistant error:', err);
      setError('Failed to communicate with AI assistant');
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: "Hi! I'm Tekvoro's AI Assistant. Ask me any question about corporate news, industry trends, or company insights."
      }
    ]);
    setError('');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-xl hover:shadow-2xl transition flex items-center justify-center group"
        title="AI Assistant"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-2 h-2 bg-white rounded-full top-1 right-1"
              />
            </>
          )}
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-96"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-600 to-teal-700 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">Tekvoro AI Assistant</h3>
                  <p className="text-xs text-teal-100">Trust-powered insights</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 text-sm ${
                      message.type === 'user'
                        ? 'bg-teal-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {/* Source Articles */}
                    {message.sourceArticles && message.sourceArticles.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-opacity-30 border-current space-y-2">
                        <p className="text-xs font-semibold opacity-80">
                          📚 Sources:
                        </p>
                        {message.sourceArticles.map((article, idx) => (
                          <a
                            key={idx}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs opacity-90 hover:opacity-100 rounded px-2 py-1 transition"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.1)'
                            }}
                          >
                            <div className="font-semibold line-clamp-1">
                              {article.title}
                            </div>
                            <div className="opacity-75">
                              Trust: {article.trustScore}/100
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-200 text-gray-900 rounded-lg rounded-bl-none p-3 flex gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Searching sources...</span>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-red-100 text-red-700 rounded-lg p-3 flex gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-200 bg-white rounded-b-2xl"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask about news, trends..."
                  disabled={loading}
                  className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 text-gray-700 placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-2 flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                >
                  New chat
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop (click to close) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIAssistant;
