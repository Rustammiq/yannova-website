import { NextRequest, NextResponse } from "next/server";
import { chatWithGemini, generateImagesWithGemini, testGeminiConnection } from "@/lib/gemini";

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

export async function POST(req: NextRequest) {
  console.log("DEBUG: Chat API called");
  try {
    const body = await req.json();
    const { message, history, generateImages, imageCount, testConnection } = body;
    console.log("DEBUG: Request body:", { message: message?.substring(0, 50), historyLength: history?.length, generateImages, imageCount, testConnection });

    // Test Gemini connection if requested
    if (testConnection) {
      console.log("DEBUG: Testing Gemini connection");
      const isConnected = await testGeminiConnection();
      return NextResponse.json({
        connected: isConnected,
        message: isConnected ? "Gemini API is working" : "Gemini API is not available"
      });
    }

    if (!message) {
      console.log("DEBUG: No message provided");
      return NextResponse.json(
        { error: "Bericht is verplicht" },
        { status: 400 }
      );
    }

    // Als afbeelding generatie wordt gevraagd
    if (generateImages) {
      try {
        const images = await generateImagesWithGemini(message, imageCount || 4);
        return NextResponse.json({
          response: `Ik heb ${images.length} afbeeldingen gegenereerd voor: ${message}`,
          images: images,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Image generation error:", error);
        return NextResponse.json({
          response: "Sorry, ik kon geen afbeeldingen genereren op dit moment. Probeer het later opnieuw.",
          images: [],
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Bouw conversation history met systeem prompt
    const conversationHistory = [
      { role: "user", content: YANNICK_SYSTEM_PROMPT },
      { role: "model", content: "Begrepen! Ik ben Yannick, klaar om te helpen met bouwvragen en meer!" },
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Haal AI response op
    const response = await chatWithGemini(message, conversationHistory);

    return NextResponse.json({ response });

  } catch (error: any) {
    console.error("Chat API error:", error);

    // Fallback naar een vriendelijke foutmelding
    const fallbackResponse = "Sorry, er ging iets mis bij het ophalen van mijn antwoord. 🤔 Geen zorgen - neem contact op met Yannova Bouw voor directe hulp! 📞 Wij helpen u graag verder met uw bouwproject.";

    return NextResponse.json(
      { response: fallbackResponse },
      { status: 200 }
    );
  }
}
