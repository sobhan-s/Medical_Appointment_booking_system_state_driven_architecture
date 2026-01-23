import { createElement } from '../lib/createElement';

export function createCheckboxElement(
  name: string,
  id: string,
  value: string,
  labelText: string,
  checked: boolean = false,
): HTMLDivElement {
  const container = createElement('div', 'checkbox_items');

  const input = createElement('input') as HTMLInputElement;
  input.type = 'checkbox';
  input.name = name;
  input.id = id;
  input.value = value;
  input.checked = checked;

  const label = createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;

  container.appendChild(input);
  container.appendChild(label);

  return container;
}
