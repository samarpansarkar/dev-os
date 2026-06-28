import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Optional query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const visibility = searchParams.get('visibility');
    const tag = searchParams.get('tag');

    let query: any = {};
    if (status) query.status = status;
    if (visibility) query.visibility = visibility;
    if (tag) query.tags = tag;

    const projects = await Project.find(query).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const project = await Project.create(body);
    
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
