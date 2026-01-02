import { NextResponse } from 'next/server';
import { createBlog, getBlogs } from '@ninjavault/blogs';

export async function POST(request: Request) {
  try {
    const { title, category, description, authorId, authorName } = await request.json();

    if (!title || !category || !description || !authorId || !authorName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBlog = await createBlog({
      title,
      category,
      description,
      authorId,
      authorName,
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
