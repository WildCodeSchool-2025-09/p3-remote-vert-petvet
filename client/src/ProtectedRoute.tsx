import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const auth = useAuth();

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
