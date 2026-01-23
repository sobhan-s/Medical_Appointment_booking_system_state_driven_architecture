import { state, themeState } from './app.state';
import type { AppointmentFormData } from './types/formData.type';
import type { Theme } from './types/theme.type';

const STORAGE_KEY = 'appointments';

function loadFromStorage(): AppointmentFormData[] | undefined {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    let appointments: AppointmentFormData[];
    if (rawData) {
      appointments = JSON.parse(rawData);
      state.appointments = appointments;
      return appointments;
    }
  } catch (error) {
    // console.log('Failed to load appointments:', error);
    state.appointments = [];
    // return
  }
}

function sortAppointments(): AppointmentFormData[] {
  const appointments = loadFromStorage() as AppointmentFormData[];
  return [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.appointmentDate} ${a.timeSlot.split('-')[0]}`);
    const dateB = new Date(`${b.appointmentDate} ${b.timeSlot.split('-')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });
}

function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.appointments));
  } catch (error) {
    // console.log('failed to save appointments:', error);
  }
}

function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);

  state.appointments = [];
}

function initTheme(): void {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) {
    themeState.currentTheme = savedTheme;
    applyTheme(savedTheme);
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme(): void {
  const newTheme: Theme =
    themeState.currentTheme === 'light' ? 'dark' : 'light';
  themeState.currentTheme = newTheme;
  applyTheme(newTheme);
}

export {
  loadFromStorage,
  sortAppointments,
  saveToStorage,
  clearStorage,
  initTheme,
  applyTheme,
  toggleTheme,
};
