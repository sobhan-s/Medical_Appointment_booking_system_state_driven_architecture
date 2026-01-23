// import { state } from '../app.state';
import { ProgressSection } from './forms/progressSection';
import { multiStepForm } from './forms/multiStepForm';
import { AppointmentsTable } from './table/appointmentTable';
import { createElement } from '../lib/createElement';
import { SuccessModal } from './modals/successModal';
import { initTheme } from '../app.storage';
import { ThemeSwitcher } from './themes/themeSwitcher';

export function renderApp(): void {
  initTheme();
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

  const headerWrapper = createElement('div', 'header_wrapper');
  // headerWrapper.appendChild(ThemeSwitcher());
  headerWrapper.appendChild(heading);

  leftPart.appendChild(heading);
  leftPart.appendChild(subtext);
  leftPart.appendChild(ProgressSection());

  const rightPart = createElement('div', 'right_part');
  rightPart.appendChild(multiStepForm());

  mainContainer.appendChild(leftPart);
  mainContainer.appendChild(rightPart);

  const dashboardContainer = createElement('div', 'container');

  const header = createElement('div', 'header');
  const jodi = createElement('div', 'jodi');

  const headerTitle = createElement('h1', '', '📋 Admin Dashboard');
  const headerDesc = createElement('p', '', 'Manage all patient appointments');
  jodi.appendChild(headerTitle);
  jodi.appendChild(headerDesc);
  header.appendChild(jodi);
  header.appendChild(ThemeSwitcher());
  // header.appendChild(headerDesc);

  dashboardContainer.appendChild(header);
  dashboardContainer.appendChild(AppointmentsTable());

  primeContainer.appendChild(mainContainer);
  primeContainer.appendChild(dashboardContainer);

  root.appendChild(primeContainer);
  root.appendChild(SuccessModal());
}
