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
import ButtonType2Transparent from "../components/ButtonType2Transparent";
import EmailInput from "../components/EmailInput"; 
import PasswordInput from "../components/PasswordInput";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { HeadingIcon } from "lucide-react";
import Logo from "../assets/logo.svg";
import HeadingLogo from "../components/HeadingLogo";

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
  
  let nextPage;
  return (
    <>
      {/* Formulaire principal */}
      <div className="flex">
        {/* Partie gauche : image et texte */}
        <LeftSideAuth />

        {/* Partie droite : formulaire utilisateur */}
        <form  onSubmit={handleSubmit} className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
          <HeadingLogo logo = {Logo}/>
          <PageTitle text = "Connectez vous a UserAuth"/>

          {/* Champs du formulaire */}
          <div className="flex flex-col w-[100%] p-4 gap-6">
            {/* Champ email */}
            <EmailInput
              label="Email"
            
              id="email_input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Entrer votre email"
            />

            {/* Champ mot de passe */}
            <PasswordInput
              label="Mot de passe"
            
              id="password_input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Entrer votre mot de passe"
            />

            <div className="flex justify-end">
              <p className="cursor-pointer text-TextColorBlue">
                <Link to = "/forgotPasswordPage" state={nextPage = "/dashboardPage"}>
                    Mot de passe oublie ? 
                </Link>
                </p>
            </div>
          </div>

          {/* Boutons d'action */}
        <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-2">
            {/* Bouton principal bleu pour connexion email */}
            <Link to="/pageOTP" state={nextPage = "/dashboardPage"} className="w-full">
                <ButtonType1Blue text="Connectez-vous par email"/> 
            </Link>
         
            <div>
              <span>ou</span>
            </div>
        
            {/* Bouton secondaire transparent avec WhatsApp */}
           <Link to="/pageOTP" className="w-full">
             <ButtonType2Transparent/>
            </Link>

            {/* Lien vers la page de login */}
            <div>
              <p className="text-center">
                Vous avez deja un compte ?{" "}
                <Link to="/signupPage" className="text-TextColorBlue">
                  Inscrivez-vous
                </Link>
              </p>
            </div>
            
        </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
