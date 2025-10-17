# Yannova Bouw Website

Professionele website voor Yannova Bouw met AI-powered chatbot (Google Gemini) en admin dashboard.

## 🚀 Features

- ✅ **Next.js 14** met App Router
- ✅ **TypeScript** voor type-safety
- ✅ **Tailwind CSS** voor styling
- ✅ **NextAuth.js** voor authenticatie
- ✅ **Google Gemini AI** chatbot integratie
- ✅ **Admin Dashboard** voor AI configuratie
- ✅ **Responsive Design** voor alle devices
- ✅ **SEO Geoptimaliseerd**

## 📋 Vereisten

- Node.js 18+ 
- npm of yarn
- Google Gemini API key (gratis verkrijgbaar)

## 🛠️ Installatie

### 1. Clone het project

```bash
git clone <repository-url>
cd yannova-website
```

### 2. Installeer dependencies

```bash
npm install
```

### 3. Environment variabelen

Kopieer `.env.example` naar `.env.local`:

```bash
cp .env.example .env.local
```

Vul de volgende variabelen in `.env.local`:

```env
# NextAuth
NEXTAUTH_SECRET=genereer-een-random-string-hier
NEXTAUTH_URL=http://localhost:3000

# Google Gemini API
GEMINI_API_KEY=jouw-gemini-api-key-hier

# Admin Credentials
ADMIN_EMAIL=admin@yannova.nl
ADMIN_PASSWORD=JouwVeiligWachtwoord123!
```

#### NextAuth Secret genereren:

```bash
openssl rand -base64 32
```

#### Gemini API Key verkrijgen:

1. Ga naar [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Log in met je Google account
3. Klik op "Create API Key"
4. Kopieer de API key naar `.env.local`

### 4. Start de development server

```bash
npm run dev
```

De website is nu beschikbaar op [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Dashboard

### Toegang

Navigeer naar [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Standaard inloggegevens:**
- Email: De email die je in `.env.local` hebt ingesteld
- Password: Het wachtwoord dat je in `.env.local` hebt ingesteld

### Functionaliteiten

- **AI Instellingen**: Configureer Google Gemini API
- **API Key Beheer**: Stel je Gemini API key in via de UI

## 🤖 AI Chatbot

De chatbot is beschikbaar op alle publieke pagina's via de chat-knop rechtsonder.

**Functionaliteiten:**
- Beantwoordt vragen over Yannova diensten
- Geeft informatie over projecten
- Helpt bij offertes
- Powered by Google Gemini AI

## 📁 Project Structuur

```
yannova-website/
├── app/
│   ├── (public)/           # Publieke pagina's
│   │   ├── over/
│   │   ├── diensten/
│   │   ├── projecten/
│   │   └── contact/
│   ├── admin/              # Admin dashboard
│   │   ├── login/
│   │   └── page.tsx
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth
│   │   ├── chat/           # Chatbot API
│   │   └── admin/          # Admin API
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                 # UI components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── chatbot/            # Chatbot components
│   │   └── Chatbot.tsx
│   └── admin/              # Admin components
├── lib/
│   ├── auth.ts             # NextAuth configuratie
│   └── gemini.ts           # Gemini AI utilities
└── public/
    └── images/             # Afbeeldingen
```

## 🚀 Deployment naar Vercel

### 1. Push naar GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <jouw-github-repo>
git push -u origin main
```

### 2. Deploy op Vercel

1. Ga naar [vercel.com](https://vercel.com)
2. Klik op "Import Project"
3. Selecteer je GitHub repository
4. Voeg de environment variabelen toe:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (gebruik je Vercel URL)
   - `GEMINI_API_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
5. Klik op "Deploy"

### 3. Custom Domain (optioneel)

In Vercel dashboard:
1. Ga naar Settings > Domains
2. Voeg je custom domain toe (bijv. yannova.nl)
3. Update `NEXTAUTH_URL` in environment variabelen

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build voor productie
npm run start    # Start productie server
npm run lint     # Lint code
```

## 🎨 Styling Aanpassen

De kleuren zijn te vinden in `tailwind.config.ts`:

```typescript
colors: {
  yannova: {
    primary: "#D4A574",  // Goud kleur
    dark: "#1a1a1a",
    gray: "#4a4a4a",
  },
}
```

## 🔧 Development Tips

### Hot Reload Issues?

```bash
rm -rf .next
npm run dev
```

### Port al in gebruik?

```bash
npm run dev -- -p 3001
```

## 📸 Afbeeldingen Toevoegen

Plaats afbeeldingen in `public/images/`:
- Hero image: `public/images/hero-construction.jpg`
- Project foto's: `public/images/projects/`
- Team foto's: `public/images/team/`

## 🆘 Problemen?

### Chatbot werkt niet
1. Controleer of `GEMINI_API_KEY` correct is ingesteld
2. Test de API key in Google AI Studio
3. Check de browser console voor errors

### Kan niet inloggen
1. Controleer `ADMIN_EMAIL` en `ADMIN_PASSWORD` in `.env.local`
2. Clear browser cookies
3. Controleer of `NEXTAUTH_SECRET` is ingesteld

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📄 Licentie

© 2024 Yannova Bouw. Alle rechten voorbehouden.

## 🤝 Contact

Voor vragen of ondersteuning:
- Email: info@yannova.nl
- Website: [yannova.nl](https://yannova.nl)

---

**Gemaakt met ❤️ voor Yannova Bouw**
