# 🚀 Quick Start: DNS Setup voor yannova.be

## ⚡ Snelle Setup (3 stappen)

### 1️⃣ **API Token Ophalen**
```bash
# Ga naar: https://dash.cloudflare.com/profile/api-tokens
# Zoek naar: "dns-edit-yannova"
# Kopieer het token
```

### 2️⃣ **Token Instellen**
```bash
# Vervang "uw_echte_token" met uw echte API token
export CLOUDFLARE_API_TOKEN="uw_echte_token"

# Controleer of het werkt
echo $CLOUDFLARE_API_TOKEN
```

### 3️⃣ **DNS Records Configureren**
```bash
# Voer het setup script uit
./setup-yannova-dns.sh

# Wacht 5-10 minuten voor DNS propagatie
# Test: https://yannova.be
```

## 🔍 **Test DNS Records**
```bash
# Test of alles werkt
./test-dns-records.sh
```

## 📋 **Wat wordt geconfigureerd?**

| Type | Name | Purpose |
|------|------|---------|
| A | yannova.be | Hoofdwebsite |
| CNAME | www.yannova.be | WWW subdomein |
| MX | yannova.be | E-mail routing |
| TXT | yannova.be | SPF (e-mail auth) |
| TXT | key1._domainkey.yannova.be | DKIM (e-mail security) |
| TXT | _dmarc.yannova.be | DMARC (e-mail policy) |
| CAA | yannova.be | SSL certificaten |

## 🆘 **Problemen?**

### API Token werkt niet?
- Controleer of token correct is gekopieerd
- Controleer of token `Zone.DNS` permissies heeft
- Controleer of domein `yannova.be` bestaat in Cloudflare

### Website laadt niet?
- Wacht 5-10 minuten voor DNS propagatie
- Controleer of server IP correct is ingevoerd
- Test via: `dig yannova.be A`

### E-mail werkt niet?
- Controleer MX records: `dig yannova.be MX`
- Controleer SPF record: `dig yannova.be TXT`

## 📞 **Hulp Nodig?**

- **Cloudflare Support**: [support.cloudflare.com](https://support.cloudflare.com)
- **DNS Check**: [dnschecker.org](https://dnschecker.org)
- **SSL Test**: [ssllabs.com/ssltest](https://ssllabs.com/ssltest)

## ✅ **Checklist**

- [ ] API Token ingesteld
- [ ] DNS records geconfigureerd
- [ ] Website getest (https://yannova.be)
- [ ] E-mail getest
- [ ] SSL certificaat actief
- [ ] Performance optimalisatie ingeschakeld

**🎉 Klaar! Uw yannova.be is nu live!**
