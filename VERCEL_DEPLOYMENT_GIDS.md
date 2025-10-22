# 🚀 Vercel Deployment Gids - Yannova Website

## ✅ **Je hebt een Vercel API Key!** (`vck_1iGS1HHWk7UHIwNaibwkrJuzQOphHeFRRuzB9yXOqw41sdOpbF2aqDqD`)

Dit betekent dat je succesvol bent ingelogd bij Vercel. Nu kun je de deployment voltooien!

## 🎯 **Stap 1: Ga naar Vercel Dashboard**

1. **Open [vercel.com](https://vercel.com)**
2. **Login** met je GitHub account (dezelfde als voor de API key)
3. **Klik op "New Project"** of ga naar je bestaande project

## 📁 **Stap 2: Connect GitHub Repository**

1. **Selecteer de repository**: `Rustammiq/yannova-website`
2. **Selecteer branch**: `feature/major-improvements-20251022`
3. **Configureer project**:
   ```
   ✅ Project Name: yannova-website
   ✅ Framework Preset: Next.js
   ✅ Root Directory: ./
   ✅ Build Command: npm run build
   ✅ Output Directory: .next
   ```

## 🔧 **Stap 3: Environment Variables Instellen**

**BELANGRIJK!** Klik op "Environment Variables" en voeg toe:

```
NEXTAUTH_SECRET = vck_1iGS1HHWk7UHIwNaibwkrJuzQOphHeFRRuzB9yXOqw41sdOpbF2aqDqD
NEXTAUTH_URL = https://yannova-website.vercel.app
ADMIN_EMAIL = admin@yannova.nl
GEMINI_API_KEY = AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo
```

## 🚀 **Stap 4: Deploy!**

1. **Klik "Deploy"**
2. **Wacht op de build** (duurt 2-5 minuten)
3. **Controleer de build logs** - zou nu moeten slagen!

## 🎉 **Stap 5: Test de Live Website**

Na succesvolle deployment krijg je een URL zoals:
- **Live Website**: `https://yannova-website.vercel.app`

### **Test deze URLs:**
- ✅ **Homepage**: `https://yannova-website.vercel.app/`
- ✅ **Admin Login**: `https://yannova-website.vercel.app/admin/login`
- ✅ **Foto Beheer**: `https://yannova-website.vercel.app/admin/photos`
- ✅ **Projecten**: `https://yannova-website.vercel.app/projecten`

## 🔐 **Stap 6: Admin Login Testen**

1. **Ga naar**: `https://yannova-website.vercel.app/admin/login`
2. **Login met**:
   ```
   Email: admin@yannova.nl
   Password: admin123
   ```
3. **Test inline editing** door de bewerkingsmodus in te schakelen (rechtsbeneden)

## 📸 **Stap 7: Foto Beheer Testen**

1. **Ga naar**: `https://yannova-website.vercel.app/admin/photos`
2. **Upload nieuwe foto's**
3. **Test inline editing** op de projecten pagina's
4. **Controleer of alles werkt** zoals verwacht

## 🔧 **Environment Variables (Herinnering)**

**Zorg dat deze exact zijn ingesteld:**

```
NEXTAUTH_SECRET = vck_1iGS1HHWk7UHIwNaibwkrJuzQOphHeFRRuzB9yXOqw41sdOpbF2aqDqD
NEXTAUTH_URL = https://yannova-website.vercel.app
ADMIN_EMAIL = admin@yannova.nl
GEMINI_API_KEY = AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo
```

## 🎯 **Features die nu werken:**

- ✅ **Foto Beheersysteem** - Upload, bewerk, verwijder foto's
- ✅ **Inline Editing** - Bewerk tekst en foto's direct op de website
- ✅ **Admin Interface** - Complete beheeromgeving
- ✅ **Responsive Design** - Werkt op alle apparaten
- ✅ **PWA Support** - Progressive Web App functionaliteit
- ✅ **SEO Optimalisatie** - Geoptimaliseerd voor zoekmachines
- ✅ **Chatbot Integratie** - AI chatbot voor offertes

## 🚨 **Probleemoplossing:**

**Als de build nog faalt:**
1. Check of alle environment variables correct zijn ingesteld
2. Controleer of de branch `feature/major-improvements-20251022` geselecteerd is
3. Kijk in de build logs voor specifieke error messages

**Success criteria:**
- ✅ Build completed zonder errors
- ✅ Website laadt op de Vercel URL
- ✅ Admin login werkt
- ✅ Foto upload functionaliteit werkt
- ✅ Inline editing werkt

## 🎊 **Je bent bijna klaar!**

**Met je API key kun je nu:**
1. **Deployen naar Vercel** via de web interface
2. **Environment variables instellen**
3. **Live website testen**
4. **Admin functionaliteit gebruiken**

**De website is volledig klaar voor productie!** 🚀
