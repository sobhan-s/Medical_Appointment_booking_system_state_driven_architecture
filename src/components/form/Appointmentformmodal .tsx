import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeFormValidations, type CompleteFormData } from '../../validations';
import { useAppStore } from '../../context/app.contexts';
import { PersonalInfo } from '../../pages/PersonalInfo';
import { AppointmentInfo } from '../../pages/AppointmentInfo';
import { MedicalInfo } from '../../pages/MedicalInfo';
import { FinalDetails } from '../../pages/FinalDetails';
import { ProgressSection } from './ProgressBar';
import {
  Dialog,
  DialogContent,
} from '../ui/dialog';

export const AppointmentFormModal: React.FC = () => {
  const {
    currentStep,
    formData,
    isEditMode,
    isModalOpen,
    setModalOpen,
    resetForm,
  } = useAppStore();

  const methods = useForm<CompleteFormData>({
    resolver: zodResolver(completeFormValidations),
    mode : "onChange",
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

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close? Unsaved changes will be lost.')) {
      resetForm();
      setModalOpen(false);
      window.location.reload()
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent
        className="max-w-[651px] max-h-[90vh] overflow-y-auto dialog_content"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="main_container flex flex-col lg:flex-row rounded-lg overflow-hidden">
           <div className="left_part w-full lg:w-60 bg-gradient-to-b from-[--color-primary] to-[--color-primary-dark] p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-semibold mb-2">
                  {isEditMode ? 'Update Appointment' : 'Book Appointment'}
                </h1>
                <p className="text-base opacity-90">
                  {isEditMode
                    ? 'Modify appointment details'
                    : 'Fill the form to schedule'}
                </p>
              </div>
            </div>
            <ProgressSection />
          </div>

          <div className="right_part   flex-1 p-6 lg:p-10 bg-[--color-card-bg]">
            <FormProvider {...methods}>
              <form className="appointmentForm" >
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};