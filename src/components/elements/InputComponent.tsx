import React from "react";

interface InputComponentProps {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange
  placeholder?: string;
  className?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  name,
  type = "text", // Default type is 'text'
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label htmlFor={label} className="text-black mb-1">{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        onChange={onChange} // Only trigger onChange if provided
        placeholder={placeholder}
        className="w-full rounded px-3 py-2 outline-none text-black focus:ring focus:ring-primary"
      />
    </div>
  );
};

export default InputComponent;
