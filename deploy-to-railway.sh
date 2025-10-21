#!/bin/bash

# Yannova Website Deployment Script voor Railway
# Dit script bouwt en deployt de applicatie naar Railway

echo "🚂 Deploying Yannova Website to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Installing..."
    curl -fsSL https://railway.app/install.sh | sh
fi

# Login to Railway (als nog niet ingelogd)
echo "🔐 Checking Railway authentication..."
railway status || railway login

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t yannova-website .

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Deployment completed!"
echo "🌐 Your website will be available shortly at: https://your-app.railway.app"
echo ""
echo "📋 Next steps:"
echo "1. Set up custom domain in Railway dashboard"
echo "2. Configure environment variables (database URLs, API keys, etc.)"
echo "3. Enable automatic deployments from GitHub"
echo ""
echo "🔧 Useful Railway commands:"
echo "railway status    - Check deployment status"
echo "railway logs      - View application logs"
echo "railway open      - Open app in browser"
echo "railway domain    - Manage custom domains"
