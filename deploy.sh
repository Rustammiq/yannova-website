#!/bin/bash

# 🚀 Yannova Website Deployment Script
# Dit script bereidt de website voor op deployment

echo "🏗️  Yannova Website Deployment Preparation"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo ""

# 1. Check Node.js version
echo "1️⃣ Checking Node.js version..."
node_version=$(node --version)
echo "   ✅ Node.js: $node_version"

# 2. Check if dependencies are installed
echo ""
echo "2️⃣ Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "   📦 Installing dependencies..."
    npm install
else
    echo "   ✅ Dependencies already installed"
fi

# 3. Check environment variables
echo ""
echo "3️⃣ Checking environment variables..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local found"
    echo "   📝 Make sure to add these to your hosting platform:"
    echo "      - GEMINI_API_KEY"
    echo "      - ZAI_API_KEY"
else
    echo "   ⚠️  .env.local not found"
    echo "   📝 Create .env.local with:"
    echo "      GEMINI_API_KEY=your_gemini_key"
    echo "      ZAI_API_KEY=your_zai_key"
fi

# 4. Test build
echo ""
echo "4️⃣ Testing build..."
if npm run build; then
    echo "   ✅ Build successful!"
else
    echo "   ❌ Build failed! Check errors above."
    exit 1
fi

# 5. Check if images exist
echo ""
echo "5️⃣ Checking project images..."
if [ -d "public/images/projects" ]; then
    image_count=$(ls -1 public/images/projects/*.jpg 2>/dev/null | wc -l)
    echo "   ✅ Found $image_count project images"
else
    echo "   ⚠️  No project images found"
    echo "   💡 Run: python generate-images-fallback.py"
fi

# 6. Check file sizes
echo ""
echo "6️⃣ Checking build size..."
if [ -d ".next" ]; then
    build_size=$(du -sh .next | cut -f1)
    echo "   ✅ Build size: $build_size"
else
    echo "   ❌ Build directory not found"
fi

# 7. Create deployment package
echo ""
echo "7️⃣ Creating deployment package..."
mkdir -p deployment
cp -r .next deployment/
cp -r public deployment/
cp -r app deployment/
cp -r components deployment/
cp -r lib deployment/
cp package.json deployment/
cp package-lock.json deployment/
cp next.config.js deployment/
cp tailwind.config.js deployment/
cp tsconfig.json deployment/
cp postcss.config.js deployment/

echo "   ✅ Deployment package created in ./deployment/"

# 8. Create vercel.json for Vercel deployment
echo ""
echo "8️⃣ Creating Vercel configuration..."
cat > vercel.json << EOF
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "GEMINI_API_KEY": "@gemini_api_key",
    "ZAI_API_KEY": "@zai_api_key"
  }
}
EOF
echo "   ✅ vercel.json created"

# 9. Create netlify.toml for Netlify deployment
echo ""
echo "9️⃣ Creating Netlify configuration..."
cat > netlify.toml << EOF
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
echo "   ✅ netlify.toml created"

# 10. Final checklist
echo ""
echo "🎯 Deployment Ready!"
echo "==================="
echo ""
echo "📋 Next steps:"
echo ""
echo "🚀 VERCEL (Aanbevolen):"
echo "   1. Ga naar https://vercel.com"
echo "   2. Sign up met GitHub"
echo "   3. Import project"
echo "   4. Add environment variables:"
echo "      - GEMINI_API_KEY"
echo "      - ZAI_API_KEY"
echo "   5. Deploy!"
echo ""
echo "🌐 NETLIFY:"
echo "   1. Ga naar https://netlify.com"
echo "   2. Drag & drop ./deployment folder"
echo "   3. Add environment variables"
echo "   4. Deploy!"
echo ""
echo "📁 GITHUB PAGES:"
echo "   1. Push code naar GitHub"
echo "   2. Enable Pages in Settings"
echo "   3. Select main branch"
echo ""
echo "✅ Your website is ready for deployment!"
echo ""
echo "🔗 After deployment, your website will be available at:"
echo "   - Vercel: https://your-project.vercel.app"
echo "   - Netlify: https://your-project.netlify.app"
echo "   - GitHub: https://username.github.io/repository"
echo ""
echo "🎉 Good luck with your deployment!"
