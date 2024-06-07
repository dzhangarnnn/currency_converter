import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavProfile: React.FC = () => {
  const { user } = useAuth();

  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  if (!user.id) return <span className="text-white">loading</span>;
  return (
    <div className=" dropdown dropmenu px-3" onClick={toggleMenu}>
      <div className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center">
        <div className="me-2 text-white px-3">{user.name}</div>
      </div>
      <ul
        className={
          "dropdown-menu dropdown-menu-dark align-items-center" +
          (isOpen ? " show" : "")
        }
      >
        <Link to={`/users/${user.id}`} className="dropdown-item">
          Личный кабинет
        </Link>
        <Link to="/logout" className="dropdown-item">
          Выйти
        </Link>
      </ul>
    </div>
  );
};

export default NavProfile;
