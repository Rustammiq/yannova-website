import { NextRequest, NextResponse } from 'next/server';

// Simulated database - in production, use a real database
let contacts = [
  {
    id: "1",
    name: "Jan De Vries",
    email: "jan.devries@email.com",
    phone: "+32 123 456 789",
    subject: "Offerte badkamerrenovatie",
    message: "Beste Yannova team, ik wil graag een offerte voor een complete badkamerrenovatie. Kunnen jullie langskomen voor een vrijblijvend gesprek? Het gaat om een badkamer van ongeveer 8m².",
    status: "new",
    priority: "high",
    createdAt: "2024-02-15T10:30:00Z",
    tags: ["badkamer", "renovatie", "offerte"]
  },
  {
    id: "2",
    name: "Marie Van der Berg",
    email: "marie.vandenberg@email.com",
    phone: "+32 987 654 321",
    subject: "Tevreden klant - crepi gevelafwerking",
    message: "Zeer tevreden met de crepi gevelafwerking! Kwaliteit is uitstekend en het team was professioneel. Bedankt voor het mooie werk.",
    status: "replied",
    priority: "low",
    createdAt: "2024-02-10T14:20:00Z",
    repliedAt: "2024-02-11T09:15:00Z",
    tags: ["crepi", "tevreden", "referentie"]
  },
  {
    id: "3",
    name: "Peter Janssen",
    email: "peter.janssen@email.com",
    subject: "Vraag over nieuwbouw project",
    message: "Ik ben geïnteresseerd in een nieuwbouw project in Keerbergen. Wat zijn jullie tarieven en hoe lang duurt een gemiddeld project?",
    status: "read",
    priority: "medium",
    createdAt: "2024-02-12T16:45:00Z",
    tags: ["nieuwbouw", "tarieven", "keerbergen"]
  },
  {
    id: "4",
    name: "Lisa Vermeulen",
    email: "lisa.vermeulen@email.com",
    phone: "+32 456 789 123",
    subject: "Ramen en deuren vervangen",
    message: "Hallo, ik wil graag mijn ramen en deuren laten vervangen. Kunnen jullie een offerte maken voor een woning in Mechelen?",
    status: "new",
    priority: "high",
    createdAt: "2024-02-14T09:15:00Z",
    tags: ["ramen", "deuren", "offerte", "mechelen"]
  },
  {
    id: "5",
    name: "Thomas De Smet",
    email: "thomas.desmet@email.com",
    subject: "Keuken renovatie offerte",
    message: "Beste, ik ben op zoek naar een aannemer voor een keukenrenovatie. Kunnen jullie langskomen voor een meting?",
    status: "replied",
    priority: "medium",
    createdAt: "2024-02-13T11:30:00Z",
    repliedAt: "2024-02-13T15:45:00Z",
    tags: ["keuken", "renovatie", "meting"]
  }
];

export async function GET() {
  try {
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message, priority = 'medium' } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      status: 'new' as const,
      priority: priority as 'low' | 'medium' | 'high',
      createdAt: new Date().toISOString(),
      tags: []
    };

    contacts.unshift(newContact);

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();

    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    contacts[contactIndex] = { ...contacts[contactIndex], ...updates };

    return NextResponse.json(contacts[contactIndex]);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    contacts = contacts.filter(contact => contact.id !== id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
