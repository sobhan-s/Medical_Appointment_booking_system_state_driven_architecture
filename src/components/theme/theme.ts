import { THEME } from '../../constants/key';
import type { Theme } from '../../types/theme.types';

export const loadTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME) as Theme | null;
  return savedTheme || 'light';
};

export const saveTheme = (theme: Theme): void => {
  localStorage.setItem(THEME, theme);
  document.documentElement.setAttribute('data-theme', theme);
};
