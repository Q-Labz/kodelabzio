import React, { memo } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput: React.FC<FormInputProps> = memo(({ error, className, ...props }) => {
  return (
    <input
      {...props}
      className={`w-full bg-deep-brown-200/40 border ${
        error ? 'border-red-500' : 'border-white/10'
      } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 ${className}`}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;