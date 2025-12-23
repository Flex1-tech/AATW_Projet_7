import React, { useState } from 'react'
import HeadingIcon from '../components/HeadingIcon';
import { SquareAsterisk } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import ButtonType1Blue from '../components/ButtonType1Blue'; 
import { Link, useLocation } from 'react-router-dom';
import LeftSideAuth from '../components/LeftSideAuth';
import OTPinput from '../components/OTPinput';


function PageOTP() {
     const [formData, setFormData] = useState({
            otp: "",
          });
    let OTP_Icon = <SquareAsterisk size={40} className='text-ButtonAppBackgroundColor' />;
    let nextPage;
    const location = useLocation();
    nextPage = location.state??nextPage;
  return (
    <>
       <div className='flex'>
       
       <LeftSideAuth/>
         <form  className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
         
          <HeadingIcon icon = {OTP_Icon} />
          {/*Titre de le page*/ }               
          <PageTitle text = "Rentrez votre code OTP"/>

          {/* Champs du formulaire */}
          <div className="flex flex-col w-[100%] p-4 gap-6">
           
            
            {/* Champ OTP */}
            <OTPinput
              label="Code OTP"
              id="otp_input"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              placeholder="Entrer votre code"
            />

        
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-6">
            {/* Bouton principal bleu */}
            <Link to={nextPage} className='w-full'>
               <ButtonType1Blue text = "Continuer"/>
            </Link>
            
            
            {/* Lien vers la page d'inscription */}
            <div className='flex justify-center'>
              <p className="text-center w-[82%]">
                Chaque code a une duree maximale d'utilisation de 10 min{" "}
                
                <Link to="" className="text-TextColorBlue">
                  Renvoyez le code OTP
                </Link>
              </p>
            </div>
            
          </div>
        </form>
    </div>
    </>
  )
}

export default PageOTP