import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Category } from '@/models/Category';

const DEFAULT_CATEGORIES = [
  { name: 'Docker', description: 'Containerization commands', color: '#2496ED', icon: 'Box' },
  { name: 'Git', description: 'Version control commands', color: '#F05032', icon: 'GitBranch' },
  { name: 'Linux', description: 'System administration', color: '#FCC624', icon: 'Terminal' },
  { name: 'Next.js', description: 'React framework commands', color: '#000000', icon: 'Triangle' },
  { name: 'Kubernetes', description: 'Container orchestration', color: '#326CE5', icon: 'Network' },
];

export async function GET() {
  try {
    await connectDB();
    
    // Auto-seed if empty
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(DEFAULT_CATEGORIES);
    }

    const categories = await Category.find().sort({ name: 1 }).lean();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const category = await Category.create(body);
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create category' },
      { status: 500 }
    );
  }
}
