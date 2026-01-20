import { state } from '../app.state';
import { PersonalInfo } from './steps/basicInfo';
import { createElement } from '../lib/createElement';
import { AppointmentInfo } from './steps/appointmentInfo';

export function multiStepForm(): HTMLFormElement {
  const form = createElement('form', 'appointmentForm') as HTMLFormElement;

  const personalInfo = PersonalInfo();
  const appointmentInfo = AppointmentInfo();

  if (state.currentStep !== 1) personalInfo.classList.remove('active');
  if (state.currentStep !== 2) appointmentInfo.classList.remove('active');

  form.appendChild(personalInfo);
  form.appendChild(appointmentInfo);

  form.addEventListener('click', (e: Event): void => {
    e.preventDefault();
  });

  return form;
}
