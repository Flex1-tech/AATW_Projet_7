import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Composants réutilisables
import LeftSideAuth from "../components/LeftSideAuth"; 
import ButtonType1Blue from "../components/ButtonType1Blue"; 
import ButtonType2Transparent from "../components/ButtonType2Transparent"; // Ton bouton WhatsApp
import EmailInput from "../components/EmailInput"; 
import PasswordInput from "../components/PasswordInput";
import PhoneNumberInput from "../components/PhoneInput"; 
import PageTitle from "../components/PageTitle";
import Logo from "../assets/logo.svg";
import HeadingLogo from "../components/HeadingLogo";

function LoginPage() {
  const navigate = useNavigate();
  
  // État pour basculer entre les deux modes
  const [isWhatsAppMode, setIsWhatsAppMode] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation simple
    if (isWhatsAppMode && !formData.phone) return alert("Entrez votre numéro");
    if (!isWhatsAppMode && !formData.email) return alert("Entrez votre email");

    // Redirection vers l'OTP
    navigate("/pageOTP", { 
      state: { 
        identity: isWhatsAppMode ? formData.phone : formData.email,
        method: isWhatsAppMode ? "whatsapp" : "email"
      } 
    });
  };

  return (
    <div className="flex">
      <LeftSideAuth />

      <form onSubmit={handleSubmit} className="w-[100%] customBreakpoint:w-[50%] flex flex-col items-center gap-10 pt-10">
        <HeadingLogo logo={Logo}/>
        
        {/* Titre dynamique */}
        <PageTitle text={isWhatsAppMode ? "Connexion via WhatsApp" : "Connectez-vous à UserAuth"}/>

        <div className="flex flex-col w-[100%] p-4 gap-6">
          {/* Alternance des champs */}
          {!isWhatsAppMode ? (
            <EmailInput
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Entrer votre email"
            />
          ) : (
            <PhoneNumberInput
              label="Numéro WhatsApp"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
            />
          )}

          <PasswordInput
            label="Mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Entrer votre mot de passe"
          />

          <div className="flex justify-end">
            <Link to="/forgotPasswordPage" className="text-TextColorBlue hover:underline text-sm">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-2">
          {/* Bouton de validation principal */}
          <div className="w-full">
            <ButtonType1Blue 
              text={isWhatsAppMode ? " Se connecter par watsapp" : "Se connecter par email"} 
            />
          </div>
        
          <div className="py-2 text-gray-400">ou</div>
      
          {/* BOUTON D'OPTION DYNAMIQUE */}
          <div className="w-full">
            {!isWhatsAppMode ? (
              /* Si on est en mode Email, on montre l'option WhatsApp */
              <button type="button" className="w-full" onClick={() => setIsWhatsAppMode(true)}>
                <ButtonType2Transparent /> 
              </button>
            ) : (
              /* Si on est en mode WhatsApp, on montre l'option Email */
              <button 
                type="button" 
                onClick={() => setIsWhatsAppMode(false)}
                className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
              >
                Se connecter par Email
              </button>
            )}
          </div>

          <div className="mt-4 text-sm">
            <p>Pas encore de compte ? <Link to="/signupPage" className="text-TextColorBlue font-bold">Inscrivez-vous</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;