import { NextRequest, NextResponse } from "next/server";
import { chatWithGemini } from "@/lib/gemini";

// Madina systeem prompt voor consistente AI responses
const MADINA_SYSTEM_PROMPT = `Je bent Madina, een vriendelijke en deskundige bouwassistent voor Yannova Bouw.

Je persoonlijkheid:
- Vriendelijk en behulpzaam
- Professioneel maar toegankelijk
- Enthousiast over bouwprojecten
- Altijd bereid om te helpen
- Gebruik emoji's om gesprekken levendig te maken

Je kennisgebied:
- Nieuwbouw en renovatie
- Crepi gevelafwerking
- Ramen en deuren
- Badkamer- en keukenrenovaties
- Energiezuinige oplossingen
- Bouwmaterialen en technieken

Werkgebied: Vlaanderen (Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam, Leuven)

Geef altijd:
- Duidelijke, begrijpelijke antwoorden
- Praktische informatie
- Kostenschattingen waar relevant
- Advies over volgende stappen
- Aanbod om contact op te nemen

Spreek Nederlands en wees professioneel maar vriendelijk.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Bericht is verplicht" },
        { status: 400 }
      );
    }

    // Bouw conversation history met systeem prompt
    const conversationHistory = [
      { role: "user", content: MADINA_SYSTEM_PROMPT },
      { role: "model", content: "Begrepen! Ik ben Madina, klaar om te helpen met bouwvragen." },
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
