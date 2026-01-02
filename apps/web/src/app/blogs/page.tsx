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
import AddIcon from '@mui/icons-material/Add';
import NextLink from 'next/link';
import { useAuth } from '../../components/AuthContext';
import { Blog } from '@ninjavault/blogs';

export default function BlogsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
          Blogs
        </Typography>
        {user && (
          <Button
            component={NextLink}
            href="/blogs/create"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
          >
            Create Blog
          </Button>
        )}
      </Box>
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

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            Loading blogs...
          </Typography>
        </Box>
      ) : filteredBlogs.length > 0 ? (
        <Grid container spacing={4}>
          {filteredBlogs.map((blog) => (
            <Grid key={blog.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: blog.id === '1' ? '2px solid' : '1px solid',
                  borderColor: blog.id === '1' ? 'primary.main' : 'divider',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                {blog.id === '1' && (
                  <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="overline" color="text.secondary">
                    {blog.category} • {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {blog.description}
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary">
                    By {blog.authorName}
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
