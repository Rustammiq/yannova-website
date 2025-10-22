#!/usr/bin/env node

/**
 * Script om ontbrekende afbeeldingen te genereren voor Yannova website
 * Gebruikt Gemini API voor afbeelding generatie
 */

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini API configuratie
const API_KEY = 'AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo';
const genAI = new GoogleGenerativeAI(API_KEY);

// Projecten die afbeeldingen nodig hebben
const projects = [
  {
    id: 1,
    title: "Moderne Villa Keerbergen",
    description: "Complete nieuwbouw villa met energiezuinige technologieën en moderne architectuur",
    type: "Nieuwbouw",
    location: "Keerbergen",
    prompt: "Modern luxury villa construction in Netherlands, contemporary architecture with sustainable materials, clean white facade, large floor-to-ceiling windows, geometric design, 350m² living space, energy-neutral smart home, landscaped garden with modern outdoor furniture, professional architectural photography, high quality, realistic, daytime exterior view, blue sky, construction site with workers"
  },
  {
    id: 2,
    title: "Badkamer Renovatie Mechelen", 
    description: "Complete badkamerrenovatie met moderne tegels en sanitair",
    type: "Renovatie",
    location: "Mechelen",
    prompt: "Modern bathroom renovation in Netherlands, luxury bathroom design with contemporary tiles, modern fixtures, walk-in shower, freestanding bathtub, marble countertops, LED lighting, professional interior photography, high quality, realistic, clean and modern aesthetic"
  },
  {
    id: 3,
    title: "Crepi Gevelafwerking Putte",
    description: "Moderne gevelafwerking met isolatie voor energiebesparing", 
    type: "Gevelwerk",
    location: "Putte",
    prompt: "Modern facade renovation with crepi finish in Netherlands, textured wall coating, insulation work, contemporary house exterior, professional construction work, high quality finish, realistic architectural photography, daytime exterior view"
  },
  {
    id: 4,
    title: "Ramen en Deuren Renovatie",
    description: "Nieuwe ramen en deuren voor betere isolatie en uitstraling",
    type: "Ramen & Deuren", 
    location: "Leuven",
    prompt: "Modern windows and doors installation in Netherlands, energy-efficient windows, contemporary door design, professional installation work, high-quality materials, realistic construction photography, daytime exterior view"
  },
  {
    id: 5,
    title: "Keuken Renovatie Project",
    description: "Complete keukenrenovatie met moderne apparatuur en design",
    type: "Renovatie",
    location: "Keerbergen", 
    prompt: "Modern kitchen renovation in Netherlands, contemporary kitchen design, high-end appliances, custom cabinets, marble countertops, professional interior photography, clean and modern aesthetic, realistic lighting"
  }
];

async function generateImage(prompt, outputPath) {
  try {
    console.log(`Generating image: ${outputPath}`);
    console.log(`Prompt: ${prompt}`);
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Note: Gemini image generation returns text, not binary data
    // We need to use a different approach for actual image generation
    console.log("Image generation response:", response.text());
    
    // For now, create a placeholder file
    const placeholderContent = `<!-- Generated placeholder for: ${prompt} -->`;
    fs.writeFileSync(outputPath.replace('.jpg', '.txt'), placeholderContent);
    
    console.log(`✅ Placeholder created: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error generating image for ${outputPath}:`, error.message);
  }
}

async function main() {
  console.log("🎨 Starting image generation for Yannova projects...");
  
  const outputDir = path.join(__dirname, 'public', 'images', 'projects');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const project of projects) {
    const outputPath = path.join(outputDir, `project-${project.id}-${project.type.toLowerCase().replace(' ', '-')}.jpg`);
    
    // Skip if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${outputPath} - already exists`);
      continue;
    }
    
    await generateImage(project.prompt, outputPath);
    
    // Add delay between requests to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log("🎉 Image generation completed!");
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateImage, projects };
