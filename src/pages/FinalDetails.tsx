import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useAppStore } from '../context/app.contexts';
import { formDataToAppointment } from '../utils';
import type { CompleteFormData } from '../validations';
import { Label } from '../components/ui/Label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/CheckBox';
import { Button } from '../components/ui/Button';
import { useToast } from '../hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { cn } from '../lib/utils';
import { CheckCircle2 } from 'lucide-react';

export const FinalDetails: React.FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    control,
  } = useFormContext<CompleteFormData>();

  const {
    setCurrentStep,
    addAppointment,
    updateAppointment,
    resetForm,
    isEditMode,
    editingId,
    appointments,
    setModalOpen,
  } = useAppStore();

  const { toast } = useToast();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const medicalRecord = watch('medicalRecord');
  const consultationType = watch('consultationType');

  const handlePrevious = () => {
    setCurrentStep(3);
  };

  const onSubmit = (data: CompleteFormData) => {
    if (isEditMode && editingId) {
      const existing = appointments.find((apt) => apt.id === editingId);
      if (existing) {
        const updatedAppointment = {
          ...formDataToAppointment(data, existing.id),
          submittedAt: existing.submittedAt,
        };
        updateAppointment(editingId, updatedAppointment);

        toast({
          title: '✅ Appointment Updated',
          description: 'Your appointment has been successfully updated.',
        });
      }
    } else {
      const newAppointment = formDataToAppointment(data);
      addAppointment(newAppointment);

      toast({
        title: '✅ Appointment Booked',
        description: 'Your appointment has been successfully scheduled.',
      });
    }

    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      resetForm();
      setModalOpen(false);
    }, 1500);
  };

  const records = [
    { id: 'record1', value: 'X-rays', label: 'X-rays' },
    { id: 'record2', value: 'MRIs', label: 'MRIs' },
    { id: 'record3', value: 'Ultrasound recordings', label: 'Ultrasound recordings' },
    { id: 'record4', value: 'Mammograms', label: 'Mammograms' },
    { id: 'record5', value: 'others', label: 'Others' },
  ];

  const consultTypes = [
    { id: 'consult1', value: 'Routine/Follow-up', label: 'Routine/Follow-up' },
    { id: 'consult2', value: 'Urgent/Acute', label: 'Urgent/Acute' },
    {
      id: 'consult3',
      value: 'Specialist/Inter-Physicians',
      label: 'Specialist/Inter-Physicians',
    },
    { id: 'consult4', value: 'others', label: 'Others' },
  ];

  const notifOptions = [
    { id: 'notif1', value: 'Email', label: 'Email' },
    { id: 'notif2', value: 'SMS', label: 'SMS' },
    { id: 'notif3', value: 'Phone Call', label: 'Phone Call' },
  ];

  return (
    <>
      <div className="form_step active animate-fadeIn" data-step="4">
        <h2 className="finalDetailHeader text-3xl font-semibold text-primary-dark mb-8">
          Final Details
        </h2>

        {/* Medical Record */}
        <div className="form mb-6">
          <Label
            htmlFor="medicalRecord"
            className={cn(
              'block mb-3 text-sm font-medium',
              errors.medicalRecord && 'text-destructive'
            )}
          >
            Previous Medical Record <span className="required text-red-500">*</span>
          </Label>
          <RadioGroup
            value={medicalRecord}
            onValueChange={(value) => setValue('medicalRecord', value)}
            className="radio_groups space-y-2"
          >
            {records.map(({ id, value, label }) => (
              <div
                key={id}
                className="radio_items flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={value} id={id} />
                <Label htmlFor={id} className="text-sm font-normal cursor-pointer flex-1 m-0">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.medicalRecord && (
            <span className="error_message text-destructive text-sm mt-2 block animate-shake">
              {errors.medicalRecord.message}
            </span>
          )}
        </div>

        {/* Consultation Type */}
        <div className="form mb-6">
          <Label
            htmlFor="consultationType"
            className={cn(
              'block mb-3 text-sm font-medium',
              errors.consultationType && 'text-destructive'
            )}
          >
            Consultation Type <span className="required text-red-500">*</span>
          </Label>
          <RadioGroup
            value={consultationType}
            onValueChange={(value) => setValue('consultationType', value)}
            className="radio_groups space-y-2"
          >
            {consultTypes.map(({ id, value, label }) => (
              <div
                key={id}
                className="radio_items flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={value} id={id} />
                <Label htmlFor={id} className="text-sm font-normal cursor-pointer flex-1 m-0">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.consultationType && (
            <span className="error_message text-destructive text-sm mt-2 block animate-shake">
              {errors.consultationType.message}
            </span>
          )}
        </div>

        <div className="form mb-6">
          <Label
            htmlFor="terms"
            className={cn(
              'block mb-3 text-sm font-medium',
            )}
          >
            Accept terms <span className="required text-red-500">*</span>
          </Label>
          <a
            href="./layouts/termsAndCondition.html"
            target="_blank"
            rel="noopener noreferrer"
            className="termsAndConditions text-primary hover:underline font-medium inline-block mb-3"
          >
            View terms and conditions →
          </a>
          <div className="checkbox_group space-y-3">
            <Controller
              name="term1"
              control={control}
              render={({ field }) => (
                <div className="checkbox_items flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id="term1"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="term1" className="text-sm font-normal cursor-pointer flex-1 m-0 leading-relaxed">
                    I have read and understand the above information and agree to the terms.
                  </Label>
                </div>
              )}
            />
            <Controller
              name="term2"
              control={control}
              render={({ field }) => (
                <div className="checkbox_items flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id="term2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="term2" className="text-sm font-normal cursor-pointer flex-1 m-0 leading-relaxed">
                    Consent to the Use and Disclosure of Protected Health Information (PHI).
                  </Label>
                </div>
              )}
            />
          </div>
          {(errors.term1 || errors.term2) && (
            <span className="error_message text-destructive text-sm mt-2 block animate-shake">
              {errors.term1?.message || errors.term2?.message}
            </span>
          )}
        </div>

        {/* Notification Method */}
        <div className="form mb-6">
          <Label
            htmlFor="notifications"
            className={cn(
              'block mb-3 text-sm font-medium',
              errors.notifications && 'text-destructive'
            )}
          >
            Notification Method <span className="required text-red-500">*</span>
          </Label>
          <div className="checkbox_group space-y-3">
            {notifOptions.map(({ id, value, label }) => (
              <Controller
                key={id}
                name="notifications"
                control={control}
                render={({ field }) => (
                  <div className="checkbox_items flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={id}
                      checked={field.value?.includes(value) || false}
                      onCheckedChange={(checked) => {
                        const currentValues = field.value || [];
                        if (checked) {
                          field.onChange([...currentValues, value]);
                        } else {
                          field.onChange(currentValues.filter((v) => v !== value));
                        }
                      }}
                    />
                    <Label htmlFor={id} className="text-sm font-normal cursor-pointer flex-1 m-0">
                      {label}
                    </Label>
                  </div>
                )}
              />
            ))}
          </div>
          {errors.notifications && (
            <span className="error_message text-destructive text-sm mt-2 block animate-shake">
              {errors.notifications.message}
            </span>
          )}
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
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="btn submit_btn w-full sm:w-auto bg-primary-light hover:bg-primary text-white"
          >
            {isEditMode ? 'Update Appointment' : 'Submit Appointment'}
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="modal_content text-center py-6">
            <div className="success_icon mx-auto w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <DialogHeader>
              <DialogTitle className="apt text-2xl font-semibold text-primary text-center mb-3">
                Appointment{' '}
                <span className="booked">{isEditMode ? 'Updated' : 'Booked'}</span>!
              </DialogTitle>
              <DialogDescription className="para text-base text-muted-foreground leading-relaxed">
                Your appointment has been successfully{' '}
                <span className="submitted font-medium">
                  {isEditMode ? 'updated' : 'submitted'}
                </span>
                . You will receive a confirmation via your selected notification method.
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};