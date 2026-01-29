import { forwardRef } from 'react';
import type { ITextAreaProps } from '../../types/uiElement.types';

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (
    {
      name,
      id,
      placeHolder,
      value,
      onChange,
      disabled = false,
      rows,
      cols,
      className,
      ...restProps
    },
    ref,
  ) => {
    return (
      <textarea
        ref={ref}
        name={name}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        cols={cols}
        className={className}
        {...restProps}
      />
    );
  },
);
