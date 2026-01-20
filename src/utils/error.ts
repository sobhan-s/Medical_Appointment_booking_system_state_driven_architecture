import { createElement } from '../lib/createElement';

export function showError(container: HTMLElement, message: string): void {
  clearError(container);

  const errorSpan = createElement('span', 'errorMsg', message);
  container.appendChild(errorSpan);
}

export function clearError(container: HTMLElement): void {
  const existing = container.querySelector('.errorMsg');
  if (existing) existing.remove();
}

export function addErrorClass(element: HTMLElement): void {
  element.classList.add('error');
}

export function removeErrorClass(element: HTMLElement): void {
  element.classList.remove('error');
  element.classList.add('success');
}
