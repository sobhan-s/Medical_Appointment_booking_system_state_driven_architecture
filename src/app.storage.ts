import { state } from './app.state';
import type { AppointmentFormData } from './types/formData.type';

const STORAGE_KEY = 'appointments';

export function loadFromStorage(): void {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      const appointments: AppointmentFormData[] = JSON.parse(rawData);
      state.appointments = appointments;
    }
  } catch (error) {
    // console.log('Failed to load appointments:', error);
    state.appointments = [];
  }
}

export function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.appointments));
  } catch (error) {
    // console.log('Failed to save appointments:', error);
  }
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);

  state.appointments = [];
}
