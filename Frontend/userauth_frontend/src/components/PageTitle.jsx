import React from 'react'

function PageTitle({text}) {
  return (
     <div>
        {/* Titre du formulaire */}
        <h1 className="font-bold text-center text-TextColorBlack text-HeadingFont">
            {text}
        </h1>
     </div>
  );
}

export default PageTitle