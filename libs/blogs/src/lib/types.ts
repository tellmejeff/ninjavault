export interface Blog {
  id: string;
  title: string;
  authorId: string;
  authorName: string; // Storing name for easier display
  description: string;
  category: string;
  createdAt: string;
}

export interface BlogEntry {
  id: string;
  blogId: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
