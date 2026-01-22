import { state } from '../app.state';
import { validateStep1 } from '../app.logic';
import { createElement } from '../lib/createElement';
import {
  createInputElement,
  createLabelElement,
  createSelectElement,
} from '../components/formComponents/index';
import {
  showError,
  clearError,
  addErrorClass,
  removeErrorClass,
} from '../utils/error';
import { createButton } from '../components/button';
import { renderApp } from '../components/app';

export function PersonalInfo(): HTMLDivElement {
  const container = createElement('div', 'form_step');
  container.classList.add('active');
  container.setAttribute('step', '1');

  const heading = createElement('h2', 'basicInfo', 'Basic information');
  container.appendChild(heading);

  const emailForm = createElement('div', 'form');
  emailForm.appendChild(createLabelElement('Email', true));
  const emailInput = createInputElement(
    'email',
    'email',
    'email',
    'Enter your email',
    state.formData.email,
  );
  emailForm.appendChild(emailInput);

  emailInput.addEventListener('input', (): void => {
    state.formData.email = emailInput.value.trim();
    const errors = validateStep1(state.formData);
    if (errors.email) {
      showError(emailForm, errors.email);
      addErrorClass(emailInput);
    } else {
      clearError(emailForm);
      removeErrorClass(emailInput);
    }
  });

  container.appendChild(emailForm);

  const nameForm = createElement('div', 'form');
  nameForm.appendChild(createLabelElement('Full Name', true));
  const nameInput = createInputElement(
    'text',
    'name',
    'name',
    'Enter your name',
    state.formData.name,
  );
  nameForm.appendChild(nameInput);

  nameInput.addEventListener('input', (): void => {
    state.formData.name = nameInput.value.trim();
    const errors = validateStep1(state.formData);
    if (errors.name) {
      showError(nameForm, errors.name);
      addErrorClass(nameInput);
    } else {
      clearError(nameForm);
      removeErrorClass(nameInput);
    }
  });

  container.appendChild(nameForm);

  const phoneForm = createElement('div', 'form');
  phoneForm.appendChild(createLabelElement('Phone Number', true));

  const phoneGroup = createElement('div', 'phone_input_group');

  const prefixSelect = createSelectElement(
    'phonePrefix',
    'phonePrefix',
    [
      { value: '+91', text: '+91' },
      { value: '+1', text: '+1' },
      { value: '+44', text: '+44' },
      { value: '+61', text: '+61' },
      { value: '+81', text: '+81' },
    ],
    state.formData.phonePrefix,
  );
  prefixSelect.className = 'phone_prefix';

  const phoneInput = createInputElement(
    'tel',
    'phone',
    'phone',
    'Enter your number',
    state.formData.phone,
  );
  phoneInput.setAttribute('maxlength', '10');

  prefixSelect.addEventListener('change', (): void => {
    state.formData.phonePrefix = prefixSelect.value;
  });

  phoneInput.addEventListener('input', (): void => {
    state.formData.phone = phoneInput.value.trim();
    const errors = validateStep1(state.formData);
    if (errors.phone) {
      showError(phoneForm, errors.phone);
      addErrorClass(phoneInput);
    } else {
      clearError(phoneForm);
      removeErrorClass(phoneInput);
    }
  });

  phoneGroup.appendChild(prefixSelect);
  phoneGroup.appendChild(phoneInput);
  phoneForm.appendChild(phoneGroup);
  container.appendChild(phoneForm);

  const lastVisitForm = createElement('div', 'form');
  lastVisitForm.appendChild(createLabelElement('Date of Last Visit', false));
  const lastVisitInput = createInputElement(
    'date',
    'lastVisit',
    'lastVisit',
    '',
    state.formData.lastVisit,
  );
  lastVisitForm.appendChild(lastVisitInput);

  lastVisitInput.addEventListener('change', (): void => {
    state.formData.lastVisit = lastVisitInput.value;
    const errors = validateStep1(state.formData);
    if (errors.lastVisit) {
      showError(lastVisitForm, errors.lastVisit);
      addErrorClass(lastVisitInput);
    } else {
      clearError(lastVisitForm);
      removeErrorClass(lastVisitInput);
    }
  });

  container.appendChild(lastVisitForm);

  const navForm = createElement('div', 'next_form');
  const nextBtn = createButton('Next →', 'btn next_btn', 'button');
  nextBtn.id = 'next1';

  // const errors = validateStep1(state.formData);
  // console.log(errors);
  // nextBtn.disabled = Object.keys(errors).length > 0;

  nextBtn.addEventListener('click', (): void => {
    // alert('clicked');
    const errors = validateStep1(state.formData);
    if (Object.keys(errors).length === 0) {
      state.currentStep = 2;
      renderApp();
    }
    // console.log(state.currentStep);
  });

  // nextBtn.removeEventListener('click', () => console.log('event is removed'));

  navForm.appendChild(nextBtn);
  container.appendChild(navForm);

  return container;
}
