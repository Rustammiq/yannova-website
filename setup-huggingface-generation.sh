#!/bin/bash

echo "🚀 Setting up Hugging Face image generation for Yannova website..."
echo "=" * 60

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python3 first."
    exit 1
fi

# Install required Python packages
echo "📦 Installing required Python packages..."
pip3 install requests pillow

# Check if Hugging Face CLI is available
if ! command -v huggingface-cli &> /dev/null; then
    echo "📦 Installing Hugging Face CLI..."
    pip3 install huggingface_hub
fi

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Hugging Face API Configuration
HUGGINGFACE_API_TOKEN=your_token_here

# Add your Hugging Face API token above
# Get your token from: https://huggingface.co/settings/tokens
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local file already exists"
fi

# Create backup directory
mkdir -p backup/generated-images
echo "✅ Created backup directory"

# Make the Python script executable
chmod +x generate-realistic-construction-images.py

echo ""
echo "🎯 Next steps:"
echo "1. Get your Hugging Face API token from: https://huggingface.co/settings/tokens"
echo "2. Add your token to .env.local file"
echo "3. Run: python3 generate-realistic-construction-images.py"
echo ""
echo "💡 The script will generate realistic construction images for:"
echo "   - Nieuwbouw (3 images)"
echo "   - Renovatie (3 images)" 
echo "   - Crepi (3 images)"
echo "   - Ramen & Deuren (3 images)"
echo "   - Verbouwing (3 images)"
echo "   - Project showcase (9 images)"
echo ""
echo "📁 Images will be saved to: public/images/gallery/"
