import type {
  AppointmentFormData,
  FormState,
  ValidationErrors,
} from './types/formData.type';
import { generateId } from './utils/id';

const emailRegex =
  /^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[1-9][0-9]{9}$/;
const nameRegex = /^[a-zA-Z\s]+$/;

export function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function validateName(name: string): boolean {
  return nameRegex.test(name);
}

export function validateStep1(formData: FormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.name) {
    errors.name = 'Name is required';
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (!validateName(formData.name)) {
    errors.name = 'Name can only contain letters and spaces';
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10 digit phone number';
  }

  if (formData.lastVisit) {
    const selectedDate = new Date(formData.lastVisit);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate >= today) {
      errors.lastVisit = 'Last visit date must be in the past';
    }
  }

  return errors;
}

export function validateStep2(formData: FormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.doctor) {
    errors.doctor = 'Please select a doctor';
  }

  if (!formData.appointmentDate) {
    errors.appointmentDate = 'Please select an appointment date';
  } else {
    const selectedDate = new Date(formData.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.appointmentDate = 'Appointment date cannot be in the past';
    }
  }

  if (!formData.timeSlot) {
    errors.timeSlot = 'Please select a time slot';
  }

  if (!formData.reasonForVisit) {
    errors.reasonForVisit = 'Please enter reason for visit';
  } else if (formData.reasonForVisit.length < 10) {
    errors.reasonForVisit = 'Reason must be at least 10 characters';
  }

  return errors;
}

export function validateStep3(formData: FormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (formData.healthConcerns.length === 0) {
    errors.healthConcerns = 'Please select at least one health concern';
  }

  return errors;
}

export function validateStep4(formData: FormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.medicalRecord) {
    errors.medicalRecord = 'Please select a medical record type';
  }

  if (!formData.consultationType) {
    errors.consultationType = 'Please select a consultation type';
  }

  if (!formData.term1 || !formData.term2) {
    errors.terms = 'You must accept all terms and conditions';
  }

  if (formData.notifications.length === 0) {
    errors.notifications = 'Please select at least one notification method';
  }

  return errors;
}

export function checkDuplicateAppointment(
  appointments: AppointmentFormData[],
  email: string,
  phone: string,
  appointmentDate: string,
  excludeId?: string | null,
): boolean {
  return appointments.some((apt) => {
    if (excludeId && apt.id === excludeId) return false;

    if (
      (apt.email === email || apt.phone === phone) &&
      apt.appointmentDate === appointmentDate
    ) {
      return true;
    }

    return false;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function sortAppointments(
  appointments: AppointmentFormData[],
): AppointmentFormData[] {
  return [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.appointmentDate} ${a.timeSlot.split('-')[0]}`);
    const dateB = new Date(`${b.appointmentDate} ${b.timeSlot.split('-')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });
}

export function formDataToAppointment(
  formData: FormState,
  id?: string,
): AppointmentFormData {
  return {
    id: id || generateId(),
    email: formData.email,
    name: formData.name,
    phonePrefix: formData.phonePrefix,
    phone: formData.phone,
    fullPhone: formData.phonePrefix + formData.phone,
    lastVisit: formData.lastVisit,
    doctor: formData.doctor,
    appointmentDate: formData.appointmentDate,
    timeSlot: formData.timeSlot,
    reasonForVisit: formData.reasonForVisit,
    healthConcerns: [...formData.healthConcerns],
    medications: formData.medications,
    allergies: formData.allergies,
    medicalRecord: formData.medicalRecord,
    consultationType: formData.consultationType,
    termsAccepted: formData.term1 && formData.term2,
    notifications: [...formData.notifications],
    submittedAt: new Date().toISOString(),
  };
}

export function appointmentToFormData(
  appointment: AppointmentFormData,
): FormState {
  return {
    email: appointment.email,
    name: appointment.name,
    phonePrefix: appointment.phonePrefix,
    phone: appointment.phone,
    lastVisit: appointment.lastVisit,
    doctor: appointment.doctor,
    appointmentDate: appointment.appointmentDate,
    timeSlot: appointment.timeSlot,
    reasonForVisit: appointment.reasonForVisit,
    healthConcerns: [...appointment.healthConcerns],
    medications: appointment.medications,
    allergies: appointment.allergies,
    medicalRecord: appointment.medicalRecord,
    consultationType: appointment.consultationType,
    term1: appointment.termsAccepted,
    term2: appointment.termsAccepted,
    notifications: [...appointment.notifications],
  };
}
