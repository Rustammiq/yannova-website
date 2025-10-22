import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure this module is never imported on the client side
if (typeof window !== 'undefined') {
  throw new Error('Gemini AI library should not be imported in browser environment');
}

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini(apiKey?: string) {
  // Gebruik environment variable of fallback naar hardcoded key
  const key = apiKey || process.env.GEMINI_API_KEY || "AIzaSyAvKfrzJt7Vq8V6LGzzEUNEGi4yTZYzweo";
  console.log("DEBUG: Initializing Gemini with key:", key ? "Key present" : "No key");
  if (!key || key === "your_gemini_api_key_here") {
    console.warn("Gemini API key is niet geconfigureerd. Gebruik demo responses.");
    return null;
  }
  try {
    // Check if we're in a browser environment - this should never happen in server-side code
    if (typeof window !== 'undefined') {
      console.warn("WARNING: Gemini AI initialization attempted in browser environment - this should not happen!");
      console.warn("This indicates the Gemini library is being imported on the client side");
      return null;
    }
    console.log("DEBUG: Creating GoogleGenerativeAI instance");
    genAI = new GoogleGenerativeAI(key);
    console.log("DEBUG: Gemini initialized successfully");
    return genAI;
  } catch (error) {
    console.error("Error initializing Gemini:", error);
    console.warn("Gemini AI niet beschikbaar, gebruik demo responses");
    return null;
  }
}

