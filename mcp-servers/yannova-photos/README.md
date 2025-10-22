# Yannova Photos MCP Server

Een MCP (Model Context Protocol) server die de foto en content management functionaliteit van Yannova Bouw exposeert, inclusief AI beeldgeneratie.

## Functionaliteit

Deze server biedt toegang tot:

- **Foto CRUD**: Create, Read, Update, Delete operaties voor foto's
- **Foto Filtering**: Filteren op category, tags, AI gegenereerd, project
- **Foto Search**: Zoeken in foto metadata en tags
- **AI Beeldgeneratie**: Genereer bouwgerelateerde afbeeldingen
- **Foto Analyse**: AI-gedreven foto analyse en categorisatie
- **Foto Statistieken**: Analytics over foto collectie
- **Bouwstijlen**: Informatie over verschillende bouwstijlen

## Installatie

```bash
cd mcp-servers/yannova-photos
npm install
npm run build
```

## Gebruik

### Als MCP Server

```bash
# Direct via node
node dist/index.js

# Via npx (na installatie)
npx mcp-server-yannova-photos
```

### Configuratie voor MCP Clients

#### Claude Desktop
```json
{
  "mcpServers": {
    "yannova-photos": {
      "command": "node",
      "args": ["/path/to/mcp-servers/yannova-photos/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "https://your-yannova-website.com"
      }
    }
  }
}
```

## Available Tools

### get_photos
Haal alle foto's op, optioneel met filters.

**Parameters:**
- `filter` (object, optional): Filter object met category, tags, aiGenerated, projectId

### get_photo
Haal details van een specifieke foto op.

**Parameters:**
- `id` (string, required): Foto ID

### create_photo
Upload een nieuwe foto.

**Parameters:**
- `file` (string, required): Base64 encoded bestand of bestandspad
- `filename` (string, optional): Bestandsnaam
- `alt` (string, optional): Alt tekst
- `category` (string, optional): Category
- `tags` (string[], optional): Tags
- `projectId` (string, optional): Project ID

### update_photo
Update een bestaande foto.

**Parameters:**
- `id` (string, required): Foto ID
- `alt` (string, optional): Nieuwe alt tekst
- `category` (string, optional): Nieuwe category
- `tags` (string[], optional): Nieuwe tags
- `projectId` (string, optional): Project ID

### delete_photo
Verwijder een foto.

**Parameters:**
- `id` (string, required): Foto ID

### filter_photos
Filter foto's op criteria.

**Parameters:**
- `category` (string, optional): Filter op category
- `tags` (string[], optional): Filter op tags
- `aiGenerated` (boolean, optional): Filter op AI gegenereerd
- `projectId` (string, optional): Filter op project

### search_photos
Zoek foto's op tekst.

**Parameters:**
- `query` (string, required): Zoekterm

### get_photo_stats
Haal foto statistieken op.

### generate_images
Genereer AI afbeeldingen.

**Parameters:**
- `prompt` (string, required): Beschrijving van gewenste afbeelding
- `count` (number, optional): Aantal afbeeldingen (default: 4)
- `style` (string, optional): Stijl (modern/classic/minimalist/rustic)
- `category` (string, optional): Category
- `projectId` (string, optional): Project ID

### analyze_photo
Analyseer een foto met AI.

**Parameters:**
- `id` (string, required): Foto ID

### get_photos_summary
Haal een samenvatting van alle foto's.

### get_construction_styles
Haal beschikbare bouwstijlen op.

## Available Resources

- `yannova://photos`: JSON met alle foto's
- `yannova://photos/stats`: JSON met foto statistieken
- `yannova://photos/by-category`: JSON met foto's gegroepeerd per category
- `yannova://photos/by-project`: JSON met foto's gegroepeerd per project

## Voorbeelden

### Foto uploaden
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "create_photo",
    "arguments": {
      "file": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
      "filename": "modern-villa.jpg",
      "alt": "Moderne villa met grote ramen",
      "category": "nieuwbouw",
      "tags": ["villa", "modern", "grote ramen"]
    }
  }
}
```

### AI afbeeldingen genereren
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "generate_images",
    "arguments": {
      "prompt": "Moderne badkamer renovatie met grote tegels en inloopdouche",
      "count": 3,
      "style": "modern",
      "category": "renovatie"
    }
  }
}
```

### Foto zoeken
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "search_photos",
    "arguments": {
      "query": "badkamer renovatie"
    }
  }
}
```

### Foto analyseren
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "analyze_photo",
    "arguments": {
      "id": "123456789"
    }
  }
}
```

## Environment Variables

- `YANNOVA_API_URL`: Base URL van de Yannova website (default: http://localhost:3000)

## Development

```bash
npm run dev    # Watch mode
npm run build  # Build for production
npm run start  # Run built server
npm test       # Run tests
```

## AI Beeldgeneratie

De server gebruikt de Yannova chat API om afbeeldingen te genereren met:
- Google Gemini 2.5 Flash Image Preview model
- Professionele bouwstijl prompts
- Automatische categorisatie
- Project-specifieke generatie

## Foto Analyse

AI-gedreven foto analyse biedt:
- Automatische beschrijving
- Tag suggesties
- Category detectie
- Mood en kleuren analyse
- Compositie feedback
