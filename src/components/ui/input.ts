import { createElement } from '../../lib/createElement';

export function createInputElement(
  type: string,
  name: string,
  id: string,
  placeholder?: string,
  value?: string,
): HTMLInputElement {
  const input = createElement('input') as HTMLInputElement;
  input.type = type;
  input.name = name;
  input.id = id;
  if (placeholder) {
    input.placeholder = placeholder;
  }
  if (value) {
    input.value = value;
  }
  return input;
}
