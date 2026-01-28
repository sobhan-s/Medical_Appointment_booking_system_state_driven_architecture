import type { ICheckboxProps } from '../../types/uiElement.types';
import { Input } from './Input';

export const Checkbox: React.FC<ICheckboxProps> = ({
  name,
  id,
  value,
  labelText,
  checked = false,
  onChange,
  disabled = false,
  className = 'checkbox_items',
}) => {
  return (
    <div className={className}>
      <Input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};
