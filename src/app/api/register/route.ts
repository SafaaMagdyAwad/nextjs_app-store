import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 🚨 Replace this with real DB logic
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  // Pretend we're saving to DB...
  const userExists = false; // Check DB for existing user

  if (userExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // TODO: Save hashed password to DB
  // await db.users.insert({ email, hashedPassword })

  return NextResponse.json({ message: 'User registered successfully' }, { status: 200 });
}
