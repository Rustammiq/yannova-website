#!/usr/bin/env node

/**
 * Home Page Performance Analyzer
 * Analyzes the Yannova website home page for performance issues
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

async function analyzeHomePage() {
  console.log('🔍 Analyzing Yannova Home Page Performance...\n');

  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Enable performance monitoring
    await page.setViewport({ width: 1920, height: 1080 });

    // Start performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.performance.mark('page-start');
    });

    console.log('📊 Loading home page...');
    const response = await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for page to be fully loaded
    await page.waitForTimeout(2000);

    // Mark end of page load
    await page.evaluate(() => {
      window.performance.mark('page-end');
    });

    // Get performance metrics
    const performanceData = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      const resources = performance.getEntriesByType('resource');

      // Calculate metrics
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
      const cls = performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0);

      // Bundle analysis
      const bundleSizes = resources
        .filter(resource => resource.name.includes('.js') || resource.name.includes('.css'))
        .reduce((acc, resource) => {
          acc[resource.name] = {
            size: resource.transferSize || resource.encodedBodySize,
            loadTime: resource.responseEnd - resource.requestStart
          };
          return acc;
        }, {});

      // Image analysis
      const images = resources.filter(resource =>
        resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
      );

      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: fcp ? fcp.startTime : null,
        largestContentfulPaint: lcp ? lcp.startTime : null,
        cumulativeLayoutShift: cls,
        totalResources: resources.length,
        bundleSizes,
        imageCount: images.length,
        totalImageSize: images.reduce((sum, img) => sum + (img.transferSize || 0), 0),
        responseStatus: response.status()
      };
    });

    // Analyze results
    console.log('🚀 PERFORMANCE RESULTS:\n');
    console.log(`Load Time: ${Math.round(performanceData.loadTime)}ms`);
    console.log(`DOM Content Loaded: ${Math.round(performanceData.domContentLoaded)}ms`);
    console.log(`First Contentful Paint: ${performanceData.firstContentfulPaint ? Math.round(performanceData.firstContentfulPaint) + 'ms' : 'Not available'}`);
    console.log(`Largest Contentful Paint: ${performanceData.largestContentfulPaint ? Math.round(performanceData.largestContentfulPaint) + 'ms' : 'Not available'}`);
    console.log(`Cumulative Layout Shift: ${performanceData.cumulativeLayoutShift.toFixed(3)}`);
    console.log(`Total Resources: ${performanceData.totalResources}`);
    console.log(`Images: ${performanceData.imageCount} (${Math.round(performanceData.totalImageSize / 1024)}KB total)`);

    // Bundle analysis
    console.log('\n📦 BUNDLE ANALYSIS:');
    Object.entries(performanceData.bundleSizes).forEach(([name, data]) => {
      console.log(`  ${name.split('/').pop()}: ${Math.round(data.size / 1024)}KB (${Math.round(data.loadTime)}ms)`);
    });

    // Performance recommendations
    console.log('\n🎯 PERFORMANCE RECOMMENDATIONS:\n');

    const recommendations = [];

    if (performanceData.loadTime > 3000) {
      recommendations.push('⚠️  Load time is over 3 seconds - consider code splitting and lazy loading');
    }

    if (performanceData.firstContentfulPaint > 1800) {
      recommendations.push('⚠️  First Contentful Paint is slow - optimize critical CSS and fonts');
    }

    if (performanceData.largestContentfulPaint > 2500) {
      recommendations.push('⚠️  Largest Contentful Paint is slow - optimize images and reduce render-blocking resources');
    }

    if (performanceData.cumulativeLayoutShift > 0.1) {
      recommendations.push('⚠️  Layout shifts detected - add proper dimensions to images and avoid dynamic content insertion');
    }

    if (performanceData.totalImageSize > 2 * 1024 * 1024) {
      recommendations.push('⚠️  Large total image size - consider WebP format and proper image optimization');
    }

    if (Object.keys(performanceData.bundleSizes).length > 10) {
      recommendations.push('ℹ️  Many bundle files - consider bundling and code splitting');
    }

    if (recommendations.length === 0) {
      console.log('✅ No major performance issues detected!');
    } else {
      recommendations.forEach(rec => console.log(rec));
    }

    // SEO Analysis
    console.log('\n🔍 SEO ANALYSIS:');

    const seoData = await page.evaluate(() => {
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
      const h1Count = document.querySelectorAll('h1').length;
      const h2Count = document.querySelectorAll('h2').length;
      const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href || '';
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]').length;

      return {
        title,
        metaDescription,
        h1Count,
        h2Count,
        canonicalUrl,
        structuredData
      };
    });

    console.log(`Title: ${seoData.title.length > 60 ? '⚠️ ' : '✅ '}"${seoData.title}"`);
    console.log(`Meta Description: ${seoData.metaDescription.length > 160 ? '⚠️ ' : '✅ '}Length: ${seoData.metaDescription.length} chars`);
    console.log(`H1 Tags: ${seoData.h1Count === 1 ? '✅ ' : '⚠️ '}${seoData.h1Count} found`);
    console.log(`H2 Tags: ${seoData.h2Count >= 3 ? '✅ ' : 'ℹ️ '}${seoData.h2Count} found`);
    console.log(`Canonical URL: ${seoData.canonicalUrl ? '✅ ' : '⚠️ '}Configured`);
    console.log(`Structured Data: ${seoData.structuredData > 0 ? '✅ ' : '⚠️ '}${seoData.structuredData} schema(s) found`);

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      performance: performanceData,
      seo: seoData,
      recommendations
    };

    fs.writeFileSync('./performance-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Detailed report saved to performance-report.json');

  } catch (error) {
    console.error('❌ Error analyzing home page:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

analyzeHomePage();
