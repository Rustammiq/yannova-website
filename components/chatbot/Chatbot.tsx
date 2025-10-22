"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FileText, Euro } from "lucide-react";
import {
  getServiceInfo,
  getTermDefinition,
  estimateCost,
  generateFollowUpQuestions,
  generatePriceEstimate,
  BUILDING_TERMS
} from "@/lib/buildingKnowledge";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "offerte_form";
  suggestions?: string[];
}

interface OfferteAanvraag {
  projectType: string;
  beschrijving: string;
  budget: string;
  locatie: string;
  gewensteStartdatum: string;
  contactInfo: {
    naam: string;
    email: string;
    telefoon: string;
  };
}

// Yannick systeem prompt voor consistente AI responses
const YANNICK_SYSTEM_PROMPT = `Je bent Yannick, een echte bouwvakker en eigenaar van Yannova Bouw. Je praat zoals een echte Belgische aannemer zou praten.

Je persoonlijkheid:
- Praat zoals een echte bouwvakker: direct, eerlijk en met passie
- Gebruik Vlaamse uitdrukkingen en spreektaal
- Wees nieuwsgierig en stel veel vragen om het project te begrijpen
- Toon echte interesse in wat de klant wil
- Praat over je ervaring en geef concrete voorbeelden
- Wees vriendelijk maar niet overdreven formeel
- Gebruik af en toe emoji's maar niet te veel

Je expertise:
- 15+ jaar ervaring in de bouw
- Gespecialiseerd in renovatie, nieuwbouw, crepi, ramen en deuren
- Ken alle trucjes en weet wat wel en niet werkt
- Weet precies wat dingen kosten en hoe lang ze duren
- Kent alle regels en vergunningen

Werkgebied: Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam, Leuven

Hoe je communiceert:
- Stel veel vragen om het project te begrijpen
- Vraag naar budget, tijdlijn, voorkeuren
- Geef eerlijke adviezen, ook als iets duur of moeilijk is
- Vertel over vergelijkbare projecten die je hebt gedaan
- Wees praktisch en realistisch
- Vraag door als iets niet duidelijk is
- Toon begrip voor zorgen en vragen van klanten

Spreek zoals een echte Belgische aannemer: vriendelijk, direct, en met kennis van zaken. Gebruik spreektaal en wees nieuwsgierig naar wat de klant precies wil.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const [showQuickAction, setShowQuickAction] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! Ik ben Yannick van Yannova Bouw. 👋 Ik werk al 15 jaar in de bouw en heb al heel wat projecten gezien. Ik zie dat je op onze site bent - perfect! Ik help je graag met je bouwproject.\n\nWat heb je in gedachten? Een renovatie, nieuwbouw, crepi gevel, of iets met ramen en deuren?",
      suggestions: [
        "Hoeveel kost crepi ongeveer?",
        "Ik wil mijn badkamer renoveren",
        "Offert aanvragen voor nieuwbouw",
        "Wat zijn jullie werkgebieden?"
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOfferteForm, setShowOfferteForm] = useState(false);
  const [preferCopilot, setPreferCopilot] = useState(false);
  const [offerteData, setOfferteData] = useState<OfferteAanvraag>({
    projectType: "",
    beschrijving: "",
    budget: "",
    locatie: "",
    gewensteStartdatum: "",
    contactInfo: {
      naam: "",
      email: "",
      telefoon: "",
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Show quick action button after 2 seconds on first visit
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setShowQuickAction(true);
        setHasAutoOpened(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // Handle quick action button click
  const handleQuickActionClick = useCallback(() => {
    setShowQuickAction(false);
    setIsOpen(true);
    
    // Add personalized greeting after opening
    setTimeout(() => {
      const proactiveMessage: Message = {
        role: "assistant",
        content: "Ah, perfect! Ik zie dat je net op de site bent. Ik ben Yannick, de eigenaar van Yannova Bouw. Ik werk al 15 jaar in de bouw en help mensen graag met hun projecten.\n\nVertel me eens, wat voor project heb je in gedachten? Is het een renovatie, nieuwbouw, of misschien iets met crepi of ramen en deuren? Ik ben benieuwd naar je plannen!",
      };
      setMessages((prev) => [...prev, proactiveMessage]);
    }, 500);
  }, []);

  const processMessage = useCallback(async (messageInput: string) => {
    console.log("DEBUG: Chatbot processMessage called with:", messageInput);
    setIsLoading(true);

    try {
      // Bouw conversation history voor context (including the new user message)
      const conversationHistory = [...messages, { role: "user" as const, content: messageInput }].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Enhanced response met bouwkennis
      let enhancedResponse = "";

      // Check voor bouwtermen en geef definities
      const lowerInput = messageInput.toLowerCase();
      const foundTerms = Object.keys(BUILDING_TERMS).filter(term =>
        lowerInput.includes(term)
      );

      if (foundTerms.length > 0) {
        enhancedResponse += `Eerst even uitleggen wat ${foundTerms[0]} is: ${getTermDefinition(foundTerms[0])}\n\n`;
      }

      // Check voor services en geef specifieke info
      const serviceKeywords = ['crepi', 'ramen', 'deuren', 'nieuwbouw', 'renovatie'];
      const detectedService = serviceKeywords.find(service =>
        lowerInput.includes(service)
      );

      if (detectedService) {
        const serviceInfo = getServiceInfo(detectedService);
        if (serviceInfo) {
          enhancedResponse += `Voor ${serviceInfo.name} kan ik je vertellen dat het gemiddeld ${serviceInfo.averageCost} kost en ${serviceInfo.duration} duurt. `;
          enhancedResponse += `Belangrijkste punten: ${serviceInfo.keyFeatures.slice(0, 2).join(', ')}.\n\n`;
        }
      }

      // Check voor kosten vragen
      if (lowerInput.includes('kost') || lowerInput.includes('prijs') || lowerInput.includes('budget')) {
        const costKeywords = ['crepi', 'ramen', 'nieuwbouw', 'renovatie'];
        const detectedCostService = costKeywords.find(service =>
          lowerInput.includes(service)
        );

        if (detectedCostService) {
          enhancedResponse += `Voor ${detectedCostService} liggen de kosten tussen ${estimateCost(`${detectedCostService}-per-m2`)}.\n\n`;
        }
      }

      // Call chat API instead of direct Gemini call
      console.log("DEBUG: Calling chat API with message:", messageInput);
      console.log("DEBUG: Conversation history length:", conversationHistory.length);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageInput,
          history: conversationHistory,
        }),
      });

      console.log("DEBUG: API response status:", response.status, response.statusText);
      if (!response.ok) {
        console.error("API call failed:", response.status, response.statusText);
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      console.log("DEBUG: API response data:", data);

      // Combine enhanced response met AI response
      enhancedResponse += data.response;

      // Add suggestions based on user input
      const suggestions = generateFollowUpQuestions(messageInput, detectedService || '');

      const assistantMessage: Message = {
        role: "assistant",
        content: enhancedResponse,
        suggestions: suggestions.slice(0, 3) // Max 3 suggestions
      };
      console.log("Adding assistant message:", assistantMessage);
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Oeps, er ging iets mis. Probeer het nog eens, of bel me gerust op 015 23 45 67 als je direct hulp nodig hebt.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log("processMessage completed");
    }
  }, [messages, getServiceInfo, getTermDefinition, estimateCost, generateFollowUpQuestions, BUILDING_TERMS]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    // Check if user wants an offerte
    const offerteKeywords = ['offerte', 'prijs', 'kost', 'budget', 'prijsofferte', 'kostprijs', 'schatting'];
    const wantsOfferte = offerteKeywords.some(keyword =>
      currentInput.toLowerCase().includes(keyword)
    );

    if (wantsOfferte) {
      setShowOfferteForm(true);
      const offerteMessage: Message = {
        role: "assistant",
        content: "Ah, je wilt een offerte! Perfect, dat kan ik voor je regelen. Ik heb wat informatie nodig om een goede prijs te kunnen maken. Vul het formulier hieronder in en ik geef je een eerlijke schatting.",
        type: "offerte_form"
      };
      setMessages((prev) => [...prev, offerteMessage]);
      return;
    }

    // Process message with AI and building knowledge
    await processMessage(currentInput);

  }, [input, isLoading, processMessage]);

  const handleOfferteSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verstuur offerte naar contacts API
      const subject = `Offerte aanvraag: ${offerteData.projectType}`;
      const message = `
