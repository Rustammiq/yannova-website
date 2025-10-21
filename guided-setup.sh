#!/bin/bash

# Guided DNS Setup voor yannova.be
# Dit script begeleidt u stap voor stap

echo "🌐 Yannova.be DNS Setup - Stap voor Stap"
echo "========================================="
echo ""

# Stap 1: API Token
echo "🔑 STAP 1: API Token Instellen"
echo "==============================="
echo ""
echo "1. Ga naar: https://dash.cloudflare.com/profile/api-tokens"
echo "2. Zoek naar token: 'dns-edit-yannova'"
echo "3. Kopieer het token"
echo ""

read -p "Hebt u het API token gekopieerd? (y/n): " token_ready

if [ "$token_ready" != "y" ]; then
    echo "❌ Ga eerst naar Cloudflare en kopieer uw API token"
    echo "   URL: https://dash.cloudflare.com/profile/api-tokens"
    exit 1
fi

echo ""
read -p "Plak hier uw API token: " api_token

if [ -z "$api_token" ]; then
    echo "❌ Geen API token ingevoerd"
    exit 1
fi

export CLOUDFLARE_API_TOKEN="$api_token"
echo "✅ API Token ingesteld!"
echo ""

# Stap 2: Server IP
echo "🖥️  STAP 2: Server IP Adres"
echo "============================"
echo ""
echo "Uw website draait op een server. We hebben het IP adres nodig."
echo ""

read -p "Weet u het IP adres van uw server? (y/n): " ip_known

if [ "$ip_known" = "y" ]; then
    read -p "Voer het IP adres in: " server_ip
else
    echo "🔍 IP adres ophalen..."
    server_ip=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "")
    
    if [ -n "$server_ip" ]; then
        echo "✅ Gevonden IP adres: $server_ip"
        read -p "Is dit correct? (y/n): " ip_correct
        if [ "$ip_correct" != "y" ]; then
            read -p "Voer het juiste IP adres in: " server_ip
        fi
    else
        read -p "Voer het IP adres handmatig in: " server_ip
    fi
fi

if [ -z "$server_ip" ]; then
    echo "❌ Geen IP adres ingevoerd"
    exit 1
fi

echo "✅ Server IP: $server_ip"
echo ""

# Stap 3: DNS Records configureren
echo "⚙️  STAP 3: DNS Records Configureren"
echo "===================================="
echo ""
echo "We gaan nu de volgende DNS records toevoegen:"
echo "• A record: yannova.be → $server_ip"
echo "• CNAME: www.yannova.be → yannova.be"
echo "• MX: E-mail routing"
echo "• TXT: E-mail authenticatie (SPF, DKIM, DMARC)"
echo "• CAA: SSL certificaten"
echo ""

read -p "Doorgaan met DNS configuratie? (y/n): " proceed

if [ "$proceed" != "y" ]; then
    echo "❌ Setup geannuleerd"
    exit 1
fi

# Voer het echte setup script uit
echo ""
echo "🚀 DNS Records toevoegen..."
echo ""

# Update het setup script met het juiste IP adres
sed -i.bak "s/YOUR_SERVER_IP/$server_ip/g" setup-yannova-dns.sh

# Voer setup uit
./setup-yannova-dns.sh

# Herstel het originele bestand
mv setup-yannova-dns.sh.bak setup-yannova-dns.sh

echo ""
echo "🎉 DNS Setup voltooid!"
echo ""
echo "📋 Volgende stappen:"
echo "1. Wacht 5-10 minuten voor DNS propagatie"
echo "2. Test de website: https://yannova.be"
echo "3. Test e-mail functionaliteit"
echo "4. Controleer SSL certificaat"
echo ""
echo "🔍 Test DNS records:"
echo "   ./test-dns-records.sh"
echo ""
echo "📚 Meer informatie:"
echo "   cat QUICK_START_DNS.md"
