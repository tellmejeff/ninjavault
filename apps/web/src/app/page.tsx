'use client';

import { Container, Box, Typography, Button, Grid, Paper, Stack } from '@mui/material';
import NextLink from 'next/link';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupIcon from '@mui/icons-material/Group';

export default function Index() {
  const features = [
    {
      title: 'Multimedia Blogs',
      description: 'High-quality articles with support for text, images, and embedded video streaming.',
      icon: <MenuBookIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Interactive Learning',
      description: 'Hands-on coding sessions with an embedded editor and real-time code validation.',
      icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Video Infrastructure',
      description: 'High-performance video streaming powered by industry-leading infrastructure.',
      icon: <VideoLibraryIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Community of Contributors',
      description: 'A platform for creators to share knowledge and build a professional portfolio.',
      icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'background.paper', pt: 12, pb: 10, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            NinjaVault
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            A hybrid platform combining professional blogs with an interactive learning environment.
            Learn, code, and grow with high-quality educational content.
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" size="large" component={NextLink} href="/register">
              Get Started for Free
            </Button>
            <Button variant="outlined" size="large" component={NextLink} href="/courses">
              Explore Courses
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }} maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'medium' }}>
          Platform Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 2,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'action.hover', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Interactive Learning Experience
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
            NinjaVault goes beyond passive reading. Our integrated development environment (IDE) powered by
            Monaco Editor allows you to write and validate code directly in your browser.
            Progress through guided paths and complete coding challenges to master new skills.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="secondary" size="large" component={NextLink} href="/subscription">
              Upgrade to Pro
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer-like section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} NinjaVault. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
