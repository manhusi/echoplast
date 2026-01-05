import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, RefreshCw, CalendarCheck, ArrowRightCircle } from 'lucide-react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { FULL_SERVICES_DATA } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the tool for recommending a service
const recommendServiceFunction: FunctionDeclaration = {
  name: 'recommendService',
  parameters: {
    type: Type.OBJECT,
    description: 'Recommend a specific aesthetic or dermatological service to the user and explain why.',
    properties: {
      serviceName: {
        type: Type.STRING,
        description: 'The exact name of the service from the available list.',
      },
      reasoning: {
        type: Type.STRING,
        description: 'A brief, friendly explanation of why this service fits the user needs (in Hungarian).',
      },
    },
    required: ['serviceName', 'reasoning'],
  },
};

const DEFAULT_SUGGESTIONS = ['Ránctalanítás', 'Pattanásos bőr', 'Pigmentfoltok', 'Bőrmegújítás'];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; sender: 'bot' | 'user'; text?: string; isRecommendation?: boolean; serviceData?: any }[]>([
    { id: 1, sender: 'bot', text: 'Üdvözlöm a Dunakanyar Esztétika virtuális asszisztensében! 👋' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  
  // Use a ref for the container instead of a bottom element to prevent page jumping
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      // Using scrollTo on the container specifically prevents the whole window from jumping
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated before scrolling
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping, currentSuggestions]);

  // Helper to parse options from AI text
  // Expected format in AI response: "Some text... [OPTIONS: Option 1 | Option 2 | Option 3]"
  const parseResponse = (text: string) => {
    const optionsRegex = /\[OPTIONS: (.*?)\]/;
    const match = text.match(optionsRegex);
    
    let cleanText = text;
    let newSuggestions = [];

    if (match && match[1]) {
      // Found options, parse them
      newSuggestions = match[1].split('|').map(s => s.trim());
      // Remove the options tag from the display text
      cleanText = text.replace(match[0], '').trim();
    } 

    return { cleanText, newSuggestions };
  };

  // Initial sequence and chat setup
  useEffect(() => {
    const initChat = async () => {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the virtual assistant for Dr. Kondorosi Ildikó at Dunakanyar Esztétika. 
          Your goal is to help users find the right aesthetic or dermatological service by asking 2-3 targeted diagnostic questions.
          Speak Hungarian. Be polite, professional, yet friendly. 
          Keep your responses concise (max 2-3 sentences).
          
          IMPORTANT RULE FOR INTERACTION:
          At the end of EVERY question you ask, you MUST provide 3-4 short, clickable options for the user to answer easily.
          Format these options strictly like this at the very end of your message: 
          [OPTIONS: Option 1 | Option 2 | Option 3]

          Example: 
          "Milyen típusú bőrproblémát tapasztal?"
          [OPTIONS: Ráncok | Pattanások | Pigmentfoltok | Megereszkedett bőr]
          
          Here is the list of available services to guide your diagnosis:
          ${JSON.stringify(FULL_SERVICES_DATA)}

          Process:
          1. Ask the user about their skin concerns. Provide [OPTIONS: ...]
          2. Based on their answer, ask clarifying questions (location, severity, etc.). Provide relevant [OPTIONS: ...] based on the context.
          3. When you have identified the most likely service, DO NOT just say it in text. You MUST call the 'recommendService' tool.
          `,
          tools: [{ functionDeclarations: [recommendServiceFunction] }],
        },
      });
      setChatSession(chat);

      // Simulate initial typing for the greeting extension
      setTimeout(() => setIsTyping(true), 800);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev, 
          { id: 2, sender: 'bot', text: 'Dr. Kondorosi Ildikó vagyok. Segítek megtalálni az Ön bőrének legmegfelelőbb kezelést. Miben segíthetek ma?' }
        ]);
        // Reset to default suggestions initially
        setCurrentSuggestions(['Ráncok és Anti-aging', 'Problémás bőr (Akne)', 'Esztétikai beavatkozás', 'Bőrgyógyászat']);
      }, 2500);
    };

    initChat();
  }, []);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || !chatSession) return;
    
    // Add user message
    const newMsg = { id: Date.now(), sender: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setCurrentSuggestions([]); // Hide suggestions while thinking
    setIsTyping(true);

    try {
      const response = await chatSession.sendMessage({ message: textToSend });
      setIsTyping(false);

      // Check for tool calls
      const functionCalls = response.functionCalls;
      
      if (functionCalls && functionCalls.length > 0) {
        // Handle recommendation tool
        const call = functionCalls[0];
        if (call.name === 'recommendService') {
          const { serviceName, reasoning } = call.args as any;
          
          // Add recommendation message UI
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            sender: 'bot', 
            isRecommendation: true,
            serviceData: { name: serviceName, reason: reasoning }
          }]);
          
          // After recommendation, offer to restart or book
          setCurrentSuggestions(['Időpontfoglalás', 'Másik probléma', 'Újrakezdés']);
        }
      } else {
        // Standard text response with Option parsing
        const rawText = response.text;
        const { cleanText, newSuggestions } = parseResponse(rawText);

        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          sender: 'bot', 
          text: cleanText 
        }]);

        if (newSuggestions.length > 0) {
          setCurrentSuggestions(newSuggestions);
        } else {
          // Fallback if AI forgets options, keep generic ones or clear
          // But usually we want to keep conversation going
          setCurrentSuggestions([]); 
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: 'Elnézést, egy kis technikai hiba történt. Kérem próbálja újra később.' 
      }]);
      setCurrentSuggestions(DEFAULT_SUGGESTIONS);
    }
  };

  const handleBookingClick = (serviceName: string) => {
    console.log(`Booking initiated for: ${serviceName}`);
    // Future implementation: Navigate to booking route
  };

  const restartChat = () => {
    setMessages([{ id: 1, sender: 'bot', text: 'Miben segíthetek ma?' }]);
    setIsTyping(false);
    
    // Re-initialize chat session to clear history
    const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the virtual assistant for Dr. Kondorosi Ildikó at Dunakanyar Esztétika. 
          Your goal is to help users find the right aesthetic or dermatological service by asking 2-3 targeted diagnostic questions.
          Speak Hungarian. Be polite, professional, yet friendly. 
          Keep your responses concise (max 2-3 sentences).
          
          IMPORTANT RULE FOR INTERACTION:
          At the end of EVERY question you ask, you MUST provide 3-4 short, clickable options for the user to answer easily.
          Format these options strictly like this at the very end of your message: 
          [OPTIONS: Option 1 | Option 2 | Option 3]
          
          Here is the list of available services:
          ${JSON.stringify(FULL_SERVICES_DATA)}

          Process:
          1. Ask the user about their skin concerns. Provide [OPTIONS: ...]
          2. Based on their answer, ask clarifying questions. Provide [OPTIONS: ...]
          3. When identified, use 'recommendService'.
          `,
          tools: [{ functionDeclarations: [recommendServiceFunction] }],
        },
      });
      setChatSession(chat);
      setCurrentSuggestions(['Ráncok és Anti-aging', 'Problémás bőr (Akne)', 'Esztétikai beavatkozás', 'Bőrgyógyászat']);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-primary-900/10 overflow-hidden border border-white/50 flex flex-col h-[450px] md:h-[550px] relative z-20 backdrop-blur-sm transition-all duration-300">
      {/* Premium Header */}
      <div className="bg-white p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
              <Bot size={24} strokeWidth={1.5} />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-heading font-bold text-gray-900 text-lg leading-tight">AI Asszisztens</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-gray-500 text-xs font-medium">Dr. Kondorosi Ildikó</p>
            </div>
          </div>
        </div>
        <button 
          onClick={restartChat}
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
          title="Beszélgetés újrakezdése"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-gray-50/50 to-white scrollbar-thin scrollbar-thumb-gray-200"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.isRecommendation ? (
              <div className="w-full max-w-[95%]">
                 <div className="bg-gradient-to-br from-white to-secondary-50 border border-secondary-100 rounded-2xl p-5 shadow-lg shadow-secondary-100/50">
                    <div className="flex items-center gap-2 mb-3 text-secondary-600 font-bold uppercase text-xs tracking-wider">
                      <Sparkles size={14} /> Ajánlott kezelés
                    </div>
                    <h4 className="text-xl font-heading font-bold text-gray-900 mb-2">
                      {msg.serviceData.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {msg.serviceData.reason}
                    </p>
                    <button 
                      onClick={() => handleBookingClick(msg.serviceData.name)}
                      className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 transition-all transform hover:scale-[1.02]"
                    >
                      <CalendarCheck size={18} />
                      Ingyenes konzultáció foglalása
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">
                      Az időpontfoglalás kötelezettségmentes.
                    </p>
                 </div>
              </div>
            ) : (
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-gray-200/50'
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start w-full animate-fade-in">
             <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
               <span className="text-xs text-gray-400 font-medium mr-1">Gondolkodik...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips Area - Always Visible Contextual Options */}
      {currentSuggestions.length > 0 && (
        <div className="px-5 pb-3 bg-white border-t border-gray-50 pt-3 shrink-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Válasszon opciót:</p>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((chip, idx) => (
               <button 
                 key={`${chip}-${idx}`}
                 onClick={() => handleSend(chip)}
                 className="flex-grow md:flex-grow-0 text-center whitespace-normal text-sm font-bold bg-white text-gray-900 px-4 py-2.5 rounded-xl border-2 border-primary-100 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-800 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 group"
               >
                 {chip}
                 <ArrowRightCircle size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
               </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="relative flex items-center gap-2 group">
          <input
            id="chatbot-input"
            type="text"
            placeholder="Írjon üzenetet..."
            className="w-full bg-gray-50 text-gray-700 text-sm rounded-xl py-3.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all border border-gray-100 focus:border-primary-200"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="absolute right-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};