import React, { memo } from 'react';

interface FormRadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}

const FormRadio: React.FC<FormRadioProps> = memo(({ checked, onChange, label, className }) => {
  return (
    <label
      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
        checked
          ? 'border-accent bg-accent/10'
          : 'border-white/10 hover:border-accent/50'
      } ${className}`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        checked
          ? 'border-accent bg-accent'
          : 'border-white/30'
      }`}>
        {checked && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>
      <span>{label}</span>
    </label>
  );
});

FormRadio.displayName = 'FormRadio';

export default FormRadio;