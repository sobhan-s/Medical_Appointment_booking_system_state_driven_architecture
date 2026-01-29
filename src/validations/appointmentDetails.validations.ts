import { z } from 'zod';

export const AppointmentDetailsValidations = z.object({
  doctor: z.string().min(1, 'Please select a doctor'),
  appointmentDate: z
    .string()
    .min(1, 'Please select an appointment date')
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: 'Appointment date cannot be in the past' },
    ),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  reasonForVisit: z
    .string()
    .min(10, 'Reason must be at least 10 characters')
    .max(200, 'Reason must not exceed 200 characters'),
});
