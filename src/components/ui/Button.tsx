import type { IButtonProps } from '../../types/uiElement.types';

export const Button: React.FC<IButtonProps> = ({
  text,
  type = 'button',
  className,
}) => {
  return (
    <button type={type} className={className}>
      {text}
    </button>
  );
};
