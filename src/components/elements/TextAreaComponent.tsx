import React from "react";

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  name: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = "Enter text...",
  rows = 4, // Default 4 rows
  className = "",
  name,
  ...rest
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && <label className="text-black mb-2">{label}</label>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        name={name}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        {...rest}
      />
    </div>
  );
};

export default TextArea;
