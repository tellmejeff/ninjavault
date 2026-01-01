'use client';

import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import NextLink from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '500px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          component={NextLink}
          href="/"
          variant="contained"
          size="large"
          sx={{ borderRadius: 2, px: 4 }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}
