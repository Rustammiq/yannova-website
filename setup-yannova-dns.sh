#!/bin/bash

# Yannova.be DNS Setup Script
# Dit script configureert DNS records via Cloudflare API

echo "🌐 Yannova.be DNS Setup Script"
echo "===============================

# Controleer of API token is ingesteld
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN environment variable is niet ingesteld"
    echo ""
    echo "🔑 Stap 1: API Token instellen"
    echo "Gebruik een van deze API tokens uit uw Cloudflare dashboard:"
    echo ""
    echo "📋 Voor DNS beheer:"
    echo "   - Token: dns-edit-yannova"
    echo "   - Permissies: Zone.DNS"
    echo "   - Scope: 1 Zone (yannova.be)"
    echo ""
    echo "💡 Voer het volgende commando uit:"
    echo "   export CLOUDFLARE_API_TOKEN=\"uw_api_token_hier\""
    ech
fi

# Zone ID ophalen
echo "🔍 Zone ID ophalen voor yannova.be..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=yannova.be" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" | \
    grep -o '"id":"[^"]*"' | \
    head -1 | \
    cut -d'"' -f4)

if [ -z "$ZONE_ID" ]; then
    echo "❌ Zone ID niet gevonden voor yannova.be"
    echo "Controleer of het domein correct is geconfigureerd in Cloudflare"
    exit 1
fi

echo "✅ Zone ID gevonden: $ZONE_ID"

# Functie om DNS record toe te voegen
add_dns_record() {
    local type=$1
    local name=$2
    local content=$3
    local priority=${4:-""}
    local comment=$5
    
    echo "➕ $type $name toevoegen..."
    
    # JSON data voorbereiden
    if [ "$type" = "MX" ]; then
        JSON_DATA="{\"type\":\"$type\",\"name\":\"$name\",\"content\":\"$content\",\"priority\":$priority,\"ttl\":1}"
    else
        JSON_DATA="{\"type\":\"$type\",\"name\":\"$name\",\"content\":\"$content\",\"ttl\":1}"
    fi
    
    # API call
    RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "$JSON_DATA")
    
    # Controleer response
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo "✅ $type $name succesvol toegevoegd"
    else
        ERROR_MSG=$(echo "$RESPONSE" | grep -o '"message":"[^"]*"' | head -1 | cut -d'"' -f4)
        if [ -n "$ERROR_MSG" ]; then
            echo "⚠️  $type $name: $ERROR_MSG"
        else
            echo "❌ $type $name: Onbekende fout"
        fi
    fi
}

echo ""
echo "📝 DNS Records toevoegen..."
echo "============================"

# A Record (vervang YOUR_SERVER_IP met uw echte server IP)
echo "⚠️  BELANGRIJK: Vervang YOUR_SERVER_IP met uw echte server IP adres"
read -p "Voer uw server IP adres in: " SERVER_IP

if [ -n "$SERVER_IP" ]; then
    add_dns_record "A" "yannova.be" "$SERVER_IP" "" "A record voor yannova.be"
fi

# CNAME Record
add_dns_record "CNAME" "www.yannova.be" "yannova.be" "" "CNAME voor www.yannova.be"

# MX Record
add_dns_record "MX" "yannova.be" "mx.yannova.be.cust.b.hostedemail.com" "1" "MX record voor e-mail"

# SPF Record
add_dns_record "TXT" "yannova.be" "v=spf1 include:_spf.hostedemail.com ~all" "" "SPF record voor e-mail authenticatie"

# DKIM Record
add_dns_record "TXT" "key1._domainkey.yannova.be" "v=DKIM1;k=rsa;p=MIGfMA0GCSqGSlb3DQEBAQUAA4GNADCBIQKBgQDkjhLzlbxP5+slebzuPw1EfKLRD9BLyE+wvcAzPYjdK8RO2Y+5bx7S8gQCbbYlflThBb03z1y5+Ir9S+OEDIvk49387XrSICx7zpd8CiYeZX7628aguJltHOdInYgsAGQgcR6mXUv939WR8+EHs5sVxhTJnc42x8wclYPFa63wmQIDAQAB" "" "DKIM record voor e-mail authenticatie"

# DMARC Record
add_dns_record "TXT" "_dmarc.yannova.be" "v=DMARC1; p=quarantine; rua=mailto:dmarc@yannova.be; ruf=mailto:dmarc@yannova.be; fo=1" "" "DMARC record voor e-mail beveiliging"

# CAA Records
add_dns_record "CAA" "yannova.be" "0 issue \"letsencrypt.org\"" "" "CAA record voor Let's Encrypt"
add_dns_record "CAA" "yannova.be" "0 issuewild \"letsencrypt.org\"" "" "CAA record voor wildcard certificaten"

echo ""
echo "🎉 DNS Setup voltooid!"
echo ""
echo "📋 Volgende stappen:"
echo "1. Controleer de DNS records in uw Cloudflare dashboard"
echo "2. Wacht 5-10 minuten voor DNS propagatie"
echo "3. Test de website op https://yannova.be"
echo "4. Configureer SSL/TLS instellingen in Cloudflare:"
echo "   - SSL/TLS Encryption Mode: Full (strict)"
echo "   - Always Use HTTPS: Aan"
echo "   - HTTP Strict Transport Security (HSTS): Aan"
echo ""
echo "🔧 Performance optimalisatie:"
echo "   - Auto Minify: CSS, HTML, JavaScript"
echo "   - Brotli Compression: Aan"
echo "   - Rocket Loader: Aan"
echo "   - Polish: Lossless"
echo "   - WebP: Aan"
echo ""
echo "✅ Setup script voltooid!"
