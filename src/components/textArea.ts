import { createElement } from '../lib/createElement';

export function createTextareaElement(
  name: string,
  id: string,
  placeholder?: string,
  value?: string,
): HTMLTextAreaElement {
  const textArea = createElement('textarea') as HTMLTextAreaElement;
  textArea.name = name;
  textArea.id = id;
  if (placeholder) {
    textArea.placeholder = placeholder;
  }

  if (value) {
    textArea.value = value;
  }

  return textArea;
}
