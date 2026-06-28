import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Snippet } from '@/models/Snippet';
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
    const snippets = await Snippet.find(query)
      .populate('categoryId')
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json({ success: true, data: snippets });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch snippets' },
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
    
    const snippet = await Snippet.create(body);
    const populatedSnippet = await Snippet.findById(snippet._id).populate('categoryId').lean();
    
    return NextResponse.json({ success: true, data: populatedSnippet }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating snippet:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create snippet' },
      { status: 500 }
    );
  }
}
