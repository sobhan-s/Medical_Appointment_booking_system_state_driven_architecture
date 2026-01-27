import { state } from '../../app.state';
import { formatDate, appointmentToFormData } from '../../validations/app.logic';
import { saveToStorage } from '../../app.storage';
import { renderApp } from '../app';
import { createElement } from '../../lib/createElement';
import type { AppointmentFormData } from '../../types/formData.type';

function createTableRow(apt: AppointmentFormData): HTMLTableRowElement {
  const row = createElement('tr') as HTMLTableRowElement;

  const dateCell = createElement('td') as HTMLTableCellElement;
  const dateStrong = createElement(
    'strong',
    '',
    formatDate(apt.appointmentDate),
  );
  dateCell.appendChild(dateStrong);
  row.appendChild(dateCell);

  const timeCell = createElement(
    'td',
    '',
    apt.timeSlot,
  ) as HTMLTableCellElement;
  row.appendChild(timeCell);

  const nameCell = createElement('td') as HTMLTableCellElement;
  const nameStrong = createElement('strong', '', apt.name);
  nameCell.appendChild(nameStrong);
  row.appendChild(nameCell);

  const emailCell = createElement('td', '', apt.email) as HTMLTableCellElement;
  row.appendChild(emailCell);

  const phoneCell = createElement(
    'td',
    '',
    apt.phonePrefix + apt.phone,
  ) as HTMLTableCellElement;
  row.appendChild(phoneCell);

  const doctorCell = createElement(
    'td',
    'doctor',
    apt.doctor,
  ) as HTMLTableCellElement;
  row.appendChild(doctorCell);

  const reasonCell = createElement(
    'td',
    '',
    apt.reasonForVisit,
  ) as HTMLTableCellElement;
  row.appendChild(reasonCell);

  const concernsCell = createElement(
    'td',
    'healthConcerns',
  ) as HTMLTableCellElement;
  apt.healthConcerns.forEach((concern) => {
    const tag = createElement('span', 'eachHealthTag', concern);
    concernsCell.appendChild(tag);
  });
  row.appendChild(concernsCell);

  const medsCell = createElement(
    'td',
    '',
    apt.medications || '-',
  ) as HTMLTableCellElement;
  row.appendChild(medsCell);

  const allergiesCell = createElement(
    'td',
    '',
    apt.allergies || '-',
  ) as HTMLTableCellElement;
  row.appendChild(allergiesCell);

  const recordCell = createElement(
    'td',
    '',
    apt.medicalRecord,
  ) as HTMLTableCellElement;
  row.appendChild(recordCell);

  const consultCell = createElement(
    'td',
    '',
    apt.consultationType,
  ) as HTMLTableCellElement;
  row.appendChild(consultCell);

  const actionsCell = createElement(
    'td',
    'internalBtn',
  ) as HTMLTableCellElement;

  const updateBtn = createElement(
    'button',
    'update_btn update',
    '✏️',
  ) as HTMLButtonElement;
  updateBtn.addEventListener('click', (): void => {
    handleUpdate(apt.id);
  });

  const deleteBtn = createElement(
    'button',
    'delete_btn delete',
    '❌',
  ) as HTMLButtonElement;
  deleteBtn.addEventListener('click', (): void => {
    handleDelete(apt.id);
  });

  actionsCell.appendChild(updateBtn);
  actionsCell.appendChild(deleteBtn);
  row.appendChild(actionsCell);

  return row;
}

function handleUpdate(id: string): void {
  const appointment = state.appointments.find((apt) => apt.id === id);
  if (!appointment) return;

  state.isEditMode = true;
  state.editingId = id;
  state.formData = appointmentToFormData(appointment);
  state.currentStep = 1;

  renderApp();

  const formSection = document.querySelector('.main_container');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleDelete(id: string): void {
  if (confirm('Do you want to delete this record?')) {
    state.appointments = state.appointments.filter((apt) => apt.id !== id);
    saveToStorage();
    renderApp();
  }
}

export { createTableRow };
