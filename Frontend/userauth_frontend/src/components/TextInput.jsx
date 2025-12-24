// InputText.jsx
import React from "react";

function TextInput({ label, value, onChange, placeholder, id}) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type = "text"
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

export default TextInput;