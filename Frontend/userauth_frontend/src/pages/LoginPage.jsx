import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import Logo from "../assets/logo.svg";

// Components
import LeftSideAuth from "../components/LeftSideAuth";
import HeadingLogo from "../components/HeadingLogo";
import PageTitle from "../components/PageTitle";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import PhoneNumberInput from "../components/PhoneInput";
import ButtonType1Blue from "../components/ButtonType1Blue";
import ButtonType2Transparent from "../components/ButtonType2Transparent";

function LoginPage() {
  const navigate = useNavigate();

  // State
  const [isWhatsAppMode, setIsWhatsAppMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const identity = isWhatsAppMode ? formData.phone : formData.email;
    const channel = isWhatsAppMode ? "whatsapp" : "email";
    const email_default = formData.email;

    if (!identity || !formData.password) {
      setError("Veuillez remplir tous les champs requis.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: !isWhatsAppMode ? formData.email : null,
          telephone: isWhatsAppMode ? formData.phone : null,
          password: formData.password,
          channel: channel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Connexion impossible.");
        return;
      }

      navigate("/pageOTP", {
        state: {
          identity,
          channel,
          email_default,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <LeftSideAuth />

      <form
        onSubmit={handleSubmit}
        className="w-[100%] customBreakpoint:w-[50%] flex flex-col items-center gap-10 pt-10"
      >
        {/* Header */}
        <HeadingLogo size="w-16 h-16" logo={Logo} />
        <PageTitle
          text={
            isWhatsAppMode
              ? "Connexion via WhatsApp"
              : "Connectez-vous à UserAuth"
          }
        />

        {/* Form fields */}
        <div className="flex flex-col w-[100%] p-4 gap-6">
          {!isWhatsAppMode ? (
            <EmailInput
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Entrer votre email"
            />
          ) : (
            <PhoneNumberInput
              label="Numéro WhatsApp"
              value={formData.phone}
              onChange={(value) =>
                setFormData({ ...formData, phone: value })
              }
            />
          )}

          <PasswordInput
            label="Mot de passe"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Entrer votre mot de passe"
          />

          {error && (
            <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
          )}

          <div className="flex justify-end">
            <Link
              to="/forgotPasswordPage"
              className="text-TextColorBlue hover:underline text-sm"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-2">
          <div className="w-full">
            <ButtonType1Blue
              text={
                loading
                  ? "Envoi du code..."
                  : isWhatsAppMode
                  ? "Se connecter par WhatsApp"
                  : "Se connecter par email"
              }
              disabled={loading}
            />
          </div>

          <div className="py-2 text-gray-400">ou</div>

          <div className="w-full">
            {!isWhatsAppMode ? (
              <button
                type="button"
                className="w-full"
                onClick={() => setIsWhatsAppMode(true)}
              >
                <ButtonType2Transparent />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsWhatsAppMode(false)}
                className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
              >
                Se connecter par Email
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 text-sm">
            <p>
              Pas encore de compte ?{" "}
              <Link
                to="/signupPage"
                className="text-TextColorBlue font-bold"
              >
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
