// FormInput.jsx
import React from "react";
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
import { useState } from "react";

function PasswordInput({ label, value, onChange, placeholder, id }) {

  // --- État du type d'entrée (password ou text)
  // On utilise un state car React doit re-render quand la valeur change.
  const [type, setType] = useState('password');

  // --- État de l'icône affichée à droite du champ
  // On stocke l'icône dans un state pour que l'affichage se mette à jour automatiquement.
  const [iconType, setIcon] = useState(
    <EyeClosed size={20} className="text-TextColorPlaceholder" />
  );

  // --- Fonction appelée lorsque l'utilisateur clique sur l'icône
  // Elle alterne entre masque/affichage du mot de passe.
  const handlePasswordView = () => {
    if (type === "password") {
      // Affiche le texte
      setType('text');
      // Change l'icône en "œil ouvert"
      setIcon(<Eye size={20} className="text-TextColorPlaceholder" />);
    } else {
      // Remet en mode mot de passe
      setType('password');
      // Change l'icône en "œil fermé"
      setIcon(<EyeClosed size={20} className="text-TextColorPlaceholder" />);
    }
  };

  return (
    <div className="relative flex items-center">
      <div className="flex flex-col flex-1 ">

        {/* Label si fourni */}
        {label && <label htmlFor={id}>{label}</label>}

        {/* Champ d'entrée du mot de passe */}
        {/* Le type change dynamiquement selon le state */}
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

      {/* Icône cliquable pour afficher/masquer le mot de passe */}
      {/* Le clic appelle handlePasswordView */}
      <span
        className="absolute cursor-pointer mt-7 right-4"
        onClick={handlePasswordView}
      >
        {iconType}
      </span>
    </div>
  );
}

export default PasswordInput;
 