import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Vault } from '@/models/Vault';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { projectId, variables } = await request.json();

    if (!projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required' }, { status: 400 });
    }

    // To sync, we can just delete all existing variables for this project
    // and recreate them from the provided array.
    await Vault.deleteMany({ projectId });

    if (variables && variables.length > 0) {
      // Ensure all variables have the projectId attached
      const docs = variables.map((v: any) => ({
        ...v,
        projectId
      }));
      await Vault.insertMany(docs);
    }
    
    return NextResponse.json({ success: true, message: 'Vault synced successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
