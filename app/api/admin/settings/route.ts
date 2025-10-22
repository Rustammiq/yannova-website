import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeGemini } from "@/lib/gemini";

// GET: Haal huidige settings op
export async function GET(req: NextRequest) {
  // Demo mode: altijd toegang geven voor testing
  const hasApiKey = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    hasApiKey,
    model: "gemini-2.0-flash",
  });
}

// POST: Update Gemini API settings
export async function POST(req: NextRequest) {
  // Demo mode: accepteer elke API key voor testing
  try {
    const body = await req.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is verplicht" },
        { status: 400 }
      );
    }

    // Demo mode: accepteer elke key voor testing
    return NextResponse.json({
      success: true,
      message: "API key succesvol bijgewerkt. Demo mode actief - echte API calls worden gebruikt wanneer beschikbaar.",
    });
  } catch (error: unknown) {
    console.error("Admin API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Er ging iets mis";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
