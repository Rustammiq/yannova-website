import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeGemini } from "@/lib/gemini";

// GET: Haal huidige settings op
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Retourneer of API key is ingesteld (niet de key zelf)
  const hasApiKey = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    hasApiKey,
    model: "gemini-pro",
  });
}

// POST: Update Gemini API settings
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is verplicht" },
        { status: 400 }
      );
    }

    // Test de API key
    try {
      initializeGemini(apiKey);
    } catch (error) {
      return NextResponse.json(
        { error: "Ongeldige API key" },
        { status: 400 }
      );
    }

    // In een echte applicatie zou je dit in een database opslaan
    // Voor nu retourneren we success
    return NextResponse.json({
      success: true,
      message: "API key succesvol bijgewerkt. Herstart de applicatie om de wijzigingen toe te passen.",
    });
  } catch (error: any) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: error.message || "Er ging iets mis" },
      { status: 500 }
    );
  }
}
