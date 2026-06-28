import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Vault } from '@/models/Vault';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const envFileId = searchParams.get('envFileId');

    let query: any = {};
    if (projectId) query.projectId = projectId;
    if (envFileId) query.envFileId = envFileId;

    const variables = await Vault.find(query).sort({ createdAt: 1 });

    return NextResponse.json({ success: true, data: variables });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const variable = await Vault.create(body);
    
    return NextResponse.json({ success: true, data: variable }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
