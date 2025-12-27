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
import ButtonType1Blue from "../components/ButtonType1Blue";
import ButtonType2Transparent from "../components/ButtonType2Transparent";
import LoaderButton from "../components/LoaderButton";

function LoginPage() {
  const navigate = useNavigate();

  // State
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState("");
  const [channel, setChannel] = useState("email"); // email | whatsapp

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs requis.");
      return;
    }

    setLoading1(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,      // ALWAYS sent
          password: formData.password,
          channel: channel,      
          remember: false // email OR whatsapp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Connexion impossible.");
        return;
      }

      navigate("/pageOTP", {
        state: {
          identity: formData.email,
          channel: channel,
          email_default: formData.email, // backend-confirmed email
        },
      });
    } catch (err) {
      console.error(err);
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading1(false);
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
        <PageTitle text="Connectez-vous à UserAuth" />

        {/* Inputs */}
        <div className="flex flex-col w-[100%] p-4 gap-6">
          <EmailInput
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Entrer votre email"
          />

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
              to=""
              className="text-TextColorBlue  text-sm text-center"
            >
               Pour vous connecter, un code OTP sera envoyé à votre email ou numéro WhatsApp selon le mode de connexion choisi. Veuillez vérifier le message et entrer le code pour finaliser votre connexion.
            </Link>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center w-[100%] -mt-4 p-4 gap-3">
          {/* Email button */}
          <ButtonType1Blue
            text=  {loading1 ? (
    <div className="flex items-center justify-center gap-2">
      <LoaderButton /> {/* Your loader component */}
      <span>Envoi du code...</span>
    </div>
  ) : (
    "Se connecter par Email"
  )}
            disabled={loading1}
            onClick={() => setChannel("email")}
          />

          <div className="py-2 text-gray-400">ou</div>

          {/* WhatsApp button */}
          <button
            type="submit"
            className="w-full"
            onClick={() => setChannel("whatsapp")}
            disabled={loading1}
          >
            <ButtonType2Transparent />
          </button>

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
