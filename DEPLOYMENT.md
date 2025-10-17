# 🚀 Vercel Deployment Guide

Complete handleiding om de Yannova website te deployen op Vercel.

## 📋 Vereisten

- GitHub account
- Vercel account (gratis op [vercel.com](https://vercel.com))
- Je Gemini API key klaar

## 🔄 Stap 1: Push naar GitHub

### Maak een nieuw GitHub repository

1. Ga naar [github.com/new](https://github.com/new)
2. Geef je repository een naam (bijv. `yannova-website`)
3. Klik op "Create repository"

### Push je code

```bash
cd yannova-website

# Initialiseer git (als nog niet gedaan)
git init

# Voeg alle bestanden toe
git add .

# Maak eerste commit
git commit -m "Initial commit: Yannova website with AI chatbot"

# Voeg GitHub remote toe (vervang USERNAME en REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push naar GitHub
git branch -M main
git push -u origin main
```

## 🚀 Stap 2: Deploy op Vercel

### Import Project

1. Ga naar [vercel.com/new](https://vercel.com/new)
2. Klik op **"Import Git Repository"**
3. Selecteer je `yannova-website` repository
4. Klik op **"Import"**

### Configureer Environment Variables

**BELANGRIJK:** Voeg deze variabelen toe voordat je deployt:

```env
NEXTAUTH_SECRET=gebruik-openssl-rand-base64-32
NEXTAUTH_URL=https://jouw-domain.vercel.app
GEMINI_API_KEY=je-gemini-api-key
ADMIN_EMAIL=admin@yannova.nl
ADMIN_PASSWORD=JouwVeiligWachtwoord123!
```

**Hoe:**
1. Scroll naar beneden naar **"Environment Variables"**
2. Voeg elke variabele toe:
   - Name: `NEXTAUTH_SECRET`
   - Value: [genereer met: `openssl rand -base64 32`]
3. Herhaal voor alle variabelen
4. Klik op **"Deploy"**

### NEXTAUTH_URL updaten

Na eerste deployment:
1. Je krijgt een URL zoals: `https://yannova-website.vercel.app`
2. Ga naar **Settings** → **Environment Variables**
3. Edit `NEXTAUTH_URL` 
4. Update naar je Vercel URL
5. Klik op **"Save"**
6. Ga naar **Deployments** → Klik op **"Redeploy"**

## 🌐 Stap 3: Custom Domain (Optioneel)

### Voeg je eigen domain toe

1. Ga naar **Settings** → **Domains**
2. Voer je domain in (bijv. `yannova.nl`)
3. Volg de DNS instructies van Vercel
4. Update `NEXTAUTH_URL` naar je custom domain
5. Redeploy de applicatie

### DNS Instellingen (voorbeeld)

Voor **yannova.nl**:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## ✅ Stap 4: Test de Deployment

### Checklist

- [ ] Website is bereikbaar op Vercel URL
- [ ] Homepage laadt correct
- [ ] Alle pagina's werken (Over, Diensten, Projecten, Contact)
- [ ] Admin login werkt op `/admin/login`
- [ ] AI Chatbot werkt
- [ ] Geen console errors

### Test Admin Dashboard

1. Ga naar `https://jouw-url.vercel.app/admin/login`
2. Log in met je credentials
3. Test de AI Settings pagina
4. Voer je Gemini API key in (als niet via env vars gedaan)

### Test Chatbot

1. Ga naar de homepage
2. Klik op de chat button (rechtsonder)
3. Stel een testvraag
4. Controleer of je een antwoord krijgt

## 🔧 Troubleshooting

### Build Errors

**Error: "Module not found"**
```bash
# Lokaal testen
npm run build

# Als het lokaal werkt, check Vercel logs
```

**Error: "Environment variable missing"**
- Controleer of alle env vars zijn toegevoegd in Vercel
- Let op spelling en hoofdletters

### Runtime Errors

**Chatbot werkt niet**
1. Check Vercel logs: **Deployments** → Click deployment → **View Function Logs**
2. Controleer `GEMINI_API_KEY` in Environment Variables
3. Test API key op [https://makersuite.google.com](https://makersuite.google.com)

**Login werkt niet**
1. Check of `NEXTAUTH_SECRET` is ingesteld
2. Controleer `NEXTAUTH_URL` (moet je Vercel URL zijn)
3. Clear browser cookies en probeer opnieuw

**"Error: Invalid environment variable"**
- Check of alle required env vars zijn ingesteld
- Herstart deployment na toevoegen van variabelen

## 🔄 Updates Deployen

Elke push naar `main` branch triggert automatisch een nieuwe deployment:

```bash
# Maak wijzigingen
# ...

# Commit en push
git add .
git commit -m "Update: beschrijving van wijziging"
git push origin main

# Vercel deployt automatisch!
```

## 📊 Monitoring

### Vercel Analytics (Gratis)

1. Ga naar je project in Vercel
2. Click **Analytics** in zijbalk
3. Enable **Web Analytics**

### Function Logs

Check logs voor errors:
1. **Deployments** → Click deployment
2. **View Function Logs**
3. Filter op `/api/chat` voor chatbot logs

## 🔒 Beveiliging

### Environment Variables

✅ **Nooit** commit `.env.local` naar Git
✅ **Gebruik** Vercel Environment Variables
✅ **Roteer** API keys regelmatig

### Best Practices

```bash
# Voeg toe aan .gitignore (already done)
.env*.local
.env
```

## 💰 Kosten

### Vercel Free Tier (Hobby)

- ✅ 100GB Bandwidth/maand
- ✅ Serverless Functions
- ✅ Automatische HTTPS
- ✅ Custom domains
- ✅ Gratis voor persoonlijke projecten

### Gemini API

- ✅ Gratis tier: 60 requests/minuut
- ✅ Meer dan genoeg voor kleine websites

## 🎉 Klaar!

Je Yannova website is nu live! 

**Volgende stappen:**

1. ⭐ Test alle functionaliteiten
2. 📸 Voeg echte foto's toe
3. 📧 Setup email notificaties (optioneel)
4. 📊 Monitor analytics
5. 🚀 Promoot je website!

---

**Hulp nodig?** Check de Vercel docs: [vercel.com/docs](https://vercel.com/docs)
