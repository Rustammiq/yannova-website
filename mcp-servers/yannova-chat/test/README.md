# Yannova Chat MCP Server Tests

Test suite voor het valideren van de MCP server functionaliteit.

## Wat wordt getest?

- ✅ **Server Initialisatie**: Protocol handshaking
- 🛠️ **Tools**: Alle beschikbare tools (chat, services, projects, photos, project ideas)
- 📚 **Resources**: Alle beschikbare resources (services, projects, photos)
- 💡 **AI Functionaliteit**: Chat responses en project idee generatie

## Hoe te gebruiken?

### 1. Start de Yannova website eerst
```bash
cd /path/to/yannova-website-1
npm run dev
```

### 2. Run de tests
```bash
cd mcp-servers/yannova-chat
npm test
```

### 3. Verwachtte output
```
🚀 Starting Yannova Chat MCP Server Tests...

✅ Server initialized successfully

🛠️ Testing Tools...
✅ Services: Yannova Bouw biedt de volgende diensten: ...
✅ Projects: 📁 **Yannova Projecten Overzicht** ...
✅ Chat response: [AI response from Madina]

📚 Testing Resources...
✅ Available resources: [...]
✅ Services data: [...]

💡 Testing Project Ideas Generator...
✅ Project ideas: [...]

🎉 All tests completed!
```

## Troubleshooting

### Server start problemen
- Zorg dat Node.js 18+ geïnstalleerd is
- Check of alle dependencies geïnstalleerd zijn: `npm install`
- Check of de server gebouwd is: `npm run build`

### API connectie problemen
- Zorg dat de Yannova website draait op localhost:3000
- Check of de API endpoints bereikbaar zijn
- Set environment variable: `YANNOVA_API_URL=http://localhost:3000`

### Timeouts
- Tests hebben internet connectie nodig voor AI responses
- Check of Gemini API key geconfigureerd is in de website
