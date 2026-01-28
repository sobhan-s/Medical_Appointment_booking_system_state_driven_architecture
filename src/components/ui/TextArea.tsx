import type { ITextAreaProps } from '../../types/uiElement.types';

export const TextArea: React.FC<ITextAreaProps> = ({
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
}) => {
  return (
    <textarea
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
};
