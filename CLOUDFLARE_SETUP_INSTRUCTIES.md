# 🌐 Cloudflare DNS Setup voor yannova.be

## 📋 Overzicht
Deze instructies helpen u bij het configureren van DNS records voor `yannova.be` in Cloudflare, inclusief alle benodigde records voor e-mail, SSL en SEO optimalisatie.

## 🔑 Stap 1: API Token Configuratie

### Benodigde API Tokens
Gebruik de volgende API tokens uit uw Cloudflare dashboard:

#### Voor DNS Beheer:
- **Token**: `dns-edit-yannova`
- **Permissies**: `Zone.DNS`
- **Scope**: `1 Zone (yannova.be)`

#### Voor E-mail Configuratie:
- **Token**: `e-mailpermissies in`
- **Permissies**: `Account.E-mailbeveiliging`
- **Scope**: `Alle accounts, info@yannova.be, Alle zones`

### API Token Instellen
```bash
export CLOUDFLARE_API_TOKEN="uw_api_token_hier"
```

## 🚀 Stap 2: DNS Records Configureren

### Automatische Setup (Aanbevolen)
```bash
# Voer het setup script uit
./setup-yannova-dns.sh
```

### Handmatige Setup via Cloudflare Dashboard

#### 1. A Records (IPv4)
| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| A | yannova.be | [UW_SERVER_IP] | Auto | - |

#### 2. CNAME Records
| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| CNAME | www.yannova.be | yannova.be | Auto | - |

#### 3. MX Records (E-mail)
| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| MX | yannova.be | mx.yannova.be.cust.b.hostedemail.com | Auto | 1 |

#### 4. TXT Records (E-mail Authenticatie)
| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| TXT | yannova.be | v=spf1 include:_spf.hostedemail.com ~all | Auto | - |
| TXT | key1._domainkey.yannova.be | v=DKIM1;k=rsa;p=MIGfMA0GCSqGSlb3DQEBAQUAA4GNADCBIQKBgQDkjhLzlbxP5+slebzuPw1EfKLRD9BLyE+wvcAzPYjdK8RO2Y+5bx7S8gQCbbYlflThBb03z1y5+Ir9S+OEDIvk49387XrSICx7zpd8CiYeZX7628aguJltHOdInYgsAGQgcR6mXUv939WR8+EHs5sVxhTJnc42x8wclYPFa63wmQIDAQAB | Auto | - |
| TXT | _dmarc.yannova.be | v=DMARC1; p=quarantine; rua=mailto:dmarc@yannova.be; ruf=mailto:dmarc@yannova.be; fo=1 | Auto | - |

#### 5. CAA Records (SSL Certificaten)
| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| CAA | yannova.be | 0 issue "letsencrypt.org" | Auto | - |
| CAA | yannova.be | 0 issuewild "letsencrypt.org" | Auto | - |

## 🔧 Stap 3: SSL/TLS Configuratie

Configureer de volgende instellingen in Cloudflare:

### SSL/TLS Tab
- **Encryption Mode**: `Full (strict)`
- **Always Use HTTPS**: `Aan`
- **HTTP Strict Transport Security (HSTS)**: `Aan`
- **Minimum TLS Version**: `1.2`
- **Opportunistic Encryption**: `Aan`
- **TLS 1.3**: `Aan`

## 🚀 Stap 4: Performance Optimalisatie

### Speed Tab
- **Auto Minify**: CSS, HTML, JavaScript
- **Brotli Compression**: `Aan`
- **Rocket Loader**: `Aan`
- **Mirage**: `Aan`
- **Polish**: `Lossless`
- **WebP**: `Aan`

### Caching Tab
- **Caching Level**: `Standard`
- **Browser Cache TTL**: `4 hours`
- **Always Online**: `Aan`

## 📱 Stap 5: Mobile Optimalisatie

### Page Rules
- **URL**: `yannova.be/*`
- **Settings**: 
  - Mobile Redirect: `Aan`
  - Mobile Redirect URL: `https://yannova.be`

## 🎯 Stap 6: SEO Optimalisatie

### Page Rules
- **URL**: `yannova.be/*`
- **Settings**:
  - Always Online: `Aan`
  - Crawler Hints: `Aan`

## 🔍 Stap 7: Verificatie

### DNS Propagatie Controleren
```bash
# Controleer A record
dig yannova.be A

# Controleer CNAME record
dig www.yannova.be CNAME

# Controleer MX record
dig yannova.be MX

# Controleer TXT records
dig yannova.be TXT
```

### Website Testen
1. Open `https://yannova.be` in uw browser
2. Controleer SSL certificaat
3. Test e-mail functionaliteit
4. Controleer mobile weergave

## 🛠️ Troubleshooting

### Veelvoorkomende Problemen

#### DNS Propagatie
- **Probleem**: Website laadt niet
- **Oplossing**: Wacht 5-10 minuten voor DNS propagatie

#### SSL Certificaat
- **Probleem**: SSL fout
- **Oplossing**: Controleer of "Full (strict)" mode is ingesteld

#### E-mail Problemen
- **Probleem**: E-mails worden niet ontvangen
- **Oplossing**: Controleer MX en TXT records

### Logs Controleren
```bash
# Cloudflare logs
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## 📞 Support

Voor vragen of problemen:
- **Cloudflare Support**: [support.cloudflare.com](https://support.cloudflare.com)
- **DNS Check**: [dnschecker.org](https://dnschecker.org)
- **SSL Test**: [ssllabs.com/ssltest](https://ssllabs.com/ssltest)

## ✅ Checklist

- [ ] API Token ingesteld
- [ ] A record geconfigureerd
- [ ] CNAME record geconfigureerd
- [ ] MX record geconfigureerd
- [ ] SPF record geconfigureerd
- [ ] DKIM record geconfigureerd
- [ ] DMARC record geconfigureerd
- [ ] CAA records geconfigureerd
- [ ] SSL/TLS instellingen geconfigureerd
- [ ] Performance optimalisatie ingeschakeld
- [ ] Mobile optimalisatie ingeschakeld
- [ ] Website getest
- [ ] E-mail getest

## 🎉 Voltooid!

Uw `yannova.be` domein is nu volledig geconfigureerd in Cloudflare met alle benodigde DNS records, SSL certificaten en performance optimalisaties!
