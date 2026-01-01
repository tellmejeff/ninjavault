import { createUser, verifyUser, getUsers, saveUsers } from './users';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('users', () => {
  const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

  beforeEach(async () => {
    // Clean up or initialize the test database
    try {
      await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
      await fs.writeFile(DB_PATH, JSON.stringify([]));
    } catch (e) {
      // Ignore
    }
  });

  it('should create a new user and verify it', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const name = 'Test User';

    const user = await createUser(email, password, name);
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
    expect(user.passwordHash).toBeDefined();
    expect(user.passwordHash).not.toBe(password);

    const verifiedUser = await verifyUser(email, password);
    expect(verifiedUser).not.toBeNull();
    expect(verifiedUser?.id).toBe(user.id);

    const invalidUser = await verifyUser(email, 'wrongpassword');
    expect(invalidUser).toBeNull();
  });

  it('should not allow creating duplicate users', async () => {
    const email = 'dup@example.com';
    await createUser(email, 'password');
    await expect(createUser(email, 'password')).rejects.toThrow('User already exists');
  });
});
