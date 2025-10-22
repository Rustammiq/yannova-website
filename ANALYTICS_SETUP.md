# 📊 Google Analytics Setup - Yannova Website

## 🚀 **Analytics Implementatie Status**
- ✅ **Google Analytics 4** geïmplementeerd
- ✅ **Custom Events** voor bouw-specifieke tracking
- ✅ **Enhanced E-commerce** tracking voor offertes
- ✅ **Performance Monitoring** met Core Web Vitals
- ✅ **Scroll Depth** tracking
- ✅ **Service & Location** tracking

## 🔧 **Setup Instructies**

### **1. Google Analytics 4 Account**
1. Ga naar [Google Analytics](https://analytics.google.com)
2. Maak een nieuw GA4 property aan voor `yannova.nl`
3. Kopieer je **Measurement ID** (format: `G-XXXXXXXXXX`)

### **2. Environment Variables**
Maak een `.env.local` bestand aan:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Gemini AI (al geconfigureerd)
GEMINI_API_KEY=AIzaSyAvKfrzJt7Vq8V6LGzzEUNEGi4yTZYzweo
```

### **3. Google Analytics Configuratie**
In Google Analytics 4, stel de volgende **Custom Events** in:

#### **Conversion Events** (telkens als primaire doelen)
- `contact_form_submit` - Contactformulier inzendingen
- `service_quote_request` - Offerte aanvragen
- `phone_click` - Telefoonnummer klikken
- `project_contact_click` - Project contact klikken

#### **Enhanced E-commerce Events**
- `service_view` - Dienst pagina views
- `project_view` - Project pagina views
- `location_page_view` - Locatie pagina views

## 📈 **Tracking Features**

### **Automatische Tracking**
- ✅ **Page Views** - Alle pagina's
- ✅ **Scroll Depth** - 25%, 50%, 75%, 100%
- ✅ **Service Pages** - Specifieke dienst tracking
- ✅ **Location Pages** - Lokale pagina tracking
- ✅ **Contact Forms** - Formulier inzendingen
- ✅ **Chat Interactions** - AI chatbot gebruik

### **Business Intelligence Events**
- 🏗️ **Project Views** - Welke projecten populair zijn
- 🔧 **Service Interest** - Welke diensten gewild zijn
- 📍 **Location Interest** - Welke regio's actief zijn
- 💬 **Chat Usage** - Hoe vaak chatbot gebruikt wordt
- 📱 **Mobile vs Desktop** - Device gebruik

### **Performance Tracking**
- ⚡ **Core Web Vitals** - LCP, FID, CLS
- 📊 **Page Load Times** - Loading performance
- 🎯 **User Engagement** - Bounce rate, session duration

## 🎯 **Custom Dashboards**

### **Yannova Business Dashboard**
1. **Service Performance** - Welke diensten converteren het best
2. **Location Analytics** - Welke regio's de meeste interesse tonen
3. **Project Analytics** - Welke projecten de meeste views krijgen
4. **Contact Analytics** - Hoe leads binnenkomen (formulier, telefoon, chat)

### **Marketing Dashboard**
1. **Traffic Sources** - SEO, Social, Direct, Referral
2. **Content Performance** - Welke pagina's het best presteren
3. **Conversion Funnel** - Van bezoek naar contact
4. **Mobile Experience** - Mobile vs Desktop performance

## 🔄 **Data Flow**

```
Website Events → Google Analytics 4 → Custom Reports → Business Insights
     ↓                ↓                    ↓              ↓
User Actions → Event Tracking → Data Analysis → Optimization
```

## 📱 **Event Parameters**

### **Service Tracking**
```javascript
// Service page views
service: 'nieuwbouw' | 'verbouwing' | 'crepi' | 'ramen_deuren'

// Location tracking
location: 'Keerbergen' | 'Mechelen' | 'Leuven' | 'Putte'

// Contact methods
contact_method: 'phone' | 'email' | 'form' | 'chat'
```

### **Project Tracking**
```javascript
// Project interactions
project_id: '1' | '2' | '3' | ...
project_name: 'Moderne Villa' | 'Kantoor Gebouw' | ...
video_type: 'slideshow' | 'professional'
```

## 🚦 **Privacy & Compliance**

- ✅ **GDPR Compliant** - Geanonimiseerde IP adressen
- ✅ **Cookie Consent** - Respects user privacy choices
- ✅ **Data Retention** - Automatische data verwijdering
- ✅ **User Rights** - Data export/delete mogelijkheden

## 📊 **Rapportage Setup**

### **Automatische Rapporten**
1. **Weekly Performance** - Website performance metrics
2. **Monthly Business** - Lead generation en conversies
3. **Quarterly Strategy** - Marketing en business insights

### **Key Metrics te Monitoren**
- **Conversion Rate** - Contact formulier naar offerte
- **Service Interest** - Welke diensten populair zijn
- **Location Performance** - ROI per regio
- **Mobile Experience** - Mobile vs desktop usage

## 🔧 **Technische Implementatie**

### **Bestanden**
- `lib/analytics.ts` - Analytics functies en configuratie
- `components/analytics/GoogleAnalytics.tsx` - GA4 script integratie
- `components/analytics/AnalyticsTracker.tsx` - Event tracking hooks

### **Environment Variables**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Required
NODE_ENV=production  # Auto-disable in development
```

## 🎉 **Next Steps**

1. **Setup GA4** - Maak property aan en configureer events
2. **Test Tracking** - Verifieer dat events correct worden getrackt
3. **Custom Reports** - Maak business-specifieke dashboards
4. **Conversion Setup** - Configureer conversie doelen
5. **Data Analysis** - Begin met data-driven optimalisatie

## 📞 **Support**

Voor vragen over de analytics implementatie:
- Check Google Analytics 4 documentatie
- Review event implementation in code
- Test events via GA4 DebugView
- Monitor real-time events in GA4 dashboard

---

**Status:** ✅ **GEÏMPLEMENTEERD** - Ready voor GA4 property setup
**Volgende stap:** Google Analytics 4 property aanmaken en Measurement ID configureren


