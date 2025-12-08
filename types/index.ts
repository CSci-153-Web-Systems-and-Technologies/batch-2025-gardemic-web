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
  error?: string;
}

export interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export interface CreateAccountFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarHeaderProps {
  isOpen: boolean;
}

export interface SidebarToggleProps {
  isLocked: boolean;
  onToggle: () => void;
}