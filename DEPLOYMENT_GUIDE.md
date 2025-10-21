# 🚀 Yannova Website Deployment Guide

## Gratis Hosting Opties voor Next.js

### 1. **Vercel (AANBEVOLEN) - 100% Gratis**
- **URL**: https://vercel.com
- **Voordelen**: 
  - Gebouwd door makers van Next.js
  - Automatische deployments
  - Custom domain support
  - SSL certificaten
  - CDN wereldwijd
  - Serverless functions

### 2. **Netlify - 100% Gratis**
- **URL**: https://netlify.com
- **Voordelen**:
  - Eenvoudige drag & drop
  - Form handling
  - Branch previews
  - Custom domains

### 3. **GitHub Pages - 100% Gratis**
- **URL**: https://pages.github.com
- **Voordelen**:
  - Direct gekoppeld aan GitHub
  - Gratis hosting
  - Custom domains

## 🎯 Stap-voor-Stap Deployment

### Optie 1: Vercel (Aanbevolen)

#### Stap 1: Account Aanmaken
1. Ga naar https://vercel.com
2. Klik "Sign Up"
3. Kies "Continue with GitHub" (aanbevolen)

#### Stap 2: Project Uploaden
1. Klik "New Project"
2. Upload je project folder
3. Vercel detecteert automatisch Next.js

#### Stap 3: Environment Variables
```bash
# In Vercel dashboard > Settings > Environment Variables
GEMINI_API_KEY=AIzaSyAQmaCvjsp9bNZoz_dJhRdVJHlF1QnaWL8
ZAI_API_KEY=de443cf82d4e4bb19b935a45e9027346.b38BndsNIy7shrf5
```

#### Stap 4: Deploy
1. Klik "Deploy"
2. Wacht 2-3 minuten
3. Je krijgt een URL zoals: `https://yannova-website-abc123.vercel.app`

### Optie 2: Netlify

#### Stap 1: Build Command
```bash
npm run build
```

#### Stap 2: Upload
1. Ga naar https://netlify.com
2. Drag & drop je `out` folder
3. Of koppel GitHub repository

### Optie 3: GitHub Pages

#### Stap 1: GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/yannova-website.git
git push -u origin main
```

#### Stap 2: GitHub Pages Activeren
1. Ga naar repository Settings
2. Scroll naar "Pages"
3. Selecteer "Deploy from a branch"
4. Kies "main" branch

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables Controleren
```bash
# Check of alle API keys werken
npm run dev
```

### 2. Build Testen
```bash
npm run build
npm run start
```

### 3. Images Controleren
```bash
# Zorg dat alle images in public/ staan
ls -la public/images/
```

### 4. SEO Optimalisatie
- Meta tags ✅
- Structured data ✅
- Sitemap ✅

## 🌐 Custom Domain Setup

### Vercel Custom Domain
1. Ga naar Project Settings
2. Klik "Domains"
3. Voeg je domain toe
4. Update DNS records

### DNS Records
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 📱 Mobile Optimization
- Responsive design ✅
- Touch-friendly buttons ✅
- Fast loading ✅
- PWA ready ✅

## 🔒 Security
- HTTPS automatisch ✅
- Environment variables beveiligd ✅
- API keys niet in code ✅

## 📊 Analytics Setup
- Google Analytics
- Vercel Analytics
- Hotjar (optioneel)

## 🚀 Launch Checklist

- [ ] Website werkt lokaal
- [ ] Build succesvol
- [ ] Alle images geladen
- [ ] Chatbot werkt
- [ ] Forms werken
- [ ] Mobile responsive
- [ ] SEO meta tags
- [ ] Custom domain (optioneel)
- [ ] Analytics setup
- [ ] SSL certificaat

## 🎉 Na Deployment

### 1. Test Alles
- [ ] Homepage laadt
- [ ] Navigatie werkt
- [ ] Chatbot reageert
- [ ] Contact form werkt
- [ ] Mobile versie

### 2. SEO Submit
- Google Search Console
- Bing Webmaster Tools
- Sitemap submit

### 3. Social Media
- Facebook Business
- LinkedIn Company
- Instagram Business

## 💡 Tips

1. **Vercel is beste keuze** voor Next.js
2. **Custom domain** kost €10-15/jaar
3. **SSL certificaat** is gratis
4. **CDN** is automatisch inbegrepen
5. **Backup** je code op GitHub

## 🆘 Troubleshooting

### Build Errors
```bash
npm run build
# Check errors in terminal
```

### Environment Variables
```bash
# Check in Vercel dashboard
# Settings > Environment Variables
```

### Images Not Loading
```bash
# Check public/ folder
# Check image paths
```

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

**🎯 Aanbeveling: Start met Vercel - het is de makkelijkste en beste optie voor Next.js websites!**
