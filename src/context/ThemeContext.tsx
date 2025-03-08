import React, { createContext, useState, useContext, useEffect } from 'react';

// Define theme type
type Theme = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: (newTheme?: Theme) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage for saved theme or default to 'light'
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'light';
  });

  // Toggle theme function
  const toggleTheme = (newTheme?: Theme) => {
    const themeToSet = newTheme || (theme === 'light' ? 'dark' : 'light');
    setTheme(themeToSet);
    localStorage.setItem('app-theme', themeToSet);
    
    // Add/remove dark class on body for CSS theming
    if (themeToSet === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  // Apply theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);