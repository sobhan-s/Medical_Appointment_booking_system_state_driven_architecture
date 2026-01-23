import { createElement } from '../../lib/createElement';

export function createButton(
  text: string,
  className: string,
  type: 'button' | 'submit' = 'button',
): HTMLButtonElement {
  const button = createElement('button', className, text) as HTMLButtonElement;
  button.type = type;
  return button;
}
