import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Vault } from '@/models/Vault';
import { VaultAudit } from '@/models/VaultAudit';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const variable = await Vault.findById(id);
    if (!variable) {
      return NextResponse.json({ success: false, error: 'Secret not found' }, { status: 404 });
    }

    await Vault.findByIdAndDelete(id);

    // Audit Log
    await VaultAudit.create({
      projectId: variable.projectId,
      targetKey: variable.key,
      action: 'deleted',
    });

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const variable = await Vault.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!variable) {
      return NextResponse.json({ success: false, error: 'Secret not found' }, { status: 404 });
    }

    // Audit Log
    await VaultAudit.create({
      projectId: variable.projectId,
      targetKey: variable.key,
      action: 'updated',
    });

    return NextResponse.json({ success: true, data: variable });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
