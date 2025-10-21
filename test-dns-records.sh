#!/bin/bash

# DNS Records Test Script voor yannova.be
# Dit script test of alle DNS records correct zijn geconfigureerd

echo "🔍 DNS Records Test voor yannova.be"
echo "===================================="

# Functie om DNS record te testen
test_dns_record() {
    local record_type=$1
    local domain=$2
    local expected_content=$3
    
    echo "Testing $record_type $domain..."
    
    case $record_type in
        "A")
            result=$(dig +short $domain A)
            ;;
        "CNAME")
            result=$(dig +short $domain CNAME)
            ;;
        "MX")
            result=$(dig +short $domain MX)
            ;;
        "TXT")
            result=$(dig +short $domain TXT)
            ;;
        "CAA")
            result=$(dig +short $domain CAA)
            ;;
    esac
    
    if [ -n "$result" ]; then
        echo "✅ $record_type $domain: $result"
        if [ -n "$expected_content" ] && [[ "$result" == *"$expected_content"* ]]; then
            echo "   ✅ Content correct"
        else
            echo "   ⚠️  Content mogelijk incorrect"
        fi
    else
        echo "❌ $record_type $domain: Geen resultaat"
    fi
    echo ""
}

# Test alle DNS records
echo "🏠 A Records:"
test_dns_record "A" "yannova.be"

echo "🌐 CNAME Records:"
test_dns_record "CNAME" "www.yannova.be"

echo "📧 MX Records:"
test_dns_record "MX" "yannova.be"

echo "🔒 TXT Records:"
test_dns_record "TXT" "yannova.be"
test_dns_record "TXT" "key1._domainkey.yannova.be"
test_dns_record "TXT" "_dmarc.yannova.be"

echo "📊 CAA Records:"
test_dns_record "CAA" "yannova.be"

echo "🌍 IPv6 Records (indien beschikbaar):"
test_dns_record "AAAA" "yannova.be"

echo "🔍 NS Records:"
test_dns_record "NS" "yannova.be"

echo "✅ DNS Test voltooid!"
echo ""
echo "💡 Tips:"
echo "- Wacht 5-10 minuten na wijzigingen voor DNS propagatie"
echo "- Gebruik verschillende DNS servers voor testen"
echo "- Controleer ook via online tools zoals dnschecker.org"
