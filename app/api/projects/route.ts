import { NextRequest, NextResponse } from 'next/server';

// Simulated database - in production, use a real database
let projects = [
  {
    id: "1",
    title: "Moderne Villa Keerbergen",
    description: "Complete nieuwbouw villa met energiezuinige technologieën en moderne architectuur",
    location: "Keerbergen",
    type: "Nieuwbouw",
    status: "completed",
    budget: "€450.000",
    images: ["/images/projects/project-1-villa.jpg"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Badkamer Renovatie Mechelen",
    description: "Complete badkamerrenovatie met moderne tegels en sanitair",
    location: "Mechelen",
    type: "Renovatie",
    status: "in-progress",
    budget: "€25.000",
    images: ["/images/projects/project-4-bathroom.jpg"],
    createdAt: "2024-02-01",
    updatedAt: "2024-02-10",
  },
  {
    id: "3",
    title: "Crepi Gevelafwerking Putte",
    description: "Moderne gevelafwerking met isolatie voor energiebesparing",
    location: "Putte",
    type: "Gevelwerk",
    status: "planning",
    budget: "€18.500",
    images: ["/images/projects/project-7-crepi.jpg"],
    createdAt: "2024-02-15",
    updatedAt: "2024-02-15",
  },
];

export async function GET() {
  try {
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProject = {
      id: Date.now().toString(),
      ...body,
      images: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    
    projects.unshift(newProject);
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    
    projects = projects.filter(project => project.id !== id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
