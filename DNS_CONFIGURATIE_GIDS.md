# 🌐 DNS Configuratie voor Vercel Deployment

## 📋 **Huidige Status:**
- ❌ **Strikingly DNS**: `www.yannova.be.s.strikinglydns.com`
- ❌ **Vercel Status**: "Invalid Configuration"
- ✅ **Doel**: Website naar Vercel laten verwijzen

## 🔧 **Benodigde Wijzigingen:**

### **1. CNAME Record (WWW)**
**WIJZIG in Strikingly:**
```
Naam: www
Type: CNAME
Waarde: a41093cb64c5c9a2.vercel-dns-017.com
TTL: Automatisch
```

**VERVANG de huidige:**
```
www.yannova.be.s.strikinglydns.com
```

### **2. A Record (Root Domain)**
**WIJZIG in Strikingly:**
```
Naam: yannova.be (of leeg)
Type: A
Waarde: 216.198.79.1
TTL: Automatisch
```

**VERVANG de huidige:**
```
54.183.102.22
```

## ⚠️ **BEHOUD DEZE RECORDS:**

### **Email Records (MX):**
```
MX record: mx.yannova.be.cust.b.hostedemail.com
Priority: 1
```

### **Email Verification (TXT):**
```
TXT record: v=spf1 include:_spf.hostedemail.com -all
```

### **Domain Verification (TXT):**
```
TXT record: key1._domainkey.yannova.be [verification string]
```

## 📝 **Stap-voor-Stap in Strikingly:**

1. **Login** op je Strikingly account
2. **Ga naar** je website dashboard
3. **Klik op** "Instellingen" → "Domeinen"
4. **Selecteer** "yannova.be"
5. **Klik op** "DNS Records" of "Geavanceerde Instellingen"

6. **Zoek de CNAME record:**
   - Type: CNAME
   - Naam: www
   - **Verander de waarde naar:** `a41093cb64c5c9a2.vercel-dns-017.com`

7. **Zoek de A record:**
   - Type: A
   - Naam: yannova.be (of @)
   - **Verander de waarde naar:** `216.198.79.1`

8. **BEWAAR MX en TXT records** (voor email functionaliteit)

9. **Klik "Opslaan"** of "Update DNS"

## ⏰ **Tijdlijn:**

- **Onmiddellijk**: Records worden bijgewerkt in Strikingly
- **1-24 uur**: DNS propagatie wereldwijd
- **Na propagatie**: Vercel toont "Valid Configuration"
- **Website live**: `https://yannova.be` en `https://www.yannova.be`

## ✅ **Controle na Wijziging:**

1. **Wacht 24 uur** voor DNS propagatie
2. **Check Vercel dashboard** - zou "Valid Configuration" moeten tonen
3. **Test website**: `https://yannova.be` en `https://www.yannova.be`
4. **Test admin**: `https://yannova.be/admin/login`
5. **Test email**: Zorg dat MX records nog werken

## 🚨 **Belangrijke Notities:**

- **Email blijft werken** via bestaande MX records
- **SSL certificaat** wordt automatisch door Vercel geregeld
- **Redirects** van www naar non-www (of andersom) kun je in Vercel instellen
- **Backup**: Maak screenshots van huidige DNS records voor de zekerheid

## 🎯 **Na DNS Update:**

Zodra de DNS records zijn bijgewerkt en gepropageerd:

1. **Vercel deployment** wordt automatisch actief
2. **Website laadt** via Vercel servers
3. **Admin functionaliteit** werkt volledig
4. **Foto management** en inline editing beschikbaar
5. **Chatbot** en alle features operationeel

**Je website gaat dan live op `yannova.be` via Vercel!** 🚀
