/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text_primary: 'var(--color-text-primary)',
        text_secondary: 'var(--color-text-secondary)',
        text_white: 'var(--color-text-white)',
        card_bg: 'var(--color-card-bg)',
        primary: 'var(--color-primary)',
        primary_dark: 'var(--color-primary-dark)',
        primary_light: 'var(--color-primary-light)',
        border: 'var(--color-border)',
        border_hover: 'var(--color-hover-bg)',
        input: 'var(--color-input-bg)',
        progress_bar_track: 'var(--color-progress-bar-track)',
        progress_bar_thumb: 'var(--color-progress-bar-thumb)',
        modal_border: 'var(--color-modal-border)',
      },
    },
  },
  plugins: [],
};
