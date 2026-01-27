import { state, initialFormData } from '../app.state';
import { validateStep4, formDataToAppointment } from '../validations/app.logic';
import { saveToStorage } from '../app.storage';
import { renderApp } from '../components/app';
import { createElement } from '../lib/createElement';
import {
  createLabelElement,
  createCheckboxElement,
  createRadioElement,
} from '../components/ui';
import { createButton } from '../components/ui/button';
import { clearError, showError } from '../utils/error';

export function FinalDetails(): HTMLDivElement {
  const container = createElement('div', 'form_step');
  container.classList.add('active');
  container.setAttribute('step', '4');

  const heading = createElement('h2', 'finalDetailHeader', 'Final Details');
  container.appendChild(heading);

  const recordForm = createElement('div', 'form');
  recordForm.appendChild(createLabelElement('Previous Medical Record', true));

  const recordGroup = createElement('div', 'radio_groups');

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

  records.forEach(({ id, value, label }) => {
    const checked = state.formData.medicalRecord === value;
    const radio = createRadioElement(
      'radioMedicalRecords',
      id,
      value,
      label,
      checked,
    );

    const input = radio.querySelector('input') as HTMLInputElement;
    input.addEventListener('change', (): void => {
      if (input.checked) {
        state.formData.medicalRecord = value;
        const errors = validateStep4(state.formData);
        if (errors.medicalRecord) {
          showError(recordForm, errors.medicalRecord);
        } else {
          clearError(recordForm);
        }
      }
    });

    recordGroup.appendChild(radio);
  });

  recordForm.appendChild(recordGroup);
  container.appendChild(recordForm);

  const consultForm = createElement('div', 'form');
  consultForm.appendChild(createLabelElement('Consultation Type', true));

  const consultGroup = createElement('div', 'radio_groups');

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

  consultTypes.forEach(({ id, value, label }) => {
    const checked = state.formData.consultationType === value;
    const radio = createRadioElement(
      'radioCousultationType',
      id,
      value,
      label,
      checked,
    );

    const input = radio.querySelector('input') as HTMLInputElement;
    input.addEventListener('click', (): void => {
      if (input.checked) {
        // console.log();
        state.formData.consultationType = value;
        const errors = validateStep4(state.formData);
        if (errors.consultationType) {
          showError(consultForm, errors.consultationType);
        } else {
          clearError(consultForm);
        }
      }
    });

    consultGroup.appendChild(radio);
  });

  consultForm.appendChild(consultGroup);
  container.appendChild(consultForm);

  const termsForm = createElement('div', 'form');
  termsForm.appendChild(createLabelElement('Accept terms', true));

  const termsLink = createElement(
    'a',
    'termsAndConditions',
    'terms and conditions',
  );
  termsLink.setAttribute('href', './layouts/termsAndCondition.html');
  termsLink.setAttribute('target', '_blank');
  termsForm.appendChild(termsLink);

  const termsGroup = createElement('div', 'checkbox_group');

  const term1Box = createCheckboxElement(
    'terms',
    'term1',
    'term1',
    'I have read and understand the above information and agree to the terms.',
    state.formData.term1,
  );
  const term2Box = createCheckboxElement(
    'terms',
    'term2',
    'term2',
    'Consent to the Use and Disclosure of Protected Health Information (PHI).',
    state.formData.term2,
  );

  const term1Input = term1Box.querySelector('input') as HTMLInputElement;
  const term2Input = term2Box.querySelector('input') as HTMLInputElement;

  term1Input.addEventListener('change', (): void => {
    state.formData.term1 = term1Input.checked;
    const errors = validateStep4(state.formData);
    if (errors.terms) {
      showError(termsForm, errors.terms);
    } else {
      clearError(termsForm);
    }
  });

  term2Input.addEventListener('change', (): void => {
    state.formData.term2 = term2Input.checked;
    const errors = validateStep4(state.formData);
    if (errors.terms) {
      showError(termsForm, errors.terms);
    } else {
      clearError(termsForm);
    }
  });

  termsGroup.appendChild(term1Box);
  termsGroup.appendChild(term2Box);
  termsForm.appendChild(termsGroup);
  container.appendChild(termsForm);

  const notifForm = createElement('div', 'form');
  notifForm.appendChild(createLabelElement('Notification Method', true));

  const notifGroup = createElement('div', 'checkbox_group');

  const notifOptions = [
    { id: 'notif1', value: 'Email', label: 'Email' },
    { id: 'notif2', value: 'SMS', label: 'SMS' },
    { id: 'notif3', value: 'Phone Call', label: 'Phone Call' },
  ];

  notifOptions.forEach(({ id, value, label }) => {
    const checked = state.formData.notifications.includes(value);
    const checkbox = createCheckboxElement(
      'notification',
      id,
      value,
      label,
      checked,
    );

    const input = checkbox.querySelector('input') as HTMLInputElement;
    input.addEventListener('change', (): void => {
      if (input.checked) {
        if (!state.formData.notifications.includes(value)) {
          state.formData.notifications.push(value);
        }
      } else {
        state.formData.notifications = state.formData.notifications.filter(
          (n) => n !== value,
        );
      }

      const errors = validateStep4(state.formData);
      if (errors.notifications) {
        showError(notifForm, errors.notifications);
      } else {
        clearError(notifForm);
      }
    });

    notifGroup.appendChild(checkbox);
  });

  notifForm.appendChild(notifGroup);
  container.appendChild(notifForm);

  const navForm = createElement('div', 'next_form');
  const prevBtn = createButton('Previous', 'btn prev_btn', 'button');
  const submitBtn = createButton(
    state.isEditMode ? 'Update Appointment' : 'Submit Appointment',
    'btn submit_btn',
    'submit',
  );

  // const errors = validateStep4(state.formData);
  //   submitBtn.disabled = Object.keys(errors).length > 0;

  prevBtn.addEventListener('click', (): void => {
    state.currentStep = 3;
    renderApp();
  });

  submitBtn.addEventListener('click', (e: Event): void => {
    e.preventDefault();

    const errors = validateStep4(state.formData);
    if (Object.keys(errors).length === 0) {
      if (state.isEditMode && state.editingId) {
        const index = state.appointments.findIndex(
          (apt) => apt.id === state.editingId,
        );
        if (index !== -1) {
          const existing = state.appointments[index];
          state.appointments[index] = {
            ...formDataToAppointment(state.formData, existing.id),
            submittedAt: existing.submittedAt,
          };
        }
      } else {
        const newAppointment = formDataToAppointment(state.formData);
        state.appointments.push(newAppointment);
      }

      saveToStorage();

      const modal = document.getElementById('successModal');
      if (modal) {
        modal.classList.add('show');
      }

      state.formData = { ...initialFormData };
      state.currentStep = 1;
      state.isEditMode = false;
      state.editingId = null;
    }
  });

  navForm.appendChild(prevBtn);
  navForm.appendChild(submitBtn);
  container.appendChild(navForm);

  return container;
}
