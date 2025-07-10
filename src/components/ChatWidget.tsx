'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Send, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sendMessage, fetchMessages, sendGuestMessage, ChatMessage } from '@/lib/chat';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const welcomeMessage = "Hi there! How can I assist you today in finding the perfect fit?";

  useEffect(() => {
    if (user && isOpen) {
      const unsubscribe = fetchMessages(user.uid, (msgs) => {
        setMessages(msgs);
      });
      return unsubscribe;
    }
  }, [user, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        userId: 'assistant',
        message: welcomeMessage,
        timestamp: new Date(),
        isAdmin: true
      }]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I'd be happy to help you find the perfect outfit!",
        "Let me assist you with your fashion needs.",
        "What style are you looking for today?",
        "I can help you with sizing, styling, or product recommendations."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        userId: 'assistant',
        message: randomResponse,
        timestamp: new Date(),
        isAdmin: true
      }]);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      userId: user?.uid || guestEmail,
      message: newMessage,
      timestamp: new Date(),
      isAdmin: false
    };

    setMessages(prev => [...prev, userMessage]);

    if (user) {
      await sendMessage(user.uid, newMessage);
    } else if (guestEmail) {
      await sendGuestMessage(guestEmail, newMessage);
    }

    setNewMessage('');
    simulateTyping();
  };

  const handleGuestEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestEmail.trim()) {
      setShowEmailForm(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!user && !isOpen) {
      setShowEmailForm(true);
    }
  };

  return (
    <>
      {/* CHAT BUTTON - ALWAYS VISIBLE */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full fast-transition chat-widget flex items-center space-x-3"
        style={{
          background: '#393E46',
          border: '1px solid #697565',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        {/* R.png Logo - 36x36px max */}
        <div className="w-9 h-9 relative rounded-full overflow-hidden flex items-center justify-center">
          <img
            src="/R.png"
            alt="RARITONE Chat"
            className="chat-icon"
          />
        </div>
        <span className="font-medium text-[#DFD0B8]">
          Chat with us
        </span>
      </button>

      {/* INSTANT CHAT MODAL */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl overflow-hidden fast-transition"
          style={{
            background: '#393E46',
            border: '1px solid #697565',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header */}
          <div 
            className="text-[#DFD0B8] p-4 flex items-center justify-between"
            style={{
              background: '#181C14',
              borderBottom: '1px solid #697565'
            }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: '#393E46', border: '1px solid #697565' }}
              >
                <img
                  src="/R.png"
                  alt="RARITONE"
                  className="w-6 h-6 object-contain"
                  style={{
                    filter: 'brightness(1.2) contrast(1.1)',
                    opacity: 1
                  }}
                />
              </div>
              <span className="font-medium">Chat with a client advisor</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/10 rounded fast-transition"
              >
                <ChevronDown 
                  size={16} 
                  className={`fast-transition ${isMinimized ? 'rotate-180' : ''}`}
                />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded fast-transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div>
              {/* Guest Email Form */}
              {showEmailForm && !user && (
                <div 
                  className="p-4"
                  style={{
                    background: '#181C14',
                    borderBottom: '1px solid #697565'
                  }}
                >
                  <h4 className="font-medium mb-2 text-[#DFD0B8]">Privacy Notice</h4>
                  <form onSubmit={handleGuestEmailSubmit} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="input-dark w-full px-3 py-2 rounded-md"
                      required
                    />
                    <p className="text-xs text-[#948979]">
                      Your personal data is collected in the course of providing remote chat assistance and will be processed in full compliance with our privacy policy.
                    </p>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="accept" required className="rounded" />
                      <label htmlFor="accept" className="text-xs text-[#948979]">I accept</label>
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary py-2 rounded-md font-medium"
                    >
                      Start chat
                    </button>
                  </form>
                </div>
              )}

              {/* Chat Messages */}
              {(user || (!showEmailForm && guestEmail)) && (
                <>
                  <div className="h-64 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm fast-transition ${
                            message.isAdmin
                              ? 'text-[#DFD0B8] border border-[#697565]'
                              : 'bg-[#DFD0B8] text-[#222831]'
                          }`}
                          style={message.isAdmin ? { background: '#393E46' } : {}}
                        >
                          {message.message}
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div 
                          className="text-[#DFD0B8] px-3 py-2 rounded-lg text-sm border border-[#697565]"
                          style={{ background: '#393E46' }}
                        >
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#948979] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#948979] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-[#948979] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div 
                    className="p-4"
                    style={{
                      background: '#181C14',
                      borderTop: '1px solid #697565'
                    }}
                  >
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="input-dark flex-1 px-3 py-2 rounded-full"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="btn-primary px-4 py-2 rounded-full font-medium"
                      >
                        <Send size={16} />
                      </button>
                      <button className="btn-secondary px-4 py-2 rounded-full">
                        <Mic size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;