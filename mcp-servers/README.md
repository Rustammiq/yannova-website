# Yannova MCP Servers

Een collectie van MCP (Model Context Protocol) servers voor de Yannova Bouw website. Deze servers exposeren verschillende functionaliteiten van de website via het MCP protocol, waardoor ze gebruikt kunnen worden door AI assistenten zoals Claude, Cursor, en andere MCP clients.

## 🏗️ Overzicht

Yannova Bouw is een professioneel bouwbedrijf gespecialiseerd in:
- Nieuwbouwprojecten
- Renovaties en verbouwingen
- Crepi gevelafwerking
- Ramen en deuren
- Badkamer- en keukenrenovaties

Deze MCP servers maken het mogelijk voor AI assistenten om:
- Te chatten met de Yannova AI assistent (Madina)
- Projecten te beheren en analyseren
- Foto's te uploaden, organiseren en AI afbeeldingen te genereren
- Contact met klanten te beheren

## 📦 Beschikbare Servers

### 🤖 yannova-chat-server
**Locatie:** `mcp-servers/yannova-chat/`

AI chatbot functionaliteit met Madina assistent.

**Tools:**
- `chat` - Chat met AI assistent
- `get_services` - Haal bouwdiensten op
- `get_projects` - Project overzicht
- `get_photos` - Foto gallerij
- `generate_project_ideas` - AI project voorstellen

**Resources:**
- `yannova://services` - Beschikbare diensten
- `yannova://projects` - Alle projecten
- `yannova://photos` - Foto collectie

### 📋 yannova-projects-server
**Locatie:** `mcp-servers/yannova-projects/`

Project management en analytics.

**Tools:**
- `get_projects` - Projecten ophalen (met filters)
- `get_project` - Specifiek project details
- `create_project` - Nieuw project aanmaken
- `update_project` - Project bijwerken
- `delete_project` - Project verwijderen
- `filter_projects` - Projecten filteren
- `get_project_stats` - Project statistieken
- `get_projects_summary` - Project samenvatting
- `estimate_project_cost` - AI kostenraming

**Resources:**
- `yannova://projects` - Alle projecten
- `yannova://projects/stats` - Statistieken
- `yannova://projects/by-location` - Per locatie
- `yannova://projects/by-type` - Per type
- `yannova://projects/by-status` - Per status

### 🖼️ yannova-photos-server
**Locatie:** `mcp-servers/yannova-photos/`

Foto management met AI generatie en analyse.

**Tools:**
- `get_photos` - Foto's ophalen (met filters)
- `get_photo` - Specifieke foto details
- `create_photo` - Foto uploaden
- `update_photo` - Foto bijwerken
- `delete_photo` - Foto verwijderen
- `filter_photos` - Foto's filteren
- `search_photos` - Foto's zoeken
- `get_photo_stats` - Foto statistieken
- `generate_images` - AI afbeeldingen genereren
- `analyze_photo` - AI foto analyse
- `get_photos_summary` - Foto samenvatting
- `get_construction_styles` - Bouwstijlen info

**Resources:**
- `yannova://photos` - Alle foto's
- `yannova://photos/stats` - Statistieken
- `yannova://photos/by-category` - Per category
- `yannova://photos/by-project` - Per project

## 🚀 Installatie

### 1. Dependencies installeren
```bash
# Chat server
cd mcp-servers/yannova-chat
npm install
npm run build

# Projects server
cd ../yannova-projects
npm install
npm run build

# Photos server
cd ../yannova-photos
npm install
npm run build
```

### 2. Yannova website starten
```bash
# In de root directory
npm run dev
```

### 3. MCP servers testen
```bash
# Test chat server
cd mcp-servers/yannova-chat
npm test

# Test projects server
cd ../yannova-projects
npm test

# Test photos server
cd ../yannova-photos
npm test
```

## ⚙️ MCP Client Configuratie

### Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "yannova-chat": {
      "command": "node",
      "args": ["/Users/innovars_lab/yannova-website-1/mcp-servers/yannova-chat/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "http://localhost:3000",
        "GEMINI_API_KEY": "your_gemini_key_here"
      }
    },
    "yannova-projects": {
      "command": "node",
      "args": ["/Users/innovars_lab/yannova-website-1/mcp-servers/yannova-projects/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "http://localhost:3000"
      }
    },
    "yannova-photos": {
      "command": "node",
      "args": ["/Users/innovars_lab/yannova-website-1/mcp-servers/yannova-photos/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "http://localhost:3000"
      }
    }
  }
}
```

### VS Code Cursor (`.cursor/mcp.json`)

```json
{
  "mcp": {
    "servers": {
      "yannova-chat": {
        "type": "stdio",
        "command": "node",
        "args": ["/Users/innovars_lab/yannova-website-1/mcp-servers/yannova-chat/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "http://localhost:3000"
        }
      },
      "yannova-projects": {
        "type": "stdio",
        "command": "node",
        "args": ["/Users/innovars_lab/yannova-website-1/mcp-servers/yannova-projects/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "http://localhost:3000"
        }
      },
      "yannova-photos": {
        "type": "stdio",
        "command": "node",
        "args": ["/Users/innovars_lab/yannova-website-1/mcp-servers/yannova-photos/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "http://localhost:3000"
        }
      }
    }
  }
}
```

### Voor productie

Vervang `http://localhost:3000` met je productie URL:
```json
"YANNOVA_API_URL": "https://yannova.nl"
```

## 🛠️ Development

### Project structuur
```
mcp-servers/
├── README.md              # Dit bestand
├── yannova-chat/          # Chat/AI server
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── README.md
├── yannova-projects/      # Project management server
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── README.md
└── yannova-photos/        # Photo management server
    ├── src/
    ├── test/
    ├── package.json
    └── README.md
```

### Commands
```bash
# Build alle servers
find mcp-servers -name "package.json" -execdir npm run build \;

# Test alle servers
find mcp-servers -name "package.json" -execdir npm test \;

# Clean alle builds
find mcp-servers -name "dist" -type d -exec rm -rf {} +
```

## 🔧 Environment Variables

### Required
- `YANNOVA_API_URL`: Base URL van de Yannova website API

### Optional
- `GEMINI_API_KEY`: Voor AI functionaliteit (chat, image generation, analysis)

## 📚 API Integratie

Alle servers communiceren met de bestaande Yannova Next.js API:
- `/api/chat` - AI chat functionaliteit
- `/api/projects` - Project CRUD operaties
- `/api/photos` - Foto management
- `/api/contact` - Contact formulieren

## 🤖 AI Functionaliteit

### Chat Server
- **Madina Assistant**: Professionele bouwadviseur
- **Context Aware**: Begrijpt bouwterminologie
- **Multi-language**: Nederlands primair, Engels fallback
- **Project Ideas**: AI-gegenereerde project voorstellen

### Photos Server
- **Image Generation**: AI afbeeldingen met Gemini 2.5 Flash
- **Photo Analysis**: Automatische categorisatie en tagging
- **Style Recognition**: Herkent bouwstijlen (modern, klassiek, etc.)
- **Construction Focus**: Bouwgerelateerde prompts en analyses

## 🧪 Testing

Elke server heeft een test suite:
```bash
cd mcp-servers/yannova-chat
npm test
```

Tests valideren:
- ✅ Server initialisatie
- ✅ Tool functionaliteit
- ✅ Resource toegang
- ✅ API integratie
- ✅ Error handling

## 📖 Gebruik Voorbeelden

### Chat met AI
```javascript
// Vraag om bouwadvisering
{
  "method": "tools/call",
  "params": {
    "name": "chat",
    "arguments": {
      "message": "Ik wil een badkamer renoveren in Keerbergen, wat kost dat?"
    }
  }
}
```

### Project Kostenraming
```javascript
// AI kostenraming genereren
{
  "method": "tools/call",
  "params": {
    "name": "estimate_project_cost",
    "arguments": {
      "type": "badkamer renovatie",
      "size": "groot",
      "location": "Mechelen",
      "features": ["inloopdouche", "design radiator"]
    }
  }
}
```

### AI Afbeeldingen
```javascript
// Genereer bouwafbeeldingen
{
  "method": "tools/call",
  "params": {
    "name": "generate_images",
    "arguments": {
      "prompt": "Moderne villa met crepi gevelafwerking",
      "count": 4,
      "style": "modern",
      "category": "nieuwbouw"
    }
  }
}
```

## 🔒 Security

- Alle servers gebruiken environment variables voor configuratie
- API keys worden niet hardcoded
- Input validatie op alle endpoints
- CORS headers voor cross-origin requests
- Rate limiting aanbevolen voor productie

## 📄 Licentie

MIT License - zie package.json bestanden voor details.

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch
3. Commit je changes
4. Push naar de branch
5. Open een Pull Request

## 📞 Support

Voor ondersteuning of vragen:
- Open een issue in de main repository
- Contact: Yannova Bouw
- Email: info@yannova.nl

---

**Gebouwd met ❤️ voor Yannova Bouw** - Van Begin tot Eind - Project Afronding
