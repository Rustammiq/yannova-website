# 🚀 Docker & Cloud Deployment Guide

Deze guide legt uit hoe je de Yannova website kunt deployen naar productie met Docker en cloud platforms.

## 📋 Vereisten

- Docker Desktop geïnstalleerd
- Git repository (voor cloud deployment)
- Environment variables geconfigureerd

## 🐳 Lokale Docker Setup

### 1. Bouw en start de applicatie lokaal:

```bash
# Test Docker setup lokaal
./test-docker.sh

# Of handmatig:
docker-compose up --build
```

### 2. Toegang tot de applicatie:
- Website: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin
- Database: localhost:5432 (als gebruikt)

## ☁️ Cloud Deployment Opties

### Optie 1: Railway (Aanbevolen)

Railway is een gebruiksvriendelijk platform dat automatisch deployments detecteert.

#### Stappen:
1. **Push naar GitHub** (als nog niet gedaan)
2. **Deploy naar Railway:**
   ```bash
   ./deploy-to-railway.sh
   ```
3. **Configureer environment variables** in Railway dashboard
4. **Set custom domain** (optioneel)

#### Voordelen:
- ✅ Automatische deployments bij Git pushes
- ✅ Built-in PostgreSQL database
- ✅ SSL certificaten automatisch
- ✅ Gratis tier beschikbaar

### Optie 2: Render

Render biedt een goede balans tussen features en eenvoud.

#### Stappen:
1. **Push naar GitHub**
2. **Deploy naar Render:**
   ```bash
   ./deploy-to-render.sh
   ```
3. **Configureer environment variables** in Render dashboard
4. **Add custom domain** (optioneel)

#### Voordelen:
- ✅ Docker support ingebouwd
- ✅ Automatische deployments
- ✅ Managed database opties

## 🔧 Environment Variables

Kopieer `.env.example` naar `.env.local` en vul de waarden in:

```bash
cp .env.example .env.local
```

### Vereiste Variables:
```bash
# Database (als gebruikt)
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://yourdomain.com"

# AI Services
GEMINI_API_KEY="your-gemini-key"

# Email
RESEND_API_KEY="your-resend-key"
```

## 🔒 Security Checklist

Voor productie deployment:

- [ ] **Sterke wachtwoorden** voor alle accounts
- [ ] **HTTPS enabled** (automatisch bij meeste platforms)
- [ ] **Environment variables** correct geconfigureerd
- [ ] **Database credentials** veilig opgeslagen
- [ ] **API keys** niet in code gecommit
- [ ] **Regular backups** ingesteld
- [ ] **Monitoring** ingesteld (logs, uptime)

## 🚀 Deployment Workflow

### Voor Ontwikkelaars:

1. **Maak wijzigingen** in je code
2. **Test lokaal:** `npm run dev`
3. **Test Docker:** `./test-docker.sh`
4. **Commit en push** naar GitHub
5. **Automatische deployment** naar productie

### Voor Production Updates:

1. **Deploy script uitvoeren** (als handmatige deployment)
2. **Controleer logs** voor errors
3. **Test de live website**
4. **Update environment variables** indien nodig

## 🛠️ Troubleshooting

### Veelvoorkomende Problemen:

**Website laadt niet:**
```bash
# Check logs
docker-compose logs yannova-website

# Restart containers
docker-compose restart
```

**Database connectie faalt:**
```bash
# Check database status
docker-compose exec postgres pg_isready

# View database logs
docker-compose logs postgres
```

**Build faalt:**
```bash
# Clean rebuild
docker-compose build --no-cache

# Check for missing dependencies
npm install
```

## 📞 Support

Voor deployment problemen:
1. Check de logs: `docker-compose logs`
2. Controleer environment variables
3. Test lokaal met Docker eerst
4. Bekijk de documentatie van je cloud platform

## 🎯 Aanbevolen Setup

Voor productie raden we aan:
- **Railway** voor eenvoud en betrouwbaarheid
- **PostgreSQL** database voor data persistence
- **Environment-based configuration**
- **Automated deployments** via Git
- **Monitoring en logging** ingesteld

Happy deploying! 🚀
