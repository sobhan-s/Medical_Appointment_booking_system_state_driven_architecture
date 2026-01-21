import { state } from '../../app.state';
import { validateStep2, checkDuplicateAppointment } from '../../app.logic';
import { createElement } from '../../lib/createElement';
import {
  createInputElement,
  createLabelElement,
  createSelectElement,
  createTextareaElement,
} from '../formComponents/index';
import {
  showError,
  clearError,
  addErrorClass,
  removeErrorClass,
} from '../../utils/error';
import { createButton } from '../button';
import { renderApp } from '../app';

export function AppointmentInfo(): HTMLDivElement {
  const container = createElement('div', 'form_step');
  container.classList.add('active');
  container.setAttribute('step', '2');

  const heading = createElement(
    'h2',
    'appointmentDetailsHeader',
    'Appointment details',
  );
  container.appendChild(heading);

  const doctorForm = createElement('div', 'form');
  doctorForm.appendChild(createLabelElement('Select a doctor', true));
  const doctorSelect = createSelectElement(
    'doctor',
    'doctor',
    [
      { value: '', text: 'Select a doctor' },
      { value: 'Dr sobhan1', text: 'Dr sobhan1 - doctor 1' },
      { value: 'Dr sobhan2', text: 'Dr sobhan2 - doctor 2' },
      { value: 'Dr sobhan3', text: 'Dr sobhan3 - doctor 3' },
      { value: 'Dr sobhan4', text: 'Dr sobhan4 - doctor 4' },
      { value: 'Dr sobhan5', text: 'Dr sobhan5 - doctor 5' },
    ],
    state.formData.doctor,
  );
  doctorForm.appendChild(doctorSelect);

  doctorSelect.addEventListener('change', (): void => {
    state.formData.doctor = doctorSelect.value;
    const errors = validateStep2(state.formData);
    if (errors.doctor) {
      showError(doctorForm, errors.doctor);
      addErrorClass(doctorSelect);
    } else {
      clearError(doctorForm);
      removeErrorClass(doctorSelect);
    }
  });

  container.appendChild(doctorForm);

  const dateForm = createElement('div', 'form');
  dateForm.appendChild(createLabelElement('Preferred Date', true));
  const dateInput = createInputElement(
    'date',
    'appointmentDate',
    'appointmentDate',
    '',
    state.formData.appointmentDate,
  );
  dateForm.appendChild(dateInput);

  dateInput.addEventListener('change', (): void => {
    state.formData.appointmentDate = dateInput.value;
    const errors = validateStep2(state.formData);
    if (errors.appointmentDate) {
      showError(dateForm, errors.appointmentDate);
      addErrorClass(dateInput);
    } else {
      clearError(dateForm);
      removeErrorClass(dateInput);
    }
  });

  container.appendChild(dateForm);

  const timeForm = createElement('div', 'form');
  timeForm.appendChild(createLabelElement('Preferred Time Slot', true));
  const timeSelect = createSelectElement(
    'timeSlot',
    'timeSlot',
    [
      { value: '', text: 'Select a time slot' },
      { value: '09:00-10:00', text: '09:00 AM - 10:00 AM' },
      { value: '10:00-11:00', text: '10:00 AM - 11:00 AM' },
      { value: '11:00-12:00', text: '11:00 AM - 12:00 PM' },
      { value: '12:00-1:00', text: '12:00 AM - 1:00 PM' },
      { value: '2:00-3:00', text: '02:00 PM - 03:00 PM' },
      { value: '3:00-4:00', text: '03:00 PM - 04:00 PM' },
      { value: '4:00-5:00', text: '04:00 PM - 05:00 PM' },
    ],
    state.formData.timeSlot,
  );
  timeForm.appendChild(timeSelect);

  timeSelect.addEventListener('change', (): void => {
    state.formData.timeSlot = timeSelect.value;
    const errors = validateStep2(state.formData);
    if (errors.timeSlot) {
      showError(timeForm, errors.timeSlot);
      addErrorClass(timeSelect);
    } else {
      clearError(timeForm);
      removeErrorClass(timeSelect);
    }
  });

  container.appendChild(timeForm);

  const reasonForm = createElement('div', 'form');
  reasonForm.appendChild(createLabelElement('Reason For Visit', true));
  const reasonTextarea = createTextareaElement(
    'reasonForVisit',
    'reasonForVisit',
    '',
    state.formData.reasonForVisit,
  );
  reasonTextarea.setAttribute('minlength', '10');
  reasonTextarea.setAttribute('maxlength', '200');
  reasonForm.appendChild(reasonTextarea);

  reasonTextarea.addEventListener('input', (): void => {
    state.formData.reasonForVisit = reasonTextarea.value.trim();
    const errors = validateStep2(state.formData);
    if (errors.reasonForVisit) {
      showError(reasonForm, errors.reasonForVisit);
      addErrorClass(reasonTextarea);
    } else {
      clearError(reasonForm);
      removeErrorClass(reasonTextarea);
    }
  });

  container.appendChild(reasonForm);

  const navForm = createElement('div', 'next_form');
  const prevBtn = createButton('Previous', 'btn prev_btn', 'button');
  const nextBtn = createButton('Next', 'btn next_btn', 'button');
  nextBtn.id = 'next2';
  prevBtn.id = 'prev2';

  // const errors = validateStep2(state.formData);
  // nextBtn.disabled = Object.keys(errors).length > 0;

  prevBtn.addEventListener('click', (): void => {
    state.currentStep = 1;
    renderApp();
  });

  // nextBtn.removeEventListener('click')
  nextBtn.addEventListener('click', (): void => {
    // console.log('next button is clicked ');
    // alert('askdhfiasdf');
    const errors = validateStep2(state.formData);
    if (Object.keys(errors).length === 0) {
      const fullPhone = state.formData.phonePrefix + state.formData.phone;
      const isDuplicate = checkDuplicateAppointment(
        state.appointments,
        state.formData.email,
        fullPhone,
        state.formData.appointmentDate,
        state.editingId,
      );

      if (isDuplicate && !state.isEditMode) {
        alert(
          '⚠️ Duplicate Appointment Detected!\n\nYou already have an appointment scheduled on ' +
            state.formData.appointmentDate,
        );
        return;
      }

      state.currentStep = 3;
      renderApp();
    }
  });

  navForm.appendChild(prevBtn);
  navForm.appendChild(nextBtn);
  container.appendChild(navForm);

  return container;
}
