import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
