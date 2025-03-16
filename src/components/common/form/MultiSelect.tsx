import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder
}) => {
  const handleRemove = (item: string) => {
    onChange(value.filter(v => v !== item));
  };

  const handleAdd = (item: string) => {
    if (!value.includes(item)) {
      onChange([...value, item]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 bg-deep-brown-200/40 px-3 py-1 rounded-full"
          >
            <span className="text-sm text-white">{item}</span>
            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
      <select
        className={`w-full bg-deep-brown-200/40 border ${
          error ? 'border-red-500' : 'border-white/10'
        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent/50`}
        onChange={(e) => handleAdd(e.target.value)}
        value=""
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.filter(opt => !value.includes(opt)).map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default MultiSelect;
