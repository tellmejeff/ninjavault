import * as fs from 'fs/promises';
import * as path from 'path';
import bcrypt from 'bcryptjs';
import { UserRole, Privilege, ROLE_PRIVILEGES, getUserPrivileges, hasPrivilege } from './types';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  roles: UserRole[];
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

export async function createUser(email: string, password: string, name?: string, roles: UserRole[] = ['student']): Promise<User> {
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
    roles,
  };

  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email === email);
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.id === id);
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'passwordHash'>> & { password?: string }): Promise<User> {
  const users = await getUsers();
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const user = users[userIndex];

  if (updates.email && updates.email !== user.email) {
    if (users.find((u) => u.email === updates.email)) {
      throw new Error('Email already in use');
    }
    user.email = updates.email;
  }

  if (updates.name !== undefined) {
    user.name = updates.name;
  }

  if (updates.roles !== undefined) {
    user.roles = updates.roles;
  }

  if (updates.password) {
    user.passwordHash = await bcrypt.hash(updates.password, 10);
  }

  users[userIndex] = user;
  await saveUsers(users);
  return user;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return user;
}
