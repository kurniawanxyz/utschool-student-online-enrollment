import React from "react";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = "Enter text...",
  rows = 4, // Default 4 rows
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && <label className="text-black mb-2">{label}</label>}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />
    </div>
  );
};

export default TextArea;
