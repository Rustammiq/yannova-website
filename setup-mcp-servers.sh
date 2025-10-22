#!/bin/bash

# Yannova MCP Servers Setup Script
# Dit script installeert en configureert alle MCP servers voor Yannova Bouw

set -e

echo "🏗️  Yannova MCP Servers Setup"
echo "================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "mcp-servers" ]; then
    print_error "Dit script moet worden uitgevoerd vanuit de Yannova website root directory"
    exit 1
fi

print_status "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is niet geïnstalleerd. Installeer Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js 18+ is vereist. Huidige versie: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) detected"

print_status "Checking npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm is niet geïnstalleerd"
    exit 1
fi
print_success "npm $(npm -v) detected"

# Check if Yannova website is running
print_status "Checking if Yannova website is running..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    print_success "Yannova website is running on localhost:3000"
else
    print_warning "Yannova website is niet running. Start met 'npm run dev'"
    print_status "Doorgaan met MCP server setup..."
fi

# Install and build all MCP servers
SERVERS=("yannova-chat" "yannova-projects" "yannova-photos")

for server in "${SERVERS[@]}"; do
    print_status "Setting up $server server..."

    if [ -d "mcp-servers/$server" ]; then
        cd "mcp-servers/$server"

        print_status "Installing dependencies for $server..."
        if npm install; then
            print_success "Dependencies installed for $server"
        else
            print_error "Failed to install dependencies for $server"
            cd ../..
            exit 1
        fi

        print_status "Building $server..."
        if npm run build; then
            print_success "Built $server successfully"
        else
            print_error "Failed to build $server"
            cd ../..
            exit 1
        fi

        print_status "Testing $server..."
        if npm test; then
            print_success "Tests passed for $server"
        else
            print_warning "Tests failed for $server, but build was successful"
        fi

        cd ../..
    else
        print_error "Directory mcp-servers/$server does not exist"
        exit 1
    fi
done

print_status "Creating MCP client configuration files..."

# Create Claude Desktop config
CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

if [ -d "$CLAUDE_CONFIG_DIR" ]; then
    cat > "$CLAUDE_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "yannova-chat": {
      "command": "node",
      "args": ["$(pwd)/mcp-servers/yannova-chat/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "http://localhost:3000",
        "GEMINI_API_KEY": "AIzaSyAvKfrzJt7Vq8V6LGzzEUNEGi4yTZYzweo"
      }
    },
    "yannova-projects": {
      "command": "node",
      "args": ["$(pwd)/mcp-servers/yannova-projects/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "http://localhost:3000"
      }
    },
    "yannova-photos": {
      "command": "node",
      "args": ["$(pwd)/mcp-servers/yannova-photos/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "http://localhost:3000"
      }
    }
  }
}
EOF
    print_success "Created Claude Desktop configuration"
else
    print_warning "Claude Desktop config directory not found. Manual setup required."
fi

# Create VS Code Cursor config
CURSOR_CONFIG_DIR=".cursor"
CURSOR_CONFIG_FILE="$CURSOR_CONFIG_DIR/mcp.json"

mkdir -p "$CURSOR_CONFIG_DIR"

cat > "$CURSOR_CONFIG_FILE" << EOF
{
  "mcp": {
    "servers": {
      "yannova-chat": {
        "type": "stdio",
        "command": "node",
        "args": ["$(pwd)/mcp-servers/yannova-chat/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "http://localhost:3000"
        }
      },
      "yannova-projects": {
        "type": "stdio",
        "command": "node",
        "args": ["$(pwd)/mcp-servers/yannova-projects/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "http://localhost:3000"
        }
      },
      "yannova-photos": {
        "type": "stdio",
        "command": "node",
        "args": ["$(pwd)/mcp-servers/yannova-photos/dist/index.js"],
        "env": {
          "YANNOVA_API_URL": "http://localhost:3000"
        }
      }
    }
  }
}
EOF
print_success "Created VS Code Cursor configuration"

# Create production config
cat > "mcp-servers/mcp-config-production.json" << EOF
{
  "mcpServers": {
    "yannova-chat": {
      "command": "node",
      "args": ["$(pwd)/mcp-servers/yannova-chat/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "https://yannova.nl",
        "GEMINI_API_KEY": "your_production_gemini_key"
      }
    },
    "yannova-projects": {
      "command": "node",
      "args": ["$(pwd)/mcp-servers/yannova-projects/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "https://yannova.nl"
      }
    },
    "yannova-photos": {
      "command": "node",
      "args": ["$(pwd)/mcp-servers/yannova-photos/dist/index.js"],
      "env": {
        "YANNOVA_API_URL": "https://yannova.nl"
      }
    }
  }
}
EOF
print_success "Created production configuration template"

# Create startup script
cat > "start-mcp-servers.sh" << 'EOF'
#!/bin/bash

# Start all Yannova MCP servers
# Usage: ./start-mcp-servers.sh [chat|projects|photos|all]

set -e

echo "🚀 Starting Yannova MCP Servers..."

if [ -z "$1" ] || [ "$1" = "all" ]; then
    SERVERS=("yannova-chat" "yannova-projects" "yannova-photos")
else
    SERVERS=("$1")
fi

for server in "${SERVERS[@]}"; do
    if [ -d "mcp-servers/$server" ]; then
        echo "Starting $server server..."
        cd "mcp-servers/$server"
        node dist/index.js &
        cd ../..
        echo "✅ $server server started (PID: $!)"
    fi
done

echo "🎉 All requested servers started!"
echo "Use 'pkill -f \"node.*mcp-servers\"' to stop all servers"
EOF

chmod +x "start-mcp-servers.sh"
print_success "Created startup script"

print_status "Creating environment file template..."
cat > ".env.mcp.example" << EOF
# Yannova MCP Servers Environment Variables

# API Configuration
YANNOVA_API_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here

# Production URL (when deploying)
PRODUCTION_URL=https://yannova.nl

# Development settings
NODE_ENV=development
DEBUG=true
EOF
print_success "Created environment template"

print_status "Setup complete! 🎉"
echo ""
print_success "MCP Servers geïnstalleerd en geconfigureerd:"
echo "  🤖 yannova-chat - AI chatbot functionaliteit"
echo "  📋 yannova-projects - Project management"
echo "  🖼️  yannova-photos - Foto management & AI generatie"
echo ""
print_status "Volgende stappen:"
echo "1. Start de Yannova website: npm run dev"
echo "2. Configureer je API keys in de client configs"
echo "3. Test de servers: ./start-mcp-servers.sh"
echo "4. Herstart Claude Desktop of VS Code Cursor"
echo ""
print_status "Voor productie deployment:"
echo "- Update YANNOVA_API_URL naar je productie domain"
echo "- Configureer je Gemini API key"
echo "- Gebruik de production config templates"
echo ""
print_success "Setup voltooid! 🚀"
