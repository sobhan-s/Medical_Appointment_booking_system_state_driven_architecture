import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  completeFormValidations,
  type CompleteFormData,
} from '../../validations/index';
import { useAppContext } from '../../context/app.contexts';
import { PersonalInfo } from '../../pages/PersonalInfo';
import { AppointmentInfo } from '../../pages/AppointmentInfo';
import { MedicalInfo } from '../../pages/MedicalInfo';
import { FinalDetails } from '../../pages/FinalDetails';

export const MultiStepForm: React.FC = () => {
  const { currentStep, formData, isEditMode } = useAppContext();

  const methods = useForm<CompleteFormData>({
    resolver: zodResolver(completeFormValidations),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      phonePrefix: '+91',
      phone: '',
      lastVisit: '',
      doctor: '',
      appointmentDate: '',
      timeSlot: '',
      reasonForVisit: '',
      healthConcerns: [],
      otherConcern: '',
      medications: '',
      allergies: '',
      medicalRecord: '',
      consultationType: '',
      term1: false,
      term2: false,
      notifications: [],
    },
  });

  useEffect(() => {
    methods.reset({
      email: formData.email || '',
      name: formData.name || '',
      phonePrefix: formData.phonePrefix || '+91',
      phone: formData.phone || '',
      lastVisit: formData.lastVisit || '',
      doctor: formData.doctor || '',
      appointmentDate: formData.appointmentDate || '',
      timeSlot: formData.timeSlot || '',
      reasonForVisit: formData.reasonForVisit || '',
      healthConcerns: formData.healthConcerns || [],
      otherConcern: formData.otherConcern || '',
      medications: formData.medications || '',
      allergies: formData.allergies || '',
      medicalRecord: formData.medicalRecord || '',
      consultationType: formData.consultationType || '',
      term1: formData.term1 || false,
      term2: formData.term2 || false,
      notifications: formData.notifications || [],
    });
  }, [formData, methods, isEditMode]);

  const onSubmit = (data: CompleteFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="appointmentForm"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <PersonalInfo />
        </div>
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <AppointmentInfo />
        </div>
        <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
          <MedicalInfo />
        </div>
        <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
          <FinalDetails />
        </div>
      </form>
    </FormProvider>
  );
};
