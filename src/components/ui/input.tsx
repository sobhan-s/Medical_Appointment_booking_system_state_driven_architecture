import { forwardRef } from 'react';
import type { IInputProps } from '../../types/uiElement.types';

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
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
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
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
  },
);
