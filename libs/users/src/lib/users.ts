import * as fs from 'fs/promises';
import * as path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

async function ensureDb() {
  const dir = path.dirname(DB_PATH);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
}

export async function getUsers(): Promise<User[]> {
  await ensureDb();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveUsers(users: User[]): Promise<void> {
  await ensureDb();
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  const users = await getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    email,
    passwordHash,
    name,
  };

  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email === email);
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return user;
}
