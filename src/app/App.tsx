import React from "react";
import ConvertionPage from "../pages/convertionPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import CurrenciesPage from "../pages/currenciesPage";
import Login from "../layouts/login";
import LogOut from "../layouts/logOut";
import ProtectedRoute from "../components/hoc/protectedRoute";
import User from "../layouts/user";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<CurrenciesPage />} />
          <Route path="convert" element={<ConvertionPage />} />
          <Route
            path="users/:userId"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route path="login/:type" element={<Login />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
