import { forwardRef } from 'react';
import type { ICheckboxProps } from '../../types/uiElement.types';

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (
    {
      name,
      id,
      value,
      labelText,
      checked,
      onChange,
      disabled = false,
      className = 'checkbox_items',
      ...restProps
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <input
          ref={ref}
          type="checkbox"
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...restProps}
        />
        <label htmlFor={id}>{labelText}</label>
      </div>
    );
  },
);
