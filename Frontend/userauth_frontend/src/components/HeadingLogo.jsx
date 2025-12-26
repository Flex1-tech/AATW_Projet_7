import React from 'react'

function HeadingLogo({logo,size}) {
  return (
    <img src={logo} alt="Company_LOGO" className={size} />
  )
}

export default HeadingLogo