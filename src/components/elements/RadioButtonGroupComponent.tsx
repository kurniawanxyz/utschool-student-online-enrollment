import React from "react";

export interface RadioOption {
    label: string;
    value: string;
}

interface RadioButtonGroupProps {
    name: string;
    options: RadioOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    className?: string;
    isColumn?: boolean
}

const RadioButtonGroupComponent: React.FC<RadioButtonGroupProps> = ({
    name,
    options,
    selectedValue,
    onChange,
    className = "",
    isColumn = true
}) => {
    return (
        <div className={`flex gap-3 ${isColumn && 'flex-col'} ${className}`}>
            {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 mb-2 text-black">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange(option.value)}
                        className="form-radio h-4 w-4 text-primary focus:ring-primary checked:bg-primary"
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default RadioButtonGroupComponent;
