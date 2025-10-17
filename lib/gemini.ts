import { GoogleGenerativeAI } from "@google/generative-ai";

// Set the API version globally
process.env.GOOGLE_GENERATIVE_AI_API_VERSION = 'v1';

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini(apiKey?: string) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Gemini API key is niet geconfigureerd");
  }
  try {
    genAI = new GoogleGenerativeAI(key);
    return genAI;
  } catch (error) {
    console.error("Error initializing Gemini:", error);
    throw new Error("Kon Gemini AI niet initialiseren");
  }
}

export function getGeminiInstance() {
  if (!genAI) {
    initializeGemini();
  }
  return genAI!;
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

export async function chatWithGemini(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) {
  try {
    const ai = getGeminiInstance();
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

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
    throw new Error(`Er ging iets mis met de AI-chatbot: ${error instanceof Error ? error.message : 'Onbekende fout'}`);
  }
}
