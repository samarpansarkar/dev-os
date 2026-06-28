import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Command } from '@/models/Command';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;
    const body = await req.json();

    const updatedCommand = await Command.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: 'after', runValidators: true }
    ).populate('categoryId');

    if (!updatedCommand) {
      return NextResponse.json(
        { success: false, error: 'Command not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCommand });
  } catch (error: any) {
    console.error('Error updating command:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update command' },
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

    const deletedCommand = await Command.findByIdAndDelete(id);

    if (!deletedCommand) {
      return NextResponse.json(
        { success: false, error: 'Command not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    console.error('Error deleting command:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete command' },
      { status: 500 }
    );
  }
}
