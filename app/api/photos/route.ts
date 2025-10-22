import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Simulated database voor foto's
let photos = [
  {
    id: "1",
    filename: "project-1-villa.jpg",
    url: "/images/projects/project-1-villa.jpg",
    title: "Moderne Villa Nieuwbouw",
    description: "Prachtig nieuwbouwproject van een moderne villa met strakke lijnen en hoogwaardige afwerking",
    alt: "Moderne villa nieuwbouw project",
    category: "projects",
    tags: ["villa", "nieuwbouw", "modern", "keerbergen"],
    size: 2048000,
    dimensions: { width: 1920, height: 1080 },
    uploadedAt: "2024-02-15",
    aiGenerated: false,
    projectId: "1"
  },
  {
    id: "2",
    filename: "project-4-bathroom.jpg",
    url: "/images/projects/project-4-bathroom.jpg",
    title: "Badkamer Renovatie",
    description: "Complete badkamerrenovatie met moderne tegels en sanitair",
    alt: "Badkamer renovatie project",
    category: "projects",
    tags: ["badkamer", "renovatie", "tegels", "sanitair"],
    size: 1536000,
    dimensions: { width: 1600, height: 1200 },
    uploadedAt: "2024-02-10",
    aiGenerated: false,
    projectId: "2"
  },
  {
    id: "3",
    filename: "hero-construction.jpg",
    url: "/images/hero-construction.jpg",
    title: "Hero Afbeelding",
    description: "Hoofdafbeelding voor de homepage",
    alt: "Bouwproject in uitvoering",
    category: "hero",
    tags: ["hero", "bouw", "constructie"],
    size: 1024000,
    dimensions: { width: 1920, height: 1080 },
    uploadedAt: "2024-01-01",
    aiGenerated: false
  },
  {
    id: "4",
    filename: "logo-yannova.png",
    url: "/images/logo-yannova.png",
    title: "Yannova Logo",
    description: "Bedrijfslogo van Yannova Bouw",
    alt: "Yannova Bouw logo",
    category: "hero",
    tags: ["logo", "branding"],
    size: 512000,
    dimensions: { width: 600, height: 300 },
    uploadedAt: "2024-01-01",
    aiGenerated: false
  },
  {
    id: "5",
    filename: "gallery-nieuwbouw-1.jpg",
    url: "/images/gallery/nieuwbouw-gallery/gallery-nieuwbouw-1.jpg",
    title: "Nieuwbouw Galerij 1",
    description: "Moderne nieuwbouw projecten",
    alt: "Nieuwbouw project galerij",
    category: "gallery",
    tags: ["nieuwbouw", "galerij", "modern"],
    size: 1536000,
    dimensions: { width: 1600, height: 1200 },
    uploadedAt: "2024-02-01",
    aiGenerated: false
  },
  {
    id: "6",
    filename: "gallery-crepi-1.jpg",
    url: "/images/gallery/crepi-gallery/gallery-crepi-1.jpg",
    title: "Crepi Galerij 1",
    description: "Crepi gevelafwerking projecten",
    alt: "Crepi gevelafwerking galerij",
    category: "gallery",
    tags: ["crepi", "gevelafwerking", "galerij"],
    size: 1536000,
    dimensions: { width: 1600, height: 1200 },
    uploadedAt: "2024-02-01",
    aiGenerated: false
  }
];

export async function GET() {
  try {
    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const alt = formData.get('alt') as string;
    const tags = formData.get('tags') as string;
    const projectId = formData.get('projectId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Maak directory als deze niet bestaat
    const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Genereer unieke filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filename = `upload-${timestamp}.${fileExtension}`;
    const filepath = join(uploadDir, filename);

    // Converteer file naar buffer en sla op
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Maak nieuwe photo entry
    const newPhoto = {
      id: timestamp.toString(),
      filename: filename,
      url: `/images/uploads/${filename}`,
      title: title || alt || file.name.split('.')[0],
      description: description || '',
      alt: alt || file.name.split('.')[0],
      category: category || 'nieuwbouw',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      size: file.size,
      dimensions: { width: 1920, height: 1080 }, // Placeholder, zou uit EXIF data kunnen komen
      uploadedAt: new Date().toISOString().split('T')[0],
      aiGenerated: false,
      projectId: projectId || ""
    };

    photos.unshift(newPhoto);

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    
    const photoIndex = photos.findIndex(photo => photo.id === id);
    if (photoIndex === -1) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    photos[photoIndex] = { ...photos[photoIndex], ...updates };
    
    return NextResponse.json(photos[photoIndex]);
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { photoIds } = await request.json();
    
    if (!photoIds || !Array.isArray(photoIds) || photoIds.length === 0) {
      return NextResponse.json({ error: 'Photo IDs are required' }, { status: 400 });
    }
    
    const deletedCount = photos.length;
    photos = photos.filter(photo => !photoIds.includes(photo.id));
    const actualDeletedCount = deletedCount - photos.length;
    
    return NextResponse.json({ 
      success: true, 
      deletedCount: actualDeletedCount,
      message: `${actualDeletedCount} foto(s) verwijderd`
    });
  } catch (error) {
    console.error('Error deleting photos:', error);
    return NextResponse.json({ error: 'Failed to delete photos' }, { status: 500 });
  }
}
