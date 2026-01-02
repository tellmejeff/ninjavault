import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeClientProvider } from '../components/ThemeContext';
import { AuthProvider } from '../components/AuthContext';
import './global.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'NinjaVault',
  description: 'NinjaVault Learning & Blogs Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('themeMode');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!mode && supportDarkMode) mode = 'dark';
                  if (!mode) mode = 'light';
                  document.documentElement.setAttribute('data-theme', mode);
                  document.documentElement.style.colorScheme = mode;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeClientProvider>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
          </ThemeClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
