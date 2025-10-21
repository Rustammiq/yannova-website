#!/bin/bash

# Setup Missing APIs Script voor Yannova Website
echo "🔧 Setting up missing APIs for Yannova Website..."
echo "="*60

# Function to update .env.local
update_env() {
    local key=$1
    local value=$2
    if [ -f .env.local ]; then
        sed -i '' "s/${key}=.*/${key}=${value}/" .env.local
        echo "✅ Updated ${key} in .env.local"
    fi
}

echo "🤗 Setting up Hugging Face API..."
echo "Please visit: https://huggingface.co/settings/tokens"
echo "Create a new token with 'Read' permissions"
echo "Enter your Hugging Face token (or press Enter to skip):"
read -r HF_TOKEN

if [ ! -z "$HF_TOKEN" ]; then
    update_env "HUGGINGFACE_API_TOKEN" "$HF_TOKEN"
    update_env "HF_API_TOKEN" "$HF_TOKEN"
    echo "✅ Hugging Face API configured"
else
    echo "⚠️  Skipped Hugging Face API"
fi

echo ""
echo "🤖 Setting up OpenAI API..."
echo "Please visit: https://platform.openai.com/api-keys"
echo "Create a new API key"
echo "Enter your OpenAI API key (or press Enter to skip):"
read -r OPENAI_KEY

if [ ! -z "$OPENAI_KEY" ]; then
    update_env "OPENAI_API_KEY" "$OPENAI_KEY"
    echo "✅ OpenAI API configured"
else
    echo "⚠️  Skipped OpenAI API"
fi

echo ""
echo "🔄 Setting up Replicate API..."
echo "Please visit: https://replicate.com/account/api-tokens"
echo "Create a new API token"
echo "Enter your Replicate API token (or press Enter to skip):"
read -r REPLICATE_TOKEN

if [ ! -z "$REPLICATE_TOKEN" ]; then
    update_env "REPLICATE_API_TOKEN" "$REPLICATE_TOKEN"
    echo "✅ Replicate API configured"
else
    echo "⚠️  Skipped Replicate API"
fi

echo ""
echo "📸 Setting up Unsplash API..."
echo "Please visit: https://unsplash.com/developers"
echo "Create a new application and get your Access Key"
echo "Enter your Unsplash Access Key (or press Enter to skip):"
read -r UNSPLASH_KEY

if [ ! -z "$UNSPLASH_KEY" ]; then
    update_env "UNSPLASH_ACCESS_KEY" "$UNSPLASH_KEY"
    echo "✅ Unsplash API configured"
else
    echo "⚠️  Skipped Unsplash API"
fi

echo ""
echo "📧 Setting up Resend API (for email)..."
echo "Please visit: https://resend.com/api-keys"
echo "Create a new API key"
echo "Enter your Resend API key (or press Enter to skip):"
read -r RESEND_KEY

if [ ! -z "$RESEND_KEY" ]; then
    update_env "RESEND_API_KEY" "$RESEND_KEY"
    echo "✅ Resend API configured"
else
    echo "⚠️  Skipped Resend API"
fi

echo ""
echo "🎉 API Setup Complete!"
echo "="*60
echo "🧪 Testing all APIs..."
python3 test-all-apis.py

echo ""
echo "🚀 Ready to use:"
echo "   npm run dev                    # Start development server"
echo "   python3 generate-project-images.py  # Generate images"
echo "   python3 generate-images-multi-ai.py # Generate with multiple AI services"
