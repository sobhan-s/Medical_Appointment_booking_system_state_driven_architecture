import { createElement } from '../lib/createElement';

export function createRadioElement(
  name: string,
  id: string,
  value: string,
  labelText: string,
  checked: boolean = false,
): HTMLDivElement {
  const container = createElement('div', 'radio_items');

  const input = createElement('input') as HTMLInputElement;
  input.type = 'radio';
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
