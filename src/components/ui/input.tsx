import type { IInputProps } from '../../types/uiElement.types';

export const Input: React.FC<IInputProps> = ({ type, name, className }) => {
  return <input type={type} className={className} name={name} />;
};
