import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe useNavigate
import LeftSideAuth from '../components/LeftSideAuth';
import PageTitle from '../components/PageTitle';
import ButtonType1Blue from "../components/ButtonType1Blue"; 
import EmailInput from "../components/EmailInput"; 
import HeadingIcon from '../components/HeadingIcon';
import { Lock } from 'lucide-react';

function ForgotPasswordPage() {
  const navigate = useNavigate();

  // FIX 1 : Initialise bien l'email dans l'état
  const [formData, setFormData] = useState({
    email: "", 
  });

  const [error, setError] = useState("");

  // FIX 2 : Fonction de vérification avant de passer à l'OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérification simple : le champ est-il vide ?
    if (!formData.email) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    // Vérification du format email (Regex simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer un email valide.");
      return;
    }

    console.log("Email vérifié, envoi de l'OTP à :", formData.email);
    
    // Si c'est OK, on navigue vers l'OTP en passant l'email et la destination suivante
    navigate("/pageOTP", { 
      state: { 
        identity: formData.email, 
        nextPage: "/forgotPasswordPageModif" 
      } 
    });
  };

  let LockIcon = <Lock size={40} className='text-ButtonAppBackgroundColor' />;

  return (
    <div className='flex'>
      <LeftSideAuth />
      
      {/* On ajoute le onSubmit ici */}
      <form onSubmit={handleSubmit} className="w-[100%] customBreakpoint:w-[50%] flex flex-col items-center gap-10 pt-10">
        
        <HeadingIcon icon={LockIcon} />
        <PageTitle text="Mot de passe oublié" />

        <div className="flex flex-col w-[100%] p-4 gap-6">
          <EmailInput
            label="Email"
            id="email_input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Entrer votre email"
          />
          
          {/* Affichage de l'erreur si elle existe */}
          {error && <p className="text-red-500 text-sm text-center -mt-4">{error}</p>}

          <div className="flex justify-center">
            <p className="text-center w-[90%] text-TextColorBlue text-sm">
              La modification de votre mot de passe nécessite le remplissage d'un code OTP également.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-[100%] -mt-10 p-4 gap-6">
          {/* Le bouton déclenche maintenant handleSubmit */}
          <div className="w-full">
            <ButtonType1Blue text="Continuer" />
          </div>

          <div>
            <p className="text-center">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link to="/loginPage" className="text-TextColorBlue font-bold">
                Connectez-vous 
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;