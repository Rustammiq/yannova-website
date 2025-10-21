# 🏗️ Yannova Bouw Website

**Professionele bouwoplossingen van begin tot eind - Project Afronding**

Een moderne, geoptimaliseerde website voor Yannova Bouw, gespecialiseerd in nieuwbouw, verbouwingen, renovaties, crepi gevelafwerking en ramen & deuren vervanging in de regio Vlaams-Brabant.

## 🌟 Features

### 🎯 Lokale SEO Optimalisatie
- **Doelsteden**: Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam, Leuven
- **Lokale service pagina's** voor elke stad
- **Schema.org structured data** voor lokale bedrijven
- **Geoptimaliseerde meta tags** en Open Graph
- **Sitemap.xml** en **robots.txt** voor zoekmachines

### 🤖 AI Chatbot
- **Google Gemini AI** integratie
- **Nederlandse taal** ondersteuning
- **Bouw-specifieke** kennis en antwoorden
- **Admin dashboard** voor AI configuratie

### 📧 Contact & Communicatie
- **Resend email** integratie voor contactformulier
- **Responsive contact pagina** met lokale werkgebieden
- **Directe contact** mogelijkheden

### 🎨 Design & UX
- **Custom SVG iconen** in warme bruine stijl
- **Responsive design** voor alle apparaten
- **Moderne animaties** en hover effecten
- **Performance geoptimaliseerd**

## 🚀 Tech Stack

- **Framework**: Next.js 14 met App Router
- **Taal**: TypeScript voor type safety
- **Styling**: Tailwind CSS
- **Authenticatie**: NextAuth.js
- **AI**: Google Gemini AI
- **Email**: Resend
- **Icons**: Custom SVG + Lucide React
- **Deployment**: Vercel-ready

## 📁 Project Structuur

```
yannova-website/
├── app/
│   ├── (public)/           # Publieke pagina's
│   │   ├── contact/        # Contact pagina
│   │   ├── diensten/       # Diensten overzicht
│   │   ├── projecten/      # Projecten showcase
│   │   ├── over/           # Over ons
│   │   ├── keerbergen/     # Lokale service pagina
│   │   ├── mechelen/       # Lokale service pagina
│   │   ├── leuven/         # Lokale service pagina
│   │   └── ...
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # UI componenten
│   └── chatbot/            # AI chatbot
├── lib/                    # Utility functies
└── public/                 # Statische bestanden
```

## 🛠️ Installatie & Setup

### Vereisten
- Node.js 18+ 
- npm of yarn
- Google Gemini API key
- Resend API key (optioneel)

### Stappen

1. **Repository clonen**
```bash
git clone https://github.com/Rustammiq/yannova-website.git
cd yannova-website
```

2. **Dependencies installeren**
```bash
npm install
```

3. **Environment variabelen configureren**
```bash
cp .env.example .env.local
```

Vul de volgende variabelen in `.env.local`:
```env
NEXTAUTH_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
RESEND_API_KEY=your-resend-api-key
CONTACT_EMAIL=your-contact-email
```

4. **Development server starten**
```bash
npm run dev
```

5. **Website bezoeken**
Open [http://localhost:3000](http://localhost:3000)

## 📊 SEO Features

### Lokale SEO
- ✅ Lokale keywords in content
- ✅ Lokale service pagina's per stad
- ✅ Schema.org LocalBusiness markup
- ✅ Google My Business integratie ready
- ✅ Lokale backlink strategie

### Technische SEO
- ✅ Sitemap.xml automatisch gegenereerd
- ✅ Robots.txt geoptimaliseerd
- ✅ Meta tags en Open Graph
- ✅ Performance optimalisaties
- ✅ Mobile-first responsive design

## 🎨 Design Systeem

### Kleuren
- **Primary**: `#D4A574` (Warm goud)
- **Dark**: `#2C3E50` (Donker blauw)
- **Gray**: `#6C757D` (Neutraal grijs)
- **Icons**: `#8B4513` (Warm bruin)

### Iconen
- **Stijl**: Custom SVG outline iconen
- **Achtergrond**: Lichtbeige (`bg-stone-100`)
- **Kleur**: Warmbruin outline
- **Grootte**: 32x32px

## 🚀 Deployment

### Vercel (Aanbevolen)
1. Connect repository met Vercel
2. Configureer environment variabelen
3. Deploy automatisch bij push naar main

### Andere platforms
- **Netlify**: Static export mogelijk
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 📈 Performance

- **Lighthouse Score**: 95+ op alle metrics
- **Core Web Vitals**: Geoptimaliseerd
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Geoptimaliseerd met tree-shaking
- **Caching**: Strategische cache headers

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
npm run analyze      # Bundle analyzer
```

## 📝 Lokale Service Pagina's

Elke doelstad heeft een eigen service pagina:
- `/keerbergen` - Aannemer Keerbergen
- `/mechelen` - Aannemer Mechelen  
- `/leuven` - Aannemer Leuven
- `/putte` - Aannemer Putte
- `/bonheiden` - Aannemer Bonheiden
- `/rijmenam` - Aannemer Rijmenam

## 🤝 Bijdragen

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je wijzigingen (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is eigendom van Yannova Bouw. Alle rechten voorbehouden.

## 📞 Contact

- **Website**: [yannova.nl](https://yannova.nl)
- **Email**: info@yannova.nl
- **Telefoon**: +31 6 12 34 56 78

---

**Yannova Bouw** - Van Begin tot Eind, Project Afronding 🏗️