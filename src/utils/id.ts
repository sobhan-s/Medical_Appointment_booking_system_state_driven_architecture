function generateId(prefix: string = 'appointment'): string {
  return `${prefix}-${Date.now()}`;
}

export { generateId };