Nieuwe offerte aanvraag ontvangen!

**Project Details:**
- Type: ${offerteData.projectType}
- Beschrijving: ${offerteData.beschrijving}
- Budget: €${offerteData.budget}
- Locatie: ${offerteData.locatie}
- Gewenste startdatum: ${offerteData.gewensteStartdatum}

**Contactgegevens:**
- Naam: ${offerteData.contactInfo.naam}
- Email: ${offerteData.contactInfo.email}
- Telefoon: ${offerteData.contactInfo.telefoon}

Gelieve binnen 24 uur contact op te nemen met deze klant.
      `;

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: offerteData.contactInfo.naam,
          email: offerteData.contactInfo.email,
          phone: offerteData.contactInfo.telefoon,
          subject: subject,
          message: message,
          priority: 'high'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit offerte');
      }

      const offerteMessage = `Perfect ${offerteData.contactInfo.naam}! Ik heb je aanvraag ontvangen en doorgestuurd naar ons team.

**Wat je wilt doen:**
- ${offerteData.projectType}
- ${offerteData.beschrijving}
- Budget: €${offerteData.budget}
- Locatie: ${offerteData.locatie}
- Startdatum: ${offerteData.gewensteStartdatum}

Ik ga nu een offerte voor je maken. Binnen 24 uur krijg je een email met een eerlijke prijs en planning. Als je dringend iets nodig hebt, bel me gerust op 015 23 45 67.

