# Yannova Website - Project Overview

## 🏗️ **Project Beschrijving**
Yannova is een professionele bouwonderneming website met geavanceerde AI automatisering features, video content, en moderne animaties. De website toont bouwprojecten, diensten, en innovatieve technologie integratie.

## 📁 **Belangrijke Bestanden & Structuur**

### **Core Application Files**
- `app/layout.tsx` - Hoofd layout met Navigation en Footer
- `app/page.tsx` - Homepage met hero sectie en diensten
- `app/providers.tsx` - React providers en context
- `app/globals.css` - Global styles met custom animations

### **Public Pages**
- `app/(public)/projecten/page.tsx` - Project showcase met video's en AI content
- `app/(public)/diensten/` - Service pages (verbouwing, nieuwbouw, renovatie, etc.)
- `app/(public)/contact/page.tsx` - Contact formulier
- `app/(public)/over/page.tsx` - Over Yannova pagina

### **Components**
- `components/ui/Navigation.tsx` - Hoofdnavigatie
- `components/ui/Footer.tsx` - Footer component
- `components/chatbot/Chatbot.tsx` - AI chatbot integratie
- `components/StructuredData.tsx` - SEO structured data

### **Video Content**
- `public/videos/projects/` - Project slideshow video's
- `public/videos/ai-automation/` - AI automatisering video's (10 video's)
- `public/videos/ramen-deuren/` - Ramen & deuren content

### **Image Assets**
- `public/images/projects/` - Project afbeeldingen (9 gegenereerde afbeeldingen)
- `public/images/gallery/` - Gallery afbeeldingen
- `public/images/team/` - Team foto's
- `public/images/ramen-deuren/` - Ramen & deuren specifieke afbeeldingen

### **AI & Automation Scripts**
- `generate-images-huggingface.py` - Hugging Face image generatie
- `generate-ai-automation-videos.py` - AI automatisering video's
- `create-slideshow-videos.py` - Project slideshow video's
- `lib/gemini.ts` - Google Gemini AI integratie
- `lib/photoManager.ts` - Photo management systeem

### **Configuration**
- `next.config.js` - Next.js configuratie
- `tailwind.config.ts` - Tailwind CSS configuratie
- `tsconfig.json` - TypeScript configuratie
- `package.json` - Dependencies en scripts

## 🎨 **Design System**

### **Colors (Tailwind)**
- Primary: `yannova-primary` (custom blue)
- Dark: `yannova-dark` (dark blue)
- Gray: `yannova-gray` (custom gray)

### **Animations**
- Custom CSS animations in `globals.css`
- Hover effects met scale transforms
- Video play indicators
- Pulse animations voor AI badges
- Smooth transitions (300-500ms)

## 🤖 **AI Features**

### **Chatbot Integration**
- AI-powered bouwadvies
- 24/7 klantondersteuning
- Gemini API integratie

### **Video Content**
- 10 AI automatisering video's
- 4 project slideshow video's
- Interactive video players
- Hover animations

### **Image Generation**
- Hugging Face Stable Diffusion
- Project-specifieke afbeeldingen
- Gallery content generatie

## 📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly interactions
- Adaptive video players
- Responsive grid layouts

## 🚀 **Performance**
- Optimized video loading
- Image optimization
- Smooth 60fps animations
- Hardware acceleration

## 🔧 **Development Workflow**
- TypeScript voor type safety
- Tailwind CSS voor styling
- Next.js App Router
- Git branch strategy
- Automated image/video generation

## 📊 **Content Management**
- PhotoManager voor afbeelding rotatie
- Video mapping systeem
- Dynamic content loading
- SEO optimization

## 🎯 **Recent Updates**
- AI automatisering video sectie toegevoegd
- Professionele animaties geïmplementeerd
- Video showcase verbeterd
- Interactive hover effects
- Pulse animations voor AI badges
