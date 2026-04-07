import type { ReactNode } from 'react';

// You will import your actual providers here as you build them.
// For now, I've commented them out so your app doesn't crash before they exist.
// import { ThemeProvider } from '@/hooks/useTheme';
// import { AuthProvider } from '@/features/auth/hooks/useAuth';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      {/* <ThemeProvider> */}
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
      {/* </ThemeProvider> */}
    </>
  );
};