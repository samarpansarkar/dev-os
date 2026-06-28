import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Note } from '@/models/Note';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const folder = searchParams.get('folder');

    const query: any = {};
    if (projectId) query.projectId = projectId;
    if (folder && folder !== 'all') query.folder = folder;

    const notes = await Note.find(query).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, data: notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required' }, { status: 400 });
    }

    const note = await Note.create(body);

    return NextResponse.json({ success: true, data: note }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
