import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputFieldProps } from '@/types';

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  error
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
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