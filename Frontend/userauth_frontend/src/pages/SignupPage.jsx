/**
 * LoginPage.jsx
 *
 * Spécification : 
 * La plupart des composants utilisés dans cette page (EmailInput, PasswordInput, PhoneNumberInput, boutons, LeftSideAuth) 
 * se trouvent dans le dossier `components` et peuvent être réutilisés dans d'autres pages pour accélérer le développement.
 */

import React, { useState } from "react";
// Importation du composant PhoneInput pour la saisie de numéro de téléphone
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Styles par défaut de PhoneInput
import { Link } from "react-router-dom"; // Pour naviguer entre les pages
import backgroundImage from "../assets/undraw_authentication_1evl.svg"; // Image côté gauche
import { FaWhatsapp } from "react-icons/fa"; // Icône WhatsApp

// Composants réutilisables depuis le dossier components
import LeftSideAuth from "../components/LeftSideAuth"; // Partie gauche avec texte et image
import ButtonType2Transparent from "../components/ButtonType2Transparent"; // Bouton secondaire
import ButtonType1Blue from "../components/ButtonType1Blue"; // Bouton principal
import EmailInput from "../components/EmailInput"; 
import PasswordInput from "../components/PasswordInput";
import PhoneNumberInput from "../components/PhoneInput";

function SignupPage() {
  // État local regroupant toutes les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  // État pour stocker un message d'erreur si le numéro est invalide
  const [error, setError] = useState("");

  /**
   * Fonction déclenchée lors de la soumission du formulaire
   * - Empêche le rechargement de la page
   * - Vérifie si le numéro est valide et commence par +229 (Bénin)
   * - Affiche un message d'erreur si nécessaire
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    if (isValidPhoneNumber(formData.phone) && formData.phone.startsWith("+229")) {
      setError(""); // Supprime l'erreur si tout est correct
      console.log("Valid Benin number:", formData); // Affiche les données dans la console (pour test)
      // TODO : envoyer les données au backend
    } else {
      setError("Numéro invalide. Entrez un numéro béninois valide."); // Affiche le message d'erreur
    }
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

            {/* Champ téléphone */}
            <PhoneNumberInput
              label="Numéro de téléphone"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              error={error}
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

            {/* Message d'information OTP */}
            <div>
              <p className="text-center text-TextColorBlue">
                L’inscription nécessite l’envoi d’un code OTP, envoyé sur votre WhatsApp ou votre email selon la méthode choisie.
              </p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-2">
            {/* Bouton principal bleu */}
            <ButtonType1Blue text="Inscrivez-vous" /> 

            <div>
              <span>ou</span>
            </div>

            {/* Bouton secondaire transparent avec WhatsApp */}
            <ButtonType2Transparent />

            {/* Lien vers la page de login */}
            <div>
              <p className="text-center">
                Vous avez deja un compte ?{" "}
                <Link to="/loginPage" className="text-TextColorBlue">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignupPage;
