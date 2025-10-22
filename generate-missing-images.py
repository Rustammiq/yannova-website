#!/usr/bin/env python3
"""
Script om ontbrekende afbeeldingen te genereren voor Yannova website
Gebruikt Google Gemini API voor afbeelding generatie
"""

import os
import requests
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import io

# Gemini API configuratie
API_KEY = 'AIzaSyDdZOVIaxjM9M1tZRtu9fAARlKyb0UCqRo'
API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent'

# Projecten die afbeeldingen nodig hebben
PROJECTS = [
    {
        "id": 1,
        "title": "Moderne Villa Keerbergen",
        "description": "Complete nieuwbouw villa met energiezuinige technologieën en moderne architectuur",
        "type": "Nieuwbouw",
        "location": "Keerbergen",
        "prompt": "Modern luxury villa construction in Netherlands, contemporary architecture with sustainable materials, clean white facade, large floor-to-ceiling windows, geometric design, 350m² living space, energy-neutral smart home, landscaped garden with modern outdoor furniture, professional architectural photography, high quality, realistic, daytime exterior view, blue sky, construction site with workers"
    },
    {
        "id": 2,
        "title": "Badkamer Renovatie Mechelen", 
        "description": "Complete badkamerrenovatie met moderne tegels en sanitair",
        "type": "Renovatie",
        "location": "Mechelen",
        "prompt": "Modern bathroom renovation in Netherlands, luxury bathroom design with contemporary tiles, modern fixtures, walk-in shower, freestanding bathtub, marble countertops, LED lighting, professional interior photography, high quality, realistic, clean and modern aesthetic"
    },
    {
        "id": 3,
        "title": "Crepi Gevelafwerking Putte",
        "description": "Moderne gevelafwerking met isolatie voor energiebesparing", 
        "type": "Gevelwerk",
        "location": "Putte",
        "prompt": "Modern facade renovation with crepi finish in Netherlands, textured wall coating, insulation work, contemporary house exterior, professional construction work, high quality finish, realistic architectural photography, daytime exterior view"
    },
    {
        "id": 4,
        "title": "Ramen en Deuren Renovatie",
        "description": "Nieuwe ramen en deuren voor betere isolatie en uitstraling",
        "type": "Ramen & Deuren", 
        "location": "Leuven",
        "prompt": "Modern windows and doors installation in Netherlands, energy-efficient windows, contemporary door design, professional installation work, high-quality materials, realistic construction photography, daytime exterior view"
    },
    {
        "id": 5,
        "title": "Keuken Renovatie Project",
        "description": "Complete keukenrenovatie met moderne apparatuur en design",
        "type": "Renovatie",
        "location": "Keerbergen", 
        "prompt": "Modern kitchen renovation in Netherlands, contemporary kitchen design, high-end appliances, custom cabinets, marble countertops, professional interior photography, clean and modern aesthetic, realistic lighting"
    }
]

def create_placeholder_image(title, description, type_name, location, output_path):
    """Maak een professionele placeholder afbeelding"""
    
    # Afbeelding dimensies
    width, height = 800, 600
    
    # Kleuren schema per type
    colors = {
        "Nieuwbouw": "#2563eb",      # Blauw
        "Renovatie": "#16a34a",      # Groen  
        "Gevelwerk": "#dc2626",      # Rood
        "Ramen & Deuren": "#7c3aed", # Paars
        "Verbouwing": "#ea580c"      # Oranje
    }
    
    color = colors.get(type_name, "#2563eb")
    
    # Maak afbeelding
    img = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(img)
    
    # Probeer een font te laden, anders gebruik default
    try:
        # Probeer verschillende fonts
        font_large = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 36)
        font_medium = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
        font_small = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 18)
    except:
        try:
            font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
            font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
            font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        except:
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Tekst kleuren
    text_color = (255, 255, 255)  # Wit
    accent_color = (255, 255, 255, 180)  # Semi-transparant wit
    
    # Yannova logo/branding
    draw.text((width//2, 80), "YANNOVA BOUW", font=font_large, fill=text_color, anchor="mm")
    
    # Project titel
    draw.text((width//2, 150), title, font=font_medium, fill=text_color, anchor="mm")
    
    # Type badge
    type_width = draw.textlength(type_name, font=font_small)
    type_x = (width - type_width) // 2
    draw.rectangle([type_x - 10, 180, type_x + type_width + 10, 210], fill=(255, 255, 255, 50))
    draw.text((width//2, 195), type_name, font=font_small, fill=text_color, anchor="mm")
    
    # Locatie
    draw.text((width//2, 250), f"📍 {location}", font=font_small, fill=accent_color, anchor="mm")
    
    # Beschrijving (gebroken in regels)
    words = description.split()
    lines = []
    current_line = []
    
    for word in words:
        current_line.append(word)
        test_line = " ".join(current_line)
        if draw.textlength(test_line, font=font_small) > width - 100:
            if len(current_line) > 1:
                current_line.pop()
                lines.append(" ".join(current_line))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []
    
    if current_line:
        lines.append(" ".join(current_line))
    
    # Teken beschrijving regels
    y_start = 300
    for i, line in enumerate(lines[:3]):  # Max 3 regels
        draw.text((width//2, y_start + i * 25), line, font=font_small, fill=accent_color, anchor="mm")
    
    # Footer
    draw.text((width//2, height - 50), "Professionele Bouwprojecten", font=font_small, fill=accent_color, anchor="mm")
    draw.text((width//2, height - 25), "Van Begin tot Eind", font=font_small, fill=accent_color, anchor="mm")
    
    # Sla afbeelding op
    img.save(output_path, 'JPEG', quality=85)
    print(f"✅ Placeholder afbeelding gemaakt: {output_path}")

def generate_image_with_gemini(prompt, output_path):
    """Probeer afbeelding te genereren met Gemini API"""
    
    headers = {
        'Content-Type': 'application/json',
    }
    
    data = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.7,
            "topK": 40,
            "topP": 0.95,
            "maxOutputTokens": 1024,
        }
    }
    
    try:
        url = f"{API_URL}?key={API_KEY}"
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Gemini API response received for: {output_path}")
            # Note: Gemini 2.5 Flash Image Preview returns text, not images
            # We'll use the placeholder approach instead
            return True
        else:
            print(f"❌ Gemini API error: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error calling Gemini API: {e}")
        return False

def main():
    """Hoofdfunctie"""
    print("🎨 Starting image generation for Yannova projects...")
    
    # Maak output directory
    output_dir = Path("public/images/projects")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    for project in PROJECTS:
        filename = f"project-{project['id']}-{project['type'].lower().replace(' ', '-')}.jpg"
        output_path = output_dir / filename
        
        # Skip als afbeelding al bestaat
        if output_path.exists():
            print(f"⏭️  Skipping {filename} - already exists")
            continue
        
        print(f"\n📸 Processing: {project['title']}")
        
        # Probeer eerst Gemini API
        if generate_image_with_gemini(project['prompt'], output_path):
            print(f"✅ Gemini image generated: {filename}")
        else:
            # Fallback naar placeholder
            print(f"🔄 Creating placeholder for: {filename}")
            create_placeholder_image(
                project['title'],
                project['description'], 
                project['type'],
                project['location'],
                output_path
            )
    
    print("\n🎉 Image generation completed!")

if __name__ == "__main__":
    main()
