'use client';

import React, { useState, useMemo } from 'react';
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
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const MOCK_COURSES = [
  { id: 1, title: 'Next.js Fundamentals', level: 'Beginner', category: 'Frontend', duration: '4h 30m', description: 'Learn the basics of Next.js, including routing, data fetching, and styling.' },
  { id: 2, title: 'Advanced React Patterns', level: 'Advanced', category: 'Frontend', duration: '6h 15m', description: 'Master complex React patterns like compound components and render props.' },
  { id: 3, title: 'Node.js & Express Mastery', level: 'Intermediate', category: 'Backend', duration: '8h 00m', description: 'Build scalable backend applications with Node.js and Express.' },
  { id: 4, title: 'PostgreSQL Deep Dive', level: 'Intermediate', category: 'Backend', duration: '5h 45m', description: 'Master database design, indexing, and performance optimization.' },
  { id: 5, title: 'UI/UX for Developers', level: 'Beginner', category: 'Design', duration: '3h 20m', description: 'Learn the fundamentals of design to build beautiful web applications.' },
  { id: 6, title: 'Fullstack SaaS Boilerplate', level: 'Intermediate', category: 'Fullstack', duration: '12h 00m', description: 'Build a complete SaaS product from scratch using the modern stack.' },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const groupedCourses = useMemo(() => {
    const groups: { [key: string]: typeof MOCK_COURSES } = {};
    filteredCourses.forEach(course => {
      if (!groups[course.category]) {
        groups[course.category] = [];
      }
      groups[course.category].push(course);
    });
    return groups;
  }, [filteredCourses]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Courses
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Interactive courses to take your skills to the next level.
      </Typography>

      <Box sx={{ mb: 6, mt: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses by title, category, or description..."
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

      {Object.keys(groupedCourses).length > 0 ? (
        Object.entries(groupedCourses).map(([category, courses]) => (
          <Box key={category} sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
              {category}
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={4}>
              {courses.map((course) => (
                <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 140,
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.contrastText'
                      }}
                    >
                      <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip label={course.level} size="small" variant="outlined" />
                        <Typography variant="caption" color="text.secondary">
                          {course.duration}
                        </Typography>
                      </Box>
                      <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button variant="contained" fullWidth>Enroll Now</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No courses found matching "{searchTerm}".
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
