import type { IRadioElementProps } from '../../types/uiElement.types';
import { Input } from './Input';

export const Radio: React.FC<IRadioElementProps> = ({
  name,
  id,
  value,
  labelText,
  checked = false,
  onChange,
  disabled = false,
  className = 'radio_items',
}) => {
  return (
    <div className={className}>
      <Input
        type="radio"
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
