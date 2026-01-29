import React from 'react';
import { useAppContext } from '../../context/app.contexts';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="theme_switcher_container">
      <button
        className="theme_switcher_btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <span className="theme_icon">{theme === 'light' ? '🌙' : '☀️'}</span>
      </button>
    </div>
  );
};
