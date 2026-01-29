import { STORAGE } from '../constants/key';
import type { AppointmentFormData } from '../types/form.types';

export const loadFromStorage = (): AppointmentFormData[] => {
  try {
    const rawData = localStorage.getItem(STORAGE);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    // console.error('Failed to load appointments:', error);
    return [];
  }
};

export const saveToStorage = (appointments: AppointmentFormData[]): void => {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(appointments));
  } catch (error) {
    // console.error('Failed to save appointments:', error);
    return;
  }
};
