import { NextResponse } from 'next/server';
import { getUsers } from '@ninjavault/users';

export async function GET() {
  try {
    const users = await getUsers();
    // Don't send password hashes to the frontend
    const safeUsers = users.map(({ passwordHash, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
