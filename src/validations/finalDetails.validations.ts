import { z } from 'zod';

export const finalDetailsValidations = z.object({
  medicalRecord: z.string().min(1, 'Please select a medical record type'),
  consultationType: z.string().min(1, 'Please select a consultation type'),
  term1: z.boolean().refine((val) => val === true, {
    message: 'You must accept all terms and conditions',
  }),
  term2: z.boolean().refine((val) => val === true, {
    message: 'You must accept all terms and conditions',
  }),
  notifications: z
    .array(z.string())
    .min(1, 'Please select at least one notification method'),
});
