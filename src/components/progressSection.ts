import { state } from '../app.state';
import { createElement } from '../lib/createElement';
import type { ProgressStep } from '../types/progressStep.type';

const steps: ProgressStep[] = [
  { step: 1, title: 'Personal Info' },
  { step: 2, title: 'Appointment' },
  { step: 3, title: 'Medical Info' },
  { step: 4, title: 'Final Details' },
];

export function ProgressSection(): HTMLDivElement {
  const container = createElement('div', 'progress_section');

  steps.forEach(({ step, title }) => {
    const item = createElement('div', 'progress_items');
    item.setAttribute('step', step.toString());

    if (step < state.currentStep) {
      item.classList.add('complited');
    } else if (step === state.currentStep) {
      item.classList.add('active');
    }

    const stepNumber = createElement('div', 'progress_step_number');
    const span = createElement('span', '', step.toString());
    stepNumber.appendChild(span);

    const stepInfo = createElement('div', 'progress_step_info');
    const heading = createElement('h3', '', title);
    stepInfo.appendChild(heading);

    item.appendChild(stepNumber);
    item.appendChild(stepInfo);
    container.appendChild(item);
  });

  return container;
}
