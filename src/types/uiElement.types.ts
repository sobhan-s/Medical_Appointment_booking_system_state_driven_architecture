export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  id: string;
  className?: string;
  placeholder?: string;
  value?: string;
  checked?: boolean;
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
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
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
  disabled?: boolean;
}

export interface ISelectElementProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  id: string;
  options: IOptions[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
}

export interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  id: string;
  placeHolder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  className?: string;
}
