import React from "react";
import BaseCurrencyForm from "../components/baseCurrencyForm";
import UserCard from "../components/userCard";

const UserPage = () => {
  return (
    <div className="container col-sm-8 col-md-6 col-lg-4">
      <UserCard />
      <BaseCurrencyForm />
    </div>
  );
};

export default UserPage;
