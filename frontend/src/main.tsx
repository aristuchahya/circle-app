import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./app.tsx";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>
      {/* <RouterProvider router={router} /> */}
    </ChakraProvider>
  </React.StrictMode>
);
