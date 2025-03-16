import React, { memo } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  id?: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = memo(({ id, label, icon: Icon, error, children }) => {
  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
        {Icon && <Icon className="w-5 h-5 text-accent" />}
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;