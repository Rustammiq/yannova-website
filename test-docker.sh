#!/bin/bash

# Test Docker setup lokaal voordat je naar cloud deployt

echo "🐳 Testing Docker setup locally..."

# Stop any running containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start containers
echo "🔨 Building Docker image..."
docker-compose build

echo "🚀 Starting containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Test if website is accessible
echo "🔍 Testing website accessibility..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Website is running successfully!"
    echo "🌐 Access your website at: http://localhost:3000"
else
    echo "❌ Website is not accessible. Checking logs..."
    docker-compose logs yannova-website
fi

# Test database connection (if applicable)
echo "🔍 Testing database connection..."
if docker-compose exec postgres pg_isready -U yannova_user -d yannova > /dev/null 2>&1; then
    echo "✅ Database is running successfully!"
else
    echo "❌ Database connection failed"
fi

echo ""
echo "📋 Docker commands:"
echo "docker-compose logs -f    - View logs"
echo "docker-compose stop       - Stop containers"
echo "docker-compose down       - Stop and remove containers"
echo "docker-compose up -d      - Start containers in background"
