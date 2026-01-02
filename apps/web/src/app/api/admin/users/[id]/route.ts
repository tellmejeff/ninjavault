import { NextResponse } from 'next/server';
import { updateUser } from '@ninjavault/users';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedUser = await updateUser(id, body);

    // Don't return password hash
    const { passwordHash, ...safeUser } = updatedUser as any;
    return NextResponse.json(safeUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
