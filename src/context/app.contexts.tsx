import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  AppState,
  AppointmentFormData,
  FormState,
} from '../types/form.types';
import type { Theme } from '../types/theme.types';
import { saveToStorage } from '../db/storage.db';
import { loadTheme, saveTheme } from '../components/theme/theme';

const initialFormData: FormState = {
  email: '',
  name: '',
  phonePrefix: '+91',
  phone: '',
  lastVisit: '',
  doctor: '',
  appointmentDate: '',
  timeSlot: '',
  reasonForVisit: '',
  otherConcern: '',
  healthConcerns: [],
  medications: '',
  allergies: '',
  medicalRecord: '',
  consultationType: '',
  term1: false,
  term2: false,
  notifications: [],
};

interface AppContextType extends AppState {
  setCurrentStep: (step: number) => void;
  setAppointments: (appointments: AppointmentFormData[]) => void;
  setFormData: (data: FormState) => void;
  setEditMode: (isEdit: boolean, id: string | null) => void;
  resetForm: () => void;
  addAppointment: (appointment: AppointmentFormData) => void;
  updateAppointment: (id: string, appointment: AppointmentFormData) => void;
  deleteAppointment: (id: string) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [appointments, setAppointmentsState] = useState<AppointmentFormData[]>(
    [],
  );
  const [formData, setFormDataState] = useState<FormState>(initialFormData);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(loadTheme());

  // useEffect(() => {
  //   const loaded = loadFromStorage();
  //   setAppointmentsState(loaded);
  // }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveToStorage(appointments);
  }, [appointments]);

  const setAppointments = (newAppointments: AppointmentFormData[]) => {
    setAppointmentsState(newAppointments);
  };

  const setFormData = (data: FormState) => {
    setFormDataState(data);
  };

  const setEditMode = (isEdit: boolean, id: string | null) => {
    setIsEditMode(isEdit);
    setEditingId(id);
  };

  const resetForm = () => {
    setFormDataState(initialFormData);
    setCurrentStep(1);
    setIsEditMode(false);
    setEditingId(null);
  };

  const addAppointment = (appointment: AppointmentFormData) => {
    setAppointmentsState((prev) => [...prev, appointment]);
    // resetForm()
  };

  const updateAppointment = (id: string, appointment: AppointmentFormData) => {
    setAppointmentsState((prev) =>
      prev.map((apt) => (apt.id === id ? appointment : apt)),
    );
    // resetForm()
  };

  const deleteAppointment = (id: string) => {
    setAppointmentsState((prev) => prev.filter((apt) => apt.id !== id));
    resetForm();
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: AppContextType = {
    currentStep,
    totalSteps: 4,
    appointments,
    formData,
    isEditMode,
    editingId,
    theme,
    setCurrentStep,
    setAppointments,
    setFormData,
    setEditMode,
    resetForm,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('wrapped withing app proiders');
  }
  return context;
};
