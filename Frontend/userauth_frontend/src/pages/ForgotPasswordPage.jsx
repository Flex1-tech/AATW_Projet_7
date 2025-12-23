import React from 'react'
import LeftSideAuth from '../components/LeftSideAuth'
import PageTitle from '../components/PageTitle'
import ButtonType1Blue from "../components/ButtonType1Blue"; // Bouton principal
import EmailInput from "../components/EmailInput"; 
import HeadingIcon from '../components/HeadingIcon';
import { useState } from 'react';
import { Link } from 'react-router';
import { Lock } from 'lucide-react';


function ForgotPasswordPage() {
     const [formData, setFormData] = useState({
        password: "",
      });
      {/*Prop utilise pour l'icon de cadenas de la page , utilise en tant que prop au niveau de HeadingIcon*/ }    
      let LockIcon =  <Lock size={40} className='text-ButtonAppBackgroundColor '/>;
       let nextPage;
  return (
    <div className='flex'>
       
       <LeftSideAuth/>
         <form  className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
         
          <HeadingIcon icon = {LockIcon} />
          {/*Titre de le page*/ }               
          <PageTitle text = "Mot de passse oublie"/>

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
           <div className="flex justify-center">
              <p className="text-center w-[90%] text-TextColorBlue">
                La modification de votre mot de passe necessite le remplissage d'un code OTP egalement .
              </p>
            </div>
        
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col items-center w-[100%] -mt-10 p-4 gap-6">
            {/* Bouton principal bleu */}
            
             <Link to="/pageOTP" className="w-full" state={nextPage = "/forgotPasswordPageModif"}>
                <ButtonType1Blue text="Continuer" /> 
            </Link> 

            {/* Lien vers la page d'inscription */}
            <div>
              <p className="text-center">
               Vous vous souvenez de votre mot de passe ?{" "}
                <Link to="/loginPage" className="text-TextColorBlue">
                  Connectez-vous 
                </Link>
              </p>
            </div>
          </div>
        </form>
    </div>
  )
}

export default ForgotPasswordPage