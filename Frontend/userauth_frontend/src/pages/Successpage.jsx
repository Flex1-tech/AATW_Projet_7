import React from 'react'
import { CloudCheck } from 'lucide-react';
import Successmessage from '../components/Successmessage';
import LeftSideAuth from '../components/LeftSideAuth';
import HeadingIcon from '../components/HeadingIcon';
import { Link } from 'react-router-dom';
import ButtonType1Blue from '../components/ButtonType1Blue';

function Successpage() {
    let SuccessIcon = <CloudCheck size={40} className='text-ButtonAppBackgroundColor'/>;
  return (
        <div className='flex'>
       
       <LeftSideAuth/>
         <form  className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
         
          <HeadingIcon icon = {SuccessIcon} />
          {/*Titre de le page*/ }               
          <Successmessage text = "Votre mot de passe a ete modifie avec success"/>

          
          {/* Boutons d'action */}
          <div className="flex flex-col items-center w-[100%] -mt-10 p-4 gap-6">
            {/* Bouton principal bleu */}
            
             <Link to="/loginPage" className="w-full">
                <ButtonType1Blue text="Connectez-vous a present" /> 
            </Link> 
          </div>
        </form>
    </div>
  )
}

export default Successpage