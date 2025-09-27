export type Theme = 'light' | 'dark';

export interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: Theme;
    previousTheme: Theme;
  };
}

export class ThemeManager {
  private theme: Theme = 'light';
  private mediaQuery: MediaQueryList;

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.initTheme();
    this.setupListeners();
  }

  /**
   * Initialize theme based on saved preference or system preference
   */
  initTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = this.mediaQuery.matches;

    if (savedTheme) {
      this.setTheme(savedTheme, false);
      console.log(`🎨 Theme: Using saved preference (${savedTheme})`);
    } else if (prefersDark) {
      this.setTheme('dark', false);
      console.log('🎨 Theme: Using system preference (dark)');
    } else {
      this.setTheme('light', false);
      console.log('🎨 Theme: Using system preference (light)');
    }
  }

  /**
   * Set theme and optionally save to localStorage
   */
  setTheme(theme: Theme, save: boolean = true): void {
    const previousTheme = this.theme;
    this.theme = theme;

    // Update DOM
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Save to localStorage if requested
    if (save) {
      localStorage.setItem('theme', theme);
      console.log(`🎨 Theme: Switched to ${theme} mode`);
    }

    // Dispatch custom event for components that need to react
    this.dispatchThemeChange(theme, previousTheme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.theme;
  }

  /**
   * Reset to system preference
   */
  resetToSystemTheme(): void {
    localStorage.removeItem('theme');
    const systemTheme = this.mediaQuery.matches ? 'dark' : 'light';
    this.setTheme(systemTheme, false);
    console.log('🎨 Theme: Reset to system preference');
  }

  /**
   * Check if current theme matches system preference
   */
  isUsingSystemTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    return !savedTheme;
  }

  /**
   * Get system preference
   */
  getSystemTheme(): Theme {
    return this.mediaQuery.matches ? 'dark' : 'light';
  }

  /**
   * Set up event listeners for system theme changes
   */
  private setupListeners(): void {
    this.mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if no manual preference is set
      if (!localStorage.getItem('theme')) {
        const systemTheme = e.matches ? 'dark' : 'light';
        this.setTheme(systemTheme, false);
        console.log(`🎨 Theme: System changed to ${systemTheme} mode`);
      }
    });
  }

  /**
   * Dispatch theme change event
   */
  private dispatchThemeChange(theme: Theme, previousTheme: Theme): void {
    const event: ThemeChangeEvent = new CustomEvent('theme-changed', {
      detail: { theme, previousTheme }
    }) as ThemeChangeEvent;

    window.dispatchEvent(event);
  }

  /**
   * Add event listener for theme changes
   */
  onThemeChange(callback: (event: ThemeChangeEvent) => void): void {
    window.addEventListener('theme-changed', callback as EventListener);
  }

  /**
   * Remove event listener for theme changes
   */
  offThemeChange(callback: (event: ThemeChangeEvent) => void): void {
    window.removeEventListener('theme-changed', callback as EventListener);
  }
}

// Create and export global instance
export const themeManager = new ThemeManager();

// Expose functions globally for backward compatibility
declare global {
  interface Window {
    toggleTheme: () => void;
    resetToSystemTheme: () => void;
    setTheme: (theme: Theme) => void;
    themeManager: ThemeManager;
  }
}

window.toggleTheme = () => themeManager.toggleTheme();
window.resetToSystemTheme = () => themeManager.resetToSystemTheme();
window.setTheme = (theme: Theme) => themeManager.setTheme(theme);
window.themeManager = themeManager;