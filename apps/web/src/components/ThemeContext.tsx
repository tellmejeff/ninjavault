'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getThemeOptions } from '../theme';
import { CssBaseline, Box } from '@mui/material';

type ColorMode = 'light' | 'dark';

interface ThemeContextType {
  toggleColorMode: () => void;
  mode: ColorMode;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export const useColorMode = () => useContext(ThemeContext);

export const ThemeClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ColorMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('themeMode') as ColorMode;
    let initialMode: ColorMode = 'light';
    if (savedMode) {
      initialMode = savedMode;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialMode = 'dark';
    }
    setMode(initialMode);
    document.documentElement.setAttribute('data-theme', initialMode);
    document.documentElement.style.colorScheme = initialMode;
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          document.documentElement.setAttribute('data-theme', newMode);
          document.documentElement.style.colorScheme = newMode;
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          bgcolor: 'var(--background-default)',
          color: 'var(--text-primary)',
          minHeight: '100vh',
        }}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
