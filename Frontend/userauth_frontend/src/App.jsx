import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <>
      {/* Pages */}
      <Routes>
        <Route path="/" element= {<Navigate to = "/loginPage"/>}/>
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="/signupPage" element={<SignupPage/>} />
      </Routes>
    </>
  );
}
