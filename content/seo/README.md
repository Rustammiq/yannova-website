# SEO content en checklist

Deze map bevat NL-BE SEO-content en JSON-LD snippets voor dienstenpagina's.

Bestanden
- `content/seo/*.md` — SEO-pagina's met frontmatter, body, FAQ en alt-teksten.
- `content/seo/jsonld/*.json` — JSON-LD snippets per service (Service + LocalBusiness).

Aanbevolen on-page checklist

1. H-tag structuur
   - Gebruik één H1 per pagina (de title in frontmatter).
   - Gebruik H2 voor secties (Waarom kiezen, FAQ, Diensten).

2. Meta tags
   - Zorg dat `meta_title` ≤ 60 karakters en `meta_description` ≤ 160 karakters.

3. Afbeeldingen
   - Gebruik geoptimaliseerde afbeeldingen (webp waar mogelijk).
   - Voeg alt-teksten toe zoals in frontmatter.
   - Schaal afbeeldingen naar juiste afmetingen.

4. Structured Data
   - Plaats relevante JSON-LD (content/seo/jsonld/*.json) in de <head> van elke dienstenpagina.

5. Interne links
   - Link terug naar de homepage en relevante diensten-pagina's.

6. Mobiel en performance
   - Test laadtijden (Lighthouse) en optimaliseer afbeeldingen en caching.

7. Canonical & Sitemap
   - Voeg canonical-tag toe en update sitemap.xml met de nieuwe slugs.

8. CTA's
   - Plaats duidelijke call-to-actions: offerte aanvragen, contact, gratis advies.

9. Local SEO
   - Voeg bedrijfsadres en telefoon op contactpagina toe en in JSON-LD.

10. Review & Test
   - Valideer JSON-LD via Google Rich Results test.
   - Controleer meta tags en page previews (Facebook, Twitter card).
