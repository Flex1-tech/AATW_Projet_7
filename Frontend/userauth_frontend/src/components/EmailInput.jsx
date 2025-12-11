// FormInput.jsx
import React from "react";

function EmailInput({ label, type, value, onChange, placeholder, id}) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 pl-4 border rounded-lg border-ButtonAppBorderColorB outline-ButtonAppBorderColorA"
        required
      />
    </div>
  );
}

export default EmailInput;
