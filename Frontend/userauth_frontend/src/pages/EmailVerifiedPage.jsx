import React from 'react'
import { CloudCheck } from 'lucide-react';
import Successmessage from '../components/Successmessage';
import LeftSideAuth from '../components/LeftSideAuth';
import HeadingIcon from '../components/HeadingIcon';
import { Link } from 'react-router-dom';
import ButtonType1Blue from '../components/ButtonType1Blue';

function EmailVerifiedPage() {
    // Utilisation d'une icône de validation
    let SuccessIcon = <CloudCheck size={40} className='text-ButtonAppBackgroundColor'/>;

  return (
    <div className='flex'>
       <LeftSideAuth/>
       {/* On retire la balise <form> car ici il n'y a rien à soumettre, une <div> suffit */}
       <div className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
         
          <HeadingIcon icon={SuccessIcon} />
          
          {/* Nouveau texte adapté à l'inscription */}
          <Successmessage text="Votre compte a ete verifie avec succes . Retournez a present vers la page de connexion . "/>
          
          {/* Boutons d'action */}
        
       </div>
    </div>
  )
}

export default EmailVerifiedPage;