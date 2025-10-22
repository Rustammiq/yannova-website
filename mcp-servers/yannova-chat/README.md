# Yannova Chat MCP Server

Een MCP (Model Context Protocol) server die de AI chatbot functionaliteit van Yannova Bouw exposeert.

## Functionaliteit

Deze server biedt toegang tot:

- **AI Chat**: Directe communicatie met Madina, de Yannova AI assistent
- **Services**: Informatie over beschikbare bouwdiensten
- **Projects**: Overzicht van bouwprojecten en portfolio
- **Photos**: Foto gallerij van projecten
- **Project Ideas**: AI-gegenereerde projectvoorstellen

## Installatie

```bash
cd mcp-servers/yannova-chat
npm install
npm run build
```

## Gebruik

### Als MCP Server

```bash
# Direct via node
node dist/index.js

# Via npx (na installatie)
npx mcp-server-yannova-chat
```

### Configuratie voor MCP Clients

#### Claude Desktop
```json
{
  "mcpServers": {
    "yannova-chat": {
      "command": "node",
      "args": ["/path/to/mcp-servers/yannova-chat/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "https://your-yannova-website.com"
      }
    }
  }
}
```

#### VS Code Cursor
```json
{
  "mcp": {
    "servers": {
      "yannova-chat": {
        "type": "stdio",
        "command": "node",
        "args": ["/path/to/mcp-servers/yannova-chat/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "https://your-yannova-website.com"
        }
      }
    }
  }
}
```

## Environment Variables

- `YANNOVA_API_URL`: Base URL van de Yannova website (default: http://localhost:3000)

## Available Tools

### chat
Chat met de AI assistent Madina.

**Parameters:**
- `message` (string, required): Het bericht om te versturen
- `history` (array, optional): Chat history voor context

### get_services
Haal beschikbare bouwdiensten op.

### get_projects
Haal bouwprojecten overzicht op.

### get_photos
Haal foto gallerij op.

### generate_project_ideas
Genereer projectvoorstellen met AI.

**Parameters:**
- `type` (string, optional): Type project (nieuwbouw, renovatie, etc.)
- `budget` (string, optional): Budget range
- `location` (string, optional): Locatie (Vlaanderen)

## Available Resources

- `yannova://services`: JSON met beschikbare diensten
- `yannova://projects`: JSON met bouwprojecten
- `yannova://photos`: JSON met foto gallerij

## Voorbeelden

### Chat Example
```javascript
// Chat met AI assistent
{
  "method": "tools/call",
  "params": {
    "name": "chat",
    "arguments": {
      "message": "Ik wil een badkamer renoveren in Mechelen, wat zijn de kosten?"
    }
  }
}
```

### Project Ideas Example
```javascript
// Genereer project ideeën
{
  "method": "tools/call",
  "params": {
    "name": "generate_project_ideas",
    "arguments": {
      "type": "renovatie",
      "budget": "€20.000 - €30.000",
      "location": "Keerbergen"
    }
  }
}
```

## Dependencies

- Node.js 18+
- Yannova website API (chat, projects, photos endpoints)
- Google Gemini AI (via Yannova API)

## Development

```bash
npm run dev    # Watch mode
npm run build  # Build for production
npm run start  # Run built server
```
