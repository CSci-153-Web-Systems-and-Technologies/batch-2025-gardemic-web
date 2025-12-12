import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  id,
  className = '',
  error,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const inputName = name || inputId;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={inputId} className="text-sm font-medium text-gray-900">
        {label}
      </Label>
      <Input
        id={inputId}
        name={inputName}
        {...props}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};