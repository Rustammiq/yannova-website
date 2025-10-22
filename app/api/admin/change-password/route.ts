import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Simple in-memory user store (in productie zou dit een database zijn)
const users = [
  {
    id: "1",
    email: process.env.ADMIN_EMAIL || "admin@yannova.nl",
    password: "", // Wordt ingesteld bij eerste gebruik
    name: "Admin",
    role: "admin",
  },
];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return new NextResponse(JSON.stringify({ message: 'Huidig wachtwoord en nieuw wachtwoord zijn vereist' }), { status: 400 });
    }

    if (newPassword.length < 6) {
      return new NextResponse(JSON.stringify({ message: 'Nieuw wachtwoord moet minimaal 6 karakters lang zijn' }), { status: 400 });
    }

    const user = users.find((u) => u.email === session.user?.email);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Gebruiker niet gevonden' }), { status: 404 });
    }

    // Voor demo mode: controleer of huidig wachtwoord admin123 is
    let isValidPassword = false;

    if (currentPassword === "admin123") {
      isValidPassword = true;
    } else if (user.password) {
      // Voor productie: echte bcrypt vergelijking
      isValidPassword = await bcrypt.compare(currentPassword, user.password);
    } else {
      // Als er nog geen wachtwoord is ingesteld, accepteer admin123 als huidig
      isValidPassword = currentPassword === "admin123";
    }

    if (!isValidPassword) {
      return new NextResponse(JSON.stringify({ message: 'Huidig wachtwoord is onjuist' }), { status: 401 });
    }

    // Hash het nieuwe wachtwoord
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    return NextResponse.json({
      message: 'Wachtwoord succesvol gewijzigd',
      success: true
    });

  } catch (error) {
    console.error('Error changing password:', error);
    return new NextResponse(JSON.stringify({ message: 'Interne server fout' }), { status: 500 });
  }
}
