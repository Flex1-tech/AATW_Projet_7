import React from "react";
import { useLocation, Link } from "react-router-dom";

// Components
import LeftSideAuth from "../components/LeftSideAuth";
import HeadingIcon from "../components/HeadingIcon";
import Successmessage from "../components/Successmessage";
import ButtonType1Blue from "../components/ButtonType1Blue";
import { CloudCheck } from "lucide-react";

function Successpageotp() {
  // -------------------------
  // Get state passed from previous page (OTP token)
  // -------------------------
  const location = useLocation();
  const token = location.state?.token; // Optional chaining in case state is undefined

  // Icon for success page
  const SuccessIcon = <CloudCheck size={40} className="text-ButtonAppBackgroundColor" />;

  // -------------------------
  // JSX: Render
  // -------------------------
  return (
    <div className="flex">
      {/* Left side authentication illustration */}
      <LeftSideAuth />

      {/* Right side: Success message & actions */}
      <div className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10">
        
        {/* Header Icon */}
        <HeadingIcon icon={SuccessIcon} />

        {/* Success message text */}
        <Successmessage text="Vous pouvez desormais acceder au dashboard." />

        {/* Action button: Continue to dashboard */}
        <div className="flex flex-col items-center w-[100%] -mt-10 p-4 gap-6">
          <Link to="/dashboardPage" className="w-full" state={{ token: token }}>
            <ButtonType1Blue text="Continuer" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Successpageotp;
