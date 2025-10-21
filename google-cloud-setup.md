# Google Cloud Setup voor Yannova Website

## Geïnstalleerde Componenten

### 1. Google Cloud SDK
- ✅ Google Cloud CLI geïnstalleerd via Homebrew
- ✅ Authenticatie voltooid met account: roustamyandiev9@gmail.com
- ✅ Project ingesteld: gen-lang-client-0137886823

### 2. Ingeschakelde API's
- ✅ Generative Language API (generativelanguage.googleapis.com)
- ✅ AI Platform API (aiplatform.googleapis.com)

### 3. API Keys
- ✅ Nieuwe API Key gegenereerd: AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo
- ✅ API Key geconfigureerd in:
  - `generate-project-images.py`
  - `lib/gemini.ts`

### 4. Service Account
- ✅ Service Account aangemaakt: yannova-gemini-sa
- ✅ IAM rol toegewezen: roles/aiplatform.user
- ✅ Credentials bestand gegenereerd: `google-credentials.json`

## Gebruik

### Voor Python scripts:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
python generate-project-images.py
```

### Voor Next.js applicatie:
De API key is al geconfigureerd in `lib/gemini.ts` en kan gebruikt worden via environment variables.

## Beveiliging

⚠️ **BELANGRIJK**: 
- Voeg `google-credentials.json` toe aan `.gitignore`
- Gebruik environment variables voor productie
- Beperk API key toegang tot specifieke services

## Commands voor onderhoud

```bash
# Check API key status
gcloud services api-keys list

# Check service account
gcloud iam service-accounts list

# Check ingeschakelde API's
gcloud services list --enabled
```

## Project informatie
- Project ID: gen-lang-client-0137886823
- Service Account: yannova-gemini-sa@gen-lang-client-0137886823.iam.gserviceaccount.com
- API Key: AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo
