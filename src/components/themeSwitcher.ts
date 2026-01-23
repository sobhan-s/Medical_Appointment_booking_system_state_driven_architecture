import { createElement } from '../lib/createElement';
import { themeState } from '../app.state';
import { toggleTheme } from '../app.storage';

export function ThemeSwitcher(): HTMLElement {
  const container = createElement('div', 'theme_switcher_container');

  const button = createElement(
    'button',
    'theme_switcher_btn',
  ) as HTMLButtonElement;

  const icon = createElement('span', 'theme_icon');
  updateIcon(icon);

  button.appendChild(icon);

  button.addEventListener('click', () => {
    toggleTheme();
    updateIcon(icon);
  });

  container.appendChild(button);
  return container;
}

function updateIcon(iconElement: HTMLElement): void {
  iconElement.textContent = themeState.currentTheme === 'light' ? '🌙' : '☀️';
}
