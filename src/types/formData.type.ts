export interface AppointmentFormData {
  email: string;
  name: string;
  phonePrefix: string;
  phone: string;
  fullPhone: string;
  lastVisit: string;
  doctor: string;
  appointmentDate: string;
  timeSlot: string;
  reasonForVisit: string;
  healthConcerns: string[];
  medications: string;
  allergies: string;
  medicalRecord: string;
  consultationType: string;
  termsAccepted: boolean;
  notifications: string[];
  submittedAt?: string;
  id?: string;
}

export interface FormState {
  email: string;
  name: string;
  phonePrefix: string;
  phone: string;
  lastVisit: string;
  doctor: string;
  appointmentDate: string;
  timeSlot: string;
  reasonForVisit: string;
  healthConcerns: string[];
  medications: string;
  allergies: string;
  medicalRecord: string;
  consultationType: string;
  term1: boolean;
  term2: boolean;
  notifications: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface AppState {
  currentStep: number;
  totalSteps: number;
  appointments: AppointmentFormData[];
  formData: FormState;
  validationErrors: ValidationErrors;
  isEditMode: boolean;
  editingId: string | null;
}

export type StepValidator = (formData: FormState) => ValidationErrors;
