import { ProgressSection } from './progressSection';
import { createElement } from '../lib/createElement';
import { multiStepForm } from './multiStepForm';

export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = '';

  const primeContainer = createElement('div', 'primeContainer');
  const mainContainer = createElement('div', 'main_container');
  const leftPart = createElement('div', 'left_part');
  const heading = createElement('h1', '', 'Book Appointment');
  const subtext = createElement(
    'p',
    '',
    'Please fill the form to schedule an Appointment',
  );

  leftPart.appendChild(heading);
  leftPart.appendChild(subtext);
  leftPart.appendChild(ProgressSection());

  const rightPart = createElement('div', 'right_part');
  const frm = multiStepForm();

  rightPart.appendChild(frm);

  mainContainer.appendChild(leftPart);
  mainContainer.appendChild(rightPart);

  primeContainer.appendChild(mainContainer);

  root.appendChild(primeContainer);
}
