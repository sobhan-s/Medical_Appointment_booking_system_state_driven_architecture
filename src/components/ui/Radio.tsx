import { forwardRef } from 'react';
import type { IRadioElementProps } from '../../types/uiElement.types';

export const Radio = forwardRef<HTMLInputElement, IRadioElementProps>(
  (
    {
      name,
      id,
      value,
      labelText,
      checked,
      onChange,
      disabled = false,
      className = 'radio_items',
      ...restProps
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <input
          ref={ref}
          type="radio"
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
