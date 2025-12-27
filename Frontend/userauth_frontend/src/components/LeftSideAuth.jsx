// LeftSideAuth.jsx
import React from "react";
import backgroundImage from "../assets/undraw_authentication_1evl.svg";

function LeftSideAuth() {
  return (
    <div className="w-[50%] bg-SideBackgroundColor hidden customBreakpoint:flex customBreakpoint:flex-col customBreakpoint:gap-32 pl-4 pt-16">
      <div>
        <h1 className="font-bold text-TextColorBlue text-BigHeadingFont">
         UserAuth – La solution fiable pour toutes vos connexions numériques.
        </h1>
      </div>
      <div>
        <img src={backgroundImage} alt="BackgroundLeftsideimage" className="w-64 h-64 ml-32" />
      </div>
    </div>
  );
}

export default LeftSideAuth;
