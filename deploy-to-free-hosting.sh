#!/bin/bash

# Deploy Yannova Website to Free Hosting
echo "🚀 Deploying Yannova Website to Free Hosting..."
echo "="*60

# Check if we have all necessary files
echo "📋 Checking project files..."
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

if [ ! -f "next.config.js" ]; then
    echo "❌ next.config.js not found"
    exit 1
fi

echo "✅ Project files found"

# Build the project
echo "🔨 Building Next.js project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p deploy
cp -r .next deploy/
cp -r public deploy/
cp -r app deploy/
cp package.json deploy/
cp next.config.js deploy/
cp tsconfig.json deploy/
cp tailwind.config.ts deploy/
cp postcss.config.js deploy/

# Create deployment instructions
cat > deploy/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# Yannova Website Deployment Instructions

## Free Hosting Options:

### 1. Vercel (Recommended - Free)
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import this project
4. Deploy automatically

### 2. Netlify (Free)
1. Go to: https://netlify.com
2. Sign up with GitHub
3. Connect your repository
4. Deploy automatically

### 3. GitHub Pages (Free)
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Use GitHub Actions for deployment

### 4. Firebase Hosting (Free)
1. Go to: https://firebase.google.com
2. Create new project
3. Install Firebase CLI
4. Deploy with: firebase deploy

## Domain Options:

### Free Domains:
- .tk (Tokelau)
- .ml (Mali) 
- .ga (Gabon)
- .cf (Central African Republic)

### Cheap Domains:
- .be (Belgium) - ~€10/year
- .nl (Netherlands) - ~€10/year
- .com - ~€12/year

## Environment Variables:
Set these in your hosting platform:
- GEMINI_API_KEY
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- RESEND_API_KEY

## Quick Deploy Commands:

### Vercel:
```bash
npm i -g vercel
vercel --prod
```

### Netlify:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

### Firebase:
```bash
npm i -g firebase-tools
firebase init hosting
firebase deploy
```
EOF

echo "✅ Deployment package created in 'deploy/' folder"

# Create Vercel configuration
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "GEMINI_API_KEY": "@gemini_api_key",
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "RESEND_API_KEY": "@resend_api_key"
  }
}
EOF

# Create Netlify configuration
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

echo "✅ Hosting configurations created"

# Create domain setup script
cat > setup-free-domain.sh << 'EOF'
#!/bin/bash

echo "🌐 Setting up Free Domain for Yannova Website..."
echo "="*50

echo "📋 Free Domain Options:"
echo "1. .tk (Tokelau) - Free"
echo "2. .ml (Mali) - Free" 
echo "3. .ga (Gabon) - Free"
echo "4. .cf (Central African Republic) - Free"
echo ""

echo "🔗 Domain Registration Sites:"
echo "- Freenom: https://freenom.com"
echo "- Dot TK: https://dot.tk"
echo ""

echo "📝 Suggested Domains:"
echo "- yannovabouw.tk"
echo "- yannovabouw.ml"
echo "- yannovabouw.ga"
echo "- yannovabouw.cf"
echo ""

echo "🚀 Quick Setup Steps:"
echo "1. Go to Freenom.com"
echo "2. Search for 'yannovabouw'"
echo "3. Choose .tk, .ml, .ga, or .cf"
echo "4. Register for free"
echo "5. Point DNS to your hosting provider"
echo ""

echo "💡 Pro Tip:"
echo "After getting free domain, you can upgrade to .be or .nl later"
echo "for better SEO and professionalism."
EOF

chmod +x setup-free-domain.sh

echo "✅ Free domain setup script created"

echo ""
echo "🎉 Deployment Package Ready!"
echo "="*60
echo "📁 Files created:"
echo "   - deploy/ folder with built project"
echo "   - vercel.json (Vercel config)"
echo "   - netlify.toml (Netlify config)"
echo "   - setup-free-domain.sh (Domain setup)"
echo "   - DEPLOYMENT_INSTRUCTIONS.md (Full guide)"
echo ""
echo "🚀 Next Steps:"
echo "   1. Run: ./setup-free-domain.sh"
echo "   2. Choose hosting: Vercel, Netlify, or Firebase"
echo "   3. Deploy your website"
echo "   4. Connect your free domain"
echo ""
echo "💡 Recommended: Vercel + .tk domain = Completely FREE!"

