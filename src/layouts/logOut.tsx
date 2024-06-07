import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadSpinner from "../components/loader";

const LogOut = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);
  return <LoadSpinner />;
};

export default LogOut;
