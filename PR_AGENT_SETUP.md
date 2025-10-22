# 🚀 Self-hosted PR-Agent Setup - Yannova Bouw Website

Deze handleiding beschrijft de complete setup van een self-hosted PR-Agent voor automatische code reviews en kwaliteitscontroles op het Yannova Bouw project.

## 📋 Overzicht

De PR-Agent setup bestaat uit:
- **ESLint & Prettier**: Code quality tools voor lokale checks
- **Husky**: Pre-commit hooks voor automatische kwaliteitscontroles
- **PR-Agent**: AI-gedreven code reviews op GitHub
- **GitHub Actions**: Automatische CI/CD pipelines

## 🛠️ Lokale Installatie

### 1. Development Dependencies

Alle benodigde dependencies zijn geïnstalleerd:
```bash
npm install --save-dev husky lint-staged @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier
```

### 2. ESLint Configuratie

**Bestand: `.eslintrc.json`**
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

### 3. Prettier Configuratie

**Bestand: `.prettierrc`**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 4. Husky Pre-commit Hooks

**Bestand: `.husky/pre-commit`**
```bash
npm run lint
```

### 5. Lint-staged Configuratie

**Package.json script toegevoegd:**
```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit"
  }
}
```

## 🔧 GitHub Actions Setup

### 1. PR-Agent Workflow

**Bestand: `.github/workflows/pr-agent.yml`**
- Automatische code reviews bij nieuwe PR's
- Gebruikt Codium-ai/pr-agent GitHub Action
- Vereist `OPENAI_KEY` secret voor AI functionaliteit

### 2. CI/CD Workflow

**Bestand: `.github/workflows/ci.yml`**
- Lint checking bij elke push/PR
- TypeScript type checking
- Build test voor productie readiness

## ⚙️ PR-Agent Configuratie

**Bestand: `.pr-agent.toml`**
```toml
[config]
# Specifieke configuratie voor bouwbedrijf website

[pr_reviewer]
auto_review = true
project_type = "web_application"
language = "nl"
review_focus_areas = ["security", "performance", "maintainability", "best_practices"]

extra_instructions = """
Dit is een Next.js website voor een bouwbedrijf (Yannova Bouw).
Focus op:
- SEO optimalisatie voor lokale bouwbedrijven
- Performance voor snelle laadtijden
- Security voor admin functionaliteiten
- Nederlandse bouwterminologie in comments
- TypeScript type safety
"""
```

## 🔑 Required Secrets

Voor volledige functionaliteit zijn deze GitHub secrets nodig:

### GitHub Repository Secrets:
1. `OPENAI_KEY` - Voor PR-Agent AI reviews (optioneel)
2. `GITHUB_TOKEN` - Automatisch beschikbaar

## 🚀 Gebruik

### Lokale Development:
```bash
# Lint code
npm run lint

# Fix linting issues automatisch
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting automatisch
npm run format

# Type checking
npm run type-check
```

### Git Workflow:
```bash
# Maak changes
git add .

# Pre-commit hooks voeren automatisch kwaliteitscontroles uit
git commit -m "feat: beschrijf je changes"

# Push naar GitHub
git push origin feature-branch
```

### Pull Request Process:
1. **Automatische checks**: ESLint, Prettier, TypeScript
2. **PR-Agent review**: AI-gedreven code review (als OPENAI_KEY ingesteld)
3. **Manual review**: Team review van changes
4. **Merge**: Na goedkeuring

## 🎯 Features

### Automatische Code Review:
- ✅ Security vulnerabilities detecteren
- ✅ Performance optimalisaties voorstellen
- ✅ Code maintainability verbeteren
- ✅ Best practices afdwingen
- ✅ Nederlandse bouwcontext begrijpen

### Kwaliteitscontroles:
- ✅ ESLint voor code kwaliteit
- ✅ Prettier voor consistente formatting
- ✅ TypeScript voor type safety
- ✅ Pre-commit hooks voor lokale checks

## 🔧 Troubleshooting

### Veelvoorkomende Problemen:

**ESLint errors:**
```bash
npm run lint:fix  # Automatisch fixen
# Of handmatig oplossen
```

**Prettier formatting issues:**
```bash
npm run format  # Automatisch formatteren
```

**TypeScript errors:**
```bash
npm run type-check  # Type checking
```

**NextAuth.js problemen:**
- Controleer environment variables
- Restart development server na config wijzigingen

## 📚 Referenties

- [PR-Agent Documentatie](https://github.com/Codium-ai/pr-agent)
- [ESLint Configuratie](https://eslint.org/docs/user-guide/configuring)
- [Prettier Configuratie](https://prettier.io/docs/en/configuration.html)
- [Husky Git Hooks](https://typicode.github.io/husky/)

## 🎉 Volgende Stappen

1. **OpenAI API Key instellen** voor AI-gedreven reviews
2. **Team training** op nieuwe workflow
3. **Continue monitoring** van code kwaliteit metrics
4. **Fine-tuning** van PR-Agent configuratie gebaseerd op feedback

---

🏗️ **Yannova Bouw** - *Van idee tot realisatie met kwaliteitsgarantie*
