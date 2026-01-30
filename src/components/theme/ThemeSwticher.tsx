import React from 'react';
import { useAppStore } from '../../context/app.contexts';
import { Button } from '../ui/Button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useAppStore();
  console.log(theme);

  return (
    <div className="theme_switcher_container flex justify-end items-start">
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        className={cn(
          'theme_switcher_btn w-12 h-12 rounded-full transition-all duration-300',
          'bg-white/20 border-2 border-white/30 hover:bg-white/30 hover:scale-110'
        )}
        aria-label="Toggle theme"
      >
        <span className="theme_icon transition-transform duration-300 hover:rotate-[50deg]">
          {theme === 'light' ? (
            <Moon className="h-6 w-6 text-white" />
          ) : (
            <Sun className="h-6 w-6 text-white" />
          )}
        </span>
      </Button>
    </div>
  );
};