import { z } from 'zod';
import { emailRegex, nameRegex, phoneRegex } from '../constants/index';

export const BasicInfoValidations = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email address'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .regex(nameRegex, 'Name can only contain letters and spaces'),
  phonePrefix: z.string(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Please enter a valid 10 digit phone number'),
  lastVisit: z.string().refine(
    (date) => {
      if (!date) return true;
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate < today;
    },
    { message: 'Last visit date must be in the past' },
  ),
});
