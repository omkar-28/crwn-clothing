import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user.context";

import "./index.scss";
import App from "./App";
import { CartProvider } from "./context/cart.context";
import { CategoriesProvider } from "./context/categories.context";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
