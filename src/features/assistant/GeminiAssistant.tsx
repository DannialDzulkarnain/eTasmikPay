import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, User, Bot } from 'lucide-react';
import { getGeminiResponse } from '../../lib/gemini';
import { Role } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface GeminiAssistantProps {
  userRole: Role;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: `Assalamualaikum! Saya pembantu AI eTasmikPay. Bagaimana saya boleh membantu anda hari ini?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const roleContext = userRole === Role.USTAZ ? 'an Ustaz (Quran Teacher)' : userRole === Role.PARENT ? 'a Parent' : 'an Admin';
    const aiText = await getGeminiResponse(userMsg.text, roleContext);

    const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 z-50 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6" />
        <span className="font-semibold hidden sm:inline">AI Assistant</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-sm md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary-700 text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Hafazan AI Helper</h3>
                <p className="text-xs text-primary-100">Powered by Gemini 2.5</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-primary-100 text-primary-600'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.sender === 'user' 
                      ? 'bg-white text-slate-800 rounded-tr-none border border-slate-100' 
                      : 'bg-primary-600 text-white rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex max-w-[80%] gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                       <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 rounded-b-2xl">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya tentang hafazan..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiAssistant;
