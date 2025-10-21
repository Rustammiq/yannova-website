#!/bin/bash

# 🚀 Yannova Website - Google Cloud Run Deployment Script
# Dit script deployt je Next.js website naar Google Cloud Run

set -e  # Exit on any error

echo "🚀 Yannova Website - Cloud Run Deployment"
echo "========================================="

# Configuration
PROJECT_ID="premium-episode-455004-m6"
SERVICE_NAME="yannova-website"
REGION="europe-west1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "📋 Configuration:"
echo "   Project ID: $PROJECT_ID"
echo "   Service: $SERVICE_NAME"
echo "   Region: $REGION"
echo "   Image: $IMAGE_NAME"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 1. Check prerequisites
echo "1️⃣ Checking prerequisites..."

if ! command_exists gcloud; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK."
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! command_exists docker; then
    echo "❌ Docker not found. Please install Docker."
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

echo "   ✅ gcloud CLI found"
echo "   ✅ Docker found"

# 2. Authenticate and configure gcloud
echo ""
echo "2️⃣ Configuring Google Cloud..."

# Set project
echo "   Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Enable required services
echo "   Enabling required services..."
gcloud services enable containerregistry.googleapis.com --quiet
gcloud services enable run.googleapis.com --quiet
gcloud services enable secretmanager.googleapis.com --quiet
gcloud services enable cloudbuild.googleapis.com --quiet

# Configure Docker to use gcloud as a credential helper
gcloud auth configure-docker --quiet

# 3. Setup environment variables in Secret Manager
echo ""
echo "3️⃣ Setting up secrets..."

# Check if secrets already exist
if ! gcloud secrets describe gemini-api-key --quiet >/dev/null 2>&1; then
    if [ -f ".env.local" ]; then
        # Extract API keys from .env.local
        GEMINI_KEY=$(grep "GEMINI_API_KEY" .env.local | cut -d '=' -f2)
        ZAI_KEY=$(grep "ZAI_API_KEY" .env.local | cut -d '=' -f2)

        if [ ! -z "$GEMINI_KEY" ] && [ "$GEMINI_KEY" != "your_gemini_key_here" ]; then
            echo "   Creating gemini-api-key secret..."
            echo -n "$GEMINI_KEY" | gcloud secrets create gemini-api-key --data-file=- --quiet
        fi

        if [ ! -z "$ZAI_KEY" ] && [ "$ZAI_KEY" != "your_zai_key_here" ]; then
            echo "   Creating zai-api-key secret..."
            echo -n "$ZAI_KEY" | gcloud secrets create zai-api-key --data-file=- --quiet
        fi
    else
        echo "   ⚠️  .env.local not found - you'll need to set secrets manually"
    fi
else
    echo "   ✅ Secrets already exist"
fi

# 4. Create Dockerfile if it doesn't exist
echo ""
echo "4️⃣ Creating Dockerfile..."

if [ ! -f "Dockerfile" ]; then
    cat > Dockerfile << EOF
# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variables for runtime secrets
ENV PORT=3000

# Start the application
CMD ["npm", "start"]
EOF
    echo "   ✅ Dockerfile created"
else
    echo "   ✅ Dockerfile already exists"
fi

# 5. Build Docker image
echo ""
echo "5️⃣ Building Docker image..."
docker build -t $IMAGE_NAME .

# 6. Push image to Container Registry
echo ""
echo "6️⃣ Pushing image to Google Container Registry..."
gcloud auth configure-docker --quiet
docker push $IMAGE_NAME

# 7. Deploy to Cloud Run
echo ""
echo "7️⃣ Deploying to Cloud Run..."

# Prepare environment variables
ENV_VARS=""
if gcloud secrets describe gemini-api-key --quiet >/dev/null 2>&1; then
    ENV_VARS="$ENV_VARS --set-env-vars GEMINI_API_KEY=$(gcloud secrets versions access latest gemini-api-key)"
fi

if gcloud secrets describe zai-api-key --quiet >/dev/null 2>&1; then
    ENV_VARS="$ENV_VARS --set-env-vars ZAI_API_KEY=$(gcloud secrets versions access latest zai-api-key)"
fi

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    $ENV_VARS \
    --port 3000 \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300 \
    --quiet

# 8. Get the service URL
echo ""
echo "8️⃣ Getting service URL..."
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format="value(status.url)")
echo ""
echo "🎉 Deployment successful!"
echo "========================="
echo ""
echo "🌐 Your website is now live at:"
echo "   $SERVICE_URL"
echo ""
echo "📋 Next steps:"
echo "   1. Set up a custom domain (optional)"
echo "   2. Configure SSL certificate"
echo "   3. Set up monitoring and logging"
echo ""
echo "🔧 Useful commands:"
echo "   - View logs: gcloud logging read \"resource.type=cloud_run_revision\" --limit 50"
echo "   - Update deployment: ./deploy-to-cloudrun.sh"
echo "   - Delete service: gcloud run services delete $SERVICE_NAME --region $REGION"
echo ""
echo "✅ Happy hosting!"
