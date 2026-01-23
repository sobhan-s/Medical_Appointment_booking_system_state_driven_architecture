import { createElement } from '../lib/createElement';

export function createLabelElement(
  text: string,
  required: boolean = false,
): HTMLLabelElement {
  const label = createElement('label');
  label.textContent = text + ' ';

  if (required) {
    const span = createElement('span', 'required', '*');
    label.appendChild(span);
  }

  return label;
}
