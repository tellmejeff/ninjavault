'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MOCK_BLOGS = [
  { id: 1, title: 'My Ninja Journey', author: 'Jeff', description: 'The beginning of NinjaVault and my personal journey in tech.', category: 'Personal', date: '2025-12-01' },
  { id: 2, title: 'Mastering React 19', author: 'Alice', description: 'Deep dive into the latest React features and hooks.', category: 'Tech', date: '2025-12-15' },
  { id: 3, title: 'Next.js vs Remix in 2026', author: 'Bob', description: 'Choosing the right framework for your next big project.', category: 'Tech', date: '2025-12-20' },
  { id: 4, title: 'Tailwind CSS Best Practices', author: 'Charlie', description: 'How to write clean and maintainable Tailwind CSS code.', category: 'Design', date: '2025-12-25' },
  { id: 5, title: 'Optimizing PostgreSQL Queries', author: 'Dana', description: 'Tips and tricks for making your database lightning fast.', category: 'Backend', date: '2025-12-28' },
  { id: 6, title: 'AI Integration Strategies', author: 'Eve', description: 'How to effectively integrate LLMs into your web applications.', category: 'AI', date: '2025-12-30' },
  { id: 7, title: 'TypeScript 5.x Features', author: 'Frank', description: 'Exploring the newest additions to TypeScript.', category: 'Tech', date: '2026-01-01' },
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shuffledBlogs, setShuffledBlogs] = useState(MOCK_BLOGS.slice(1));

  useEffect(() => {
    // Shuffle blogs excluding the fixed one (ID 1)
    const otherBlogs = [...MOCK_BLOGS].filter(blog => blog.id !== 1);
    for (let i = otherBlogs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherBlogs[i], otherBlogs[j]] = [otherBlogs[j], otherBlogs[i]];
    }
    setShuffledBlogs(otherBlogs);
  }, []);

  const fixedBlog = MOCK_BLOGS.find(blog => blog.id === 1);

  const filteredBlogs = useMemo(() => {
    const allBlogs = fixedBlog ? [fixedBlog, ...shuffledBlogs] : shuffledBlogs;
    const filtered = allBlogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  }, [searchTerm, shuffledBlogs, fixedBlog]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Blogs
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Insights, tutorials, and stories from the NinjaVault community.
      </Typography>

      <Box sx={{ mb: 6, mt: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search blogs by title, author, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredBlogs.length > 0 ? (
        <Grid container spacing={4}>
          {filteredBlogs.map((blog) => (
            <Grid key={blog.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: blog.id === 1 ? '2px solid' : '1px solid',
                  borderColor: blog.id === 1 ? 'primary.main' : 'divider',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                {blog.id === 1 && (
                  <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="overline" color="text.secondary">
                    {blog.category} • {blog.date}
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {blog.description}
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    By {blog.author}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button size="small" color="primary">Read More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No blogs found matching "{searchTerm}".
          </Typography>
          <Button
            variant="text"
            onClick={() => setSearchTerm('')}
            sx={{ mt: 2 }}
          >
            Clear Search
          </Button>
        </Box>
      )}
    </Container>
  );
}
