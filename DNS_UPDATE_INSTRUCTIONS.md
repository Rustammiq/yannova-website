# 🔧 Exacte DNS Wijzigingen in Strikingly

## 📋 **Huidige Records (Screenshot):**

| Type | Naam | Waarde | Status |
|------|------|--------|---------|
| A | yannova.be | 54.183.102.22 | ❌ Verkeerd |
| CNAME | www.yannova.be | www.yannova.be.s.strikinglydns.com | ❌ Verkeerd |

## ✅ **Juiste Records voor Vercel:**

| Type | Naam | Waarde | Status |
|------|------|--------|---------|
| A | yannova.be | 216.198.79.1 | ✅ Correct |
| CNAME | www | a41093cb64c5c9a2.vercel-dns-017.com | ✅ Correct |

## 📝 **Stap-voor-Stap Wijzigingen:**

### **1. A Record Wijzigen:**
```
📍 Klik op het GROENE potloodje bij de A record
📝 Verander:
   - Oude waarde: 54.183.102.22
   - Nieuwe waarde: 216.198.79.1
💾 Sla op
```

### **2. CNAME Record Wijzigen:**
```
📍 Klik op het GROENE potloodje bij de CNAME record
📝 Verander:
   - Oude waarde: www.yannova.be.s.strikinglydns.com
   - Nieuwe waarde: a41093cb64c5c9a2.vercel-dns-017.com
💾 Sla op
```

## ⚠️ **BELANGRIJK:**

### **NIET TOEVOEGEN (Rechts):**
- ❌ Het nieuwe CNAME record dat rechts verschijnt
- ❌ Waarde: `www.yannova.be.s.strikinglydns.com` is verkeerd!

### **WEL BEHOUDEN:**
- ✅ MX record: `mx.yannova.be.cust.b.hostedemail.co`
- ✅ TXT record: `v=spf1 include:_spf.hostedemail.com -all`
- ✅ TXT record: `key1._domainkey.yannova.be` (verification)

## ⏰ **Na Wijziging:**

1. **Save** alle changes in Strikingly
2. **Wacht 1-24 uur** voor DNS propagatie
3. **Check Vercel dashboard:**
   - yannova.be: "Valid Configuration" ✅
   - www.yannova.be: "Valid Configuration" ✅
4. **Website live** op `https://yannova.be` 🚀

## 🎯 **Controle:**
- **Vercel toont:** "Waiting For DNS Propagation" → "Valid Configuration"
- **Website bereikbaar:** `https://yannova.be`
- **Admin login werkt:** `https://yannova.be/admin/login`
- **Email blijft werken** via bestaande MX records

**Je hoeft alleen die twee records aan te passen en dan is het klaar!** 💪