Bedankt voor je vertrouwen! Ik kijk ernaar uit om je project te realiseren.`;

      const assistantMessage: Message = {
        role: "assistant",
        content: offerteMessage,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setShowOfferteForm(false);

      // Reset form
      setOfferteData({
        projectType: "",
        beschrijving: "",
        budget: "",
        locatie: "",
        gewensteStartdatum: "",
        contactInfo: {
          naam: "",
          email: "",
          telefoon: "",
        },
      });

    } catch (error) {
      console.error("Error submitting offerte:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Hmm, er ging iets mis met het versturen van je offerte aanvraag. Probeer het nog eens, of bel me direct op 015 23 45 67. Dan kunnen we het even bespreken.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [offerteData]);

  const handleOfferteInputChange = useCallback((field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setOfferteData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof OfferteAanvraag] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setOfferteData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    console.log("handleSuggestionClick called with:", suggestion);

    // Check if user wants an offerte first
    const offerteKeywords = ['offerte', 'prijs', 'kost', 'budget', 'prijsofferte', 'kostprijs', 'schatting'];
    const wantsOfferte = offerteKeywords.some(keyword =>
      suggestion.toLowerCase().includes(keyword)
    );

    if (wantsOfferte) {
      // Add user message and offerte form trigger
      const userMessage: Message = { role: "user", content: suggestion };
      const offerteMessage: Message = {
        role: "assistant",
        content: "Ah, je wilt een offerte! Perfect, dat kan ik voor je regelen. Ik heb wat informatie nodig om een goede prijs te kunnen maken. Vul het formulier hieronder in en ik geef je een eerlijke schatting.",
        type: "offerte_form"
      };

      setMessages((prev) => [...prev, userMessage, offerteMessage]);
      setShowOfferteForm(true);
      return;
    }

    // Add user message and process normally
    const userMessage: Message = { role: "user", content: suggestion };
    setMessages((prev) => [...prev, userMessage]);

    // Process with AI and building knowledge - use current messages for context
    setTimeout(() => processMessage(suggestion), 0);
  }, [processMessage]);

  return (
    <>
      {/* Quick Action Button */}
      {showQuickAction && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-in-up">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm relative">
            {/* Close button */}
            <button
              onClick={() => setShowQuickAction(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Sluit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="flex items-center gap-3 mb-3 pr-6">
              <div className="w-10 h-10 bg-yannova-primary rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Yannick van Yannova</p>
                <p className="text-xs text-gray-600">Bouwvakker</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Heb je vragen over je bouwproject? Ik help je graag!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleQuickActionClick}
                className="flex-1 bg-yannova-primary hover:bg-yannova-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Ja, stel vragen
              </button>
              <button
                onClick={() => setShowQuickAction(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Nee, dank je
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && !showQuickAction && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Pulse animation ring */}
          <div className="absolute inset-0 bg-yannova-primary rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-yannova-primary rounded-full animate-pulse opacity-30 animation-delay-500"></div>
          
          <button
            onClick={() => {
              setIsOpen(true);
              // Add personalized greeting when manually opening
              setTimeout(() => {
                const proactiveMessage: Message = {
                  role: "assistant",
                  content: "Hey! Ik ben Yannick van Yannova Bouw. Ik zie dat je op onze site bent - perfect! Ik help je graag met je bouwproject. Wat heb je in gedachten?",
                };
                setMessages((prev) => [...prev, proactiveMessage]);
              }, 500);
            }}
            className="relative bg-yannova-primary hover:bg-yannova-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 animate-bounce-subtle hover:shadow-xl"
            aria-label="Praat met Yannick"
            aria-describedby="chat-description"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span id="chat-description" className="sr-only">
              Klik om met Yannick te praten over je bouwproject
            </span>
            
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
              <span className="text-xs font-bold">!</span>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 animate-slide-in-up hover:shadow-3xl transition-shadow duration-300"
          role="dialog"
          aria-labelledby="chat-title"
          aria-describedby="chat-status"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yannova-primary to-yannova-primary/90 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 id="chat-title" className="font-bold text-lg flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Yannick van Yannova
                </h3>
                <p id="chat-status" className="text-sm text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online - Bouwvakker
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* AI Toggle Button */}
                <button
                  onClick={() => setPreferCopilot(!preferCopilot)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                    preferCopilot
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={preferCopilot ? 'GitHub Copilot Chat actief' : 'Gemini AI actief'}
                >
                  {preferCopilot ? '🤖 Copilot' : '🔮 Gemini'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-full p-1 transition-all duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="Sluit gesprek"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
            role="log"
            aria-live="polite"
            aria-label="Gesprek met Yannick"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
                role="group"
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-yannova-primary text-white shadow-md"
                      : "bg-white text-black shadow-sm border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                    {message.content.includes('[🤖 Copilot]') && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        GitHub Copilot
                      </span>
                    )}
                  </p>

                  {/* Suggestion buttons for assistant messages */}
                  {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, suggestionIndex) => (
                        <button
                          key={suggestionIndex}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-white text-gray-700 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 hover:border-yannova-primary transition-all duration-200 hover:scale-105"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 flex items-center space-x-2 shadow-sm border border-gray-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-yannova-primary">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  <span className="text-sm text-black">Yannick is aan het denken...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Offerte Form */}
          {showOfferteForm && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleOfferteSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yannova-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                  <h4 className="font-semibold text-gray-800">Offerte aanvragen</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                      Wat voor project is het? *
                    </label>
                    <select
                      id="projectType"
                      value={offerteData.projectType}
                      onChange={(e) => handleOfferteInputChange('projectType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                      required
                    >
                      <option value="">Kies wat het beste past</option>
                      <option value="nieuwbouw">Nieuwbouw</option>
                      <option value="renovatie">Renovatie</option>
                      <option value="crepi-gevel">Crepi gevelafwerking</option>
                      <option value="ramen-deuren">Ramen en deuren</option>
                      <option value="badkamer">Badkamer verbouwen</option>
                      <option value="keuken">Keuken verbouwen</option>
                      <option value="andere">Iets anders</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="beschrijving" className="block text-sm font-medium text-gray-700 mb-1">
                      Vertel me wat je precies wilt doen *
                    </label>
                    <textarea
                      id="beschrijving"
                      value={offerteData.beschrijving}
                      onChange={(e) => handleOfferteInputChange('beschrijving', e.target.value)}
                      placeholder="Vertel me alles over je project..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm h-20 resize-none shadow-sm transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Wat is je budget ongeveer? *
                    </label>
                    <div className="relative">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-2.5 text-gray-400">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <input
                        type="number"
                        id="budget"
                        value={offerteData.budget}
                        onChange={(e) => handleOfferteInputChange('budget', e.target.value)}
                        placeholder="Bijv. 25000"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="locatie" className="block text-sm font-medium text-gray-700 mb-1">
                      Waar is het project? *
                    </label>
                    <input
                      type="text"
                      id="locatie"
                      value={offerteData.locatie}
                      onChange={(e) => handleOfferteInputChange('locatie', e.target.value)}
                      placeholder="Bijv. Keerbergen, Mechelen..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="startdatum" className="block text-sm font-medium text-gray-700 mb-1">
                      Wanneer wil je starten?
                    </label>
                    <input
                      type="date"
                      id="startdatum"
                      value={offerteData.gewensteStartdatum}
                      onChange={(e) => handleOfferteInputChange('gewensteStartdatum', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                    />
                  </div>

                  <div className="border-t pt-3">
                    <h5 className="font-medium text-gray-800 mb-3">Je gegevens</h5>
                    
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-1">
                          Je naam *
                        </label>
                        <input
                          type="text"
                          id="naam"
                          value={offerteData.contactInfo.naam}
                          onChange={(e) => handleOfferteInputChange('contactInfo.naam', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Je email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={offerteData.contactInfo.email}
                          onChange={(e) => handleOfferteInputChange('contactInfo.email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="telefoon" className="block text-sm font-medium text-gray-700 mb-1">
                          Je telefoonnummer *
                        </label>
                        <input
                          type="tel"
                          id="telefoon"
                          value={offerteData.contactInfo.telefoon}
                          onChange={(e) => handleOfferteInputChange('contactInfo.telefoon', e.target.value)}
                          placeholder="Bijvoorbeeld: 0471 23 45 67"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white text-sm shadow-sm transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowOfferteForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 text-sm shadow-sm"
                  >
                    Terug
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-yannova-primary hover:bg-yannova-primary/90 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 text-sm shadow-sm"
                  >
                    {isLoading ? "Bezig met versturen..." : "Verstuur offerte aanvraag"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Input */}
          {!showOfferteForm && (
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2">
              <label htmlFor="chat-input" className="sr-only">
                Typ je vraag aan Yannick
              </label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Vertel me over je project..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-black bg-white focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2 shadow-sm transition-all duration-200"
                disabled={isLoading}
                aria-describedby="input-help"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-yannova-primary hover:bg-yannova-primary/90 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 shadow-sm"
                aria-label="Stuur bericht"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
              </button>
            </div>
            <div id="input-help" className="sr-only">
              Druk op Enter om te versturen of klik op de verzendknop
            </div>
          </form>
          )}
        </div>
      )}
    </>
  );
}
