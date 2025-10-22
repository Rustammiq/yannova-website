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
    alt: "Moderne villa nieuwbouw project",
    category: "nieuwbouw",
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
    alt: "Badkamer renovatie project",
    category: "renovatie",
    tags: ["badkamer", "renovatie", "tegels", "sanitair"],
    size: 1536000,
    dimensions: { width: 1600, height: 1200 },
    uploadedAt: "2024-02-10",
    aiGenerated: false,
    projectId: "2"
  }
];

export async function GET() {
  try {
    return NextResponse.json(photos);
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Photo ID is required' }, { status: 400 });
    }
    
    photos = photos.filter(photo => photo.id !== id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}
