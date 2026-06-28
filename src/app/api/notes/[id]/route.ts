import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Note } from '@/models/Note';

export async function PUT(
  request: Request,
  { params }: any
) {
  try {
    await connectDB();
    const body = await request.json();
    
    // In Next.js 15 params is a Promise
    const id = params.id ?? (await params).id;
    
    const note = await Note.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: note });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: any
) {
  try {
    await connectDB();
    
    const id = params.id ?? (await params).id;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
