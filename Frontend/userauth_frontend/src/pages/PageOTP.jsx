import React, { useState } from 'react'
import HeadingIcon from '../components/HeadingIcon';
import { SquareAsterisk } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import ButtonType1Blue from '../components/ButtonType1Blue'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Ajout de useNavigate
import LeftSideAuth from '../components/LeftSideAuth';
import OTPinput from '../components/OTPinput';

function PageOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // On récupère l'adresse de destination envoyée par la page précédente
  const nextPage = location.state || "/dashboardPage"; 

  const [formData, setFormData] = useState({
    otp: "",
  });
  const [error, setError] = useState("");

  const OTP_Icon = <SquareAsterisk size={40} className='text-ButtonAppBackgroundColor' />;

  // Fonction de soumission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. On vérifie si le champ est vide
    if (!formData.otp.trim()) {
      setError("Veuillez entrer le code OTP avant de continuer.");
      return;
    }

    // 2. Si c'est bon, on redirige vers la page de modification (nextPage)
    console.log("OTP saisi :", formData.otp);
    setError("");
    navigate(nextPage);
  };

  return (
    <>
      <div className='flex'>
        <LeftSideAuth/>
        
        {/* Ajout du onSubmit pour déclencher la vérification */}
        <form onSubmit={handleSubmit} className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
          
          <HeadingIcon icon={OTP_Icon} />
          <PageTitle text="Rentrez votre code OTP"/>

          <div className="flex flex-col w-[100%] p-4 gap-6">
            <OTPinput
              label="Code OTP"
              id="otp_input"
              value={formData.otp}
              onChange={(e) => {
                setFormData({ ...formData, otp: e.target.value });
                if(error) setError(""); // Efface l'erreur quand on tape
              }}
              placeholder="Entrer votre code"
            />
            
            {/* Affichage du message d'erreur */}
            {error && <p className="text-red-500 text-sm text-center -mt-4">{error}</p>}
          </div>

          <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-6">
            {/* Le bouton bleu doit être de type submit pour lancer handleSubmit */}
            <div className='w-full'>
               <ButtonType1Blue text="Continuer"/>
            </div>
            
            <div className='flex justify-center'>
              <p className="text-center w-[82%] text-sm">
                Chaque code a une durée maximale d'utilisation de 10 min.{" "}
                <br />
                <button type="button" className="text-TextColorBlue hover:underline font-bold">
                  Renvoyez le code OTP
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default PageOTP;