'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NextLink from 'next/link';

const CATEGORIES = [
  'Tech',
  'Personal',
  'Design',
  'Backend',
  'AI',
  'Lifestyle',
  'Career',
  'Tutorial',
  'News',
];

export default function CreateBlogPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          authorId: user.id,
          authorName: user.name || user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      console.log('Blog created successfully');
      setSuccess(true);

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/blogs');
      }, 2000);
    } catch (error) {
      console.error('Error creating blog:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button
        component={NextLink}
        href="/blogs"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4 }}
      >
        Back to Blogs
      </Button>

      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Create New Blog
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Share your thoughts, knowledge, and experiences with the NinjaVault community.
      </Typography>

      <Paper elevation={0} sx={{ p: 4, mt: 4, border: '1px solid', borderColor: 'divider' }}>
        {success ? (
          <Alert severity="success">
            Blog post created successfully! Redirecting you back to the blogs page...
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                label="Blog Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Give your blog a catchy title"
              />
              <TextField
                required
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe what your blog is about"
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Blog'}
                </Button>
              </Box>
            </Stack>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
