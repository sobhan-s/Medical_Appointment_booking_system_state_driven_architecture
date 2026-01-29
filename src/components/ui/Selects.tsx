import { forwardRef } from 'react';
import type {
  IOptions,
  ISelectElementProps,
} from '../../types/uiElement.types';

export const Select = forwardRef<HTMLSelectElement, ISelectElementProps>(
  (
    {
      name,
      id,
      options,
      value,
      onChange,
      disabled = false,
      className,
      ...restProps
    },
    ref,
  ) => {
    return (
      <select
        ref={ref}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}
        {...restProps}
      >
        {options.map((opt: IOptions) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          );
        })}
      </select>
    );
  },
);
