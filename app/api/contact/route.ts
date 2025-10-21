import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Alle verplichte velden moeten worden ingevuld" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Yannova Website <noreply@yannova.nl>",
      to: ["info@yannova.nl"],
      subject: `Nieuw contactformulier bericht: ${subject}`,
      html: `
        <h2>Nieuw bericht via contactformulier</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Er ging iets mis bij het versturen van het bericht" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Bericht succesvol verzonden!" 
    });

  } catch (error: unknown) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
