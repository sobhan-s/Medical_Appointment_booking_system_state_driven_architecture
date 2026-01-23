import { state } from '../app.state';
import { validateStep3 } from '../app.logic';
import { renderApp } from '../components/app';
import { createElement } from '../lib/createElement';
import {
  createLabelElement,
  createTextareaElement,
  createCheckboxElement,
  createInputElement,
} from '../components';

import { createButton } from '../components/button';

import { clearError, showError } from '../utils/error';

export function MedicalInfo(): HTMLDivElement {
  const container = createElement('div', 'form_step');
  container.classList.add('active');
  container.setAttribute('step', '3');
  const heading = createElement(
    'h2',
    'medicalInfoHeader',
    'Medical Information',
  );

  container.appendChild(heading);

  const concernsForm = createElement('div', 'form');

  concernsForm.appendChild(createLabelElement('Current Concerns', true));

  const concernsGroup = createElement('div', 'checkbox_group');
  let othersTextBox: HTMLInputElement | null = null;

  const concerns = [
    { id: 'concern1', value: 'Fever', label: 'Fever' },
    { id: 'concern2', value: 'cough', label: 'cough' },
    { id: 'concern3', value: 'cancer', label: 'cancer' },
    { id: 'concern4', value: 'piles', label: 'piles' },
    { id: 'concern5', value: 'others', label: 'others' },
  ];

  concerns.forEach(({ id, value, label }) => {
    const checked = state.formData.healthConcerns.includes(value);

    const checkboxWrapper = createCheckboxElement(
      'healthConcerns',
      id,
      value,
      label,
      checked,
    );

    const input = checkboxWrapper.querySelector('input') as HTMLInputElement;

    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;

      if (value === 'others') {
        if (target.checked) {
          othersTextBox = createInputElement(
            'text',
            'othersTextBox',
            'Enter your current concerns...',
          );

          othersTextBox.classList.add('others-input');

          othersTextBox.addEventListener('input', (e) => {
            const inputTarget = e.target as HTMLInputElement;

            state.formData.otherConcern = inputTarget.value.trim();
          });

          if (state.formData.otherConcern) {
            othersTextBox.value = state.formData.otherConcern;
          }

          concernsGroup.appendChild(othersTextBox);
        } else {
          if (othersTextBox && othersTextBox.parentNode) {
            othersTextBox.parentNode.removeChild(othersTextBox);
            othersTextBox = null;
          }
          state.formData.otherConcern = '';
        }
      }

      if (target.checked) {
        if (!state.formData.healthConcerns.includes(value)) {
          state.formData.healthConcerns.push(value);
        }
      } else {
        state.formData.healthConcerns = state.formData.healthConcerns.filter(
          (c) => c !== value,
        );
      }

      const errors = validateStep3(state.formData);

      if (errors.healthConcerns) {
        showError(concernsForm, errors.healthConcerns);
      } else {
        clearError(concernsForm);
      }
    });

    concernsGroup.appendChild(checkboxWrapper);
  });

  if (state.formData.healthConcerns.includes('others')) {
    othersTextBox = createInputElement(
      'text',
      'othersTextBox',
      'Enter your current concerns...',
    );

    othersTextBox.classList.add('othersInput');

    othersTextBox.addEventListener('input', (e) => {
      const inputTarget = e.target as HTMLInputElement;

      state.formData.otherConcern = inputTarget.value.trim();
    });

    if (state.formData.otherConcern) {
      othersTextBox.value = state.formData.otherConcern;
    }

    concernsGroup.appendChild(othersTextBox);
  }

  concernsForm.appendChild(concernsGroup);
  container.appendChild(concernsForm);

  const medsForm = createElement('div', 'form');
  medsForm.appendChild(createLabelElement('Current Medications', false));
  const medsTextarea = createTextareaElement(
    'medications',
    'medications',
    "List any medications you're currently taking",
    state.formData.medications,
  );

  medsForm.appendChild(medsTextarea);

  const optionalLabel = createElement('label');

  optionalLabel.innerHTML = '<span class="optional">(optional)</span>';

  medsForm.appendChild(optionalLabel);

  medsTextarea.addEventListener('input', () => {
    state.formData.medications = medsTextarea.value.trim();
  });

  container.appendChild(medsForm);
  const allergiesForm = createElement('div', 'form');

  allergiesForm.appendChild(createLabelElement('Allergies', false));

  const allergiesTextarea = createTextareaElement(
    'allergies',
    'allergies',
    'List any known allergies',
    state.formData.allergies,
  );

  allergiesForm.appendChild(allergiesTextarea);
  const optionalLabel2 = createElement('label');

  optionalLabel2.innerHTML = '<span class="optional">(optional)</span>';
  allergiesForm.appendChild(optionalLabel2);

  allergiesTextarea.addEventListener('input', () => {
    state.formData.allergies = allergiesTextarea.value.trim();
  });
  container.appendChild(allergiesForm);

  const navForm = createElement('div', 'next_form');

  const prevBtn = createButton('Previous', 'btn prev_btn', 'button');
  prevBtn.id = 'prev3';

  const nextBtn = createButton('Next', 'btn next_btn', 'button');
  nextBtn.id = 'next3';

  prevBtn.addEventListener('click', () => {
    state.currentStep = 2;

    renderApp();
  });

  nextBtn.addEventListener('click', () => {
    const errors = validateStep3(state.formData);

    if (Object.keys(errors).length === 0) {
      state.currentStep = 4;

      renderApp();
    } else {
      if (errors.healthConcerns) {
        showError(concernsForm, errors.healthConcerns);
      }
    }
  });

  navForm.appendChild(prevBtn);
  navForm.appendChild(nextBtn);
  container.appendChild(navForm);

  return container;
}
