import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini(apiKey?: string) {
  // Gebruik environment variable of fallback naar hardcoded key
  const key = apiKey || process.env.GEMINI_API_KEY || "AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo";
  if (!key || key === "your_gemini_api_key_here") {
    console.warn("Gemini API key is niet geconfigureerd. Gebruik demo responses.");
    return null;
  }
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.warn("Gemini AI is not available in browser environment");
      return null;
    }
    genAI = new GoogleGenerativeAI(key);
    return genAI;
  } catch (error) {
    console.error("Error initializing Gemini:", error);
    console.warn("Gemini AI niet beschikbaar, gebruik demo responses");
    return null;
  }
}

export function getGeminiInstance() {
  if (!genAI) {
    const result = initializeGemini();
    if (!result) {
      return null;
    }
  }
  return genAI;
}

// System prompt voor Yannova chatbot
export const YANNOVA_SYSTEM_PROMPT = `Je bent een behulpzame AI-assistent voor Yannova Bouw, een professioneel bouwbedrijf.

Over Yannova Bouw:
- Gespecialiseerd in nieuwbouw, verbouwingen en renovaties
- Motto: "Van Begin tot Eind - Project Afronding"
- Bekijk projecten van begin tot succesvol einde
- Professioneel team met jarenlange ervaring
- Focus op kwaliteit, vakmanschap en klanttevredenheid

Diensten:
1. Nieuwbouw projecten
2. Verbouwingen en renovaties
3. Dakwerken
4. Gevelbekleding
5. Badkamer renovaties
6. Keuken installaties

Jouw taak:
- Beantwoord vragen over Yannova's diensten vriendelijk en professioneel
- Geef nuttige informatie over bouwprojecten
- Help bezoekers met vragen over offertes en projecten
- Spreek Nederlands (tenzij anders gevraagd)
- Verwijs naar het contactformulier voor specifieke offertes

Wees behulpzaam, professioneel en enthousiast over bouwprojecten!`;

// Demo responses voor als Gemini niet beschikbaar is
const DEMO_RESPONSES: Record<string, string> = {
  "hallo": "Hallo! Ik ben de Yannova assistent. Hoe kan ik u helpen met uw bouwproject?",
  "nieuwbouw": "Yannova Bouw is gespecialiseerd in nieuwbouwprojecten. Wij verzorgen alles van ontwerp tot oplevering. Wat voor soort woning heeft u in gedachten?",
  "renovatie": "Voor renovaties bent u bij Yannova aan het juiste adres! Wij doen badkamerrenovaties, keukeninstallaties, dakwerken en gevelbekleding. Wat wilt u renoveren?",
  "crepi": "Crepi gevelafwerking geeft uw woning een moderne uitstraling en betere isolatie. Wij gebruiken kwaliteitsvolle producten en zorgen voor een perfect resultaat.",
  "ramen": "Nieuwe ramen verbeteren niet alleen de uitstraling maar ook de energie-efficiëntie van uw woning. Wij plaatsen ramen van alle soorten en maten.",
  "deuren": "Voor nieuwe deuren bent u bij Yannova aan het juiste adres. Van moderne kunststof deuren tot klassieke houten exemplaren.",
  "offerte": "Natuurlijk! Voor een vrijblijvende offerte kunt u het beste contact met ons opnemen via het contactformulier of telefonisch.",
  "contact": "U kunt ons bereiken via telefoon: +31 6 12 34 56 78 of e-mail: info@yannova.nl. We helpen u graag verder!",
  "default": "Ik begrijp uw vraag. Voor specifieke informatie over bouwprojecten, offertes of technische details raad ik aan contact op te nemen met Yannova Bouw. Hoe kan ik u verder helpen?"
};

function getDemoResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  for (const [key, response] of Object.entries(DEMO_RESPONSES)) {
    if (lowerMessage.includes(key) && key !== "default") {
      return response;
    }
  }

  return DEMO_RESPONSES.default;
}

export async function chatWithGemini(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) {
  try {
    const ai = getGeminiInstance();
    if (!ai) {
      console.log("Gemini not available, using demo response");
      return getDemoResponse(message);
    }
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Bouw de chat history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: YANNOVA_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Begrepen! Ik ben klaar om vragen over Yannova Bouw te beantwoorden." }],
        },
        ...conversationHistory.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);

    // Fallback naar demo responses
    console.log("Using demo response due to API error");
    return getDemoResponse(message);
  }
}
