import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppStore } from '../context/app.contexts';
import type { CompleteFormData } from '../validations';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export const PersonalInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useFormContext<CompleteFormData>();

  const { setCurrentStep } = useAppStore();
  const phonePrefix = watch('phonePrefix');

  const handleNext = async () => {
    const isValid = await trigger([
      'email',
      'name',
      'phone',
      'phonePrefix',
      'lastVisit',
    ]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="form_step active animate-fadeIn" data-step="1">
      <h2 className="basicInfo text-3xl font-semibold text-primary-dark mb-8">
        Basic information
      </h2>

      <div className="form mb-6">
        <Label
          htmlFor="email"
          className={cn('block mb-2 text-sm font-medium', errors.email && 'text-destructive')}
        >
          Email <span className="required text-red-500">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          className={cn(
            'w-full transition-all',
            errors.email && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('email')}
        />
        {errors.email && (
          <span className="errorMsg text-destructive text-sm mt-1 block animate-shake">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form mb-6">
        <Label
          htmlFor="name"
          className={cn('block mb-2 text-sm font-medium', errors.name && 'text-destructive')}
        >
          Full Name <span className="required text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          className={cn(
            'w-full transition-all',
            errors.name && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('name')}
        />
        {errors.name && (
          <span className="errorMsg text-destructive text-sm mt-1 block animate-shake">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form mb-6">
        <Label
          htmlFor="phone"
          className={cn('block mb-2 text-sm font-medium', errors.phone && 'text-destructive')}
        >
          Phone Number <span className="required text-red-500">*</span>
        </Label>
        <div className="phone_input_group flex gap-3">
          <Select
            value={phonePrefix}
            onValueChange={(value) => setValue('phonePrefix', value)}
          >
            <SelectTrigger className="phone_prefix w-24 flex-shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+91">+91</SelectItem>
              <SelectItem value="+1">+1</SelectItem>
              <SelectItem value="+44">+44</SelectItem>
              <SelectItem value="+61">+61</SelectItem>
              <SelectItem value="+81">+81</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="tel"
            id="phone"
            placeholder="Enter your number"
            maxLength={10}
            className={cn(
              'flex-1 transition-all',
              errors.phone && 'border-destructive focus-visible:ring-destructive'
            )}
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <span className="errorMsg text-destructive text-sm mt-1 block animate-shake">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="form mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="lastVisit" className="text-sm font-medium">
            Date of Last Visit
          </Label>
          <span className="optional text-xs text-muted-foreground">(optional)</span>
        </div>
        <Input
          type="date"
          id="lastVisit"
          className={cn(
            'w-full transition-all',
            errors.lastVisit && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('lastVisit')}
        />
        {errors.lastVisit && (
          <span className="errorMsg text-destructive text-sm mt-1 block animate-shake">
            {errors.lastVisit.message}
          </span>
        )}
      </div>

      <div className="next_form flex justify-end mt-8">
        <Button
          type="button"
          onClick={handleNext}
          className="btn next_btn w-full sm:w-auto bg-primary-light hover:bg-primary text-white px-8"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};