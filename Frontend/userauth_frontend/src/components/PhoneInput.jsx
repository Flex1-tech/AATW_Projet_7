// PhoneNumberInput.jsx
import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function PhoneNumberInput({ label, value, onChange, error, defaultCountry = "BJ" }) {
  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <PhoneInput
        placeholder="Entrez votre numéro (ex: +2290161234567)"
        value={value}
        onChange={onChange}
        defaultCountry={defaultCountry}
        className="w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default PhoneNumberInput;
