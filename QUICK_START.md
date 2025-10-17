# 🚀 Quick Start Guide - Yannova Website

## Snelle Setup (5 minuten)

### 1️⃣ Installeer Dependencies

```bash
npm install
```

### 2️⃣ Maak .env.local Bestand

```bash
cp .env.example .env.local
```

### 3️⃣ Vul Environment Variables

Open `.env.local` en vul in:

```env
# Genereer NextAuth secret:
NEXTAUTH_SECRET=gebruik-de-command-hieronder
NEXTAUTH_URL=http://localhost:3000

# Verkrijg Gemini API key op: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=je-api-key-hier

# Admin login
ADMIN_EMAIL=admin@yannova.nl
ADMIN_PASSWORD=JouwVeiligWachtwoord123!
```

**NextAuth Secret Genereren:**
```bash
openssl rand -base64 32
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

Website draait nu op: http://localhost:3000

---

## ✅ Checklist

- [ ] Dependencies geïnstalleerd (`npm install`)
- [ ] `.env.local` bestand aangemaakt
- [ ] Gemini API key verkregen en ingevuld
- [ ] NextAuth secret gegenereerd
- [ ] Admin wachtwoord ingesteld
- [ ] Development server gestart

---

## 🔑 Belangrijke URLs

| Pagina | URL |
|--------|-----|
| **Homepage** | http://localhost:3000 |
| **Admin Login** | http://localhost:3000/admin/login |
| **Admin Dashboard** | http://localhost:3000/admin |
| **Over Ons** | http://localhost:3000/over |
| **Diensten** | http://localhost:3000/diensten |
| **Projecten** | http://localhost:3000/projecten |
| **Contact** | http://localhost:3000/contact |

---

## 🎯 Eerste Stappen

### 1. Test de Website
- Open http://localhost:3000
- Klik op de chatbot (rechtsonder)
- Navigeer door alle pagina's

### 2. Login als Admin
- Ga naar http://localhost:3000/admin/login
- Email: `admin@yannova.nl` (of wat je in .env.local hebt ingesteld)
- Wachtwoord: Wat je in .env.local hebt ingesteld

### 3. Configureer AI
- In het admin dashboard: **AI Instellingen**
- Voer je Gemini API key in
- Klik op **Opslaan**
- Herstart de development server

### 4. Test de Chatbot
- Ga terug naar de homepage
- Open de chatbot
- Stel een vraag zoals: "Wat voor diensten bieden jullie aan?"

---

## 🛠️ Veelvoorkomende Problemen

### Port al in gebruik?
```bash
# Gebruik een andere port
npm run dev -- -p 3001
```

### Chatbot werkt niet?
1. Check of `GEMINI_API_KEY` correct is in `.env.local`
2. Herstart de development server
3. Check browser console voor errors

### Kan niet inloggen?
1. Controleer `ADMIN_EMAIL` en `ADMIN_PASSWORD` in `.env.local`
2. Check of `NEXTAUTH_SECRET` is ingesteld
3. Clear browser cookies en probeer opnieuw

---

## 📦 Volgende Stappen

1. **Voeg echte afbeeldingen toe**
   - Plaats in `public/images/`
   - Update de image placeholders

2. **Pas kleuren aan**
   - Bewerk `tailwind.config.ts`
   - Wijzig de `yannova` kleuren

3. **Deploy naar Vercel**
   - Push naar GitHub
   - Connect met Vercel
   - Voeg environment variables toe

4. **Voeg meer functionaliteiten toe**
   - Database (Supabase/Vercel Postgres)
   - Email notifications (Resend/SendGrid)
   - File uploads (voor projectfoto's)

---

## 💡 Tips

- Gebruik `npm run build` om te testen of alles correct gebuild
- Check de README.md voor uitgebreide documentatie
- De chatbot kan aangepast worden in `lib/gemini.ts`
- Admin functies uitbreiden? Check `app/admin/page.tsx`

---

**Klaar om te beginnen? Start met stap 1! 🚀**
