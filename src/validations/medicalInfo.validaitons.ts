import { z } from 'zod';

export const mediacalInfoValidations = z.object({
  healthConcerns: z
    .array(z.string())
    .min(1, 'Please select at least one health concern'),
  otherConcern: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
});
