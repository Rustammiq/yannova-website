#!/bin/bash

echo "🚀 Setting up Cursor + Gemini integration for Yannova website..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Current setup status:"

# Check if Gemini API is working
echo "🧪 Testing Gemini API..."
node test-gemini-api.js

echo ""
echo "🧪 Testing Chat API..."
node test-chat-api.js

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 How to use Gemini in Cursor:"
echo "1. Open Cursor Chat (Cmd+L)"
echo "2. Use this prompt:"
echo ""
echo "Je bent een AI-assistent voor Yannova Bouw website. Help met Next.js development, bouwadvies en Gemini API integratie. Spreek Nederlands."
echo ""
echo "3. Start chatting! 🚀"
echo ""
echo "📁 Configuration files created:"
echo "- .cursorrules (Cursor rules)"
echo "- .cursor/ai-config.json (AI config)"
echo "- cursor-prompt.md (Chat prompts)"
echo ""
echo "🎉 Ready to go!"