// Test Gemini API key validity
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const ai = getGeminiInstance();
    if (!ai) {
      console.log("DEBUG: No Gemini instance available for testing");
      return false;
    }

    console.log("DEBUG: Testing Gemini connection with simple prompt");
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say 'Hello' if you can read this.");
    const response = await result.response;
    const text = response.text();

    console.log("DEBUG: Gemini test response:", text);
    return text.toLowerCase().includes('hello');
  } catch (error) {
    console.error("DEBUG: Gemini connection test failed:", error);
    return false;
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

// Yannick systeem prompt voor consistente AI responses
export const YANNICK_SYSTEM_PROMPT = `Je bent Yannick, een echte bouwvakker en eigenaar van Yannova Bouw. Je praat zoals een echte Belgische aannemer zou praten.

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

// Demo responses voor als Gemini niet beschikbaar is
const DEMO_RESPONSES: Record<string, string> = {
  "hallo": "Hey! Ik ben Yannick van Yannova Bouw. Ik werk al 15 jaar in de bouw en help mensen graag met hun projecten. Wat heb je in gedachten?",
  "nieuwbouw": "Nieuwbouw? Dat is mijn specialiteit! Ik bouw al jaren woningen van A tot Z. Wat voor huis zie je voor je? Een moderne woning of eerder klassiek?",
  "renovatie": "Renovatie is altijd interessant! Ik heb al heel wat huizen opgeknapt. Badkamer, keuken, dakwerken... Wat wil je precies aanpakken?",
  "crepi": "Crepi gevelafwerking? Dat geeft je woning direct een moderne look én betere isolatie. Ik gebruik alleen de beste producten en zorg voor perfect werk.",
  "ramen": "Nieuwe ramen? Slimme keuze! Dat verbetert niet alleen de uitstraling maar ook de energierekening. Welk materiaal had je in gedachten?",
  "deuren": "Voor nieuwe deuren ben je bij mij aan het juiste adres. Ik plaats alles van moderne PVC-deuren tot massief houten exemplaren.",
  "budget": "Budget is belangrijk bij elk project. Vertel me wat je ongeveer in gedachten hebt, dan kan ik je een realistische inschatting geven.",
  "offerte": "Een offerte? Perfect! Ik maak graag een eerlijke prijs voor je. Welk project heb je in gedachten?",
  "contact": "Je kan me bereiken op 015 23 45 67 of via info@yannova.be. Ik help je graag verder!",
  "default": "Ik snap je vraag. Als bouwvakker met 15 jaar ervaring help ik je graag verder. Vertel me meer over je project, dan geef ik je eerlijk advies!"
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
  console.log("DEBUG: chatWithGemini called with message:", message);
  try {
    const ai = getGeminiInstance();
    console.log("DEBUG: Gemini instance:", ai ? "Available" : "Not available");
    if (!ai) {
      console.log("Gemini not available, using demo response");
      return getDemoResponse(message);
    }
    console.log("DEBUG: Creating model with gemini-2.0-flash");
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Bouw de chat history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: YANNICK_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Begrepen! Ik ben Yannick, klaar om te helpen met bouwvragen en meer!" }],
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

// GitHub Copilot Chat integratie
export async function chatWithCopilot(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    // Controleer of de vraag code-gerelateerd is
    const codeKeywords = ['code', 'programmeren', 'javascript', 'typescript', 'react', 'next.js', 'api', 'function', 'class', 'component', 'debug', 'error', 'fix', 'implement', 'build'];
    const isCodeQuestion = codeKeywords.some(keyword =>
      message.toLowerCase().includes(keyword)
    );

    if (!isCodeQuestion) {
      throw new Error("Not a code-related question");
    }

    // Voor nu gebruiken we een aangepaste prompt voor technische vragen
    // In de toekomst kan dit worden uitgebreid met echte GitHub Copilot integratie
    const copilotPrompt = `Je bent een ervaren software developer die werkt aan een bouwbedrijf website (Yannova Bouw).

Deze vraag komt van een gebruiker die mogelijk hulp nodig heeft met:
- Website development
- Code problemen oplossen
- Nieuwe features implementeren
- Technische vraagstukken

Geef een behulpzaam, technisch accuraat antwoord in het Nederlands.

Vraag context: ${message}

Geef praktische, werkende code voorbeelden waar relevant.`;

    const ai = getGeminiInstance();
    if (!ai) {
      return "Sorry, ik kan momenteel geen technische ondersteuning bieden. Probeer het later nog eens.";
    }

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Bouw chat history met technische context
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: copilotPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Begrepen! Ik help graag met technische vraagstukken voor de Yannova website." }],
        },
        ...conversationHistory.filter(msg => msg.role === "user" || msg.role === "assistant").map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Copilot Chat error:", error);
    // Fallback naar gewone demo response
    return "Ik kan momenteel geen technische ondersteuning bieden. Voor code-gerelateerde vragen raad ik aan om contact op te nemen met een developer.";
  }
}

// Hybride AI functie die kiest tussen Gemini en Copilot Chat
export async function chatWithHybridAI(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  preferCopilot: boolean = false
): Promise<string> {
  try {
    // Controleer vraag type
    const bouwKeywords = ['bouw', 'nieuwbouw', 'renovatie', 'crepi', 'ramen', 'deuren', 'badkamer', 'keuken', 'dak', 'gevel', 'offerte', 'kost', 'prijs', 'project'];
    const codeKeywords = ['code', 'programmeren', 'website', 'development', 'javascript', 'typescript', 'react', 'next.js', 'api', 'function', 'debug', 'error', 'fix'];

    const isBouwQuestion = bouwKeywords.some(keyword => message.toLowerCase().includes(keyword));
    const isCodeQuestion = codeKeywords.some(keyword => message.toLowerCase().includes(keyword));

    // Als beide soorten vragen worden gedetecteerd, geef prioriteit op basis van voorkeur
    if (isCodeQuestion && (preferCopilot || !isBouwQuestion)) {
      try {
        const copilotResponse = await chatWithCopilot(message, conversationHistory);
        return `[🤖 Copilot] ${copilotResponse}`;
      } catch (error) {
        console.log("Copilot failed, falling back to Gemini");
      }
    }

    // Gebruik Gemini voor bouwvragen of als fallback
    const geminiResponse = await chatWithGemini(message, conversationHistory);
    return geminiResponse;

  } catch (error) {
    console.error("Hybrid AI error:", error);

    // Laatste fallback naar demo response
    const demoResponse = getDemoResponse(message);
    return demoResponse;
  }
}

// AI Afbeelding generatie functie
export async function generateImagesWithGemini(
  prompt: string,
  count: number = 4
): Promise<string[]> {
  try {
    const ai = getGeminiInstance();
    if (!ai) {
      console.log("Gemini not available for image generation");
      return [];
    }

    // Gebruik Gemini 2.5 Flash Image Preview model
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" });

    // Bouw een gedetailleerde prompt voor bouwafbeeldingen
    const detailedPrompt = `
      Generate ${count} professional construction/building images for a Dutch construction company website.

      Prompt: ${prompt}

      Requirements:
      - Professional architectural photography style
      - High quality, realistic images
      - Modern construction techniques and materials
      - Clean, professional appearance
      - Suitable for business website use
      - Dutch/European building style
      - Good lighting and composition

      Image types to consider:
      - New construction projects
      - Renovation work
      - Facade work and crepi finishing
      - Windows and doors installation
      - Kitchen and bathroom renovations

      Each image should be unique and showcase different aspects of construction work.
    `;

    const result = await model.generateContent(detailedPrompt);
    const response = await result.response;

    // Gemini 2.5 Flash Image Preview returns text, not actual images
    // We'll create placeholder URLs for now
    console.log("Gemini image generation response:", response.text());

    // Voor nu returnen we placeholder URLs
    // In de toekomst kunnen we echte afbeeldingen genereren
    const placeholderUrls = Array.from({ length: count }, (_, index) =>
      `/images/projects/project-${(index % 5) + 1}-nieuwbouw.jpg`
    );

    return placeholderUrls;

  } catch (error) {
    console.error("Error generating images with Gemini:", error);
    return [];
  }
}
