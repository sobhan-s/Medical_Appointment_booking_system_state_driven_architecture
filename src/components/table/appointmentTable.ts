import { sortAppointments } from '../../app.storage';
import { createElement } from '../../lib/createElement';
import { createTableRow } from './tableOpration';

export function AppointmentsTable(): HTMLDivElement {
  const container = createElement('div', 'tableContainer');
  container.id = 'tableContainer';

  const wrapper = createElement('div', 'tableWrapper');

  const table = createElement('table') as HTMLTableElement;
  table.id = 'appointmentsTable';

  const thead = createElement('thead', 'tableHead') as HTMLTableSectionElement;
  const headerRow = createElement('tr', 'tableRow') as HTMLTableRowElement;

  const headers = [
    'Appointment Date',
    'Time Slot',
    'Patient Name',
    'Email',
    'Phone',
    'Doctor',
    'Reason For Visit',
    'Health Concerns',
    'Medication',
    'Allergies',
    'Medical Record',
    'Consultation',
    'Actions',
  ];

  headers.forEach((text) => {
    const th = createElement('th', '', text) as HTMLTableCellElement;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = createElement('tbody') as HTMLTableSectionElement;
  tbody.id = 'tableBody';

  const sorted = sortAppointments();

  if (sorted.length === 0) {
    const emptyRow = createElement('tr') as HTMLTableRowElement;
    const emptyCell = createElement(
      'td',
      'noAppointment',
    ) as HTMLTableCellElement;
    emptyCell.setAttribute('colspan', '13');

    const emptyHeading = createElement('h3', '', 'No appointments found');
    const emptyText = createElement(
      'p',
      '',
      'There are no appointments to display.',
    );

    emptyCell.appendChild(emptyHeading);
    emptyCell.appendChild(emptyText);
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
  } else {
    sorted.forEach((apt) => {
      const row = createTableRow(apt);
      tbody.appendChild(row);
    });
  }

  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);

  return container;
}
