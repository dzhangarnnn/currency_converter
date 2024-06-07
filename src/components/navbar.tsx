import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavProfile from "./navProfile";

const Navbar: React.FC = () => {
  const { isAuth } = useAuth();

  return (
    <>
      <nav className="navbar navbar-light bg-primary p-3">
        <div className="container-fluid">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Currencies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                aria-current="page"
                to="/convert"
              >
                Convertion
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isAuth ? (
              <NavProfile />
            ) : (
              <Link
                className="nav-link text-white"
                aria-current="page"
                to="/login/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
