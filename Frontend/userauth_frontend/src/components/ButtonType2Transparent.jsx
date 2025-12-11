import React from 'react'
import { FaWhatsapp } from "react-icons/fa"; // Icône WhatsApp
function ButtonType2Transparent() {
  return (
   <div className="w-[100%] mb-6">
                 <button className="w-[100%] h-10 text-TextColorBlue flex items-center justify-center gap-2 border border-ButtonAppBorderColorB transition-all duration-200 hover:border-ButtonAppBorderColorA" type="submit">
                   <FaWhatsapp size="20px" color="green" />
                   Inscrivez-vous avec Whatsapp
                 </button>
    </div>
  )
}

export default ButtonType2Transparent