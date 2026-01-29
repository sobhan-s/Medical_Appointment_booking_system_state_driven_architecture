import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '../components/ui/Label';
import { Radio } from '../components/ui/Radio';
import { Checkbox } from '../components/ui/CheckBox';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/app.contexts';
import { formDataToAppointment } from '../utils/index';
import type { CompleteFormData } from '../validations/index';

export const FinalDetails: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<CompleteFormData>();

  const {
    setCurrentStep,
    addAppointment,
    updateAppointment,
    resetForm,
    isEditMode,
    editingId,
    appointments,
  } = useAppContext();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      }
    } else {
      const newAppointment = formDataToAppointment(data);
      addAppointment(newAppointment);
    }

    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      resetForm()
      window.location.reload()
    }, 2000);
    // resetForm()
  };

  const records = [
    { id: 'record1', value: 'X-rays', label: 'X-rays' },
    { id: 'record2', value: 'MRIs', label: 'MRIs' },
    {
      id: 'record3',
      value: 'Ultrasound recordings',
      label: 'Ultrasound recordings',
    },
    { id: 'record4', value: 'Mammograms', label: 'Mammograms' },
    { id: 'record5', value: 'others', label: 'others' },
  ];

  const consultTypes = [
    { id: 'consult1', value: 'Routine/Follow-up', label: 'Routine/Follow-up' },
    { id: 'consult2', value: 'Urgent/Acute', label: 'Urgent/Acute' },
    {
      id: 'consult3',
      value: 'Specialist/Inter-Physicians',
      label: 'Specialist/Inter-Physicians',
    },
    { id: 'consult4', value: 'others', label: 'others' },
  ];

  const notifOptions = [
    { id: 'notif1', value: 'Email', label: 'Email' },
    { id: 'notif2', value: 'SMS', label: 'SMS' },
    { id: 'notif3', value: 'Phone Call', label: 'Phone Call' },
  ];

  return (
    <>
      <div className="form_step active" data-step="4">
        <h2 className="finalDetailHeader">Final Details</h2>

        <div className="form">
          <Label
            text="Previous Medical Record"
            required
            htmlFor="medicalRecord"
          />
          <div className="radio_groups">
            {records.map(({ id, value, label }) => (
              <Radio
                key={id}
                // name="medicalRecord"
                id={id}
                value={value}
                labelText={label}
                {...register('medicalRecord')}
              />
            ))}
          </div>
          {errors.medicalRecord && (
            <span className="erroMsg">
              {errors.medicalRecord.message}
            </span>
          )}
        </div>

        <div className="form">
          <Label text="Consultation Type" required htmlFor="consultationType" />
          <div className="radio_groups">
            {consultTypes.map(({ id, value, label }) => (
              <Radio
                key={id}
                // name="consultationType"
                id={id}
                value={value}
                labelText={label}
                {...register('consultationType')}
              />
            ))}
          </div>
          {errors.consultationType && (
            <span className="erroMsg">
              {errors.consultationType.message}
            </span>
          )}
        </div>

        <div className="form">
          <Label text="Accept terms" required htmlFor="terms" />
          <a
            href="./layouts/termsAndCondition.html"
            target="_blank"
            rel="noopener noreferrer"
            className="termsAndConditions"
          >
            terms and conditions
          </a>
          <div className="checkbox_group">
            <Checkbox
              //   name="term1"
              id="term1"
              // value="term1"
              labelText="I have read and understand the above information and agree to the terms."
              {...register('term1')}
            />
            <Checkbox
              //   name="term2"
              id="term2"
              // value="term2"
              labelText="Consent to the Use and Disclosure of Protected Health Information (PHI)."
              {...register('term2')}
            />
          </div>
          {(errors.term1 || errors.term2) && (
            <span className="erroMsg">
              {errors.term1?.message || errors.term2?.message}
            </span>
          )}
        </div>

        <div className="form">
          <Label text="Notification Method" required htmlFor="notifications" />
          <div className="checkbox_group">
            {notifOptions.map(({ id, value, label }) => (
              <Checkbox
                key={id}
                // name="notifications"
                id={id}
                value={value}
                labelText={label}
                {...register('notifications')}
              />
            ))}
          </div>
          {errors.notifications && (
            <span className="erroMsg">
              {errors.notifications.message}
            </span>
          )}
        </div>

        <div className="next_form">
          <Button
            text="Previous"
            className="btn prev_btn"
            type="button"
            onClick={handlePrevious}
          />
          <Button
            text={isEditMode ? 'Update Appointment' : 'Submit Appointment'}
            className="btn submit_btn"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>

      {showSuccessModal && (
        <div id="successModal" className="show">
          <div className="modal_content">
            <div className="success_icon">✔</div>
            <h2 className="apt">
              Appointment{' '}
              <span className="booked">
                {isEditMode ? 'Updated' : 'Booked'}
              </span>
              !
            </h2>
            <p className="para">
              Your appointment has been successfully{' '}
              <span className="submitted">
                {isEditMode ? 'updated' : 'submitted'}
              </span>
              . You will receive a confirmation via your selected notification
              method.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
