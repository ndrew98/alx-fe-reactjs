import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true"; // Simulating authentication
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
