export interface ValidationErrors {
  [key: string]: string;
}

export interface ProgressStep {
  step: number;
  title: string;
}

export interface SelectOption {
  value: string;
  text: string;
}
