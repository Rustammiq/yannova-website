#!/usr/bin/env node

/**
 * Yannova Home Page Performance & SEO Analysis
 * Manual analysis based on HTML output
 */

const fs = require('fs');

async function analyzeHomePage() {
  console.log('🔍 YANNOVA HOME PAGE ANALYSIS\n');
  console.log('=' .repeat(50));

  try {
    // Read the HTML output from curl
    const html = fs.readFileSync('/Users/innovars_lab/Desktop/yannova-website/homepage-output.html', 'utf8');

    // Basic metrics
    const metrics = {
      totalSize: Buffer.byteLength(html, 'utf8'),
      imageCount: (html.match(/<img/g) || []).length,
      scriptCount: (html.match(/<script/g) || []).length,
      linkCount: (html.match(/<link/g) || []).length,
      metaCount: (html.match(/<meta/g) || []).length,
      h1Count: (html.match(/<h1/g) || []).length,
      h2Count: (html.match(/<h2/g) || []).length,
      title: html.match(/<title>(.*?)<\/title>/)?.[1] || '',
      description: html.match(/<meta name="description" content="(.*?)"/)?.[1] || '',
      canonicalUrl: html.match(/<link rel="canonical" href="(.*?)"/)?.[1] || '',
      structuredData: (html.match(/<script type="application\/ld\+json">/g) || []).length,
      heroImage: html.includes('hero-construction.jpg'),
      logoImage: html.includes('logo-yannova.png'),
      lazyLoading: html.includes('loading="lazy"'),
      nextImage: html.includes('data-nimg'),
      fontPreloading: html.includes('as="font"')
    };

    console.log('📊 BASIC METRICS:');
    console.log(`Total HTML Size: ${Math.round(metrics.totalSize / 1024)}KB`);
    console.log(`Images: ${metrics.imageCount}`);
    console.log(`Scripts: ${metrics.scriptCount}`);
    console.log(`Stylesheets: ${metrics.linkCount}`);
    console.log(`Meta Tags: ${metrics.metaCount}`);
    console.log(`H1 Tags: ${metrics.h1Count}`);
    console.log(`H2 Tags: ${metrics.h2Count}`);

    console.log('\n🔍 SEO ANALYSIS:');
    console.log(`Title: ${metrics.title.length > 50 ? '✅' : '⚠️'} "${metrics.title}" (${metrics.title.length} chars)`);
    console.log(`Meta Description: ${metrics.description.length > 120 ? '✅' : '⚠️'} (${metrics.description.length} chars)`);
    console.log(`Canonical URL: ${metrics.canonicalUrl ? '✅' : '❌'} ${metrics.canonicalUrl}`);
    console.log(`Structured Data: ${metrics.structuredData > 0 ? '✅' : '⚠️'} ${metrics.structuredData} schema(s)`);

    console.log('\n⚡ PERFORMANCE ANALYSIS:');
    console.log(`Hero Image: ${metrics.heroImage ? '✅' : '❌'} Present`);
    console.log(`Logo Image: ${metrics.logoImage ? '✅' : '❌'} Present`);
    console.log(`Lazy Loading: ${metrics.lazyLoading ? '✅' : '❌'} Used`);
    console.log(`Next.js Images: ${metrics.nextImage ? '✅' : '❌'} Used`);
    console.log(`Font Preloading: ${metrics.fontPreloading ? '✅' : '❌'} Used`);

    console.log('\n🎯 RECOMMENDATIONS:');

    const recommendations = [];

    // Performance recommendations
    if (metrics.totalSize > 100 * 1024) { // 100KB
      recommendations.push('⚠️  HTML size is large - consider code splitting');
    }

    if (metrics.imageCount > 10) {
      recommendations.push('⚠️  Many images - consider lazy loading for below-fold images');
    }

    if (!metrics.heroImage) {
      recommendations.push('❌  Missing hero image - add background image for visual impact');
    }

    if (!metrics.lazyLoading) {
      recommendations.push('⚠️  No lazy loading detected - add loading="lazy" to images');
    }

    if (!metrics.nextImage) {
      recommendations.push('⚠️  Not using Next.js Image component - consider upgrading for optimization');
    }

    // SEO recommendations
    if (metrics.title.length < 30 || metrics.title.length > 60) {
      recommendations.push('⚠️  Title length not optimal (30-60 chars recommended)');
    }

    if (metrics.description.length < 120 || metrics.description.length > 160) {
      recommendations.push('⚠️  Meta description length not optimal (120-160 chars recommended)');
    }

    if (metrics.h1Count !== 1) {
      recommendations.push('⚠️  Should have exactly 1 H1 tag for SEO');
    }

    if (metrics.h2Count < 3) {
      recommendations.push('ℹ️  Consider adding more H2 tags for content structure');
    }

    if (!metrics.canonicalUrl) {
      recommendations.push('❌  Missing canonical URL - add for SEO');
    }

    if (metrics.structuredData === 0) {
      recommendations.push('⚠️  No structured data found - consider adding JSON-LD schema');
    }

    if (recommendations.length === 0) {
      console.log('✅ No major issues detected! Great job!');
    } else {
      recommendations.forEach(rec => console.log(rec));
    }

    console.log('\n📈 PRIORITY IMPROVEMENTS:');

    const priorityImprovements = [
      '1. ✅ Add lazy loading to below-fold images',
      '2. ✅ Optimize image sizes and formats (WebP)',
      '3. ✅ Implement proper heading hierarchy (H1 → H2 → H3)',
      '4. ✅ Add more internal linking between sections',
      '5. ✅ Consider adding a FAQ section for SEO',
      '6. ✅ Add alt text to all images',
      '7. ✅ Implement proper meta robots tags',
      '8. ✅ Add Open Graph and Twitter Card tags',
      '9. ✅ Consider adding a sitemap.xml',
      '10. ✅ Implement proper canonical URLs'
    ];

    priorityImprovements.forEach(improvement => console.log(improvement));

    console.log('\n🏆 FINAL SCORE:');
    const score = Math.max(0, 100 - (recommendations.length * 5));
    console.log(`Overall Grade: ${score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D'}+ (${score}/100)`);

  } catch (error) {
    console.error('❌ Error analyzing home page:', error.message);
  }
}

// Save HTML output first
const { execSync } = require('child_process');
try {
  execSync('curl -s http://localhost:3000 > /Users/innovars_lab/Desktop/yannova-website/homepage-output.html');
  analyzeHomePage();
} catch (error) {
  console.error('❌ Could not fetch home page:', error.message);
}
