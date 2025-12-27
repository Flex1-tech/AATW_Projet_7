import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import LeftSideAuth from "../components/LeftSideAuth";
import HeadingIcon from "../components/HeadingIcon";
import PageTitle from "../components/PageTitle";
import OTPinput from "../components/OTPinput";
import ButtonType1Blue from "../components/ButtonType1Blue";
import { SquareAsterisk } from "lucide-react";
import LoaderButton from "../components/LoaderButton";

function PageOTP() {
  // Get state passed from LoginPage
  const location = useLocation();
  const { identity, channel, email_default } = location.state || {};
  const navigate = useNavigate();

  // -------------------------
  // State
  // -------------------------
  const [formData, setFormData] = useState({ otp: "" }); // Store OTP input
  const [loading, setLoading] = useState(false); // Track loading state for buttons
  const [error, setError] = useState(""); // Store error messages

  // Icon used for header
  const OTP_Icon = <SquareAsterisk size={40} className="text-ButtonAppBackgroundColor" />;

  // -------------------------
  // Function: Resend OTP
  // -------------------------
  const resendOtp = async () => {
    setLoading(true); // Start loading
    try {
      // Call backend endpoint to resend OTP
      const response = await fetch("http://127.0.0.1:8000/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email_default, // User email
          channel: channel,     // "email" or "whatsapp"
          context: "login",     // Context of OTP (login)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned an error
        setError(data.message || "Impossible de renvoyer le code OTP.");
        return;
      }

      // Success: clear errors and notify user
      setError("");
      alert("Le code OTP a été renvoyé avec succès !");
    } catch (err) {
      console.error("Erreur réseau:", err);
      setError("Impossible de renvoyer le code OTP pour le moment.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // -------------------------
  // Function: Verify OTP
  // -------------------------
  const verifyOtp = async () => {
    setLoading(true); // Start loading
    const otp = formData.otp.trim(); // Remove whitespace
    setFormData({ otp: "" }); // Clear input after reading

    // Validation: OTP must be exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {
      setError("Le code OTP doit contenir exactement 6 chiffres.");
      setLoading(false);
      return;
    }

    try {
      // Call backend endpoint to verify OTP
      const response = await fetch("http://127.0.0.1:8000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email_default,
          otp,
          channel,
          context: "login",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Erreur lors de la vérification de l'OTP");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token locally

      setError(""); // Clear any errors
      // Redirect to success page with token
      navigate("/successPageOTP", { state: { token: data.token } });
    } catch (err) {
      console.error("Erreur réseau:", err);
      setError("Impossible de vérifier l'OTP pour le moment");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // -------------------------
  // JSX: Render
  // -------------------------
  return (
    <div className="flex">
      {/* Left side authentication illustration */}
      <LeftSideAuth />

      {/* OTP Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verifyOtp(); // Verify OTP on form submit
        }}
        className="w-[100%] customBreakpoint:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col items-center gap-10 pt-10"
      >
        {/* Header: Icon and Page Title */}
        <HeadingIcon icon={OTP_Icon} />
        <PageTitle text="Rentrez votre code OTP" />

        {/* OTP Input Field */}
        <div className="flex flex-col w-[100%] p-4 gap-6">
          <OTPinput
            label="Code OTP"
            id="otp_input"
            value={formData.otp}
            onChange={(e) => {
              setFormData({ ...formData, otp: e.target.value });
              if (error) setError(""); // Clear error while typing
            }}
            placeholder="Entrer votre code"
          />

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center -mt-4">{error}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-6">
          {/* Verify OTP button */}
           <ButtonType1Blue
            text=  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <LoaderButton /> {/* Your loader component */}
      <span>Verification du code...</span>
    </div>
  ) : (
    "Continuer"
  )}
            disabled={loading}
          />

          {/* Resend OTP link */}
          <div className="flex justify-center">
            <p className="text-center w-[82%] text-sm">
              Chaque code a une durée maximale d'utilisation de 10 min.
              <br />
              <button
                type="button"
                className="text-TextColorBlue hover:underline font-bold"
                onClick={resendOtp} // Trigger resend OTP
              >
                Renvoyez le code OTP
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PageOTP;
