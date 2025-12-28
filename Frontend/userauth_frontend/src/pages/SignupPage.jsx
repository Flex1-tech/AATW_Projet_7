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
import { useNavigate, Link } from "react-router-dom"; // Pour naviguer entre les pages
import { FaWhatsapp } from "react-icons/fa"; // Icône WhatsApp

// Importation de api.js qui va servir pour les requêtes avec axios
import api from "../services/api";

// Composants réutilisables depuis le dossier components
import LeftSideAuth from "../components/LeftSideAuth"; // Partie gauche avec texte et image
import ButtonType2Transparent from "../components/ButtonType2Transparent"; // Bouton secondaire
import ButtonType1Blue from "../components/ButtonType1Blue"; // Bouton principal
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput"; 
import PasswordInput from "../components/PasswordInput";
import PhoneNumberInput from "../components/PhoneInput";
import PageTitle from "../components/PageTitle";
import Logo from "../assets/logo.svg";
import HeadingLogo from "../components/HeadingLogo";
import LoaderButton from "../components/LoaderButton";
function SignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook pour la navigation
  // État local regroupant toutes les valeurs du formulaire
  const initialFormData = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // État pour stocker un message d'erreur si le numéro est invalide
  const [error, setError] = useState("");

  /**
   * Fonction déclenchée lors de la soumission du formulaire
   * - Empêche le rechargement de la page
   * - Vérifie si le numéro est valide et commence par +229 (Bénin)
   * - Affiche un message d'erreur si nécessaire
   */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return; // Prevent multiple clicks

  if (isValidPhoneNumber(formData.phone) && formData.phone.startsWith("+229")) {
    setError("");
    setLoading(true); // Start loading

    try {
      const response = await api.post(
        "http://127.0.0.1:8000/api/auth/register",
        {
          nom: formData.name,
          prenom: formData.lastName,
          email: formData.email,
          telephone: formData.phone.slice(0, 4) + formData.phone.slice(6),
          password: formData.password,
          password_confirmation: formData.password,
        }
      );

      setFormData(initialFormData);
      navigate("/Successpage");
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        // validation errors handled silently
      }
      setError(error.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false); // Stop loading
    }
  } else {
    setError("Numéro invalide. Entrez un numéro béninois valide.");
  }
};


  return (
    <>
      {/* Formulaire principal */}
      <div className="flex" >
        {/* Partie gauche : image et texte */}
        <LeftSideAuth />

        {/* Partie droite : formulaire utilisateur */}
        <form onSubmit={handleSubmit} className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
          <HeadingLogo  size = "w-16 h-16" logo={Logo}/>
         <PageTitle text = "Inscrivez  vous a UserAuth"/>

          {/* Champs du formulaire */}
          <div className="flex flex-col w-[100%] p-4 gap-6">

            {/* Champ nom */}
            <TextInput
              label="Nom"
              id="name_input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Entrer votre nom"
            />

            {/* Champ prenom */}
            <TextInput
              label="Prenom"
              id="lastName_input"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Entrer votre nom prénom"
            />

            {/* Champ email */}
            <EmailInput
              label="Email"
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
              id="password_input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Entrer votre mot de passe"
            />

            <PasswordInput
              label="Confirmation du mot de passe"
              id="passwordConfirmation_input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Confirmez votre mot de passe"
            />

            {/* Message d'information OTP */}
            <div className="flex justify-center">
              <p className="text-center w-[90%] text-TextColorBlue">
               L’inscription est effective apres avoir recu un email de verification obligatoire . Apres l’avoir visite , vous irez vers la page de connexion pour pouvoir acceder a la plateforme .
              </p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col items-center w-[100%] -mt-10 p-4 gap-6">
            {/* Bouton principal bleu pour connexion email */}
         <ButtonType1Blue
            text=  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <LoaderButton /> {/* Your loader component */}
      <span>En cours</span>
    </div>
  ) : (
    "Continuer"
  )}
            disabled={loading}
            onClick={() => setChannel("email")}
          />

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
        </form>
      </div>
    </>
  );
}

export default SignupPage;
