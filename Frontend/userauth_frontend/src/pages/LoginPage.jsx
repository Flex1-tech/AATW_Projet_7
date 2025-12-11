/**
 * LoginPage.jsx
 *
 * Spécification : 
 * La plupart des composants utilisés dans cette page (EmailInput, PasswordInput, boutons, LeftSideAuth) 
 * se trouvent dans le dossier `components` et peuvent être réutilisés dans d'autres pages pour accélérer le développement.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Pour naviguer entre les pages

// Composants réutilisables depuis le dossier components
import LeftSideAuth from "../components/LeftSideAuth"; // Partie gauche avec texte et image
import ButtonType1Blue from "../components/ButtonType1Blue"; // Bouton principal
import EmailInput from "../components/EmailInput"; 
import PasswordInput from "../components/PasswordInput";

function LoginPage() {
  // État local regroupant toutes les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * Fonction déclenchée lors de la soumission du formulaire
   * - Empêche le rechargement de la page
   * - Ici tu peux ajouter la logique pour envoyer les données au backend
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    console.log("Données du formulaire :", formData); // Affiche les données dans la console (pour test)
    // A faire : envoyer les données au backend
  };

  return (
    <>
      {/* Formulaire principal */}
      <form className="flex" onSubmit={handleSubmit}>
        {/* Partie gauche : image et texte */}
        <LeftSideAuth />

        {/* Partie droite : formulaire utilisateur */}
        <div className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
          {/* Titre du formulaire */}
          <div>
            <h1 className="font-bold text-center text-TextColorBlack text-HeadingFont">
              Connectez-vous a UserAuth
            </h1>
          </div>

          {/* Champs du formulaire */}
          <div className="flex flex-col w-[100%] p-4 gap-6">
            {/* Champ email */}
            <EmailInput
              label="Email"
              type="email"
              id="email_input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Entrer votre email"
            />

            {/* Champ mot de passe */}
            <PasswordInput
              label="Mot de passe"
              type="password"
              id="password_input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Entrer votre mot de passe"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-2">
            {/* Bouton principal bleu */}
            <ButtonType1Blue text = "Connectez-vous" /> 

            {/* Lien vers la page d'inscription */}
            <div>
              <p className="text-center">
                Vous n'avez pas encore de compte ?{" "}
                <Link to="/signupPage" className="text-TextColorBlue">
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
