// src/lib/theme.ts

/**
 * Theme management with Tailwind and localStorage
 * Applies system preference on first load
 * Persists user preference (light|dark)
 */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme): void => {
  const root = window.document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(STORAGE_KEY, theme);
};

export const toggleTheme = (): void => {
  const current = getPreferredTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
};

export const initTheme = (): void => {
  if (typeof window === 'undefined') return;
  applyTheme(getPreferredTheme());
}
