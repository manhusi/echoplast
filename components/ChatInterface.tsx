import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, RefreshCw, CalendarCheck } from 'lucide-react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { FULL_SERVICES_DATA } from '../constants';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// Define the tool for recommending a service
const recommendServiceFunction: FunctionDeclaration = {
  name: 'recommendService',
  parameters: {
    type: Type.OBJECT,
    description: 'Recommend a specific massage service to the user and explain why.',
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

const DEFAULT_SUGGESTIONS = ['Izomfeszültség', 'Stressz & Relaxáció', 'Sport utáni regeneráció', 'Tanácsot kérek'];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; sender: 'bot' | 'user'; text?: string; isRecommendation?: boolean; serviceData?: any }[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Üdvözlöm! Bence Masszázs Szalon virtuális asszisztense vagyok. Segítek megtalálni a számodra ideális masszázst. Mi az, ami leginkább zavar mostanában – feszültség, fájdalom, vagy egyszerűen csak kell egy kis feltöltődés?'
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping, currentSuggestions]);

  const parseResponse = (text: string) => {
    const optionsRegex = /\[OPTIONS: (.*?)\]/;
    const match = text.match(optionsRegex);

    let cleanText = text;
    let newSuggestions: string[] = [];

    if (match && match[1]) {
      newSuggestions = match[1].split('|').map(s => s.trim());
      cleanText = text.replace(match[0], '').trim();
    }

    return { cleanText, newSuggestions };
  };

  useEffect(() => {
    const initChat = async () => {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Te a Bence Masszázs Szalon virtuális asszisztense vagy Nyíregyházán. 
          A célod, hogy segíts a felhasználóknak megtalálni a számukra ideális masszázs kezelést 2-3 célzott kérdés feltevésével.
          Magyarul beszélj. Légy udvarias, professzionális, de barátságos. 
          Tartsd a válaszaidat tömören (max 2-3 mondat).

          FONTOS: A felhasználót már üdvözöltük. NE mutatkozz be újra. NE mondd, hogy "Üdvözlöm" vagy "Bence Masszázs asszisztense vagyok". Kezdj egyből a felhasználó problémájával/inputjával.
          
          FONTOS SZABÁLY:
          Minden kérdésed végére adj 3-4 rövid, kattintható opciót.
          Formázd így a végén: 
          [OPTIONS: Opció 1 | Opció 2 | Opció 3]

          Példa: 
          "Melyik testrész fáj a legjobban?"
          [OPTIONS: Nyak/Váll | Hát | Derék | Láb]
          
          Elérhető szolgáltatások:
          ${JSON.stringify(FULL_SERVICES_DATA)}

          Folyamat:
          1. Kérdezd meg milyen problémája van (feszültség, fájdalom, stressz, sport). Add meg [OPTIONS: ...]
          2. Kérdezz pontosító kérdéseket (melyik testrész, mennyi ideje, milyen erősségű). Add meg [OPTIONS: ...]
          3. Ha azonosítottad a szolgáltatást, használd a 'recommendService' eszközt.
          
          Masszázs típusok áttekintése:
          - Svéd masszázs: Klasszikus, izomfeszültség oldás, vérkeringés javítás
          - Relax masszázs: Stressz csökkentés, ellazulás, alvási problémák
          - Aromaterápiás: Illóolajokkal, holisztikus megközelítés
          - Talpmasszázs: Reflexológia, akik sokat állnak
          - Köpölyözés: Mélyebb fájdalmak, sportolók, méregtelenítés
          - TAPE: Sportolók, sérülések utáni támogatás
          `,
          tools: [{ functionDeclarations: [recommendServiceFunction] }],
        },
      });
      setChatSession(chat);
    };

    initChat();
  }, []);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || !chatSession) return;

    const newMsg = { id: Date.now(), sender: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setCurrentSuggestions([]);
    setIsTyping(true);

    try {
      const response = await chatSession.sendMessage({ message: textToSend });
      setIsTyping(false);

      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === 'recommendService') {
          const { serviceName, reasoning } = call.args as any;

          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            sender: 'bot',
            isRecommendation: true,
            serviceData: { name: serviceName, reason: reasoning }
          }]);

          setCurrentSuggestions(['Időpontfoglalás', 'Másik kérdésem van', 'Újrakezdés']);
        }
      } else {
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
          setCurrentSuggestions([]);
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Elnézést, egy kis technikai hiba történt. Kérem próbáld újra később.'
      }]);
      setCurrentSuggestions(DEFAULT_SUGGESTIONS);
    }
  };

  const handleBookingClick = () => {
    window.open('https://bencemasszazsnyiregyhaza.booked4.us/public/book', '_blank');
  };

  const restartChat = () => {
    setMessages([{
      id: 1,
      sender: 'bot',
      text: 'Üdvözlöm! Bence Masszázs Szalon virtuális asszisztense vagyok. Segítek megtalálni a számodra ideális masszázst. Mi az, ami leginkább zavar mostanában – feszültség, fájdalom, vagy egyszerűen csak kell egy kis feltöltődés?'
    }]);
    setIsTyping(false);

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Te a Bence Masszázs Szalon virtuális asszisztense vagy Nyíregyházán. 
          A célod, hogy segíts a felhasználóknak megtalálni a számukra ideális masszázs kezelést.
          Magyarul beszélj. Légy udvarias, professzionális, de barátságos. 
          Tartsd a válaszaidat tömören.

          FONTOS: A felhasználót már üdvözöltük. NE mutatkozz be újra.
          
          Minden kérdésed végére adj 3-4 opciót:
          [OPTIONS: Opció 1 | Opció 2 | Opció 3]
          
          Szolgáltatások:
          ${JSON.stringify(FULL_SERVICES_DATA)}

          Ha azonosítottad a szolgáltatást, használd a 'recommendService' eszközt.
          `,
        tools: [{ functionDeclarations: [recommendServiceFunction] }],
      },
    });
    setChatSession(chat);
    setCurrentSuggestions(DEFAULT_SUGGESTIONS);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden border border-gold-400/20 flex flex-col h-[500px] md:h-[600px] relative z-20 backdrop-blur-sm transition-all duration-300">
      {/* Premium Header */}
      <div className="bg-black p-4 border-b border-gold-400/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-black shadow-lg shadow-gold-400/30">
              <Bot size={20} strokeWidth={1.5} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-base leading-tight">Masszázs Tanácsadó</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-gold-400 text-[10px] font-medium uppercase tracking-wide">Bence Masszázs Szalon</p>
            </div>
          </div>
        </div>
        <button
          onClick={restartChat}
          className="p-2 text-gray-500 hover:text-gold-400 hover:bg-gold-400/10 rounded-full transition-colors"
          title="Beszélgetés újrakezdése"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-950 scrollbar-thin scrollbar-thumb-gray-700"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.isRecommendation ? (
              <div className="w-full max-w-[95%]">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gold-400/30 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-3 text-gold-400 font-bold uppercase text-xs tracking-wider">
                    <Sparkles size={14} /> Ajánlott masszázs
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white mb-2">
                    {msg.serviceData.name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {msg.serviceData.reason}
                  </p>
                  <button
                    onClick={handleBookingClick}
                    className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-black py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-gold-500 hover:to-gold-600 hover:shadow-lg hover:shadow-gold-400/20 transition-all transform hover:scale-[1.02]"
                  >
                    <CalendarCheck size={18} />
                    Időpontfoglalás
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Online foglalás a booked4.us rendszeren
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black rounded-br-none'
                  : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start w-full animate-fade-in">
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <span className="text-xs text-gray-400 font-medium mr-1">Gondolkodik...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips Area */}
      {currentSuggestions.length > 0 && (
        <div className="px-4 pb-2 bg-gray-900 border-t border-gray-800 pt-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            {currentSuggestions.map((chip, idx) => (
              <button
                key={`${chip}-${idx}`}
                onClick={() => handleSend(chip)}
                className="text-center whitespace-normal text-xs font-bold bg-gray-800 text-gray-300 px-2 py-2 rounded-lg border border-gray-700 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-400 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1 group min-h-[40px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-black border-t border-gray-800 shrink-0">
        <div className="relative flex items-center gap-2 group">
          <input
            id="chatbot-input"
            type="text"
            placeholder="Írj üzenetet..."
            className="w-full bg-gray-800 text-gray-200 text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-gold-400/30 focus:bg-gray-700 transition-all border border-gray-700 focus:border-gold-400/50 placeholder-gray-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="absolute right-2 p-1.5 bg-gold-400 text-black rounded-lg hover:bg-gold-500 disabled:opacity-50 disabled:hover:bg-gold-400 transition-all shadow-md hover:shadow-lg"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};