import type { IInputProps } from '../../types/uiElement.types';

export const Input: React.FC<IInputProps> = ({
  type,
  name,
  className,
  id,
  placeholder,
  value,
  checked,
}) => {
  return (
    <input
      type={type}
      className={className}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      checked={checked}
    />
  );
};
