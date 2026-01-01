'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  InputAdornment,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const MOCK_TOPICS = [
  { id: 1, title: 'How to deploy Next.js to AWS?', author: 'user123', replies: 15, likes: 32, category: 'Deployment', lastActivity: '2h ago' },
  { id: 2, title: 'Best practices for state management in 2026', author: 'dev_ninja', replies: 42, likes: 128, category: 'Frontend', lastActivity: '5m ago' },
  { id: 3, title: 'Share your portfolio projects here!', author: 'moderator', replies: 156, likes: 512, category: 'Showcase', lastActivity: '1h ago' },
  { id: 4, title: 'Looking for a study buddy for the React course', author: 'newbie_dev', replies: 8, likes: 12, category: 'General', lastActivity: '1d ago' },
  { id: 5, title: 'Performance issues with Prisma on large datasets', author: 'backend_pro', replies: 24, likes: 45, category: 'Backend', lastActivity: '3h ago' },
  { id: 6, title: 'Announcement: New AI course launching next week!', author: 'jeff_admin', replies: 89, likes: 340, category: 'News', lastActivity: '10h ago' },
];

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = useMemo(() => {
    return MOCK_TOPICS.filter(topic =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Community
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Connect with other ninjas, ask questions, and share your knowledge.
      </Typography>

      <Box sx={{ mb: 6, mt: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search topics by title, category, or user..."
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
        <Button variant="contained" size="large" sx={{ whiteSpace: 'nowrap' }}>
          New Topic
        </Button>
      </Box>

      <Paper variant="outlined">
        <List sx={{ p: 0 }}>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <React.Fragment key={topic.id}>
                <ListItem
                  sx={{
                    py: 3,
                    px: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                    {topic.author[0].toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primaryTypographyProps={{ component: 'div' }}
                    secondaryTypographyProps={{ component: 'div' }}
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                        <Typography variant="h6" component="span" sx={{ fontWeight: 'medium' }}>
                          {topic.title}
                        </Typography>
                        <Chip label={topic.category} size="small" />
                      </Box>
                    }
                    secondary={
                      <Stack direction="row" spacing={{ xs: 1, sm: 3 }} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Posted by <strong>{topic.author}</strong> • {topic.lastActivity}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ChatBubbleOutlineIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">{topic.replies} replies</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ThumbUpOutlinedIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">{topic.likes} likes</Typography>
                        </Box>
                      </Stack>
                    }
                  />
                </ListItem>
                {index < filteredTopics.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography variant="h6" color="text.secondary">
                No topics found matching "{searchTerm}".
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
        </List>
      </Paper>
    </Container>
  );
}
