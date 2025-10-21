# Gemini API Rate Limit Probleem Oplossing

## Probleem Analyse

De foutmelding "User API Key Rate limit exceeded (Gemini has currently low rate limits for user API keys for the 2.5 Pro model; consider not using a user API key for this model, or switching to a different model)" duidt op een specifiek probleem met:

1. **Model Configuratie**: `gemini-2.5-pro` wordt gebruikt in `lib/gemini.ts` (regel 100)
2. **Rate Limits**: Gemini 2.5 Pro heeft zeer lage rate limits voor user API keys
3. **API Key Type**: Er wordt een user API key gebruikt in plaats van een service account

## Huidige Configuratie

```typescript
// lib/gemini.ts - Regel 100
const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });
```

```bash
# .env.local - Regel 2
GEMINI_API_KEY=AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo
```

## Oplossingen

### Optie 1: Wissel naar Gemini 1.5 Pro (Aanbevolen)
Verander het model van `gemini-2.5-pro` naar `gemini-1.5-pro`:

```typescript
// lib/gemini.ts - Regel 100
const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
```

**Voordelen:**
- Hogere rate limits voor user API keys
- Meer stabiel voor productie gebruik
- Goede kwaliteit voor chatbot functionaliteit

### Optie 2: Gebruik Service Account in plaats van User API Key
Maak een Google Cloud Service Account en gebruik die credentials:

1. Ga naar Google Cloud Console
2. Maak een nieuw service account
3. Genereer een JSON key
4. Update de configuratie in de applicatie

### Optie 3: Implementeer Rate Limiting en Fallback
Voeg rate limiting en een fallback mechanisme toe:

```typescript
// lib/gemini.ts - Voorbeeld implementatie
export async function chatWithGemini(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) {
  try {
    const ai = getGeminiInstance();
    if (!ai) {
      console.log("Gemini not available, using demo response");
      return getDemoResponse(message);
    }
    
    // Probeer eerst met 1.5-pro (betere rate limits)
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
      // ... rest van de implementatie
    } catch (error) {
      // Fallback naar 2.5-pro als 1.5-pro faalt
      console.log("Falling back to gemini-2.5-pro");
      const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });
      // ... rest van de implementatie
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    return getDemoResponse(message);
  }
}
```

## Test Script Aanbeveling

Maak een testscript om de connectiviteit te verifiëren:

```javascript
// test-gemini-models.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testModel(modelName) {
  try {
    console.log(`🧪 Testing ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, can you help me?");
    console.log(`✅ ${modelName} works! Response:`, result.response.text());
    return true;
  } catch (error) {
    console.log(`❌ ${modelName} failed:`, error.message);
    return false;
  }
}

async function runTests() {
  console.log("🚀 Testing Gemini Models...\n");
  
  const models = [
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-2.5-pro"
  ];
  
  for (const model of models) {
    await testModel(model);
    console.log("---");
  }
}

runTests();
```

## Aanbevolen Acties

1. **Directe Fix**: Verander `gemini-2.5-pro` naar `gemini-1.5-pro` in `lib/gemini.ts`
2. **Test**: Maak en draai het testscript om connectiviteit te verifiëren
3. **Monitor**: Implementeer logging om rate limit errors te detecteren
4. **Fallback**: Zorg dat demo responses werken als fallback

## Code Wijzigingen

### lib/gemini.ts - Regel 100
```typescript
// Verander dit:
const model = ai.getGenerativeModel({ model: "gemini-2.5-pro" });

// Naar dit:
const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
```

### cursor-prompt.md - Regel 23
```markdown
# Verander dit:
- Model: gemini-2.5-pro

# Naar dit:
- Model: gemini-1.5-pro
```

## Extra Overwegingen

- **Rate Limits**: Gemini 1.5 Pro heeft ruimere limits voor user API keys
- **Kosten**: 1.5 Pro is generally cheaper dan 2.5 Pro
- **Performance**: Voor chatbot functionaliteit is 1.5 Pro meer dan voldoende
- **Stabiliteit**: 1.5 Pro is meer stable en beter getest

## Volgende Stappen

1. Implementeer de model wijziging naar `gemini-1.5-pro`
2. Test de chat functionaliteit
3. Monitor voor rate limit errors
4. Documenteer de resultaten

---
*Laatst bijgewerkt: 20-10-2025*
*Probleem: Gemini 2.5 Pro rate limits*
*Oplossing: Wissel naar Gemini 1.5 Pro*