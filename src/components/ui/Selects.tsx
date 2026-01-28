import { IOptions, ISelectElementProps } from '../../types/uiElement.types';

export const Select: React.FC<ISelectElementProps> = ({
  name,
  id,
  options,
  value,
}) => {
  return (
    <select name={name} id={id} value={value}>
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
