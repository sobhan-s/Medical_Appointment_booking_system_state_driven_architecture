import type { AppState, FormState } from './types/formData.type';

export const initialFormData: FormState = {
  email: '',
  name: '',
  phonePrefix: '+91',
  phone: '',
  lastVisit: '',
  doctor: '',
  appointmentDate: '',
  timeSlot: '',
  reasonForVisit: '',
  healthConcerns: [],
  medications: '',
  allergies: '',
  medicalRecord: '',
  consultationType: '',
  term1: false,
  term2: false,
  notifications: [],
};

export const state: AppState = {
  currentStep: 1,
  totalSteps: 4,
  appointments: [],
  formData: { ...initialFormData },
  validationErrors: {},
  isEditMode: false,
  editingId: null,
};
