import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppStore } from '../context/app.contexts';
import { checkDuplicateAppointment } from '../utils';
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
import { Textarea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { useToast } from '../hooks/use-toast';
import { cn } from '../lib/utils';

export const AppointmentInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useFormContext<CompleteFormData>();

  const { setCurrentStep, appointments, isEditMode, editingId } = useAppStore();
  const { toast } = useToast();
  
  const doctor = watch('doctor');
  const timeSlot = watch('timeSlot');

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleNext = async () => {
    const isValid = await trigger([
      'doctor',
      'appointmentDate',
      'timeSlot',
      'reasonForVisit',
    ]);

    if (isValid) {
      const values = getValues();
      const fullPhone = values.phonePrefix + values.phone;

      const isDuplicate = checkDuplicateAppointment(
        appointments,
        values.email,
        fullPhone,
        values.appointmentDate,
        editingId
      );

      if (isDuplicate && !isEditMode) {
        toast({
          title: '⚠️ Duplicate Appointment',
          description: `You already have an appointment on ${values.appointmentDate}`,
          variant: 'destructive',
        });
        return;
      }

      setCurrentStep(3);
    }
  };

  return (
    <div className="form_step active animate-fadeIn" data-step="2">
      <h2 className="appointmentDetailsHeader text-3xl font-semibold text-primary-dark mb-8">
        Appointment details
      </h2>

      {/* Doctor Selection */}
      <div className="form mb-6">
        <Label
          htmlFor="doctor"
          className={cn('block mb-2 text-sm font-medium', errors.doctor && 'text-destructive')}
        >
          Select a doctor <span className="required text-red-500">*</span>
        </Label>
        <Select value={doctor} onValueChange={(value) => setValue('doctor', value)}>
          <SelectTrigger
            id="doctor"
            className={cn(
              'w-full',
              errors.doctor && 'border-destructive focus:ring-destructive'
            )}
          >
            <SelectValue placeholder="Select a doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dr sobhan1">Dr sobhan1 - doctor 1</SelectItem>
            <SelectItem value="Dr sobhan2">Dr sobhan2 - doctor 2</SelectItem>
            <SelectItem value="Dr sobhan3">Dr sobhan3 - doctor 3</SelectItem>
            <SelectItem value="Dr sobhan4">Dr sobhan4 - doctor 4</SelectItem>
            <SelectItem value="Dr sobhan5">Dr sobhan5 - doctor 5</SelectItem>
          </SelectContent>
        </Select>
        {errors.doctor && (
          <span className="error_message text-destructive text-sm mt-1 block animate-shake">
            {errors.doctor.message}
          </span>
        )}
      </div>

      {/* Appointment Date */}
      <div className="form mb-6">
        <Label
          htmlFor="appointmentDate"
          className={cn(
            'block mb-2 text-sm font-medium',
            errors.appointmentDate && 'text-destructive'
          )}
        >
          Preferred Date <span className="required text-red-500">*</span>
        </Label>
        <Input
          type="date"
          id="appointmentDate"
          className={cn(
            'w-full',
            errors.appointmentDate && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('appointmentDate')}
        />
        {errors.appointmentDate && (
          <span className="error_message text-destructive text-sm mt-1 block animate-shake">
            {errors.appointmentDate.message}
          </span>
        )}
      </div>

      {/* Time Slot */}
      <div className="form mb-6">
        <Label
          htmlFor="timeSlot"
          className={cn('block mb-2 text-sm font-medium', errors.timeSlot && 'text-destructive')}
        >
          Preferred Time Slot <span className="required text-red-500">*</span>
        </Label>
        <Select value={timeSlot} onValueChange={(value) => setValue('timeSlot', value)}>
          <SelectTrigger
            id="timeSlot"
            className={cn(
              'w-full',
              errors.timeSlot && 'border-destructive focus:ring-destructive'
            )}
          >
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="09:00-10:00">09:00 AM - 10:00 AM</SelectItem>
            <SelectItem value="10:00-11:00">10:00 AM - 11:00 AM</SelectItem>
            <SelectItem value="11:00-12:00">11:00 AM - 12:00 PM</SelectItem>
            <SelectItem value="12:00-1:00">12:00 PM - 01:00 PM</SelectItem>
            <SelectItem value="2:00-3:00">02:00 PM - 03:00 PM</SelectItem>
            <SelectItem value="3:00-4:00">03:00 PM - 04:00 PM</SelectItem>
            <SelectItem value="4:00-5:00">04:00 PM - 05:00 PM</SelectItem>
          </SelectContent>
        </Select>
        {errors.timeSlot && (
          <span className="error_message text-destructive text-sm mt-1 block animate-shake">
            {errors.timeSlot.message}
          </span>
        )}
      </div>

      {/* Reason for Visit */}
      <div className="form mb-6">
        <Label
          htmlFor="reasonForVisit"
          className={cn(
            'block mb-2 text-sm font-medium',
            errors.reasonForVisit && 'text-destructive'
          )}
        >
          Reason For Visit <span className="required text-red-500">*</span>
        </Label>
        <Textarea
          id="reasonForVisit"
          placeholder="Enter reason for visit"
          rows={4}
          className={cn(
            'w-full resize-y min-h-[100px]',
            errors.reasonForVisit && 'border-destructive focus-visible:ring-destructive'
          )}
          {...register('reasonForVisit')}
        />
        {errors.reasonForVisit && (
          <span className="error_message text-destructive text-sm mt-1 block animate-shake">
            {errors.reasonForVisit.message}
          </span>
        )}
        <small className="block mt-2 text-muted-foreground text-xs">
          Minimum 10 characters, Maximum 200 characters
        </small>
      </div>

      {/* Navigation */}
      <div className="next_form flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
        <Button
          type="button"
          onClick={handlePrevious}
          variant="outline"
          className="btn prev_btn w-full sm:w-auto"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="btn next_btn w-full sm:w-auto bg-primary-light hover:bg-primary text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};