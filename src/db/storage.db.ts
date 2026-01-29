import { STORAGE } from '../constants/key';
import type { AppointmentFormData } from '../types/form.types';

export const loadFromStorage = (): AppointmentFormData[] => {
  try {
    const rawData = localStorage.getItem(STORAGE);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error('failed to load appointments  asdiashdiahds:', error);
    return [];
  }
};

export const saveToStorage = (appointments: AppointmentFormData[]): void => {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(appointments));
  } catch (error) {
    console.error('failed to save apts:', error);
    return;
  }
};
