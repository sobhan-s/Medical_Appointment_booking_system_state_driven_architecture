import { ILabelProps } from '../../types/uiElement.types';

export const Label: React.FC<ILabelProps> = ({
  text,
  required = false,
  htmlFor,
  className,
}) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text} {required && <span className="required">*</span>}
    </label>
  );
};
