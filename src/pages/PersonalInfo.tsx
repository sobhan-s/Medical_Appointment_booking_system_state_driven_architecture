import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/Selects';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/app.contexts';
import type { CompleteFormData } from '../validations/index';

export const PersonalInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<CompleteFormData>();

  const { setCurrentStep } = useAppContext();

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
    <div className="form_step active" data-step="1">
      <h2 className="basicInfo">Basic information</h2>

      <div className="form">
        <Label text="Email" required htmlFor="email" />
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && (
          <span className="errorMsg">{errors.email.message}</span>
        )}
      </div>

      <div className="form">
        <Label text="Full Name" required htmlFor="name" />
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
        />
        {errors.name && <span className="errorMsg">{errors.name.message}</span>}
      </div>

      <div className="form">
        <Label text="Phone Number" required htmlFor="phone" />
        <div className="phone_input_group">
          <Select
            id="phonePrefix"
            className="phone_prefix"
            options={[
              { value: '+91', text: '+91' },
              { value: '+1', text: '+1' },
              { value: '+44', text: '+44' },
              { value: '+61', text: '+61' },
              { value: '+81', text: '+81' },
            ]}
            {...register('phonePrefix')}
          />
          <Input
            type="tel"
            id="phone"
            placeholder="Enter your number"
            maxLength={10}
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <span className="errorMsg">{errors.phone.message}</span>
        )}
      </div>

      <div className="form">
        <Label text="Date of Last Visit" htmlFor="lastVisit" />
        <Input type="date" id="lastVisit" {...register('lastVisit')} />
        {errors.lastVisit && (
          <span className="errorMsg">{errors.lastVisit.message}</span>
        )}
      </div>

      <div className="next_form">
        <Button
          text="Next →"
          className="btn next_btn"
          type="button"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
