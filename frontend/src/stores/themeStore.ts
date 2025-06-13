import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      
      toggleDarkMode: () => {
        set((state) => {
          const newMode = !state.isDarkMode;
          // Update the HTML element class
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newMode };
        });
      },
      
      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        // Update the HTML element class
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply dark mode class on rehydration
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);

// Initialize dark mode on app load
const storedTheme = useThemeStore.getState().isDarkMode;
if (storedTheme) {
  document.documentElement.classList.add('dark');
}