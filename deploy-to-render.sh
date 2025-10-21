#!/bin/bash

# Yannova Website Deployment Script voor Render
# Dit script bereidt de applicatie voor voor deployment naar Render

echo "🎨 Preparing Yannova Website for Render deployment..."

# Build the application for production
echo "🔨 Building production version..."
npm run build:prod

# Create render.yaml configuration
cat > render.yaml << 'EOF'
services:
  - type: web
    name: yannova-website
    env: node
    buildCommand: npm run build
    startCommand: npm start
    port: 3000
    healthCheckPath: /
    autoDeploy: true
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_TELEMETRY_DISABLED
        value: 1

# Static site configuration for better performance
staticSites:
  - name: yannova-website-static
    buildCommand: npm run build && npm run export
    publishPath: out
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
EOF

echo "📋 Render configuration created (render.yaml)"
echo ""
echo "🚀 Next steps for Render deployment:"
echo "1. Push your code to GitHub"
echo "2. Go to https://render.com"
echo "3. Click 'New' -> 'Blueprint'"
echo "4. Connect your GitHub repository"
echo "5. Render will automatically detect the render.yaml"
echo "6. Add environment variables in Render dashboard"
echo "7. Deploy!"
echo ""
echo "🔧 Environment variables to configure in Render:"
echo "- Database URLs (if using database)"
echo "- API keys for Gemini, email services, etc."
echo "- NextAuth configuration"
echo "- Any other secrets"
