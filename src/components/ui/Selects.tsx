import type {
  IOptions,
  ISelectElementProps,
} from '../../types/uiElement.types';

export const Select: React.FC<ISelectElementProps> = ({
  name,
  id,
  options,
  value,
  onChange,
  disabled = false,
  className,
  ...restProps
}) => {
  return (
    <select
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
};
