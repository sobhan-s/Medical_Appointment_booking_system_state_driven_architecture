export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface IInputProps {
  type: string;
  name: string;
  className?: string;
  id: string;
  placeholder?: string;
  value?: string;
  checked?: false | true;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface ICheckboxProps {
  name: string;
  id: string;
  value: string;
  labelText: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export interface IRadioElementProps {
  name: string;
  id: string;
  value: string;
  labelText: string;
  checked: boolean;
}

export interface ILabelProps {
  text: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

export interface IOptions {
  value: string;
  text: string;
}

export interface ISelectElementProps {
  name: string;
  id: string;
  options: IOptions[];
  value?: string;
}
