/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Select.tsx
import cn from '@/utils/cn';

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  label?: string;
  className?: string;
  [key: string]: any; // Untuk mendukung props tambahan
}

const SelectComponents: React.FC<SelectProps> = ({ options, label, className, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <select
        className={cn(
          'block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponents