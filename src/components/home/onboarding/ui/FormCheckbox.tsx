import React, { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FormCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = memo(({ checked, onChange, label, className }) => {
  return (
    <label
      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
        checked
          ? 'border-accent bg-accent/10'
          : 'border-white/10 hover:border-accent/50'
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        checked
          ? 'border-accent bg-accent'
          : 'border-white/30'
      }`}>
        {checked && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <span>{label}</span>
    </label>
  );
});

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;