// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = location.state?.token;

  if (!token) {
    // Show alert (optional) or just redirect
    alert("Access denied. Please login first.");
    return <Navigate to="/loginPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
