import type { AppointmentFormData, FormState } from '../types/form.types';

export const generateId = (): string => {
  return `appointment-${Date.now()}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const checkDuplicateAppointment = (
  appointments: AppointmentFormData[],
  email: string,
  phone: string,
  appointmentDate: string,
  excludeId?: string | null,
): boolean => {
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
};

export const formDataToAppointment = (
  formData: FormState,
  id?: string,
): AppointmentFormData => {
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
    otherConcern: formData.otherConcern,
    healthConcerns: [...formData.healthConcerns],
    medications: formData.medications,
    allergies: formData.allergies,
    medicalRecord: formData.medicalRecord,
    consultationType: formData.consultationType,
    termsAccepted: formData.term1 && formData.term2,
    notifications: [...formData.notifications],
    submittedAt: new Date().toISOString(),
  };
};

export const appointmentToFormData = (
  appointment: AppointmentFormData,
): FormState => {
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
    otherConcern: appointment.otherConcern,
    healthConcerns: [...appointment.healthConcerns],
    medications: appointment.medications,
    allergies: appointment.allergies,
    medicalRecord: appointment.medicalRecord,
    consultationType: appointment.consultationType,
    term1: appointment.termsAccepted,
    term2: appointment.termsAccepted,
    notifications: [...appointment.notifications],
  };
};

export const sortAppointments = (
  appointments: AppointmentFormData[],
): AppointmentFormData[] => {
  return [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.appointmentDate} ${a.timeSlot.split('-')[0]}`);
    const dateB = new Date(`${b.appointmentDate} ${b.timeSlot.split('-')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });
};
