import React, { useState, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useAppStore } from '../context/app.contexts';
import type { CompleteFormData } from '../validations';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { Checkbox } from '../components/ui/CheckBox';
import { Textarea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export const MedicalInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    control,
    getValues,
  } = useFormContext<CompleteFormData>();

  const { setCurrentStep } = useAppStore();
  const [showOthersInput, setShowOthersInput] = useState(false);

  const healthConcerns = useWatch({
    control,
    name: 'healthConcerns',
  });

  useEffect(() => {
    if (healthConcerns && healthConcerns.includes('others')) {
      setShowOthersInput(true);
    } else {
      setShowOthersInput(false);
      setValue('otherConcern', '');
    }
  }, [healthConcerns, setValue]);

  const handlePrevious = () => {
    setCurrentStep(2);
  };

  const handleNext = async () => {
    const isValid = await trigger(['healthConcerns', 'otherConcern']);
    if (isValid) {
      setCurrentStep(4);
    }
  };

  const concerns = [
    { id: 'concern1', value: 'Fever', label: 'Fever' },
    { id: 'concern2', value: 'cough', label: 'Cough' },
    { id: 'concern3', value: 'cancer', label: 'Cancer' },
    { id: 'concern4', value: 'piles', label: 'Piles' },
    { id: 'concern5', value: 'others', label: 'Others' },
  ];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = getValues('healthConcerns') || [];
    if (checked) {
      setValue('healthConcerns', [...currentValues, value]);
    } else {
      setValue('healthConcerns', currentValues.filter((v) => v !== value));
    }
    trigger('healthConcerns');
  };

  return (
    <div className="form_step active animate-fadeIn" data-step="3">
      <h2 className="medicalInfoHeader text-3xl font-semibold text-primary-dark mb-8">
        Medical Information
      </h2>

      {/* Current Concerns */}
      <div className="form mb-6">
        <Label
          htmlFor="healthConcerns"
          className={cn(
            'block mb-3 text-sm font-medium',
            errors.healthConcerns && 'text-destructive'
          )}
        >
          Current Concerns <span className="required text-red-500">*</span>
        </Label>
        <div className="checkbox_group space-y-3">
          {concerns.map(({ id, value, label }) => (
            <Controller
              key={id}
              name="healthConcerns"
              control={control}
              render={({ field }) => (
                <div className="checkbox_items flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={id}
                    checked={field.value?.includes(value) || false}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(value, checked as boolean);
                    }}
                  />
                  <Label
                    htmlFor={id}
                    className="text-sm font-normal cursor-pointer flex-1 m-0"
                  >
                    {label}
                  </Label>
                </div>
              )}
            />
          ))}

          {showOthersInput && (
            <div className="mt-3 ml-7">
              <Input
                type="text"
                id="otherConcern"
                placeholder="Please specify your concerns..."
                className="others-input"
                {...register('otherConcern')}
              />
            </div>
          )}
        </div>
        {errors.healthConcerns && (
          <span className="error_message text-destructive text-sm mt-2 block animate-shake">
            {errors.healthConcerns.message}
          </span>
        )}
      </div>

      {/* Current Medications (Optional) */}
      <div className="form mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="medications" className="text-sm font-medium">
            Current Medications
          </Label>
          <span className="optional text-xs text-muted-foreground">(optional)</span>
        </div>
        <Textarea
          id="medications"
          placeholder="List any medications you're currently taking"
          rows={4}
          className="w-full resize-y min-h-[100px]"
          {...register('medications')}
        />
      </div>

      {/* Allergies (Optional) */}
      <div className="form mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="allergies" className="text-sm font-medium">
            Allergies
          </Label>
          <span className="optional text-xs text-muted-foreground">(optional)</span>
        </div>
        <Textarea
          id="allergies"
          placeholder="List any known allergies"
          rows={4}
          className="w-full resize-y min-h-[100px]"
          {...register('allergies')}
        />
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