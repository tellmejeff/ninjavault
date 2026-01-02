import * as fs from 'fs/promises';
import * as path from 'path';
import { Blog, BlogEntry } from './types';

const BLOGS_DB_PATH = path.join(process.cwd(), 'data', 'blogs.json');
const ENTRIES_DB_PATH = path.join(process.cwd(), 'data', 'entries.json');

async function ensureDb(filePath: string) {
  const dir = path.dirname(filePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify([]));
  }
}

export async function getBlogs(): Promise<Blog[]> {
  await ensureDb(BLOGS_DB_PATH);
  const data = await fs.readFile(BLOGS_DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveBlogs(blogs: Blog[]): Promise<void> {
  await ensureDb(BLOGS_DB_PATH);
  await fs.writeFile(BLOGS_DB_PATH, JSON.stringify(blogs, null, 2));
}

export async function createBlog(blog: Omit<Blog, 'id' | 'createdAt'>): Promise<Blog> {
  const blogs = await getBlogs();
  const newBlog: Blog = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  await saveBlogs(blogs);
  return newBlog;
}

export async function findBlogById(id: string): Promise<Blog | undefined> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.id === id);
}

export async function getEntries(): Promise<BlogEntry[]> {
  await ensureDb(ENTRIES_DB_PATH);
  const data = await fs.readFile(ENTRIES_DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveEntries(entries: BlogEntry[]): Promise<void> {
  await ensureDb(ENTRIES_DB_PATH);
  await fs.writeFile(ENTRIES_DB_PATH, JSON.stringify(entries, null, 2));
}

export async function createEntry(entry: Omit<BlogEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogEntry> {
  const entries = await getEntries();
  const now = new Date().toISOString();
  const newEntry: BlogEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
  };
  entries.push(newEntry);
  await saveEntries(entries);
  return newEntry;
}

export async function getEntriesByBlogId(blogId: string): Promise<BlogEntry[]> {
  const entries = await getEntries();
  return entries.filter((e) => e.blogId === blogId);
}
