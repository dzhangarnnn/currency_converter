import React from "react";
import { Navigate, useParams } from "react-router-dom";
import UserPage from "../pages/userPage";
import { useAuth } from "../hooks/useAuth";

const User: React.FC = () => {
  const { userId } = useParams<string>();
  const { user } = useAuth();

  return <div>{userId === user.id ? <UserPage /> : <Navigate to={"/"} />}</div>;
};

export default User;
