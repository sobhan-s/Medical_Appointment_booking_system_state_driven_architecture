import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/Selects';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/app.contexts';
import { checkDuplicateAppointment } from '../utils';
import type { CompleteFormData } from '../validations/index';

export const AppointmentInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<CompleteFormData>();

  const { setCurrentStep, appointments, isEditMode, editingId } =
    useAppContext();

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
        editingId,
      );

      if (isDuplicate && !isEditMode) {
        alert(
          '⚠️ Duplicate Appointment Detected!\n\nYou already have an appointment scheduled on ' +
            values.appointmentDate,
        );
        return;
      }

      setCurrentStep(3);
    }
  };

  return (
    <div className="form_step active" data-step="2">
      <h2 className="appointmentDetailsHeader">Appointment details</h2>

      <div className="form">
        <Label text="Select a doctor" required htmlFor="doctor" />
        <Select
          id="doctor"
          options={[
            { value: '', text: 'Select a doctor' },
            { value: 'Dr sobhan1', text: 'Dr sobhan1 - doctor 1' },
            { value: 'Dr sobhan2', text: 'Dr sobhan2 - doctor 2' },
            { value: 'Dr sobhan3', text: 'Dr sobhan3 - doctor 3' },
            { value: 'Dr sobhan4', text: 'Dr sobhan4 - doctor 4' },
            { value: 'Dr sobhan5', text: 'Dr sobhan5 - doctor 5' },
          ]}
          {...register('doctor')}
        />
        {errors.doctor && (
          <span className="errorMsg">{errors.doctor.message}</span>
        )}
      </div>

      <div className="form">
        <Label text="Preferred Date" required htmlFor="appointmentDate" />
        <Input
          type="date"
          id="appointmentDate"
          {...register('appointmentDate')}
        />
        {errors.appointmentDate && (
          <span className="errorMsg">
            {errors.appointmentDate.message}
          </span>
        )}
      </div>

      <div className="form">
        <Label text="Preferred Time Slot" required htmlFor="timeSlot" />
        <Select
          id="timeSlot"
          options={[
            { value: '', text: 'Select a time slot' },
            { value: '09:00-10:00', text: '09:00 AM - 10:00 AM' },
            { value: '10:00-11:00', text: '10:00 AM - 11:00 AM' },
            { value: '11:00-12:00', text: '11:00 AM - 12:00 PM' },
            { value: '12:00-1:00', text: '12:00 AM - 1:00 PM' },
            { value: '2:00-3:00', text: '02:00 PM - 03:00 PM' },
            { value: '3:00-4:00', text: '03:00 PM - 04:00 PM' },
            { value: '4:00-5:00', text: '04:00 PM - 05:00 PM' },
          ]}
          {...register('timeSlot')}
        />
        {errors.timeSlot && (
          <span className="errorMsg">{errors.timeSlot.message}</span>
        )}
      </div>

      <div className="form">
        <Label text="Reason For Visit" required htmlFor="reasonForVisit" />
        <TextArea
          id="reasonForVisit"
          placeHolder="Enter reason for visit"
          rows={4}
          {...register('reasonForVisit')}
        />
        {errors.reasonForVisit && (
          <span className="errorMsg">{errors.reasonForVisit.message}</span>
        )}
        <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
          Minimum 10 characters, Maximum 200 characters
        </small>
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
