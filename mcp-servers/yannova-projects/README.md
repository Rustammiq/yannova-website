# Yannova Projects MCP Server

Een MCP (Model Context Protocol) server die de project management functionaliteit van Yannova Bouw exposeert.

## Functionaliteit

Deze server biedt toegang tot:

- **Project CRUD**: Create, Read, Update, Delete operaties voor projecten
- **Project Filtering**: Filteren op status, type, locatie en budget
- **Project Statistics**: Statistieken en analytics over projecten
- **Cost Estimation**: AI-gegenereerde kostenramingen voor projecten
- **Project Overview**: Samenvattingen en groeperingen van projecten

## Installatie

```bash
cd mcp-servers/yannova-projects
npm install
npm run build
```

## Gebruik

### Als MCP Server

```bash
# Direct via node
node dist/index.js

# Via npx (na installatie)
npx mcp-server-yannova-projects
```

### Configuratie voor MCP Clients

#### Claude Desktop
```json
{
  "mcpServers": {
    "yannova-projects": {
      "command": "node",
      "args": ["/path/to/mcp-servers/yannova-projects/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "https://your-yannova-website.com"
      }
    }
  }
}
```

## Available Tools

### get_projects
Haal alle projecten op, optioneel met filters.

**Parameters:**
- `filter` (object, optional): Filter object met status, type, location, budget ranges

### get_project
Haal details van een specifiek project op.

**Parameters:**
- `id` (string, required): Project ID

### create_project
Maak een nieuw project aan.

**Parameters:**
- `title` (string, required): Project titel
- `description` (string, required): Project beschrijving
- `location` (string, required): Project locatie
- `type` (string, required): Project type
- `budget` (string, required): Project budget
- `images` (array, optional): Project afbeeldingen

### update_project
Update een bestaand project.

**Parameters:**
- `id` (string, required): Project ID
- `title` (string, optional): Nieuwe titel
- `description` (string, optional): Nieuwe beschrijving
- `status` (string, optional): Nieuwe status (planning/in-progress/completed)
- `budget` (string, optional): Nieuw budget
- etc.

### delete_project
Verwijder een project.

**Parameters:**
- `id` (string, required): Project ID

### filter_projects
Filter projecten op criteria.

**Parameters:**
- `status` (string, optional): Filter op status
- `type` (string, optional): Filter op type
- `location` (string, optional): Filter op locatie

### get_project_stats
Haal project statistieken op.

### get_projects_summary
Haal een samenvatting van alle projecten.

### estimate_project_cost
Genereer een kostenraming voor een project.

**Parameters:**
- `type` (string, required): Project type
- `size` (string, optional): Project grootte (klein/gemiddeld/groot/extra-groot)
- `location` (string, optional): Project locatie
- `features` (array, optional): Extra features

## Available Resources

- `yannova://projects`: JSON met alle projecten
- `yannova://projects/stats`: JSON met project statistieken
- `yannova://projects/by-location`: JSON met projecten gegroepeerd per locatie
- `yannova://projects/by-type`: JSON met projecten gegroepeerd per type
- `yannova://projects/by-status`: JSON met projecten gegroepeerd per status

## Voorbeelden

### Project aanmaken
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "create_project",
    "arguments": {
      "title": "Moderne Villa Mechelen",
      "description": "Complete nieuwbouw villa met energiezuinige technologieën",
      "location": "Mechelen",
      "type": "Nieuwbouw",
      "budget": "€400.000"
    }
  }
}
```

### Kostenraming
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "estimate_project_cost",
    "arguments": {
      "type": "badkamer renovatie",
      "size": "groot",
      "location": "Keerbergen",
      "features": ["inloopdouche", "design radiator", "led verlichting"]
    }
  }
}
```

### Project statistieken
```javascript
{
  "method": "tools/call",
  "params": {
    "name": "get_project_stats"
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
