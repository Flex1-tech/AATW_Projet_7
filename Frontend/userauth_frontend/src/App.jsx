import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PageOTP from "./pages/PageOTP";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPageModif from "./pages/ForgotPasswordPageModif";
import Successmessage from "./components/Successmessage";
import Successpage from "./pages/Successpage";
import Successpageotp from "./pages/SuccessPageOTP";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailVerifiedPage from "./pages/EmailVerifiedPage";
export default function App() {
  return (
    <>
      {/* Pages */}
      <Routes>
        <Route path="/" element= {<Navigate to = "/loginPage"/>}/>
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="/signupPage" element={<SignupPage/>} />
        <Route path="/forgotPasswordPage" element= {<ForgotPasswordPage/>} />
        <Route path="/pageOTP" element = {<PageOTP/>} />
          <Route path="/emailVerifiedPage" element = {<EmailVerifiedPage/>} />
        <Route 
  path="/dashboardPage" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
        <Route path="/forgotPasswordPageModif" element = {<ForgotPasswordPageModif/>} />
        <Route path = "/successPage" element = {<Successpage/>}/>
       <Route 
  path="/successPageOTP" 
  element={
    <ProtectedRoute>
      <Successpageotp />
    </ProtectedRoute>
  } 
/>
      </Routes>
    </>
  );
}
