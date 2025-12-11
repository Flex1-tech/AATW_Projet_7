import React from 'react'

function ButtonType1Blue({text}) {
  return (
     <div className="w-[100%]">
              <button className="w-[100%] bg-ButtonAppBackgroundColor h-10 text-TextColorWhite" type="submit">
                {text}
              </button>
    </div>
  )
}

export default ButtonType1Blue