export function generateId(prefix: string = 'appointment'): string {
  return `${prefix}-${Date.now()}`;
}

export function parseEditId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('edit');
}

export function clearEditParam(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('edit');
  window.history.replaceState({}, '', url.toString());
}
