// import { state } from '../app.state';
import { ProgressSection } from './progressSection';
import { multiStepForm } from './multiStepForm';
import { AppointmentsTable } from './appointmentTable';
import { createElement } from '../lib/createElement';
import { SuccessModal } from './successModal';

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
  rightPart.appendChild(multiStepForm());

  mainContainer.appendChild(leftPart);
  mainContainer.appendChild(rightPart);

  const dashboardContainer = createElement('div', 'container');

  const header = createElement('div', 'header');
  const headerTitle = createElement('h1', '', '📋 Admin Dashboard');
  const headerDesc = createElement('p', '', 'Manage all patient appointments');
  header.appendChild(headerTitle);
  header.appendChild(headerDesc);

  dashboardContainer.appendChild(header);
  dashboardContainer.appendChild(AppointmentsTable());

  primeContainer.appendChild(mainContainer);
  primeContainer.appendChild(dashboardContainer);

  root.appendChild(primeContainer);
  root.appendChild(SuccessModal());
}
