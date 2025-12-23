import React from 'react'

function Successmessage({text}) {
  return (
     <div>
        {/* Titre du formulaire */}
        <h1 className="font-bold text-center text-TextColorBlack text-BigHeadingFont">
            {text}
        </h1>
     </div>
  )
}

export default Successmessage