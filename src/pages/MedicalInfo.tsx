import React, { useState, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
// import { Checkbox } from '../components/ui/CheckBox';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/app.contexts';
import type { CompleteFormData } from '../validations/index';

export const MedicalInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    control,
    getValues,
  } = useFormContext<CompleteFormData>();

  const { setCurrentStep } = useAppContext();
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
    { id: 'concern2', value: 'cough', label: 'cough' },
    { id: 'concern3', value: 'cancer', label: 'cancer' },
    { id: 'concern4', value: 'piles', label: 'piles' },
    { id: 'concern5', value: 'others', label: 'others' },
  ];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = getValues('healthConcerns') || [];
    if (checked) {
      setValue('healthConcerns', [...currentValues, value]);
    } else {
      setValue(
        'healthConcerns',
        currentValues.filter((v) => v !== value),
      );
    }
    trigger('healthConcerns');
  };

  return (
    <div className="form_step active" data-step="3">
      <h2 className="medicalInfoHeader">Medical Information</h2>

      <div className="form">
        <Label text="Current Concerns" required htmlFor="healthConcerns" />
        <div className="checkbox_group">
          {concerns.map(({ id, value, label }) => (
            <Controller
              key={id}
              name="healthConcerns"
              control={control}
              render={({ field }: any) => (
                <div className="checkbox_items">
                  <input
                    type="checkbox"
                    name="healthConcerns"
                    // labelText={label}
                    id={id}
                    value={value}
                    checked={field.value?.includes(value) || false}
                    onChange={(e) => {
                      handleCheckboxChange(value, e.target.checked);
                    }}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              )}
            />
          ))}

          {showOthersInput && (
            <Input
              type="text"
              id="otherConcern"
              placeholder="Enter your current concerns..."
              className="others-input"
              {...register('otherConcern')}
            />
          )}
        </div>
        {errors.healthConcerns && (
          <span className="error_message">{errors.healthConcerns.message}</span>
        )}
      </div>

      <div className="form">
        <Label text="Current Medications" htmlFor="medications" />
        <TextArea
          id="medications"
          placeHolder="List any medications you're currently taking"
          rows={4}
          {...register('medications')}
        />
        <label>
          <span className="optional">(optional)</span>
        </label>
      </div>

      <div className="form">
        <Label text="Allergies" htmlFor="allergies" />
        <TextArea
          id="allergies"
          placeHolder="List any known allergies"
          rows={4}
          {...register('allergies')}
        />
        <label>
          <span className="optional">(optional)</span>
        </label>
      </div>

      <div className="next_form">
        <Button
          text="Previous"
          className="btn prev_btn"
          type="button"
          onClick={handlePrevious}
        />
        <Button
          text="Next"
          className="btn next_btn"
          type="button"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
