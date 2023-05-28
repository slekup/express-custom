'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem={false}
      defaultTheme={'dark'}
      themes={[
        'light',
        'dark',
        'facebook',
        'slack',
        'stack-overflow',
        'raspberry',
        'brave',
        'terminal',
        'high-contrast-light',
        'high-contrast-dark',
      ]}
      attribute={'data-theme'}
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
}
