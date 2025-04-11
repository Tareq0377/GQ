import React from "react";

const Input = ({ label, type, name, id, value, onChange, required }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-800 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-neutral-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default Input;
