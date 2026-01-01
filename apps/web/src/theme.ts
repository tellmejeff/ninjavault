'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  cssVariables: true,
  palette: {
    mode,
    primary: {
      main: 'var(--primary-main)',
      light: 'var(--primary-light)',
      dark: 'var(--primary-dark)',
      contrastText: 'var(--primary-contrast-text)',
    },
    secondary: {
      main: 'var(--secondary-main)',
      light: 'var(--secondary-light)',
      dark: 'var(--secondary-dark)',
      contrastText: 'var(--secondary-contrast-text)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
    },
    background: {
      default: 'var(--background-default)',
      paper: 'var(--background-paper)',
    },
    divider: 'var(--divider)',
    action: {
      hover: 'var(--action-hover)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--background-default)',
          color: 'var(--text-primary)',
        },
      },
    },
  },
});

const theme = createTheme(getThemeOptions('light'));

export default theme;
