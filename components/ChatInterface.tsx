import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, RefreshCw, CalendarCheck } from 'lucide-react';
import { ECHOPLAST_SERVICES, DOCTOR_CREDENTIALS } from '../constants';

// Define the tool for recommending a procedure
const recommendProcedureFunction = {
  name: 'recommendProcedure',
  description: 'Recommend a specific plastic surgery procedure to the user and explain why it might be suitable.',
  parameters: {
    type: 'OBJECT',
    properties: {
      procedureName: {
        type: 'STRING',
        description: 'The exact name of the procedure from the available list.',
      },
      reasoning: {
        type: 'STRING',
        description: 'A brief, friendly explanation of why this procedure might address the user needs (in Hungarian). Always mention that final decision is made during consultation.',
      },
    },
    required: ['procedureName', 'reasoning'],
  },
};

const SYSTEM_PROMPT = `Te az ECHO Plasztikai Sebészet virtuális asszisztense vagy Debrecenben.
Dr. Péter Zoltán egyetemi főorvos, 1998 óta végez esztétikai műtéteket, nemzetközi tapasztalattal (Koppenhága, Dublin, Linköping).

A célod, hogy segíts a pácienseknek tájékozódni a szolgáltatásainkról és irányítsd őket KONZULTÁCIÓRA.
Kérdezz 2-3 célzott kérdést, hogy megértsd a páciens igényeit, majd ajánlj megfelelő beavatkozást.

FONTOS: A felhasználót már üdvözöltük. NE mutatkozz be újra. NE mondd, hogy "Üdvözlöm" vagy hasonlót. Kezdj egyből a páciens kérdésével/problémájával.

FONTOS SZABÁLY:
Minden válaszod végére adj 3-4 rövid, kattintható opciót.
Formázd így a végén: 
[OPTIONS: Opció 1 | Opció 2 | Opció 3]

Példa: 
"Melyik terület érdekelné leginkább?"
[OPTIONS: Arc | Mell | Test | Egyéb]

Elérhető beavatkozások:
${JSON.stringify(ECHOPLAST_SERVICES.map(s => ({ name: s.service_name, desc: s.description })))}

Orvos referenciák:
- ${DOCTOR_CREDENTIALS.experience_since} óta végez esztétikai műtéteket
- ${DOCTOR_CREDENTIALS.title}
- Nemzetközi képzések: Koppenhága, Dublin, Linköping

Folyamat:
1. Kérdezd meg melyik testtájék érdekli (arc, mell, test). Add meg [OPTIONS: ...]
2. Kérdezz pontosító kérdéseket (mit szeretne elérni, mi zavarja). Add meg [OPTIONS: ...]
3. Ha azonosítottad a megfelelő beavatkozást, használd a 'recommendProcedure' eszközt.

MINDIG hangsúlyozd, hogy:
- A végleges döntés konzultáción születik
- Dr. Péter Zoltán személyesen vizsgál és ad tanácsot
- 25+ év tapasztalat, nemzetközi képzés
`;

