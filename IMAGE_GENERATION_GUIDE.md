# Yannova Project Images - Generatie Gids

## Status
⚠️ **Gemini API Quota Overschreden** - De gratis tier heeft dagelijkse limieten bereikt.

## Oplossingen

### Optie 1: Wacht en Probeer Opnieuw (Gratis)
De Gemini API free tier reset elke 24 uur. Probeer morgen opnieuw:

```bash
python3 generate-project-images.py
```

### Optie 2: Upgrade Gemini API (Betaald)
1. Ga naar [Google AI Studio](https://aistudio.google.com/)
2. Upgrade naar een betaald plan
3. Voer het script opnieuw uit

### Optie 3: Gebruik Alternatieve AI Tools

#### A. DALL-E via OpenAI
```bash
# Installeer OpenAI library
pip install openai

# Gebruik het alternatieve script (maak dit aan)
python3 generate-images-dalle.py
```

#### B. Stable Diffusion (Lokaal/Gratis)
```bash
# Installeer Stable Diffusion
pip install diffusers transformers accelerate

# Genereer lokaal (langzamer maar gratis)
python3 generate-images-sd.py
```

#### C. Midjourney (Discord Bot)
Gebruik de prompts hieronder in Midjourney Discord

## Project Prompts voor AI Generatie

### Project 1: Moderne Villa - Amsterdam
```
Modern luxury villa in Amsterdam, Netherlands. Contemporary architecture with sustainable materials, clean white facade, large floor-to-ceiling windows, geometric design, 350m² living space, energy-neutral smart home, landscaped garden with modern outdoor furniture, professional architectural photography, high quality, realistic, daytime exterior view, blue sky
```
**Bestandsnaam:** `project-1-villa.jpg`

### Project 2: Renovatie Monumentaal Pand
```
Historic monumental building in Utrecht, Netherlands. Beautiful renovated Dutch traditional architecture, authentic brick facade with modern touches, classic windows with modern insulation, preserved historical details, charming street view, professional architectural photography, high quality, realistic, exterior view, sunny day
```
**Bestandsnaam:** `project-2-monument.jpg`

### Project 3: Bedrijfspand Verbouwing
```
Modern office building in Rotterdam, Netherlands. Transformed industrial building into contemporary workspace, 500m² open concept design, large windows, modern facade with glass and steel, professional architectural photography, high quality, realistic, exterior view, urban setting
```
**Bestandsnaam:** `project-3-office.jpg`

### Project 4: Luxe Badkamer Suite
```
Luxury bathroom interior in The Hague, Netherlands. Spa-like bathroom with natural stone tiles, walk-in shower with glass walls, modern fixtures, floor heating, ambient lighting, high-end finishes, professional interior photography, high quality, realistic, warm lighting
```
**Bestandsnaam:** `project-4-bathroom.jpg`

### Project 5: Aanbouw Woonhuis
```
Modern house extension in Haarlem, Netherlands. Beautiful home addition with large glass windows and doors, 40m² extension, seamless integration with existing house, modern design, natural light, garden view, professional architectural photography, high quality, realistic, exterior view, sunny day
```
**Bestandsnaam:** `project-5-extension.jpg`

### Project 6: Duurzaam Appartementencomplex
```
Modern sustainable apartment complex in Eindhoven, Netherlands. Energy-neutral building with 12 apartments, contemporary architecture, solar panels, green shared outdoor space, modern facade, professional architectural photography, high quality, realistic, exterior view, daytime
```
**Bestandsnaam:** `project-6-apartments.jpg`

### Project 7: Gevelrenovatie met Crepi
```
Renovated 1970s house in Amsterdam with modern crepi facade finish. Fresh beige/cream colored stucco exterior, new modern windows, improved insulation, clean lines, Dutch residential architecture, professional architectural photography, high quality, realistic, exterior view, sunny day
```
**Bestandsnaam:** `project-7-crepi.jpg`

### Project 8: Ramen en Deuren Vervanging
```
Historic monumental building in Utrecht with new windows and doors. Traditional Dutch architecture with modern HR++ glass windows, wooden frames preserving authentic style, improved insulation, professional architectural photography, high quality, realistic, exterior detail view, sunny day
```
**Bestandsnaam:** `project-8-windows.jpg`

### Project 9: Bedrijfspand Gevelrenovatie
```
Modern commercial building facade renovation in Rotterdam. Contemporary crepi finish, new office windows, professional documentation, clean modern design, business district setting, professional architectural photography, high quality, realistic, exterior view, daytime
```
**Bestandsnaam:** `project-9-commercial.jpg`

## Handmatige Generatie via Web UI

### Google AI Studio (Gemini)
1. Ga naar [https://aistudio.google.com/](https://aistudio.google.com/)
2. Kies "Generate Image"
3. Plak een prompt van hierboven
4. Download de gegenereerde afbeelding
5. Hernoem naar de juiste bestandsnaam
6. Plaats in `public/images/projects/`

### DALL-E via ChatGPT Plus
1. Open ChatGPT (Plus vereist)
2. Plak een prompt
3. Download de afbeelding
4. Hernoem en plaats in `public/images/projects/`

### Midjourney
1. Open Midjourney Discord
2. Gebruik commando: `/imagine prompt: [plak prompt hier]`
3. Download de beste versie
4. Hernoem en plaats in `public/images/projects/`

## Alternatief: Gebruik Stock Foto's

### Gratis Stock Foto Websites
- [Unsplash](https://unsplash.com/) - Zoek naar "modern house", "villa", "renovation"
- [Pexels](https://www.pexels.com/) - Gratis architectuur foto's
- [Pixabay](https://pixabay.com/) - Gratis afbeeldingen

### Zoektermen
- "modern villa exterior"
- "dutch house architecture"
- "house renovation"
- "crepi facade"
- "modern windows doors"
- "luxury bathroom"
- "apartment building"

## Na Generatie

Zodra je afbeeldingen hebt:
1. Plaats ze in `public/images/projects/`
2. Zorg dat de bestandsnamen correct zijn (zie hierboven)
3. De website zal ze automatisch laden

## Technische Details

- **Formaat:** JPG of PNG
- **Aanbevolen grootte:** 1920x1080px (16:9 aspect ratio)
- **Max bestandsgrootte:** 500KB (voor snelle laadtijden)
- **Optimalisatie:** Gebruik [TinyPNG](https://tinypng.com/) om bestanden te comprimeren

## Quota Informatie

**Gemini API Free Tier Limieten:**
- 15 requests per minuut
- 1500 requests per dag
- Input tokens: 32,000 per minuut

**Huidige Status:** Quota overschreden, reset over ~24 uur

## Contact & Support

Voor vragen over afbeelding generatie:
- Check [Gemini API Docs](https://ai.google.dev/gemini-api/docs/rate-limits)
- Bekijk alternatieve AI tools hierboven
- Overweeg stock foto's als tijdelijke oplossing

