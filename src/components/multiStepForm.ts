import { state } from '../app.state';
import { PersonalInfo } from '../pages/basicInfo';
import { createElement } from '../lib/createElement';
import { AppointmentInfo } from '../pages/appointmentInfo';
import { MedicalInfo } from '../pages/medicalInfo';
import { FinalDetails } from '../pages/finalDetail';

export function multiStepForm(): HTMLFormElement {
  const form = createElement('form', 'appointmentForm') as HTMLFormElement;

  const personalInfo = PersonalInfo();
  const appointmentInfo = AppointmentInfo();
  const medicationInfo = MedicalInfo();
  const finalDetailInfo = FinalDetails();

  if (state.currentStep !== 1) personalInfo.classList.remove('active');
  if (state.currentStep !== 2) appointmentInfo.classList.remove('active');
  if (state.currentStep !== 3) medicationInfo.classList.remove('active');
  if (state.currentStep !== 4) finalDetailInfo.classList.remove('active');

  form.appendChild(personalInfo);
  form.appendChild(appointmentInfo);
  form.appendChild(medicationInfo);
  form.appendChild(finalDetailInfo);

  form.addEventListener('submit', (e: Event): void => {
    e.preventDefault();
  });

  return form;
}
