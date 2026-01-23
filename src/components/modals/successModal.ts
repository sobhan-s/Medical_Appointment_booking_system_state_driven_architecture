import { state } from '../../app.state';
import { renderApp } from '../app';
import { createElement } from '../../lib/createElement';

export function SuccessModal(): HTMLDivElement {
  const modal = createElement('div', 'modal');
  modal.id = 'successModal';

  const content = createElement('div', 'modal_content');

  const icon = createElement('div', 'success_icon', '✔');
  content.appendChild(icon);

  const heading = createElement('h2', 'apt');
  heading.textContent = 'Appointment ';
  const bookedSpan = createElement(
    'span',
    'booked',
    state.isEditMode ? 'Updated' : 'Booked',
  );
  heading.appendChild(bookedSpan);
  heading.appendChild(document.createTextNode('!'));
  content.appendChild(heading);

  const para = createElement('p', 'para');
  para.textContent = 'Your appointment has been successfully ';
  const submittedSpan = createElement(
    'span',
    'submitted',
    state.isEditMode ? 'updated' : 'submitted',
  );
  para.appendChild(submittedSpan);
  para.appendChild(
    document.createTextNode(
      '. You will receive a confirmation via your selected notification method.',
    ),
  );
  content.appendChild(para);

  const closeBtn = createElement('button', 'btn', 'Close') as HTMLButtonElement;
  closeBtn.addEventListener('click', (): void => {
    modal.classList.remove('show');
    renderApp();
  });
  content.appendChild(closeBtn);

  modal.appendChild(content);

  return modal;
}
