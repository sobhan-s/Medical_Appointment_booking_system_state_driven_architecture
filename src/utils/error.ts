import { createElement } from '../lib/createElement';

function showError(container: HTMLElement, message: string): void {
  clearError(container);

  const errorSpan = createElement('span', 'errorMsg', message);
  container.appendChild(errorSpan);
}

function clearError(container: HTMLElement): void {
  const existing = container.querySelector('.errorMsg');
  if (existing) existing.remove();
}

function addErrorClass(element: HTMLElement): void {
  element.classList.add('error');
}

function removeErrorClass(element: HTMLElement): void {
  element.classList.remove('error');
  element.classList.add('success');
}

export { showError, clearError, addErrorClass, removeErrorClass };
