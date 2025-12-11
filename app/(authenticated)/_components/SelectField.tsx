import React from 'react';
import { Label } from '@/components/ui/label';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  className = '',
  error,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-900">{label}</Label>
      <div className="relative">
        <select
          {...props}
          className={`w-full appearance-none px-3 py-2 border rounded-md bg-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron Icon for better UI */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};