import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Simple in-memory user store (in productie zou dit een database zijn)
// Voor nu hardcoded admin account
const users = [
  {
    id: "1",
    email: process.env.ADMIN_EMAIL || "admin@yannova.nl",
    password: "", // Wordt ingesteld bij eerste gebruik
    name: "Admin",
    role: "admin",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo mode: accepteer admin@yannova.nl met wachtwoord admin123
        if (credentials.email === "admin@yannova.nl" && credentials.password === "admin123") {
          return {
            id: "1",
            email: "admin@yannova.nl",
            name: "Admin",
            role: "admin",
          };
        }

        // Voor productie: echte authenticatie
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          return null;
        }

        // Voor eerste login: als er geen wachtwoord is, stel het in
        if (!user.password) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          user.password = hashedPassword;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "demo-secret-key-for-development-only",
};