const DEFAULT_SUGGESTIONS = ['Arc fiatalítás', 'Mell korrekció', 'Testformázás', 'Tanácsot kérek'];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; sender: 'bot' | 'user'; text?: string; isRecommendation?: boolean; serviceData?: any }[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Üdvözöljük az ECHO Plasztikai Sebészet oldalán! Dr. Péter Zoltán egyetemi főorvos 25+ éves tapasztalatával állunk rendelkezésére. Miben segíthetünk Önnek? Melyik terület érdekli leginkább?'
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setCurrentSuggestions([]);
    setIsTyping(true);

    try {
      const history = messages
        .filter(m => m.text && !m.isRecommendation)
        .map(m => ({
          role: m.sender === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text || '' }]
        }));

      history.push({ role: 'user', parts: [{ text: textToSend }] });

      const response = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          tools: [{ functionDeclarations: [recommendProcedureFunction] }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setIsTyping(false);

      const candidate = data.candidates?.[0];
      const modelPart = candidate?.content?.parts?.[0];

      if (!modelPart) {
        throw new Error("No content received");
      }

      if (modelPart.functionCall) {
        const call = modelPart.functionCall;
        if (call.name === 'recommendProcedure') {
          const args = call.args;
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            sender: 'bot',
            isRecommendation: true,
            serviceData: { name: args.procedureName, reason: args.reasoning }
          }]);
          setCurrentSuggestions(['Konzultáció kérése', 'Másik kérdésem van', 'Újrakezdés']);
        }
      } else if (modelPart.text) {
        const rawText = modelPart.text;
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
        text: 'Elnézést, technikai hiba történt. Kérjük hívjon minket: +36/20 976-3574'
      }]);
      setCurrentSuggestions(DEFAULT_SUGGESTIONS);
    }
  };

  const handleBookingClick = () => {
    window.location.href = '/foglalas';
  };

  const restartChat = () => {
    setMessages([{
      id: 1,
      sender: 'bot',
      text: 'Üdvözöljük az ECHO Plasztikai Sebészet oldalán! Dr. Péter Zoltán egyetemi főorvos 25+ éves tapasztalatával állunk rendelkezésére. Miben segíthetünk Önnek? Melyik terület érdekli leginkább?'
    }]);
    setIsTyping(false);
    setCurrentSuggestions(DEFAULT_SUGGESTIONS);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-200 flex flex-col h-[500px] md:h-[600px] relative z-20 transition-all duration-300">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-lg">
              <Bot size={20} strokeWidth={1.5} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-teal-600 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-base leading-tight">Plasztikai Tanácsadó</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-teal-100 text-[10px] font-medium uppercase tracking-wide">ECHO Plasztikai Sebészet</p>
            </div>
          </div>
        </div>
        <button
          onClick={restartChat}
          className="p-2 text-teal-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Beszélgetés újrakezdése"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white scrollbar-thin"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full animate-fade-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.isRecommendation ? (
              <div className="w-full max-w-[95%]">
                <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-200 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-3 text-teal-600 font-bold uppercase text-xs tracking-wider">
                    <Sparkles size={14} /> Ajánlott beavatkozás
                  </div>
                  <h4 className="text-xl font-heading font-bold text-slate-800 mb-2">
                    {msg.serviceData.name}
                  </h4>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {msg.serviceData.reason}
                  </p>
                  <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-4">
                    <p className="text-xs text-teal-700 font-medium">
                      💡 A pontos részleteket és az Önre szabott javaslatokat Dr. Péter Zoltán a személyes konzultáción beszéli meg Önnel.
                    </p>
                  </div>
                  <button
                    onClick={handleBookingClick}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:shadow-teal-500/20 transition-all transform hover:scale-[1.02]"
                  >
                    <CalendarCheck size={18} />
                    Konzultáció kérése
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3">
                    Online időpontfoglalás
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.sender === 'user'
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-none'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start w-full animate-fade-in">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <span className="text-xs text-slate-500 font-medium mr-1">Gondolkodik...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips Area */}
      {currentSuggestions.length > 0 && (
        <div className="px-4 pb-2 bg-white border-t border-slate-100 pt-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            {currentSuggestions.map((chip, idx) => (
              <button
                key={`${chip}-${idx}`}
                onClick={() => handleSend(chip)}
                className="text-center whitespace-normal text-xs font-bold bg-slate-50 text-slate-600 px-2 py-2 rounded-lg border border-slate-200 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1 group min-h-[40px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0">
        <div className="relative flex items-center gap-2 group">
          <input
            id="chatbot-input"
            type="text"
            placeholder="Írjon üzenetet..."
            className="w-full bg-white text-slate-700 text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-all border border-slate-200 focus:border-teal-400 placeholder-slate-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="absolute right-2 p-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-teal-500 transition-all shadow-md hover:shadow-lg"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};