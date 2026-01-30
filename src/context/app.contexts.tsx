import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppointmentFormData, FormState } from '../types/form.types';
import type { Theme } from '../types/theme.types';

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

interface AppState {
  currentStep: number;
  totalSteps: number;
  appointments: AppointmentFormData[];
  formData: FormState;
  isEditMode: boolean;
  editingId: string | null;
  theme: Theme;
  isModalOpen: boolean;
  searchQuery: string;
  sortField: keyof AppointmentFormData | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  setCurrentStep: (step: number) => void;
  setAppointments: (appointments: AppointmentFormData[]) => void;
  setFormData: (data: FormState) => void;
  setEditMode: (isEdit: boolean, id: string | null) => void;
  resetForm: () => void;
  addAppointment: (appointment: AppointmentFormData) => void;
  updateAppointment: (id: string, appointment: AppointmentFormData) => void;
  deleteAppointment: (id: string) => void;
  toggleTheme: () => void;
  setModalOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortField: (field: keyof AppointmentFormData | null) => void;
  toggleSortDirection: () => void;
  setCurrentPage: (page: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: 4,
      appointments: [],
      formData: initialFormData,
      isEditMode: false,
      editingId: null,
      theme: 'light',
      isModalOpen: false,
      searchQuery: '',
      sortField: null,
      sortDirection: 'asc',
      currentPage: 1,
      itemsPerPage: 10,
      setCurrentStep: (step) => set({ currentStep: step }),
      setAppointments: (appointments) => set({ appointments }),
      setFormData: (data) => set({ formData: data }),
      setEditMode: (isEdit, id) => set({ isEditMode: isEdit, editingId: id }),
      resetForm: () =>
        set({
          formData: initialFormData,
          currentStep: 1,
          isEditMode: false,
          editingId: null,
          isModalOpen: false,
        }),

      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [...state.appointments, appointment],
        })),

      updateAppointment: (id, appointment) =>
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? appointment : apt,
          ),
        })),

      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((apt) => apt.id !== id),
          formData: initialFormData,
          currentStep: 1,
          isEditMode: false,
          editingId: null,
          currentPage: 1,
        })),
        
      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        set({ theme: nextTheme });
      },
      setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
      setSortField: (field) => set({ sortField: field, currentPage: 1 }),
      toggleSortDirection: () =>
        set((state) => ({
          sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
          currentPage: 1,
        })),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'appointments',
      partialize: (state) => ({
        appointments: state.appointments,
        theme: state.theme,
      }),
    },
  ),
);
