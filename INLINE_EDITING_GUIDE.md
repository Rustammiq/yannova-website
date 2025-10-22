# Inline Editing Systeem - Yannova Website

## Overzicht

Het inline editing systeem stelt admin gebruikers in staat om direct op de website tekst en afbeeldingen te bewerken zonder naar de admin panel te hoeven gaan.

## Features

### ✅ Admin Authentication
- Alleen ingelogde admin gebruikers kunnen bewerken
- Automatische herkenning van admin status via NextAuth
- Beveiligde API endpoints

### ✅ Inline Tekst Editing
- Klik op tekst om direct te bewerken
- Ondersteunt zowel enkelvoudige als meerdere regels
- Real-time preview en validatie
- Auto-save functionaliteit

### ✅ Inline Afbeelding Editing
- Klik op afbeeldingen om te vervangen
- Drag & drop upload interface
- Automatische image optimization
- Preview van nieuwe afbeeldingen

### ✅ Admin Toggle
- Toggle knop rechtsboven om bewerkingsmodus in/uit te schakelen
- Visuele indicatie van bewerkingsmodus
- Alleen zichtbaar voor admin gebruikers

## Gebruik

### 1. Inloggen als Admin
```
Email: admin@yannova.nl
Wachtwoord: admin123
```

### 2. Bewerkingsmodus Activeren
- Klik op de toggle knop rechtsboven (alleen zichtbaar voor admins)
- De knop verandert van "Bewerken Aan" naar "Bewerken Uit"

### 3. Content Bewerken
- **Tekst**: Hover over tekst en klik op het bewerkingsicoon
- **Afbeeldingen**: Hover over afbeeldingen en klik op het bewerkingsicoon
- Wijzigingen worden automatisch opgeslagen

## Technische Implementatie

### Components

#### `AdminProvider` (`lib/adminContext.tsx`)
- Context provider voor admin state management
- Beheert bewerkingsmodus en admin status

#### `InlineTextEditor` (`components/admin/InlineTextEditor.tsx`)
- Component voor inline tekst editing
- Ondersteunt single-line en multi-line editing
- Real-time validatie en error handling

#### `InlineImageEditor` (`components/admin/InlineImageEditor.tsx`)
- Component voor inline afbeelding editing
- File upload met preview
- Image optimization en validatie

#### `AdminToggle` (`components/admin/AdminToggle.tsx`)
- Toggle knop voor bewerkingsmodus
- Alleen zichtbaar voor admin gebruikers
- Visuele feedback

### API Endpoints

#### `GET /api/admin/content?key={key}`
- Haalt content op voor een specifieke key
- Alleen toegankelijk voor admin gebruikers

#### `PUT /api/admin/content`
- Slaat content op voor een specifieke key
- Alleen toegankelijk voor admin gebruikers

### Hooks

#### `useContent({ key, defaultValue })`
- Hook voor content management
- Automatische loading en saving
- Error handling en loading states

## Implementatie in Bestaande Pagina's

### 1. Imports Toevoegen
```tsx
import InlineTextEditor from "@/components/admin/InlineTextEditor";
import InlineImageEditor from "@/components/admin/InlineImageEditor";
import { useContent } from "@/lib/useContent";
```

### 2. Content Hooks
```tsx
const titleContent = useContent({ 
  key: 'page-title', 
  defaultValue: 'Default Title' 
});
```

### 3. Content Laden
```tsx
useEffect(() => {
  titleContent.loadContent();
}, [titleContent.loadContent]);
```

### 4. Inline Editors Toepassen
```tsx
<InlineTextEditor
  value={titleContent.content}
  onSave={titleContent.updateContent}
  className="text-2xl font-bold"
  fieldName="Titel"
/>
```

## Demo Pagina

Bezoek `/admin-demo` om het inline editing systeem te testen:
- Volledige demo van alle features
- Voorbeelden van tekst en afbeelding editing
- Feature overzicht

## Beveiliging

- Alle API endpoints vereisen admin authenticatie
- Content wordt gevalideerd voordat opslaan
- File uploads hebben size en type validatie
- CSRF protection via NextAuth

## Toekomstige Uitbreidingen

- [ ] Bulk editing van meerdere content items
- [ ] Version history van content wijzigingen
- [ ] Rich text editor voor geavanceerde formatting
- [ ] Drag & drop voor content herordening
- [ ] Real-time collaboration tussen admins

## Troubleshooting

### Bewerkingsmodus werkt niet
1. Controleer of je ingelogd bent als admin
2. Verifieer dat de AdminProvider correct is geïmplementeerd
3. Check browser console voor errors

### Content wordt niet opgeslagen
1. Controleer network tab voor API errors
2. Verifieer admin authenticatie
3. Check server logs voor backend errors

### Afbeeldingen uploaden mislukt
1. Controleer file size (max 5MB)
2. Verifieer file type (alleen images)
3. Check photos API endpoint status
