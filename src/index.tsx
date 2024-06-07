import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.css";
import BaseCurrencyContextProvider from "./hooks/useCurrency";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./hooks/useAuth";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <BaseCurrencyContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </BaseCurrencyContextProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
