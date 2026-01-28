import { IRadioElementProps } from '../../types/uiElement.types';
import { Input } from './input';

export const Radio: React.FC<IRadioElementProps> = ({
  name,
  id,
  value,
  labelText,
  checked = false,
}) => {
  return (
    <div className="radio_items">
      <Input type="radio" name={name} id={id} value={value} checked={checked} />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};
