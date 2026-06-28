import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { VaultAudit } from '@/models/VaultAudit';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    let query: any = {};
    if (projectId) query.projectId = projectId;

    const logs = await VaultAudit.find(query).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, data: logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const log = await VaultAudit.create(body);
    return NextResponse.json({ success: true, data: log }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
