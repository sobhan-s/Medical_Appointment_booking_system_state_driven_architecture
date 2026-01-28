import type { IInputProps } from '../../types/uiElement.types';

export const Input: React.FC<IInputProps> = ({
  type,
  name,
  className,
  id,
  placeholder,
  value,
  checked,
  onChange,
  disabled = false,
  ...restProps
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
      onChange={onChange}
      disabled={disabled}
      {...restProps}
    />
  );
};
