/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Spinner } from "@material-tailwind/react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const [role , isLoading] = useRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <div className="h-screen flex justify-center items-center">
    <Spinner className="h-16 w-16 text-gray-900/50" />
  </div>;
  }

  if (user && allowedRoles.includes(role)) {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>;
};

export default ProtectedRoute;
