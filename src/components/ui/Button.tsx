import type { IButtonProps } from '../../types/uiElement.types';

export const Button: React.FC<IButtonProps> = ({
  text,
  className,
  type = 'button',
  onClick,
  disabled = false,
  ...restProps
}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {text}
    </button>
  );
};
