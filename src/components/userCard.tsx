import React from "react";
import { useAuth } from "../hooks/useAuth";

const UserCard = () => {
  const { user } = useAuth();
  return (
    <div className="card m-3 p-0">
      <div className="card-body bg-light text-center">
        <h5 className="card-title pb-2">{user.surname}</h5>
        <h5 className="card-title pb-3">{user.name}</h5>
        <h6 className="card-subtitle  text-muted pb-3">{user.email}</h6>
      </div>
    </div>
  );
};

export default UserCard;
