export interface InputFieldProps {
  label: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {}