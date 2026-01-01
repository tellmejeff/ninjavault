'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link, IconButton } from '@mui/material';
import NextLink from 'next/link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from './ThemeContext';
import ninjaIcon from '../images/ninja-vault-icon.svg';

const Navbar = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Box
          component={NextLink}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            mr: 4,
            flexGrow: 0,
          }}
        >
          <Box
            component="img"
            src={typeof ninjaIcon === 'string' ? ninjaIcon : (ninjaIcon as any).src}
            alt="NinjaVault Logo"
            sx={{
              width: 64,
              height: 64,
              mr: 1,
              filter: 'var(--logo-filter)',
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold' }}
          >
            NinjaVault
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Link component={NextLink} href="/blogs" color="inherit" underline="none">
            Blogs
          </Link>
          <Link component={NextLink} href="/courses" color="inherit" underline="none">
            Courses
          </Link>
          <Link component={NextLink} href="/community" color="inherit" underline="none">
            Community
          </Link>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ mr: 1 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button component={NextLink} href="/login" color="inherit">
            Login
          </Button>
          <Button component={NextLink} href="/register" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
