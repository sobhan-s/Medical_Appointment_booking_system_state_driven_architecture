import type { AppState, FormState } from './types/formData.type';
import type { ThemeState } from './types/theme.type';

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

const state: AppState = {
  currentStep: 1,
  totalSteps: 4,
  appointments: [],
  formData: { ...initialFormData },
  validationErrors: {},
  isEditMode: false,
  editingId: null,
};

const themeState: ThemeState = {
  currentTheme: 'light',
};

export { initialFormData, state, themeState };
