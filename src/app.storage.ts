import { state } from './app.state';
import type { AppointmentFormData } from './types/formData.type';

const STORAGE_KEY = 'appointments';

export function loadFromStorage(): AppointmentFormData[] | undefined {
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

export function sortAppointments(): AppointmentFormData[] {
  const appointments = loadFromStorage() as AppointmentFormData[];
  return [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.appointmentDate} ${a.timeSlot.split('-')[0]}`);
    const dateB = new Date(`${b.appointmentDate} ${b.timeSlot.split('-')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });
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
