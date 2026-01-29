import { z } from 'zod';
import { AppointmentDetailsValidations } from './appointmentDetails.validations';
import { BasicInfoValidations } from './basicInfo.validations';
import { mediacalInfoValidations } from './medicalInfo.validaitons';
import { finalDetailsValidations } from './finalDetails.validations';

export const completeFormValidations = z.object({
  email: BasicInfoValidations.shape.email,
  name: BasicInfoValidations.shape.name,
  phonePrefix: BasicInfoValidations.shape.phonePrefix,
  phone: BasicInfoValidations.shape.phone,
  lastVisit: BasicInfoValidations.shape.lastVisit,
  doctor: AppointmentDetailsValidations.shape.doctor,
  appointmentDate: AppointmentDetailsValidations.shape.appointmentDate,
  timeSlot: AppointmentDetailsValidations.shape.timeSlot,
  reasonForVisit: AppointmentDetailsValidations.shape.reasonForVisit,
  healthConcerns: mediacalInfoValidations.shape.healthConcerns,
  otherConcern: mediacalInfoValidations.shape.otherConcern ?? '',
  medications: mediacalInfoValidations.shape.medications,
  allergies: mediacalInfoValidations.shape.allergies,
  medicalRecord: finalDetailsValidations.shape.medicalRecord,
  consultationType: finalDetailsValidations.shape.consultationType,
  term1: finalDetailsValidations.shape.term1,
  term2: finalDetailsValidations.shape.term2,
  notifications: finalDetailsValidations.shape.notifications,
});

export type Step1FormData = z.infer<typeof BasicInfoValidations>;
export type Step2FormData = z.infer<typeof AppointmentDetailsValidations>;
export type Step3FormData = z.infer<typeof mediacalInfoValidations>;
export type Step4FormData = z.infer<typeof finalDetailsValidations>;
export type CompleteFormData = z.infer<typeof completeFormValidations>;
