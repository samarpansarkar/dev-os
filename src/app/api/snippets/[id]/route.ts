import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Snippet } from '@/models/Snippet';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const body = await req.json();

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: 'after', runValidators: true }
    ).populate('categoryId');

    if (!updatedSnippet) {
      return NextResponse.json(
        { success: false, error: 'Snippet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedSnippet });
  } catch (error: any) {
    console.error('Error updating snippet:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update snippet' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;

    const deletedSnippet = await Snippet.findByIdAndDelete(id);

    if (!deletedSnippet) {
      return NextResponse.json(
        { success: false, error: 'Snippet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error('Error deleting snippet:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete snippet' },
      { status: 500 }
    );
  }
}
