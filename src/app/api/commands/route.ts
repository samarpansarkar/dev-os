import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Command } from '@/models/Command';
import { Category } from '@/models/Category';

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (categoryId && categoryId !== 'all') {
      query.categoryId = categoryId;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Populate category so we can display category name/icon
    const commands = await Command.find(query)
      .populate('categoryId')
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, data: commands });
  } catch (error) {
    console.error('Error fetching commands:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch commands' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Validate if category exists
    const categoryExists = await Category.findById(body.categoryId);
    if (!categoryExists) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }
    
    const command = await Command.create(body);
    const populatedCommand = await Command.findById(command._id).populate('categoryId').lean();
    
    return NextResponse.json({ success: true, data: populatedCommand }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating command:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create command' },
      { status: 500 }
    );
  }
}
