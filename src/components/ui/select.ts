import { createElement } from '../../lib/createElement';

export function createSelectElement(
  name: string,
  id: string,
  options: { value: string; text: string }[],
  value?: string,
): HTMLSelectElement {
  const select = createElement('select') as HTMLSelectElement;
  select.name = name;
  select.id = id;

  options.forEach((opt) => {
    const option = createElement('option') as HTMLOptionElement;
    option.value = opt.value;
    option.textContent = opt.text;
    select.appendChild(option);
  });

  if (value) select.value = value;
  return select;
}
